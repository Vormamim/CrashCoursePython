---
layout: default
---

# Guided Tutorial: Lesson 3 Choices and Consequences

Use this before the worksheet. Students type one step at a time.

## Goal
Build a faction sorter using `if/elif/else` with a nested check.

## Step-by-step Build
1. Add this line:
```python
print("Faction Placement Simulator")
```
Explainer: Start with a clear title.

2. Add this line:
```python
bravery = int(input("Bravery score (0-100): "))
```
Explainer: Input + conversion in one line.

3. Add this line:
```python
logic = int(input("Logic score (0-100): "))
```
Explainer: Collect the second score.

4. Add this line:
```python
if bravery >= 80 and logic >= 80:
```
Explainer: This checks if both high conditions are true.

5. Add this line (indented):
```python
    group = "Command"
```
Explainer: Assign top group first.

6. Add this line (indented):
```python
    if bravery >= 95 and logic >= 95:
```
Explainer: Nested `if` checks elite level.

7. Add this line (double-indented):
```python
        group = "Command Elite"
```
Explainer: Overwrite group for rare top scores.

8. Add this line:
```python
elif bravery >= 80:
```
Explainer: Next branch for bravery-only high.

9. Add this line (indented):
```python
    group = "Frontline"
```
Explainer: Assignment for this branch.

10. Add this line:
```python
elif logic >= 80:
```
Explainer: Next branch for logic-only high.

11. Add this line (indented):
```python
    group = "Scholar"
```
Explainer: Assignment for this branch.

12. Add this line:
```python
else:
```
Explainer: Catch-all for remaining cases.

13. Add this line (indented):
```python
    group = "Support"
```
Explainer: Default assignment.

14. Add this line:
```python
print("Assigned group:", group)
```
Explainer: Output final result.

## Quick Check
- Do you have 4 main outcomes?
- Did you include one nested `if`?
- Did you test at least 3 different score pairs?
