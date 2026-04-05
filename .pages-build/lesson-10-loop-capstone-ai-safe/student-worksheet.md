---
layout: default
---

# Student Worksheet: Lesson 10 Loop Capstone + AI Safety

## YA Theme Context
This capstone is inspired by multiverse YA missions where control teams run repeated portal cycles.
You are coding the command console that decides whether each cycle opens or holds.
Your loops model repeated operations and safety checks in a high-stakes world.

## Theory
- `for` is best for fixed repeats.
- `while` is best for validation retries.
- Good prompts ask for one step and explanation.

## Scenario Brief (Explicit)
You are controlling 6 portal cycles.

Required outcome:
- Ask `open` or `hold` command each cycle
- Re-prompt invalid commands
- Print final totals for open and hold

## Good vs Weak Gemini Prompts
Weak:
- "Write the whole capstone"
Good:
- "Help only with validating open/hold command using a `while` loop. Explain each line and give one test case."

## Deliverable (Measurable)
1. One `for` loop for 6 cycles
2. One `while` validation loop
3. Two counters updated correctly
4. Final summary output
5. Prompt evidence:
- 2 strong prompts
- 1 weak prompt rewritten
- 3 test cases with expected vs actual

## Scaffolded Task
1. Create counters.
2. Build 6-cycle `for` loop.
3. Ask command each cycle.
4. Validate with `while`.
5. Update counters via `if/else`.
6. Print final summary.

## Reflection
- How did you prove your loop logic works?
- Which prompt made the biggest improvement and why?
