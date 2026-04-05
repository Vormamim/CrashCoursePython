# Guided Tutorial: Lesson 8 (`while` Loop)

## Goal
Build a safe countdown loop.

1. Add:
```python
print("Arena Countdown Terminal")
```
Explainer: Title line.

2. Add:
```python
countdown = 10
```
Explainer: Start value for loop control.

3. Add:
```python
while countdown >= 1:
```
Explainer: Loop runs while condition is true.

4. Add (indented):
```python
    print("T-minus", countdown)
```
Explainer: Print current loop state.

5. Add (indented):
```python
    countdown = countdown - 1
```
Explainer: Update counter so loop can stop.

6. Add:
```python
print("Launch")
```
Explainer: Runs once after loop ends.

## Gemini Prompt Practice
Weak: "Fix my while loop"
Good: "Explain why this while loop is infinite and show one line change to stop it."
