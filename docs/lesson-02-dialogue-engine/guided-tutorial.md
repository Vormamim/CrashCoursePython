---
layout: default
---

# Guided Tutorial: Lesson 2 Dialogue Engine

Use this before the worksheet. Students type one step at a time.

## Goal
Build an escape terminal that uses input, conversion, arithmetic, and `if/else`.

## Step-by-step Build
1. Add this line:
```python
print("Escape Room Terminal")
```
Explainer: Title output helps users know what program is running.

2. Add this line:
```python
clue_a_text = input("Enter clue A (number): ")
```
Explainer: `input()` always returns text (`str`).

3. Add this line:
```python
clue_b_text = input("Enter clue B (number): ")
```
Explainer: Collect the second value the same way.

4. Add this line:
```python
clue_a = int(clue_a_text)
```
Explainer: Convert text to integer for maths.

5. Add this line:
```python
clue_b = int(clue_b_text)
```
Explainer: Convert the second input too.

6. Add this line:
```python
unlock_score = clue_a * 2 + clue_b
```
Explainer: This expression computes one final score.

7. Add this line:
```python
if unlock_score >= 30:
```
Explainer: Start a condition check for unlock.

8. Add this line (indented):
```python
    print("Gate unlocked. Move now.")
```
Explainer: This runs only if the `if` condition is true.

9. Add this line:
```python
else:
```
Explainer: `else` handles all other cases.

10. Add this line (indented):
```python
    print("Access denied. Recalculate clues.")
```
Explainer: This runs when unlock condition is false.

11. Add this line:
```python
print("Unlock score:", unlock_score)
```
Explainer: Always show the final score for debugging.

## Quick Check
- Did you use `input()` twice?
- Did you convert both values with `int()`?
- Did you test one unlock and one deny case?
