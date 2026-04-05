# Student Worksheet: Lesson 2

## Theory (What You Need to Know)
- `input()` returns text (`str`) even if a number is typed.
- Use `int()` to convert numeric text so arithmetic works.
- Arithmetic expressions combine values to produce one result.

## Metalanguage (Key Terms + Examples)
- `input`: Data typed by the user while the program runs.
Example: `clue_a_text = input("Enter clue A: ")`
- `string (str)`: Text value, usually inside quotes.
Example: `"12"` is text, not a number yet.
- `type conversion`: Changing one data type into another.
Example: `clue_a = int(clue_a_text)`
- `expression`: A combination of values/operators that produces a value.
Example: `unlock_score = clue_a * 2 + clue_b`
- `operator`: Symbol used for math or logic.
Example: `+`, `-`, `*`, `/`, `>=`
- `condition`: A true/false check used by `if`.
Example: `unlock_score >= 30`
- `branch`: Different code path based on a condition.
Example: unlocked message in `if`, denied message in `else`.

## Relatable Examples
- Door code puzzle: typed clues must be converted before addition.
- Budget total: `int(price1) + int(price2)` gives a real total.
- Alert text: `"Go" * 3` repeats a message.

## Scenario Brief (Explicit)
You are operating a maze gate terminal that unlocks only when clues are processed correctly.

Required scenario inputs:
- `clue_a_text` from user
- `clue_b_text` from user

Required scenario rule:
- Convert both to integers
- Compute `unlock_score = clue_a * 2 + clue_b`
- Unlock when score is at least 30

## Deliverable (Measurable)
You are successful when your program:
1. Uses `input()` exactly two times for clues
2. Converts both values using `int()`
3. Uses the exact unlock formula
4. Prints unlock or deny message using `if/else`
5. Shows final unlock score

## Mission
Build a terminal that unlocks an exit using user-provided clues.

## Scaffolded Task (Do in Order)
1. Collect user input.
- Ask for `clue_a_text` and `clue_b_text` with `input()`.
2. Convert types.
- Create `clue_a = int(clue_a_text)`.
- Create `clue_b = int(clue_b_text)`.
3. Calculate output value.
- Compute `unlock_score = clue_a * 2 + clue_b`.
4. Add decision logic.
- If `unlock_score` is high enough, print unlocked message.
- Otherwise print denied message.
5. Print final score line.
- Show `unlock_score` in the final output.
6. Quick self-check.
- Test once with numbers that unlock and once with numbers that fail.

## Success Criteria
- Uses input() twice
- Uses int() conversion
- Performs arithmetic correctly
- Prints a clear final message

## Objective Check
1. input() returns what type?
2. int("9") gives what value?
3. What error can happen on int("nine")?

## Reflection
Write 3-5 sentences:
- What test input did you design yourself?
- What did that test reveal about your code?
