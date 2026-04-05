---
layout: default
---

# Guided Tutorial: Lesson 7 (`for` Loop)

## Goal
Print checkpoint numbers and hazard warnings.

1. Add:
```python
print("Maze Checkpoint Scanner")
```
Explainer: Title output for context.

2. Add:
```python
for checkpoint in range(1, 9):
```
Explainer: Repeat block for checkpoint values 1 to 8.

3. Add (indented):
```python
    print("Checkpoint", checkpoint)
```
Explainer: Loop variable changes each pass.

4. Add (indented):
```python
    if checkpoint % 3 == 0:
```
Explainer: `%` checks remainder to find multiples of 3.

5. Add (double-indented):
```python
        print("Hazard scan required")
```
Explainer: Extra output for special checkpoints.

## Gemini Prompt Practice
Weak: "Do it all for me"
Good: "Explain only how to use `for` with `range(1, 9)` and mark every 3rd item using `%` with expected output."
