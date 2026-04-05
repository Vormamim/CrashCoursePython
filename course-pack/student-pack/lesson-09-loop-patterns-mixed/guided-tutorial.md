# Guided Tutorial: Lesson 9 (Mixed Loops)

## Goal
Use `for` for fixed trials and `while` for input validation.

1. Add:
```python
print("Faction Trial Queue")
```
Explainer: Program title.

2. Add:
```python
eligible_count = 0
```
Explainer: Counter for successful trainees.

3. Add:
```python
for trainee in range(1, 6):
```
Explainer: Fixed loop for 5 trainees.

4. Add (indented):
```python
    score = int(input("Enter score 0-100: "))
```
Explainer: First score read.

5. Add (indented):
```python
    while score < 0 or score > 100:
```
Explainer: Validation loop repeats invalid values.

6. Add (double-indented):
```python
        score = int(input("Invalid. Re-enter 0-100: "))
```
Explainer: Re-read score inside loop.

7. Add (indented):
```python
    if score >= 70:
```
Explainer: Eligibility rule.

8. Add (double-indented):
```python
        eligible_count = eligible_count + 1
```
Explainer: Update counter only for eligible trainees.

9. Add:
```python
print("Eligible trainees:", eligible_count)
```
Explainer: Final summary.
