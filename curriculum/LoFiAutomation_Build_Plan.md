# lofiautomation — Build Plan (for a future session)

**Status:** not started. This is a planning document to pick up cold in a later session — nothing below has been built or spiked yet.

## 1. Scope caveat — verify before building

The Software Automation Year 12 focus area's exact content dot points were **not** reliably retrievable during this planning session (the NESA curriculum site renders content dynamically and general web search only surfaced high-level framing, not verbatim dot points). What's confirmed, from NSW DoE's own summary:

> "In software automation, learning to program machine learning and artificial intelligence... is completely new content. The Software Automation focus area provides opportunities for students to extend their knowledge and understanding of programming and its diverse applications, with learning in this focus area emphasising the fields of machine learning (ML) and artificial intelligence (AI)."

**First task next session:** open the actual syllabus content page (`curriculum.nsw.edu.au/learning-areas/tas/software-engineering-11-12-2022/content`, Year 12 → Software automation) directly in a browser (not fetched, since it's a JS-rendered page that didn't yield full content to automated fetching) and transcribe the real dot points before locking in a lesson sequence. Everything in §3 below is a reasonable draft based on what ML/AI-for-beginners-in-Python conventionally covers, not a verified syllabus mapping — treat it as a starting hypothesis, not a plan to build from unchecked.

## 2. Technical feasibility spike — do this before writing any lesson content

The single biggest risk: does Pyodide support `scikit-learn` (and its dependencies — `numpy`, `scipy`, `joblib`, `pandas`) well enough to run real ML code client-side, the same way the Flask spike validated `micropip.install('flask')` + `test_client()` before LoFiFlask was built?

Recommended spike, mirroring `lofiflask/spike/validate.mjs`:

```js
// spike/validate-sklearn.mjs — run with `node`, using the pyodide npm package
import { loadPyodide } from "pyodide";
const pyodide = await loadPyodide({ indexURL: ... });
await pyodide.loadPackage(["numpy", "scikit-learn"]); // or micropip.install if not a built-in package
await pyodide.runPythonAsync(`
import numpy as np
from sklearn.linear_model import LogisticRegression
X = np.array([[0],[1],[2],[3]])
y = np.array([0,0,1,1])
model = LogisticRegression().fit(X, y)
print(model.predict([[1.5]]))
`);
```

If this fails or is too slow/heavy for a browser tab (scikit-learn + numpy + scipy is a much larger download than Flask), fallback options to consider:
- A hand-rolled, dependency-free "toy" ML implementation in pure Python (e.g. a simple linear regression via gradient descent, a basic decision tree) — loses the "real scikit-learn" authenticity but guarantees it runs anywhere.
- `pandas` alone (lighter weight, well-supported in Pyodide) for a "data automation" framing that leans more on data wrangling/scripting than full ML, if scikit-learn proves impractical in-browser.

Do not commit to a 10-lesson architecture until this spike passes, exactly as the Flask spike (`lofiflask/spike/validate.mjs`, `smoke-test.mjs`) was done first and validated end-to-end before any lesson content was written.

## 3. Draft lesson sequence (hypothesis — confirm against §1 first)

Following the same house style as every other unit in this suite: relatable-analogy-first explanations, 10 lessons, worked example → challenge(s) → debugging checkpoint → exit ticket per lesson, self-marking checks in the sandbox (à la Secure Software Architecture's tiered grading), synthwave visual theme, cross-links back to Secure Software Architecture and LoFiFlask where relevant (e.g. data validation/security when handling a training dataset).

| # | Working title | Idea |
| ---: | --- | --- |
| 1 | What Is Automation? | Scripting vs "true" ML/AI — the distinction the syllabus draws; what a program that "learns" actually means |
| 2 | Data In, Decisions Out | Loading a small dataset (reusing Coastline Adventures data?), inspecting it, framing a prediction problem |
| 3 | Teaching a Program to Guess | A first, simple model (e.g. linear regression) — fit, predict, and why that's different from an `if`/`else` rule |
| 4 | Training and Testing | Splitting data into training/test sets; what "learning from data" actually measures |
| 5 | Classification | A classifier (e.g. logistic regression or decision tree) on a simple two-outcome problem |
| 6 | Measuring Success | Accuracy and its limits; a first honest look at a confusion matrix |
| 7 | When Models Get It Wrong | Overfitting, bias in training data — tying back to Secure Software Architecture's ethics/impact content |
| 8 | Automating a Real Task | A small end-to-end script: load data, train, predict, act on the result |
| 9 | Limits and Responsible Use | What ML/AI can't or shouldn't be trusted to do; cross-link to Secure Software Architecture L10 (ethics/impact) |
| 10 | Capstone | An open brief, same style as LoFiFlask L10 — apply the whole toolkit to a new small dataset |

## 4. Pre-build checklist for next session

- [ ] Read the actual NESA syllabus content page for Software automation; transcribe real dot points
- [ ] Confirm which Year 12 outcomes (SE-12-02, 03, 06, 08 assumed — confirm) this focus area primarily addresses
- [ ] Run the Pyodide + scikit-learn feasibility spike (§2); record load time and package size
- [ ] Decide fallback approach if scikit-learn is impractical in-browser
- [ ] Decide on a dataset — reuse Coastline Adventures (continuity with the rest of the suite) or introduce a new one better suited to ML framing
- [ ] Confirm repo name (`lofiautomation` assumed) and initialise it the same way `lofiflask` was: `git init`, spike folder first, IDE scaffold second, lesson content last
- [ ] Revise the 10-lesson draft above once real dot points are confirmed
- [ ] Add this unit to `HSC_Software_Engineering_Scope_and_Sequence.md` and `HSC_Software_Engineering_Program.md` once built, replacing the "planned" status
