# Teacher Tool: Unit Test Student Solutions

This tool runs student script files against lesson test specs.

## Files
- `solution_tester.py`
- `test-specs/lesson-01.json` ... `test-specs/lesson-06.json`

## What It Checks
1. Constraint checks:
- no loops
- no user-defined functions
- no dictionaries
- no file handling (`open()`)

2. Test case checks:
- expected output contains specific text
- expected regex patterns
- exit code
- optional stderr checks

## Run Command
From `course-pack/teacher-pack/shared`:

```bash
python3 solution_tester.py --solution ../../student-pack/lesson-01-mission-control/starter.py --spec test-specs/lesson-01.json
```

## Report-Only Mode (Classroom Friendly)
Use this when you want results printed but do not want a failing exit code:

```bash
python3 solution_tester.py --solution ../../student-pack/lesson-01-mission-control/starter.py --spec test-specs/lesson-01.json --report-only
```

## Important
- Starter files are intentionally incomplete, so they should usually fail lesson specs until students finish them.
- A `FAIL` result means tests did not match expected outputs; it does not mean the tester crashed.

## Suggested Marking Workflow
1. Save a student's file in the matching lesson folder.
2. Run the command with that file path.
3. Read `PASS/FAIL` summary.
4. If fail, review missing output or constraint errors.

## Notes
- Output checks are intentionally simple and robust.
- You can edit any JSON spec to match your exact lesson expectations.
