# Student Worksheet: Lesson 3

## YA Theme Context
This lesson is inspired by faction-choice YA stories where characters are sorted by traits and tests.
You are building the assignment machine that decides where each recruit belongs.
Your code models how rule-based systems make branching decisions.

## Theory (What You Need to Know)
- `if` runs when its condition is true.
- `elif` is checked only if earlier conditions are false.
- `else` handles everything not caught above.
- Nested `if` adds a second check inside a branch.

## Metalanguage (Key Terms + Examples)
- `condition`: A true/false test.
Example: `bravery >= 80`
- `comparison operator`: Compares two values.
Example: `>=`, `<=`, `==`, `!=`
- `logical operator`: Combines conditions.
Example: `bravery >= 80 and logic >= 80`
- `if/elif/else chain`: Ordered decision structure.
Example: first true branch runs, others are skipped.
- `nested conditional`: Conditional inside another conditional.
Example: inside top branch, check for elite score.
- `boundary value`: Number at the edge of a rule.
Example: if threshold is 80, then 79, 80, and 81 are critical tests.
- `output label`: Text that explains a value in output.
Example: `print("Assigned group:", group)`

## Relatable Examples
- Grade badge system: 90+ gold, 70+ silver, else bronze.
- Club entry: if score is high, then check behavior for elite pass.
- Safety rule: allow only when both checks are true.

## Scenario Brief (Explicit)
You are coding a faction assignment machine for new recruits.

Required scenario inputs:
- `bravery` score (0-100)
- `logic` score (0-100)

Required scenario outcomes:
- High bravery and logic -> `Command`
- Bravery only high -> `Frontline`
- Logic only high -> `Scholar`
- Otherwise -> `Support`
- Very high bravery and logic -> `Command Elite` (nested check)

## Deliverable (Measurable)
You are successful when your program:
1. Accepts and converts both inputs to integers
2. Uses an `if/elif/else` chain with 4 main outcomes
3. Includes one nested `if` for elite status
4. Prints one final assignment line
5. Can be tested with one case for each branch

## Mission
Create a sorter that places a candidate into one of four groups.

## Scaffolded Task (Do in Order)
1. Collect data.
- Ask for `bravery` and `logic` with `input()` and convert to `int`.
2. Build top branch.
- If both values are high, assign a main group.
3. Add nested elite check.
- Inside the top branch, add stricter thresholds for elite status.
4. Build remaining branches.
- Add `elif` for bravery-only high.
- Add `elif` for logic-only high.
- Add `else` for all other cases.
5. Print final assignment.
- Print one clear line that shows selected group.
6. Quick self-check.
- Test one input per branch to confirm all paths work.

## Success Criteria
- Contains at least 3 condition branches
- Uses and or or correctly at least once
- Includes one nested if block
- Prints one final assignment

## Objective Check
1. Result of not False is:
2. Which keyword handles second condition path?
3. Why are edge values important (e.g., exactly 70)?

## Reflection
Write 3-5 sentences:
- Which boundary value did you test first?
- What did that test prove or break?
