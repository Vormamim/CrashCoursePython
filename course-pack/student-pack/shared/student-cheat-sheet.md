# Student Python Cheat Sheet

## Course Rules

- No loops
- No user-defined functions
- No dictionaries
- No file handling

## Quick Python Patterns

### 1) Variables and Types

```python
name = "Ari"        # str (text)
age = 13            # int (whole number)
rating = 8.5        # float (decimal)
is_ready = True     # bool (True/False)
```

### 2) Input and Conversion

```python
score_text = input("Enter score: ")
score = int(score_text)
```

### 3) Arithmetic

```python
total = a + b
result = a * 2 - b
```

### 4) Decision Logic

```python
if score >= 80:
    status = "High"
elif score >= 50:
    status = "Medium"
else:
    status = "Low"
```

### 5) Lists and Tuples

```python
teams = ["Falcon", "Wolf", "Stag", "Raven"]
points = [40, 35, 44, 38]
term_info = ("Year 1", "Term 2", 2026)

points[1] = points[1] + 5   # index update
count = len(teams)          # number of items
```

### 6) Clear Output

```python
print("Team:", teams[0])
print("Score:", points[0])
print("Status:", status)
```

## Metalanguage (Term -> Meaning -> Example)

- variable -> named value -> `score = 10`
- assignment -> set a value -> `district = 7`
- reassignment -> change existing value -> `score = score + 2`
- data type -> kind of value -> `"Ari"` is `str`
- expression -> makes a value -> `a * 2 + b`
- operator -> symbol used in expressions -> `+`, `-`, `*`, `>=`
- condition -> true/false check -> `score >= 50`
- branch -> code path chosen by condition -> `if/elif/else`
- list -> ordered, editable collection -> `[1, 2, 3]`
- tuple -> ordered, fixed collection -> `(1, 2, 3)`
- index -> position in sequence -> first item is index `0`
- runtime error -> error while running -> `int("five")` -> `ValueError`
- edge case -> boundary test value -> around threshold 49, 50, 51

## Common Errors and Fast Fixes

- `ValueError` on `int()`:
  Cause: non-number text input.
  Fix: test with numeric inputs first.
- `TypeError` with text + number:
  Cause: mixing `str` and `int` directly.
  Fix: convert types or print with commas.
- Wrong branch result:
  Cause: threshold order is wrong.
  Fix: check highest threshold first.
- Wrong list item:
  Cause: index confusion.
  Fix: remember first index is `0`.

## 30-Second Debug Routine

1. Read the exact error message.
2. Find the line number.
3. Check variable type at that line.
4. Print key values before the failing line.
5. Re-run with a simple test case.

## Mini Test Table (Use Before Submit)

- Test A input values:
- Expected output:
- Actual output:
- Test B input values:
- Expected output:
- Actual output:
- Test C input values:
- Expected output:
- Actual output:

## Reflection Sentence Starters

- "The first bug I hit was..."
- "I found the cause by checking..."
- "I fixed it by changing..."
- "My boundary test was... and it showed..."
