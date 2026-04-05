# Lesson 5: Structured Logic Challenge (Portal Checkpoint)

## Duration
- 60 minutes total
- 40 minutes coding

## Learning Goals
- Build multi-step programs from a clear spec
- Combine input, arithmetic, lists, and conditionals
- Trace values for debugging
- Validate edge cases

## Scenario Brief (Explicit)
You are coding a security checkpoint for inter-city portal travel.
Students collect traveler metrics, compute risk, and assign travel status.

Required scenario inputs:
- Power level (0-100)
- Stability level (0-100)
- ID clearance (0-10)

Required scenario formula:
- `risk_score = 120 - power - stability + (10 - id_clearance) * 3`

Required scenario statuses:
- Risk > 60 -> Denied
- Risk 35 to 60 -> Conditional
- Risk < 35 -> Approved

## End-of-Lesson Deliverable (Measurable)
Each student submits a program that:
1. Collects and converts all 3 inputs
2. Uses the exact risk formula
3. Stores status labels in a list
4. Uses 3-branch decision logic for final status
5. Runs 3 test cases: high, medium, and low risk

## Theory (Clear and Relatable)
- A `program spec` is a checklist of what input, process, and output are required.
- `Trace tables` track variable values step by step to find logic mistakes.
- `Edge cases` are boundary values near cutoffs that often reveal bugs.

### Relatable Examples
- Sports trial score: combine speed, skill, and discipline into one decision.
- Festival entry pass: exactly at cutoff score should be tested carefully.
- Mission control dashboard: print each key value so bugs are easy to spot.

## Schedule
- 0-8 min: Hook (multiverse checkpoint)
- 8-18 min: Teach trace-table debugging
- 18-58 min: Coding mission
- 58-60 min: Exit check

## Coding Mission (40 min)
Build a "Portal Clearance System" that:
1. Collects hero metrics
2. Calculates risk score
3. Assigns clearance level with conditions
4. Prints final status summary

## Objective Questions
1. Which occurs first: assignment or if check using that variable?
2. Name one runtime error from bad conversion.
3. Why test edge values like exactly 50?

## Reflective Prompts
1. Show one custom test case and expected output.
2. What assumption did your test prove wrong?
