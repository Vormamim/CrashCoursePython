# Gemini Prompting Playbook (Loops Unit)

Use this during Lessons 7-10.

## Classroom Rule
Gemini is a coach, not a code vending machine.
Students must show prompt history, edits they made, and test evidence.

## Prompt Framework (Use This Template)
1. Context: lesson + scenario
2. Constraint: exact Python topics allowed
3. Request: small step, not full solution
4. Output format: explanation + 1 code snippet + 1 test case

Prompt template:
"I am in Lesson X (loops). Scenario: ____. Use only beginner Python. Do not write full project. Explain one step, then give one short code snippet and one test input/output I can run."

## Weak vs Good Prompt Examples

Weak prompt:
- "Write the whole code for my maze game."
Why weak:
- Asks for full answer, no constraints, high cheating risk.

Good prompt:
- "I am building a Maze Runner terminal in Python. I need a `for` loop that prints checkpoint numbers 1-5. Explain how `range(1, 6)` works for beginners, then give only that loop plus expected output."
Why good:
- Specific, scoped, asks for explanation, not full project.

Weak prompt:
- "Fix my code."
Why weak:
- No code, no error, no context.

Good prompt:
- "Here is my loop code and error: `TypeError: can only concatenate str (not \"int\")`. Show what line to change and explain why." 
Why good:
- Includes error and targeted ask.

## Anti-Cheat Evidence Requirements
Students submit:
1. Final code
2. Two Gemini prompts used
3. One Gemini response snippet
4. One change they made after reviewing AI output
5. Two test runs (expected vs actual)

## Teacher Quick Check
Ask the student:
1. "Why did this loop stop?"
2. "What does this loop variable mean each cycle?"
3. "What test case proves your loop works?"
If they cannot explain, investigate originality.
