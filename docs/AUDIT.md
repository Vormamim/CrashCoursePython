# CrashCoursePython v2: Phase 0 audit and plan

Status: **approved by Dean, 10 Nov 2026** (decisions in §8). Nothing committed or pushed.
Source audited: `Vormamim/CrashCoursePython` @ `9da1d86` (shallow clone, scratchpad only).
Style source: `online-course-house-style.md` (CodeInFront house style).

---

## 1. v1 inventory

### 1.1 What is live

| Item | Finding |
|---|---|
| Served folder | `.pages-build/` (built by Jekyll in `.github/workflows/publish-student-pack.yml` on push to `main`) |
| Source of truth | `course-pack/student-pack/` → copied to `.pages-build/` by `scripts/build_student_pages.sh` |
| Student app | `interactive/index.html` + `ide.js` (1226 lines) + `ide.css` (653) + `lessons.js` (760) |
| Lesson data | One JS array `LESSONS`: `id, title, goal, story, taskIntro{whatToDo, coreIdea}, theory[{heading, appliesTo, explanation, code}], quiz[{question, options, correctIndex}], starterCode` |
| Other pages | Landing `index.html`, per-lesson `guided-tutorial.md` / `student-worksheet.md` / `starter.py`, `shared/student-cheat-sheet.{md,html}`, `shared/gemini-prompting-quick-guide.{md,html}`, `jargon-glossary.md` |
| Assets | `crashCourse.png` (only image) |
| Teacher material (not live) | `course-pack/teacher-pack/`: lesson plans, teacher keys, `solution_tester.py`, `test-specs/lesson-01..06.json` (`input[]`, `expect_contains[]`, `timeout_sec`, constraint flags), objective question bank, reflection rubric, anti-cheat workflow |

### 1.2 Runtime

| Concern | v1 | v2 implication |
|---|---|---|
| Python | Pyodide **0.26.2** from jsDelivr, **main thread** | Move to worker; vendor core files only |
| Editor | CodeMirror **5.65.2** from cdnjs | Replace with vendored CM6 bundle |
| UI | Bootswatch Darkly/Flatly from jsDelivr | Drop; house-style CSS only |
| Zip | JSZip 3.10.1 from cdnjs | Vendor same version (reuse for dashboard ingest) |
| `input()` | In-page modal; code made async via AST rewrite (`_maybe_await`) | Reuse the *idea* in the worker (see §4 R2) |
| Infinite loops | Wall-clock guard injected into loops; excludes time waiting on `input()` | Replace with worker terminate + respawn; keep "input wait doesn't count" rule |
| Paste | >3-line paste triggers a wordless red pulse; not blocked, not logged | Block + log in D/E/F |
| Run/Reset/Copy/Load/Save | Run (Ctrl+Enter), Reset to starter, Copy to clipboard, Load `.py`/`.zip`, Save as zip (raw `.py` downloads blocked by school filter) | Keep Run/Reset. Drop Copy/Load in D–F. Evidence export replaces Save. **Keep zip-or-JSON fallback in mind: check `.json` downloads pass the school filter.** |
| Theory | Slide-out panel + 1–2 MCQs per lesson | MCQs and theory text feed Brief and Predict content |
| `localStorage` | `pyadv-theme`, progress map, theory-reviewed map, `ide-code-<lessonId>` (unguarded `JSON.parse`/`setItem`) | v2 uses `ccp2:` namespace, all in try/catch; no migration of v1 keys |
| Reporting | **None in this repo.** The "Lo-Fi-Py report" format lives in the separate LoFiPy project | Need a sample report from Dean (Q2) |
| Third-party calls | 4 CDN hosts at runtime | v2: zero |

### 1.3 Content to re-use

- Story, goal, `whatToDo`, `coreIdea` per lesson → `story.goal` / `story.background`.
- Theory code samples → seed material for Predict snippets.
- Quiz items → Predict "why" lines and distractor ideas.
- Starter code → Build skeletons (L1–3 blanks, L4–6 partial, L7–10 comments-only already matches the fading guide).
- `test-specs/lesson-01..06.json` → port to v2 test format (`inputs`, `expectStdoutContains`). L7–10 have no specs; write new.
- Cheat sheet: structure reusable; **content is stale** ("Course Rules: No loops").

## 2. Taught features per lesson (feeds `allowedFeatures`)

Derived from `lessons.js` theory + starter code, plus decision 1 (f-strings in L1). Cumulative: each row adds to the ones above.

| # | Title (v1) | Adds |
|---|---|---|
| 1 | Mission Control | `print` (commas), **f-strings** incl. `:.2f` *(new: v1 does not teach them yet)*, variables, `str/int/float/bool`, reassignment, `+ - * /` |
| 2 | Dialogue Engine | `input`, `int()`, `float()`, arithmetic precedence, `if/else`, `>=` |
| 3 | Choices & Consequences | `elif`, all comparisons, `and`, `or`, nested `if` |
| 4 | Data Without Loops | lists, tuples, `[i]`, `[-1]`, `len()` |
| 5 | Structured Logic | combine 1–4 (no new syntax) |
| 6 | Capstone Simulation | `not` |
| 7 | Loop Launch (for) | `for`, `range(a, b)`, `%` |
| 8 | Loop Control (while) | `while`, counter, `-=`/`+=` *(v1 L8 is a countdown only; see gap G3)* |
| 9 | Loop Patterns (mixed) | while-input validation, for + while in one program |
| 10 | Loop Capstone | nested loops, `.strip()`, `.lower()`, `break` |

Not taught anywhere (never in Bot/Build/Belt): `def`, dicts, `.append`, files, `//`, `round()` beyond a cheat-sheet note, string slicing, `import`.

## 3. Gaps vs brief

| # | Gap | Proposal |
|---|---|---|
| G1 | f-strings not in v1 L1 | Rewrite L1 Brief/Predict/Build to teach `f"{x}"` and `f"{x:.2f}"`; keep commas as a Predict item |
| G2 | `%` appears in L7 only via theory | Fine; L7 belt is exactly this |
| G3 | **L8 belt focus (secret word, attempt limit, `.lower()`) isn't taught in v1 L8**; `.lower()` first appears in L10 | Extend L8 story: countdown → "access terminal" (secret word, 3 tries, `.lower()`). Moves `.lower()` to L8 |
| G4 | `.strip()` only in L10 | Allowed from L10 only; harness normalises whitespace anyway |
| G5 | No "Bot" character | New; orange-accented card, recurring from L1 |
| G6 | Lesson titles differ slightly from brief §14 | Keep v1 titles (they're what students know) |
| G7 | No test specs for L7–10 | Write in Phase 1 (L7–8) and Phase 2 (L9–10) |
| G8 | Gemini guide is a primary resource | Retire to `/v1/`; L10 reframed per brief §13 |
| G9 | Lo-Fi-Py report format not in repo | Need sample (Q2) |

## 4. Risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | **Pyodide size**: core ≈ 10–12 MB (`pyodide.asm.wasm`, `python_stdlib.zip`, `pyodide.js`, `pyodide.mjs`, `pyodide-lock.json`). Full dist is far larger | Vendor core only, no packages. SW precaches it after first load. Pin to 0.26.x (v1-proven) |
| R0 | Target devices | **Chromebooks dropped** (Dean, 10 Nov). Targets: Windows laptops on current Chrome/Edge; iPad Safari degrades gracefully (B–D) |
| R2 | **Sync `input()` in a worker** needs SharedArrayBuffer → needs COOP/COEP headers, which GitHub Pages can't set | Use the v1-proven async rewrite (`input()` → `await` a `postMessage` round-trip). No SAB needed. Test mode uses a scripted list, so it never waits |
| R3 | **Respawn cost** after a timeout: Pyodide init 1–4 s on older school laptops | Keep a pre-warmed standby worker; swap on kill. Timer pauses while waiting on `input()` |
| R4 | CM6 is many ESM packages; "no build step to run" | One-off esbuild bundle in dev tooling, committed to `app/vendor/codemirror/`. Runtime needs no build |
| R5 | **Session codes stored only in dashboard `localStorage`**: another browser/device loses them, and any belt from that day gets flagged | Derive codes: `code = base32(SHA-256(teacherPassphrase + date))[:4]`. Dashboard validates any date without a stored list. Passphrase is typed by Dean, never in source. Also add settings export/import |
| R6 | Checksum and unlock codes are only tamper-evident; the JS is readable | State this in `teacher/guide.html`. Real integrity = regrade + session code + supervision + viva |
| R7 | Name typos change the seed | Dashboard regenerates from the stored seed, recomputes the expected seed from the name and flags a mismatch. Name normalised identically in app and dashboard (shared module) |
| R8 | iPad Safari: CM6 paste blocking and focus events behave differently; Parsons drag | Pointer events + keyboard Parsons; B–D must work; E/F may show "Use a laptop for belts" |
| R9 | School filter may block `.json` or `.wasm` downloads/requests | Dean tests on a student Windows laptop after Phase 1 step 1 |
| R10 | Jekyll build on GH Pages | Jekyll copies files without front matter unchanged, so v2 works inside the current workflow. Avoid `_`-prefixed paths. Confirm `.wasm` MIME on Pages |
| R11 | House-palette contrast | Measured: `--text-faint` is **2.9–3.1:1** (fails AA for text) and `--border` is **1.5:1** (fails 3:1 for control outlines). See §5.2 |

## 5. UX and CSS plan (house style applied)

### 5.1 Principles mapped to the app

| House style | v2 application |
|---|---|
| Learning before decoration | One stage on screen at a time; the stage rail shows where you are and what's next |
| Show, then let students try | Stage order itself: Brief → Predict → Parsons → Bot → Build |
| Keep the student in the loop | Predict before Run; hints are progressive; no solutions revealed |
| Be reassuring | "Check" chips, "Try again" never "Fail"; belt fail → "Back to training" |
| Action-led sentence-case buttons | **Run code**, **Check answer**, **Continue**, **Start belt check**, **Export evidence** (same label everywhere) |
| Colour never alone | Every status = icon + text label + colour |

### 5.2 Tokens

House tokens as published, plus additions (values to be verified for AA in Phase 1):

```css
:root {
  color-scheme: dark;
  /* house tokens: unchanged */
  --bg:#0A0E13; --panel:#121821; --panel-alt:#1A222C; --border:#26323D;
  --text:#E7EEF4; --text-dim:#8496A6; --text-faint:#54636F;
  --net:#4FD1C5; --net-dim:#1E4A47; --host:#F2A65A; --blue:#5B9BF2;
  --violet:#B98CF2; --green:#8FD17A; --danger:#E4626F;
  --display:"Space Grotesk", system-ui, sans-serif;
  --mono:"IBM Plex Mono", ui-monospace, monospace;

  /* additions */
  --border-strong:#5E6E7C;   /* control outlines, ≥3:1 on --panel (fixes R11) */
  --focus:var(--net);        /* 2px outline, 2px offset, every control */
  --stage-predict:var(--blue);
  --stage-parsons:var(--violet);
  --stage-bot:var(--host);    /* The Bot is always orange */
  --stage-build:var(--net);
  --stage-belt:var(--green);
  --measure:68ch;             /* lesson prose */
  --radius:8px;
}
```

Light theme (house style has none; these keep the same hue roles, darkened for AA on white). Measured contrast on `--bg` / `--panel` / `--panel-alt`:

```css
:root[data-theme="light"] {
  color-scheme: light;
  --bg:#F6F8FA; --panel:#FFFFFF; --panel-alt:#EEF2F5;
  --border:#D5DDE3; --border-strong:#7A8894;   /* 3.2–3.6:1 */
  --text:#0F1720;      /* 16.0–18.1:1 */
  --text-dim:#4A5865;  /* 6.5–7.3:1 */
  --text-faint:#7A8894;/* decorative only */
  --net:#0F766E;       /* 4.9–5.5:1 */
  --net-dim:#D3F1EE;   /* --text on it 15.1:1 */
  --host:#A14A07;      /* 5.3–6.0:1 */
  --blue:#1D5FBF;      /* 5.4–6.1:1 */
  --violet:#6D3FC0;    /* 6.0–6.7:1 */
  --green:#2A7330;     /* 5.2–5.8:1 */
  --danger:#B42335;    /* 5.8–6.5:1 */
}
```

Theme mechanics:
- Default follows `prefers-color-scheme`; a **Theme** toggle in the top bar (app and dashboard) sets `data-theme` on `<html>` and saves `ccp2:theme`.
- An inline script in `<head>` sets `data-theme` before first paint, so there's no flash.
- CM6 theme lives in a Compartment and swaps with the page; syntax colours come from the same tokens.
- Dark `--border-strong` #5E6E7C measured 3.4:1 on `--panel`, 3.7:1 on `--bg`.

Rules: `--text-faint` only for decorative/duplicated info. Belt colours (`belts.json`) render as a chip with a `--border-strong` outline + belt name, so White and Black belts both read on dark.

Fonts: Space Grotesk + IBM Plex Mono **vendored as woff2** (OFL), `font-display: swap`; no Google Fonts call (brief §3 overrides the house style's web-font source).

Print styles always use the light tokens.

### 5.3 Student app layout (`/app/?lesson=lesson-07`)

```
┌ top bar ─────────────────────────────────────────────────────────┐
│ LESSON 7 · Loop Launch   Ivy Piru · 8TAS3   [Cheat sheet] [Theme] [Export evidence] │
├ stage rail ──────────────────────────────────────────────────────┤
│ ✓ Brief  ✓ Predict  ● Parsons  🔒 Catch the Bot  🔒 Build  🔒 Belt │
├──────────────────────────────┬───────────────────────────────────┤
│ STAGE C · PARSONS            │ workspace (editor / blocks)       │
│ Task, expected result,       │                                   │
│ constraints (≤ 68ch)         │ ─ output ──────────────────────── │
│ Hint 1 ▸ Hint 2 ▸            │ labelled "Output" / "Error"       │
│ [Check answer]               │                                   │
└──────────────────────────────┴───────────────────────────────────┘
```

- ≤ 900px: columns stack (task above workspace). No horizontal page scroll; code scrolls inside its block.
- Stage rail: `<ol>` with `aria-current="step"`; locked stages are buttons with `aria-disabled` and a "Finish Parsons first" tooltip.
- Predict: snippet (read-only CM6), labelled textarea "Your predicted output", Run disabled until submitted, then a side-by-side Expected / Yours diff with the one-line "why".
- Parsons: two lists (Blocks, Your program). Keyboard: Space pick up/drop, ↑/↓ move, Tab/Shift-Tab indent; live region announces moves. Indent shown as visible guides, not just spacing.
- Catch the Bot: a "The Bot says" speech card (orange left border, confident copy), then the editor. Feedback: "2 of 3 checks pass. Look at how the loop ends." Never shows test inputs.
- Paste blocked: inline neutral notice, "Paste is off in this stage. Type it out; it helps it stick." Logged.
- Belt check: distinct frame (green top border, reduced chrome): session-code entry, rules list (time, paste off, cheat sheet allowed) **before** start, timer as text `07:42 left` + bar, `aria-live` at 5 and 1 minute. Results: per-item ✓/✗ + overall "Belt passed" / "Not yet: back to training".
- Errors: friendly decoder line above the raw traceback ("You might be missing a `:` at the end of line 3").
- `prefers-reduced-motion`: no transitions; no state conveyed by animation.

### 5.4 Teacher dashboard (`/teacher/`)

- Wider max-width (~1400px), panels for Session / Ingest / Grid / Detail.
- Session code: huge Space Grotesk, "Project" button → full-screen light view.
- Grid: sticky name column; cell = belt glyph (✓ / ✗ / ·) + 5-segment mini stage bar using stage colours, plus text in `title`/`aria-label`. Grade column. "Check" chip = orange outline + text, reason on hover **and** focus.
- Replay: range slider over snapshots, code pane, timeline markers for paste/focus/run.
- Print CSS for resit list and CSV-equivalent table.

## 6. Final file layout (changes from brief §5)

```
/                        v2 landing (house-style course landing pattern)
/v1/                     current .pages-build moved unchanged at cut-over
/app/  index.html, css/app.css, js/… (as brief), content/, vendor/{pyodide,codemirror,jszip,fonts}/
/shared/
  js/rng.js  js/seed.js  js/names.js  js/match.js  templates/belt-XX.js  py/harness.py
  css/tokens.css         shared by app, teacher, cheat sheet
  cheat-sheet.html
/teacher/ index.html, js/…, guide.html
/sw.js                   at root so it can cache /app, /teacher, /shared
/tests/  /tools/build-cm6.mjs  CHANGELOG.md  docs/AUDIT.md
```

Changes: the shared modules move from `app/js` to `/shared/` so both pages import the **same file** by path (brief §5 requirement). `names.js` holds name normalisation (R7). `match.js` holds the five matching modes (used by worker results in both pages). `sw.js` at root for scope.

Deployment: v2 lives in `.pages-build/` (the folder Pages serves). At cut-over, current `.pages-build/*` → `.pages-build/v1/`. Workflow unchanged.

### Schema adjustments

- `belt`: add `cheatSheet: true`, `allowRun: true`.
- `bot[]`: add `fixedLinesHint` (optional) for the comment heuristic; `explanation` (L10: the Bot's wrong explanation item).
- `build[]`: add `hints[]` (progressive).
- Evidence: add `app.seedAlgo: "sha256-u32/1"`, `belt.attempts[].itemsHash` (hash of generated items, catches template-version drift); `student.nameNormalised`.
- Session codes: `sessionCodeAlgo: "derived/1"` (R5).

## 7. Phase plan and estimates

Estimates are focused build sessions with Claude Code (≈ half a day each, including Dean's review of each step).

### Phase 1: engine + pilot (L7, L8), ~10 sessions, branch `v2/phase-1`

1. Scaffold, tokens (light + dark + toggle), fonts, vendor Pyodide/CM6/JSZip, SW skeleton. **Dean: school-laptop smoke test (R9).**
2. Worker: run, scripted inputs, async `input()`, 3 s timeout, standby respawn. Harness + match modes + tests.
3. CM6 editor + logging (paste/drop block, keys/10 s, focus, snapshots with diffs).
4. Stage ladder shell, state.js, Brief + Predict.
5. Parsons (pointer + keyboard).
6. Catch the Bot + Build + comment heuristic.
7. Seed/RNG/templates `belt-07`, `belt-08` (≥ 6 variants, neighbour test) + belt UI.
8. Evidence export/import, checksum, readable `.txt` report.
9. Dashboard: session codes, ingest (json/zip, dedupe), regrade pool, grid, flags.
10. Student detail + replay, fixtures, acceptance run-through (§16), CHANGELOG, report.

### Phase 2: content rollout, ~8 sessions
L1–6, 9, 10 content + templates (≈ 1 session per 1.5 lessons), viva, resit, CSV + grade, unlock codes, cheat sheet, Bot strand, landing.

### Phase 3: polish, ~4 sessions
Accessibility audit + fixes (both themes), iPad fallback, `teacher/guide.html`, print styles.

## 8. Decisions (Dean, 10 Nov 2026)

| # | Decision |
|---|---|
| 1 | Work in `PythonBeginnersNeo/repo/` (clone of `Vormamim/CrashCoursePython`), branch `v2/phase-1` |
| 2 | Dean supplies a Lo-Fi-Py `.txt` report sample (needed by Phase 1 step 8) |
| 3 | Extend L8 with secret word + attempt limit + `.lower()`; `.lower()` allowed from L8 |
| 4 | Session codes derived from teacher passphrase + date |
| 5 | Dean tests `.json` download and `.wasm` load on a student Windows laptop after step 1 |
| 6 | **Light and dark themes**, toggle in app and dashboard (§5.2) |
| 7 | **Chromebooks are not a target** |
