# Guided Tutorial: Lesson 5 Structured Logic Challenge

Use this before the worksheet. Students type one step at a time.

## Goal
Build a portal clearance checker using a formula and 3-level status logic.

## Step-by-step Build
1. Add this line:
```python
print("Portal Clearance System")
```
Explainer: Title line for user context.

2. Add this line:
```python
power = int(input("Power level (0-100): "))
```
Explainer: Read and convert first metric.

3. Add this line:
```python
stability = int(input("Stability level (0-100): "))
```
Explainer: Read and convert second metric.

4. Add this line:
```python
id_clearance = int(input("ID clearance (0-10): "))
```
Explainer: Read and convert third metric.

5. Add this line:
```python
status_labels = ["Denied", "Conditional", "Approved"]
```
Explainer: Store output labels in a list.

6. Add this line:
```python
risk_score = 120 - power - stability + (10 - id_clearance) * 3
```
Explainer: Required formula for risk.

7. Add this line:
```python
if risk_score > 60:
```
Explainer: High risk branch.

8. Add this line (indented):
```python
    status = status_labels[0]
```
Explainer: Set denied status.

9. Add this line:
```python
elif risk_score >= 35:
```
Explainer: Medium risk branch.

10. Add this line (indented):
```python
    status = status_labels[1]
```
Explainer: Set conditional status.

11. Add this line:
```python
else:
```
Explainer: Low risk branch.

12. Add this line (indented):
```python
    status = status_labels[2]
```
Explainer: Set approved status.

13. Add this line:
```python
print("Risk score:", risk_score)
```
Explainer: Show computed value.

14. Add this line:
```python
print("Portal status:", status)
```
Explainer: Show final decision.

## Quick Check
- Did you use the exact formula?
- Do you have 3 outcomes?
- Did you test high, medium, and low risk inputs?
