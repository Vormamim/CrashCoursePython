# Lesson 3: Choices and Consequences (Faction Sorter)

## Duration
- 60 minutes total
- 40 minutes coding

## Learning Goals
- Use if, elif, else correctly
- Build conditions with comparison operators
- Combine conditions with and/or/not
- Use nested conditionals in one branch

## Scenario Brief (Explicit)
You are coding a faction placement machine for a leadership academy.
Students input two aptitude scores and the machine assigns one final faction.

Required scenario inputs:
- Bravery score (0-100)
- Logic score (0-100)

Required scenario logic:
- High bravery and high logic -> Command
- Bravery only high -> Frontline
- Logic only high -> Scholar
- Otherwise -> Support
- Nested elite upgrade for very high dual scores

## End-of-Lesson Deliverable (Measurable)
Each student submits a program that:
1. Accepts and converts 2 numeric inputs
2. Uses an `if/elif/else` chain with at least 4 outcomes
3. Includes one nested `if` elite branch
4. Prints exactly one final assignment label
5. Demonstrates one test case per branch

## Theory (Clear and Relatable)
- `if` runs code when a condition is true.
- `elif` checks the next condition only if earlier ones failed.
- `else` catches all remaining cases.
- `Nested if` is a second decision inside a branch for special cases.

### Relatable Examples
- School club access: if grade is high enough, then check behavior score.
- Game rank rules: if score is 90+ give gold, elif 70+ give silver, else bronze.
- Safety check: allow mission only when `has_id and has_clearance` is true.

## Schedule
- 0-8 min: Hook (faction test result reveal)
- 8-18 min: Teach condition logic patterns
- 18-58 min: Coding mission
- 58-60 min: Exit check

## Coding Mission (40 min)
Build a "Faction Placement Simulator" that:
1. Reads bravery and logic scores
2. Uses condition chains to assign a faction
3. Includes one nested if for rare case handling

## Objective Questions
1. What is 7 > 4 and 2 > 5?
2. When does elif run?
3. Write condition for score between 70 and 89.

## Reflective Prompts
1. Which branch was hardest to test and why?
2. How did you check fairness in your logic?
