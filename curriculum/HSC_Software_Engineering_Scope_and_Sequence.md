# HSC Software Engineering (Year 12) — Scope and Sequence

**Syllabus:** Software Engineering 11–12 Syllabus (NESA, 2022)
**Scope of this document:** Year 12 only, across its four focus areas. Year 11 (Programming fundamentals, The object-oriented paradigm, Programming mechatronics) is out of scope for the Vormamim "LoFi" suite and is not addressed here.

## 1. Year 12 outcomes

A student:

| Code | Outcome |
| --- | --- |
| SE-12-01 | justifies methods used to plan, develop and engineer software solutions |
| SE-12-02 | applies structural elements to develop programming code |
| SE-12-03 | analyses how current hardware, software and emerging technologies influence the development of software engineering solutions |
| SE-12-04 | evaluates practices to safely and securely collect, use and store data |
| SE-12-05 | explains the social, ethical and legal implications of software engineering on the individual, society and the environment |
| SE-12-06 | justifies the selection and use of tools and resources to design, develop, manage and evaluate software |
| SE-12-07 | designs, develops and implements safe and secure programming solutions |
| SE-12-08 | tests and evaluates language structures to refine code |
| SE-12-09 | applies methods to manage and document the development of a software project |

## 2. The four Year 12 focus areas

NESA's own course overview lists them in this order:

1. **Secure software architecture**
2. **Programming for the web**
3. **Software automation**
4. **Software Engineering project**

## 3. Recommended teaching sequence and rationale

| Order | Focus area | Built resource | Indicative outcomes emphasis | Why here |
| --- | --- | --- | --- | --- |
| 1 | Secure software architecture | `HSC-Secure-Software-Architecture` (built) | SE-12-01, 02, 04, 05, 06, 07, 08 | Theory-heavy (52:48 theory:practical) and largely self-contained — no web server or database context required. A strong opener: establishes the security vocabulary (AAA, CIA, hashing, defensive coding) that the next focus area then puts into a running, visible context. |
| 2 | Programming for the web | `LoFiFlask` (built) | SE-12-02, 04, 06, 07, 08 (SE-12-09 partially, via its capstone) | Hands-on Flask/HTML/SQL work. Deliberately cross-linked back to Secure Software Architecture at nine points (password hashing, sessions, broken auth, XSS/CSRF, input validation) so security theory already covered gets a concrete "see it running" counterpart. |
| 3 | Software automation | `lofiautomation` (planned — see the companion build plan) | SE-12-02, 03, 06, 08 (see caveats in the build plan; exact dot points not yet verified) | Extends programming into ML/AI territory. Best placed after the student already has solid Python fundamentals and has seen a full application built (LoFiFlask) — automation work reuses that same "read data, process it, act on it" shape. |
| Throughout, not sequenced last | Software Engineering project | No dedicated site — the student's own project work | SE-12-01, 05, 06, 09 primarily | NESA doesn't intend this as a fourth content block bolted on at the end — it's the vehicle for applying and documenting everything else. In practice: milestones are set alongside focus areas 1–3, with the student's own project scaffolded by whichever skills they've most recently built. |

## 4. Entry point and prerequisite pathway (outside the HSC suite proper)

The HSC suite above (focus areas 1–3) is designed to work as a standalone entry point for Year 11/12 — it does **not** assume a student has completed any Stage 4/5 elective, since not all incoming students have. Two separate, optional feeder resources exist for students who need to shore up fundamentals first:

- **CrashCoursePython** (Stage 4/5/6, flexible depth) — Python fundamentals: variables, input/output, conditionals, data structures without loops, loops. This is the exact prerequisite LoFiPySQL and the wider suite assume ("already know variables, `input()`/`print()`, conditions and loops").
- **LoFiWeb Tutorial** (Stage 5, ages 14–15) — HTML/CSS/JS fundamentals via 4 sub-courses of 10 lessons, ending in a practical exam. General programming concepts (variables, loops, conditionals, arrays, functions) are taught here too, via JavaScript — a bridge note points graduates toward CrashCoursePython next, to make the JS→Python vocabulary switch easier.
- **LoFiPySQL** — Python + SQL together; assumes CrashCoursePython-level fundamentals, not itself a Year 12 syllabus resource, but the direct prerequisite `LoFiFlask` builds on.

None of these three are assessed against Year 12 content — they exist so that whichever door a student enters the HSC suite through (via Stage 5 electives, or only Stage 4/micro:bit exposure), they arrive at focus area 1 with comparable footing.

## 5. Known gaps against the full syllabus (honest accounting)

- **Programming for the web**: LoFiFlask covers client/server-side HTML/Flask/SQL thoroughly, but does not currently address the W3C's role (including the Web Accessibility Initiative), internationalisation, or Progressive Web Apps (service workers, manifest files) — all named in the syllabus's own content for this focus area. Not yet built into any resource in this suite.
- **Software automation**: not yet built at all. See the companion build plan for what's known versus what still needs verifying against the syllabus text directly before building `lofiautomation`.
- **Year 11 content** (Programming fundamentals, OOP, Programming mechatronics): out of scope for this suite by design — noted here so it isn't mistaken for an oversight.
