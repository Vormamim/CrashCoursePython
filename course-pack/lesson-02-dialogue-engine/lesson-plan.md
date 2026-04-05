# Lesson 2: Dialogue Engine (Escape Console)

## Duration
- 60 minutes total
- 40 minutes coding

## Learning Goals
- Use input() for interaction
- Convert string input to numbers
- Apply arithmetic and string operations
- Format outputs clearly

## Scenario Brief (Explicit)
You are coding a maze terminal with a locked gate.
Students act as control engineers who receive two numeric clue values from a scout.

Required scenario inputs:
- Clue A from user input
- Clue B from user input

Required scenario rule:
- `unlock_score = clue_a * 2 + clue_b`
- Unlock if score is at least 30

Required scenario outputs:
- One themed gate decision message
- One printed unlock score line

## End-of-Lesson Deliverable (Measurable)
Each student submits a program that:
1. Uses `input()` two times
2. Converts both inputs with `int()`
3. Calculates unlock score using the exact formula
4. Uses `if/else` for unlock vs deny
5. Shows one successful test and one failed test

## Theory (Clear and Relatable)
- `input()` always gives text (`str`), even when students type numbers.
- `Type conversion` changes text into numbers for maths, like `int("12")`.
- `Expressions` combine values using operators such as `+`, `-`, and `*`.

### Relatable Examples
- Locked door keypad: clues typed as text must be converted before adding.
- Snack budget: if two prices are typed in, convert then total them.
- Alarm phrase: `"Go" * 3` creates repeated text for dramatic output.

## Schedule
- 0-8 min: Hook (locked chamber puzzle)
- 8-18 min: Teach input, conversion, expression order
- 18-58 min: Coding mission
- 58-60 min: Exit check

## Coding Mission (40 min)
Build an "Escape Room Terminal" that:
1. Asks for two numeric clues
2. Converts both values
3. Calculates an unlock score
4. Prints a final code message

## Objective Questions
1. What does int("12") + 3 return?
2. What does "Go" * 3 return?
3. Why can input() fail in maths unless converted?

## Reflective Prompts
1. What invalid input could break your code?
2. How did your text output fit the movie theme?
