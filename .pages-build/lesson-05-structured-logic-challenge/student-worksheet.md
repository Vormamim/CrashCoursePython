---
layout: default
---

# Student Worksheet: Lesson 5

## Instructions
Follow the worksheet steps in order and complete each task using the required variables, inputs, and outputs.

## Theory (What You Need to Know)
- A program spec defines input, processing, and output.
- Use variables to store each step so you can debug clearly.
- Edge tests check values at or near cutoff thresholds.

## Metalanguage (Key Terms + Examples)
- `program spec`: The required features and behavior before coding.
Example: "collect 3 inputs, compute risk, print status".
- `formula`: Math rule used to compute a value.
Example: `risk_score = 120 - power - stability + (10 - id_clearance) * 3`
- `threshold`: Cutoff number that changes the result branch.
Example: `risk_score > 60` means denied.
- `trace`: Following variable values step by step.
Example: write power, stability, and risk on paper after each line.
- `test case`: One full input set used to check output.
Example: `power=90, stability=85, id_clearance=9`
- `edge case`: Input close to threshold values.
Example: if threshold is 35, test 34, 35, 36.
- `runtime error`: Error while program is running.
Example: `int("five")` raises `ValueError`.

## Relatable Examples
- Trial selection score combines speed, skill, and discipline.
- Festival gate pass depends on cutoff values.
- Dashboard report should show both score and decision.

## Scenario Brief (Explicit)
You are coding a portal checkpoint risk system for travelers.

Required scenario inputs:
- `power` (0-100)
- `stability` (0-100)
- `id_clearance` (0-10)

Required scenario formula:
- `risk_score = 120 - power - stability + (10 - id_clearance) * 3`

Required scenario statuses:
- `Denied` for high risk
- `Conditional` for medium risk
- `Approved` for low risk

## Deliverable (Measurable)
You are successful when your program:
1. Collects and converts 3 numeric inputs
2. Uses the exact risk formula
3. Stores statuses in a list
4. Uses `if/elif/else` for 3 outcomes
5. Shows 3 tests: high, medium, low risk

## Mission
Create a checkpoint system that decides if a traveler can enter a portal.

## Scaffolded Task (Do in Order)
1. Collect three values.
- Ask for `power`, `stability`, and `id_clearance`.
- Convert each input to `int`.
2. Add status labels.
- Create a list like `status_labels = ["Denied", "Conditional", "Approved"]`.
3. Build risk formula.
- Compute one `risk_score` variable using arithmetic.
4. Add branching rules.
- Use `if/elif/else` with clear numeric thresholds.
- Assign final status from your labels list.
5. Print mission report.
- Print all key values: power, stability, clearance, risk, status.
6. Quick self-check.
- Test one high-risk, one medium-risk, and one low-risk input set.

## Success Criteria
- Uses three inputs with conversion
- Uses at least one list for labels or statuses
- Uses at least three branches
- Prints risk score and final status

## Objective Check
1. What does int("5") do?
2. What can break on int("five")?
3. What value should you test near each threshold?

## Reflection
Write 3-5 sentences:
- Which threshold value did you test first and why?
- How did that test improve your program?
