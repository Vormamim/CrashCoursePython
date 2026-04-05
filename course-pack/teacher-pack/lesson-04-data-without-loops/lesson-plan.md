# Lesson 4: Data Without Loops (House Records)

## Duration
- 60 minutes total
- 40 minutes coding

## Learning Goals
- Build and edit lists with indexes
- Use tuple records for fixed data
- Apply len() and in on sequences
- Compare selected values with conditionals

## Scenario Brief (Explicit)
You are coding a house championship scoreboard for a school event.
Students maintain team names, points, and term record without loops.

Required scenario data:
- 4 team names in a list
- 4 matching team points in a list
- Term metadata in one tuple

Required scenario event:
- One team receives a points bonus by index update

Required scenario output:
- Updated team list and score list
- Team count via `len()`
- Current leader from conditional comparison

## End-of-Lesson Deliverable (Measurable)
Each student submits a program that:
1. Builds two lists with aligned indexes
2. Performs at least one index reassignment
3. Creates one tuple with fixed info
4. Determines leader using `if/else` (no loops)
5. Prints team names, points, tuple, and leader

## Theory (Clear and Relatable)
- A `list` stores multiple values in order and can be changed.
- An `index` is the position number of an item, starting at 0.
- A `tuple` stores fixed values that should not change.
- `len()` gives size and `in` checks if a value exists.

### Relatable Examples
- Team lineup: names in a list can change when players swap.
- Seat numbers: first seat is index 0, not index 1.
- School term record: `(Year 1, Term 2, 2026)` fits tuple because it is fixed.
- Roll call check: `"Ari" in team_names` returns true or false.

## Schedule
- 0-8 min: Hook (house points board)
- 8-18 min: Teach list index, tuple immutability
- 18-58 min: Coding mission
- 58-60 min: Exit check

## Coding Mission (40 min)
Build a "House Points Tracker Lite" that:
1. Stores team names and points in lists
2. Stores school term data in a tuple
3. Updates one selected team score by index
4. Uses conditionals to print current leader

## Objective Questions
1. What is the first list index?
2. Can tuple elements be reassigned?
3. What does len(["a", "b", "c"]) return?

## Reflective Prompts
1. Why choose tuple for fixed records?
2. How did you verify index updates were correct?
