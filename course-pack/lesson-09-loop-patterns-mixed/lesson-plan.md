# Lesson 9: Loop Patterns (Mixed `for` + `while`)

## Duration
- 60 minutes total
- 40 minutes coding

## Learning Goals
- Choose between `for` and `while`
- Build input validation with loops
- Use nested repetition carefully
- Prompt Gemini for reasoning and tests, not final solutions

## Scenario Brief (Explicit)
Theme: Divergent faction trial queue.
Students process 5 trainees (`for`) and retry invalid score input (`while`).

Required elements:
- One `for` loop for fixed number of trainees
- One `while` loop for score validation (0-100)
- Final count of eligible trainees

## End-of-Lesson Deliverable (Measurable)
1. Uses both `for` and `while`
2. Rejects invalid score entries until valid
3. Counts eligible trainees correctly
4. Student provides one strong test-focused Gemini prompt

## Good vs Weak Gemini Prompts
Weak:
- "Write this whole trial app with loops"
Good:
- "I need only the validation loop: keep asking for score until it is 0-100. Explain the condition and show 2 test cases."

## Schedule
- 0-10 min: choosing loop types
- 10-20 min: guided tutorial
- 20-55 min: worksheet coding
- 55-60 min: exit check
