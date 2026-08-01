# HSC Software Engineering — Program: Units Built So Far

A teaching-program-style record of every unit built in the Vormamim "LoFi" suite to date, each lesson mapped to Year 12 outcomes (see `HSC_Software_Engineering_Scope_and_Sequence.md` for the full outcome text) and its syllabus content. Use this alongside that document, not instead of it.

---

## Focus area: Secure software architecture — `HSC-Secure-Software-Architecture`

Already fully mapped in that repo's own `Curriculum-Mapping-and-Lesson-Sequence.md` — reproduced here in condensed form so it's visible alongside the other units without needing to open a second repo.

| # | Lesson | Outcomes | Content covered |
| ---: | --- | --- | --- |
| 1 | Why Secure Software? | SE-12-01, 07 | Benefits of secure software; the 8-stage secure SDLC |
| 2 | Designing for Real Users & the CIA Triad | SE-12-01, 02, 07 | End-user-influenced secure design; Confidentiality/Integrity/Availability |
| 3 | Authentication, Authorisation & Accountability | SE-12-02, 07, 08 | AAA model; salted password hashing; authorisation/accountability logs |
| 4 | Security Features & Regulatory Compliance | SE-12-04, 05 | Data protection, privacy, regulatory compliance in code |
| 5 | Security by Design: Cryptography & Sandboxing | SE-12-02, 04, 07 | "Security by design"; ciphers vs hashing; sandboxing |
| 6 | Privacy by Design | SE-12-04, 05 | Privacy-by-design principles; data minimisation |
| 7 | Testing, Hardening & Security Assurance | SE-12-06, 08 | Vulnerabilities/hardening/breaches; code review, SAST, DAST, pen testing |
| 8 | Defensive Coding I — Input Handling & Safe APIs | SE-12-02, 07, 08 | Validation vs sanitisation vs error handling; safe API design |
| 9 | Defensive Coding II — Execution, Session & User-Action Vulnerabilities | SE-12-02, 03, 07 | Memory/session/exception management; broken auth/session bugs; race conditions; XSS/CSRF |
| 10 | Impact: Collaboration, Enterprise Value, Ethics & Law | SE-12-05, 06 | Collaboration benefits; enterprise value; social/ethical/legal issues |

All 17 syllabus content dot points for this focus area are covered (per that repo's own mapping doc) — cross-referenced in nine places to `LoFiFlask`, so students see the theory running for real.

---

## Focus area: Programming for the web — `LoFiFlask`

| # | Lesson | Outcomes | Content covered |
| ---: | --- | --- | --- |
| 1 | From Sandbox to Web App | SE-12-02, 06 | Client/server model; the HTTP request/response cycle |
| 2 | Your First Route | SE-12-02, 08 | Server-side web programming; routes, paths, HTTP status codes (404) |
| 3 | Templates & Jinja2 | SE-12-02 | Separating server-side logic from client-side presentation |
| 4 | Showing Database Data | SE-12-02, 04 | Interfacing with an SQL database from server-side code |
| 5 | Forms & User Input | SE-12-02, 04, 07 | Client-side forms; GET vs POST; defensive data input handling (cross-linked to Secure Software Architecture L8/L9) |
| 6 | Building the Admin Table | SE-12-02, 04, 07 | Database design; salted password hashing (cross-linked to Secure Software Architecture L3) |
| 7 | Building a Login Page | SE-12-02, 07 | Authentication; session management (cross-linked to Secure Software Architecture L3) |
| 8 | Protecting Pages | SE-12-02, 07, 08 | Authorisation; mitigating broken authentication/session management (cross-linked to Secure Software Architecture L9) |
| 9 | Navigation & Multi-page Sites | SE-12-02, 06 | Client-side site structure; template inheritance |
| 10 | Search, Select & Manage (capstone) | SE-12-02, 06, 07, 08, 09 | Full client/server/database integration; an open brief in the style of SE-12-09's project-management outcome |

**Known content gap** (see the scope and sequence doc, §5): W3C/WAI accessibility, internationalisation, and PWA content (service workers, manifest files) are named in the syllabus for this focus area and are not currently addressed by any lesson above.

---

## Prerequisite pathway (not Year 12 content, not outcome-mapped)

| Resource | Stage | Role |
| --- | --- | --- |
| `CrashCoursePython` | 4/5/6 (flexible) | Python fundamentals — the direct prerequisite LoFiPySQL and the wider suite assume |
| `LoFiWeb Tutorial` | 5 (ages 14–15) | HTML/CSS/JS fundamentals, 4×10 lessons + practical exam; bridges to CrashCoursePython on completion |
| `LoFiPySQL` | Bridge, pre-suite | Python + SQL together; the direct prerequisite `LoFiFlask` builds on |

These three are intentionally excluded from the outcomes tables above — they exist to level the playing field before a student reaches the actual Year 12 suite, not to satisfy any SE-12 outcome themselves.
