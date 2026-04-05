# Guided Tutorial: Lesson 4 Data Without Loops

Use this before the worksheet. Students type one step at a time.

## Goal
Build a points board with lists, indexes, a tuple, and conditionals.

## Step-by-step Build
1. Add this line:
```python
print("House Points Tracker Lite")
```
Explainer: Program title first.

2. Add this line:
```python
team_names = ["Falcon", "Wolf", "Stag", "Raven"]
```
Explainer: A list stores ordered, editable values.

3. Add this line:
```python
team_points = [42, 38, 46, 40]
```
Explainer: Scores align by index with `team_names`.

4. Add this line:
```python
term_info = ("Year 1", "Term 2", 2026)
```
Explainer: A tuple stores fixed info.

5. Add this line:
```python
team_points[1] = team_points[1] + 5
```
Explainer: Index update changes one team score.

6. Add this line:
```python
if team_points[0] > team_points[2]:
```
Explainer: Compare two selected teams without loops.

7. Add this line (indented):
```python
    leader = team_names[0]
```
Explainer: Pick leader from matching index.

8. Add this line:
```python
else:
```
Explainer: Alternate outcome if first comparison fails.

9. Add this line (indented):
```python
    leader = team_names[2]
```
Explainer: Pick second option.

10. Add this line:
```python
print("Teams:", team_names)
```
Explainer: Show full team list.

11. Add this line:
```python
print("Points:", team_points)
```
Explainer: Show updated scores.

12. Add this line:
```python
print("Term info:", term_info)
```
Explainer: Show fixed tuple data.

13. Add this line:
```python
print("Number of teams:", len(team_names))
```
Explainer: `len()` returns sequence size.

14. Add this line:
```python
print("Current leader:", leader)
```
Explainer: Final result line.

## Quick Check
- Did you update one score by index?
- Did you use one tuple?
- Did output include team count and leader?
