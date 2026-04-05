# Guided Tutorial: Lesson 6 Capstone Simulation

Use this before the worksheet. Students type one step at a time.

## Goal
Follow a repeatable build process for a complete mini-simulation.

## Step-by-step Build
1. Add this line:
```python
print("Capstone Simulation")
```
Explainer: Start every project with a clear title.

2. Add this line:
```python
scenario_name = "Arena Checkpoint"
```
Explainer: Name your scenario so output is clear.

3. Add this line:
```python
value_a = int(input("Enter value A: "))
```
Explainer: First numeric input.

4. Add this line:
```python
value_b = int(input("Enter value B: "))
```
Explainer: Second numeric input.

5. Add this line:
```python
value_c = int(input("Enter value C: "))
```
Explainer: Third numeric input.

6. Add this line:
```python
status_levels = ["Low", "Medium", "High"]
```
Explainer: Use one list meaningfully.

7. Add this line:
```python
combined = value_a + value_b - value_c
```
Explainer: Compute one key value.

8. Add this line:
```python
if combined >= 50:
```
Explainer: First branch (high outcome).

9. Add this line (indented):
```python
    outcome = status_levels[2]
```
Explainer: Set high output.

10. Add this line:
```python
elif combined >= 20:
```
Explainer: Second branch (medium outcome).

11. Add this line (indented):
```python
    outcome = status_levels[1]
```
Explainer: Set medium output.

12. Add this line:
```python
else:
```
Explainer: Third branch (low outcome).

13. Add this line (indented):
```python
    outcome = status_levels[0]
```
Explainer: Set low output.

14. Add this line:
```python
print("Scenario:", scenario_name)
```
Explainer: Show scenario in final report.

15. Add this line:
```python
print("Combined score:", combined)
```
Explainer: Show computed value in final report.

16. Add this line:
```python
print("Outcome:", outcome)
```
Explainer: Show final decision.

## Quick Check
- Did you include 3 inputs, 1 list, 1 computed value, and 3 branches?
- Do expected and actual outputs match for 3 tests?
