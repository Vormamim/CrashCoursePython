#!/usr/bin/env python3
"""Simple teacher autograder for script-based student solutions.

Runs a student Python script against test cases from a JSON spec file,
checks output expectations, and optionally enforces course constraints.
"""

from __future__ import annotations

import argparse
import ast
import json
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass
class ConstraintResult:
    passed: bool
    errors: list[str]


@dataclass
class CaseResult:
    name: str
    passed: bool
    details: list[str]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run lesson test specs against a student script")
    parser.add_argument("--solution", required=True, help="Path to student .py solution")
    parser.add_argument("--spec", required=True, help="Path to lesson JSON spec")
    parser.add_argument("--python", default=sys.executable, help="Python executable to run student script")
    parser.add_argument(
        "--report-only",
        action="store_true",
        help="Always exit 0 after printing results (useful for classroom review)",
    )
    return parser.parse_args()


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def check_constraints(solution_path: Path, spec: dict[str, Any]) -> ConstraintResult:
    enforce = spec.get("enforce_constraints", {})
    if not enforce:
        return ConstraintResult(True, [])

    tree = ast.parse(solution_path.read_text(encoding="utf-8"), filename=str(solution_path))
    errors: list[str] = []

    for node in ast.walk(tree):
        if enforce.get("no_loops", False):
            if isinstance(node, (ast.For, ast.While, ast.AsyncFor)):
                errors.append("Found forbidden loop construct (for/while).")
            if isinstance(node, (ast.ListComp, ast.SetComp, ast.DictComp, ast.GeneratorExp)):
                errors.append("Found forbidden comprehension/generator (iteration).")

        if enforce.get("no_functions", False):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.Lambda)):
                errors.append("Found forbidden function definition/lambda.")

        if enforce.get("no_dicts", False):
            if isinstance(node, ast.Dict):
                errors.append("Found forbidden dictionary literal.")

        if enforce.get("no_file_handling", False):
            if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == "open":
                errors.append("Found forbidden file handling via open().")

    # Deduplicate while preserving order.
    deduped = list(dict.fromkeys(errors))
    return ConstraintResult(len(deduped) == 0, deduped)


def normalize_output(text: str) -> str:
    # Make matching resilient to trailing spaces and platform line endings.
    lines = [line.rstrip() for line in text.replace("\r\n", "\n").replace("\r", "\n").split("\n")]
    return "\n".join(lines)


def run_case(solution_path: Path, python_cmd: str, timeout_sec: int, case: dict[str, Any]) -> CaseResult:
    name = case.get("name", "unnamed-case")
    case_input = case.get("input", [])
    if isinstance(case_input, str):
        stdin_text = case_input
    else:
        stdin_text = "\n".join(str(v) for v in case_input) + ("\n" if case_input else "")

    details: list[str] = []

    try:
        completed = subprocess.run(
            [python_cmd, str(solution_path)],
            input=stdin_text,
            text=True,
            capture_output=True,
            timeout=timeout_sec,
            check=False,
        )
    except subprocess.TimeoutExpired:
        return CaseResult(name=name, passed=False, details=[f"Timed out after {timeout_sec}s"])

    stdout = normalize_output(completed.stdout)
    stderr = normalize_output(completed.stderr)

    expected_exit = case.get("expect_exit", 0)
    if expected_exit is not None and completed.returncode != expected_exit:
        details.append(f"Expected exit {expected_exit}, got {completed.returncode}")

    for item in case.get("expect_contains", []):
        if item not in stdout:
            details.append(f"Missing expected output: {item!r}")

    for item in case.get("expect_not_contains", []):
        if item in stdout:
            details.append(f"Found forbidden output: {item!r}")

    for pattern in case.get("expect_regex", []):
        if not re.search(pattern, stdout, flags=re.MULTILINE):
            details.append(f"Regex not matched: {pattern!r}")

    if case.get("stderr_must_be_empty", False) and stderr.strip():
        details.append("stderr is not empty")

    if case.get("debug_show_output", False):
        details.append("--- stdout ---")
        details.extend(stdout.split("\n"))
        if stderr:
            details.append("--- stderr ---")
            details.extend(stderr.split("\n"))

    return CaseResult(name=name, passed=(len(details) == 0), details=details)


def main() -> int:
    args = parse_args()
    solution_path = Path(args.solution).resolve()
    spec_path = Path(args.spec).resolve()

    if not solution_path.exists():
        print(f"ERROR: Solution file not found: {solution_path}")
        return 2
    if not spec_path.exists():
        print(f"ERROR: Spec file not found: {spec_path}")
        return 2

    spec = load_json(spec_path)
    timeout_sec = int(spec.get("timeout_sec", 3))

    print(f"Lesson: {spec.get('lesson', 'unknown')}")
    print(f"Solution: {solution_path}")
    print(f"Spec: {spec_path}")

    constraint_result = check_constraints(solution_path, spec)
    if constraint_result.passed:
        print("Constraint checks: PASS")
    else:
        print("Constraint checks: FAIL")
        for err in constraint_result.errors:
            print(f"  - {err}")

    cases = spec.get("cases", [])
    if not cases:
        print("No test cases defined in spec.")
        return 1

    print("\nCase results:")
    passed_count = 0
    case_results: list[CaseResult] = []
    for case in cases:
        result = run_case(solution_path, args.python, timeout_sec, case)
        case_results.append(result)
        status = "PASS" if result.passed else "FAIL"
        print(f"- {result.name}: {status}")
        for detail in result.details:
            print(f"    {detail}")
        if result.passed:
            passed_count += 1

    all_cases_passed = passed_count == len(case_results)
    overall = constraint_result.passed and all_cases_passed

    # Helpful hint for starter templates or incomplete scripts.
    try:
        source_text = solution_path.read_text(encoding="utf-8")
        if "TODO: complete" in source_text and not overall:
            print("\nHint: This file appears to be a starter template and may fail until completed.")
    except OSError:
        pass

    print("\nSummary:")
    print(f"- Cases passed: {passed_count}/{len(case_results)}")
    print(f"- Constraints passed: {constraint_result.passed}")
    print(f"- Overall: {'PASS' if overall else 'FAIL'}")

    if args.report_only:
        print("- Exit mode: report-only (always returns 0)")
        return 0

    print("- Exit mode: strict (returns 1 when Overall is FAIL)")
    return 0 if overall else 1


if __name__ == "__main__":
    raise SystemExit(main())
