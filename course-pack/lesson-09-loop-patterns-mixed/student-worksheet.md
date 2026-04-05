# Student Worksheet: Lesson 9 Loop Patterns (Mixed)

## YA Theme Context
This lesson is inspired by YA academy trials where many recruits are processed in sequence.
You are coding the trial queue system that validates scores and tracks pass counts.
Your loops model repeated trainee processing and repeated input correction.

## Theory
- Use `for` when repeats are known.
- Use `while` when condition decides repeats.
- Validation loops protect program quality.

## Scenario Brief (Explicit)
You are processing a faction trial queue.

Required outcome:
- Process 5 trainees
- Validate score input until 0-100
- Count how many trainees score 70+

## Good vs Weak Gemini Prompts
Weak:
- "Write all my loop code"
Good:
- "Show only a beginner validation `while` loop for score 0-100 with two test examples."

## Deliverable (Measurable)
1. Uses one `for` loop and one `while` loop
2. Re-prompts on invalid scores
3. Computes final eligible count
4. Includes one improved prompt + short rationale

## Scaffolded Task
1. Create `eligible_count` variable.
2. Write `for` loop for 5 trainees.
3. Collect score input.
4. Add `while` validation loop.
5. Count eligible trainees.
6. Print final total.

## Reflection
- Why is `while` useful for validation?
- How did your improved prompt reduce AI over-help?
