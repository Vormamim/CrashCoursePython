# Guided Tutorial: Lesson 10 (Loop Capstone)

## Goal
Build a portal cycle controller with safe command validation.

1. Add:
```python
print("Portal Rotation Control")
```
Explainer: Program title.

2. Add:
```python
open_count = 0
hold_count = 0
```
Explainer: Track command totals.

3. Add:
```python
for cycle in range(1, 7):
```
Explainer: Fixed 6-cycle simulation.

4. Add (indented):
```python
    command = input("Cycle command (open/hold): ").strip().lower()
```
Explainer: Read normalized user command.

5. Add (indented):
```python
    while command not in ["open", "hold"]:
```
Explainer: Keep asking until command is valid.

6. Add (double-indented):
```python
        command = input("Invalid. Type open or hold: ").strip().lower()
```
Explainer: Validation retry.

7. Add (indented):
```python
    if command == "open":
```
Explainer: Branch for open command.

8. Add (double-indented):
```python
        open_count = open_count + 1
```
Explainer: Increment open counter.

9. Add (indented):
```python
    else:
```
Explainer: Remaining valid command is hold.

10. Add (double-indented):
```python
        hold_count = hold_count + 1
```
Explainer: Increment hold counter.

11. Add:
```python
print("Open commands:", open_count)
print("Hold commands:", hold_count)
```
Explainer: Final mission summary.
