# Student Worksheet: Lesson 4

## Instructions
Follow the worksheet steps in order and complete each task using the required variables, inputs, and outputs.

## Theory (What You Need to Know)
- A list stores values in order and can be edited.
- Index positions start at `0`.
- A tuple stores fixed values that should not change.
- `len()` counts items in a sequence.

## Metalanguage (Key Terms + Examples)
- `list`: Ordered, changeable collection.
Example: `team_names = ["Falcon", "Wolf", "Stag", "Raven"]`
- `element`: One item in a list or tuple.
Example: `"Falcon"` is an element.
- `index`: Position of an element (starts at 0).
Example: `team_names[0]` gives first team.
- `index assignment`: Replacing a list item at a position.
Example: `team_points[1] = team_points[1] + 5`
- `tuple`: Ordered collection that should remain unchanged.
Example: `term_info = ("Year 1", "Term 2", 2026)`
- `sequence`: Any ordered data type (like list, tuple, string).
Example: both lists and tuples are sequences.
- `membership test`: Checks whether a value exists in a sequence.
Example: `"Falcon" in team_names`

## Relatable Examples
- Team lineup list can change after substitutions.
- Seat map starts at index 0 for the first seat.
- School term info fits a tuple because it is fixed.

## Scenario Brief (Explicit)
You are maintaining a school house championship scoreboard without loops.

Required scenario data:
- `team_names` list with 4 names
- `team_points` list with 4 matching scores
- `term_info` tuple with fixed term data

Required scenario event:
- Increase one team score using index reassignment.

Required scenario output:
- Print updated names and points
- Print team count with `len()`
- Print current leader using conditionals

## Deliverable (Measurable)
You are successful when your program:
1. Creates both required lists and one tuple
2. Updates one team score by index
3. Uses `if/else` to choose a leader
4. Prints term info and team count
5. Runs without loops and without errors

## Mission
Track points for four teams without using loops.

## Scaffolded Task (Do in Order)
1. Build your data structures.
- Create `team_names` list with four team names.
- Create `team_points` list with four matching scores.
2. Update by index.
- Increase one team score using index reassignment.
3. Add fixed record.
- Create `term_info` tuple with year, term, and class code.
4. Decide leader without loops.
- Compare selected point values with `if/else`.
- Assign a `leader` variable from `team_names`.
5. Print report.
- Print names, points, tuple info, team count using `len()`, and leader.
6. Quick self-check.
- Confirm team names and points still align by index.

## Success Criteria
- Uses at least one list update by index
- Uses one tuple for fixed data
- Uses len() once
- Uses conditionals to select leader

## Objective Check
1. Index of second element in a list:
2. Can you change tuple[0]?
3. What does "Falcon" in team_names check?

## Reflection
Write 3-5 sentences:
- Which index mistake is easiest to make here?
- How did you test and confirm your fix?
