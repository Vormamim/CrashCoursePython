# Python Crash Course (Python Adventure)

**[▶ Open the Interactive IDE](https://vormamim.github.io/CrashCoursePython/course-pack/student-pack/interactive/)** · [Course home](https://vormamim.github.io/CrashCoursePython/)

Learn beginner Python by building game mechanics. Ten story-driven lessons
take a student from simple console output through choices, data, and loops
— mission control, escape terminals, faction sorting, and multiverse
portals — entirely in the browser, no install required.

This is the free, standalone version of **Python Adventure**, part of the
Vormamim coding courses; the same lessons also run gated inside
`learn.vormamim.com`/`codeinfront.com.au`.

## What's here

Everything a student uses lives in one self-contained, client-side app:

```
course-pack/student-pack/interactive/
├── index.html     — the IDE page (no Jekyll layout, fills the viewport)
├── ide.css         — layout + theme (Dark/Light toggle)
├── ide.js          — Pyodide runtime, editor, lesson nav, all IDE logic
└── lessons.js      — all 10 lesson definitions (LESSONS array)
```

`index.html` at the repo root is the course home page, linking straight
into the IDE for each lesson.

### Interactive IDE features

- Real Python via [Pyodide](https://pyodide.org/) running entirely in the
  browser — no server, no install
- CodeMirror editor with Python syntax highlighting and line numbers
- A theory panel per lesson (concept explanations + a short quiz), plus a
  "What to do" / "Core idea" task intro above the starter code
- `input()` suspends on an in-page modal (not the browser's blocking
  `prompt()`, which used to freeze the tab)
- A wall-clock guard on `while`/`for` loops: a genuine infinite loop times
  out with a readable error instead of freezing the page; time spent
  waiting on a student's own `input()` answers never counts against it
- Save/Load via a zip download (raw `.py` downloads are blocked by some
  school networks), drag-resizable output panel, Run/Reset/Copy actions
- Per-lesson code and progress persisted in `localStorage`

### Adding or editing a lesson

1. Edit `course-pack/student-pack/interactive/lessons.js` — each entry in
   the `LESSONS` array has `id`, `title`, `goal`, `story`, `taskIntro`,
   `theory`, `quiz`, and `starterCode`.
2. Run `scripts/build_student_pages.sh` to regenerate `.pages-build/`
   (what GitHub Pages actually serves — never hand-edit it directly).
3. Commit both `course-pack/student-pack/` and `.pages-build/`, and push.

## Deployment

Pushing to `main` triggers `.github/workflows/publish-student-pack.yml`,
which builds `.pages-build/` with Jekyll and deploys it to GitHub Pages.
There's no separate build step to run locally beyond the script above —
just make sure `.pages-build/` is regenerated and committed before you
push.

## Older material

`course-pack/` also contains per-lesson folders (`lesson-01-mission-control`
etc.) and a `teacher-pack/`, both predating the interactive IDE above and
no longer linked from the live site — kept for reference, not maintained.
