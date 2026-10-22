# Guided Diagnosis Implementation Plan

> For agentic workers: execute inline using executing-plans, with the approved design. No commits or deployment in this implementation stage.

**Goal:** Three local questions lead to a relevant demonstration and an editable briefing.
**Architecture:** A pure briefing/merge module, one Svelte wizard and the existing workspace/controller/contact form. Contact owns the decision to append; user text remains independent of translated labels.
**Tech Stack:** Svelte 5, existing CSS tokens, Node assertions and Playwright browser checks.

### Task 1: Briefing rules

- [x] Add `src/diagnosis.js`: `buildBriefing(topic,current,goal,labels)` formats only provided values. `mergeBriefing(current,briefing)` returns `{status,message}` with `empty`, `duplicate`, `overflow` or `added`, enforcing 2000 characters.
- [x] Add `scripts/verify-diagnosis-rules.cjs`, first failing on missing module, then check empty input, exact duplicate, preserved existing message, boundary 2000/2001 and literal HTML.
- [x] Execute `node scripts/verify-diagnosis-rules.cjs`, expect PASS.

### Task 2: Guided experience

- [x] Create `src/content/diagnosis.js` for authored PT/EN/ES questions, options, explanations and feedback.
- [x] Create `src/components/GuidedDiagnosis.svelte` with steps 0–3, explicit next/back, native radio group, optional 600-character fields and editable result.
- [x] Selection maps directly to existing service index. Result text changes only after completing questions; editing or changing locale never silently replaces a manual briefing.
- [x] Copy uses navigator.clipboard with fallback textarea focus/select. Restart uses inline confirm/cancel, focuses the new heading, preserves data when canceled.
- [x] Create `src/styles/diagnosis.css` using current window colors, Archivo, 44px controls, left-aligned question and choices. Reference current contact/window surfaces, approved spec and local UX guidance. Single column, bounded line length, no new visual theme.

### Task 3: Workspace and contact integration

- [x] Register diagnosis window, translated command aliases and terminal suggestion in `src/workspace.js` and `src/locales.js`.
- [x] Controller opens the existing service on explicit demo click. Contact callback calls an exported `receiveBriefing(briefing,topic)` on its mounted ContactForm instance.
- [x] Contact form stores pending briefing separately. If message exists, render explicit append/keep actions; apply the pure merge policy and focus feedback. Do not replace name/message, duplicate an included brief or exceed maxlength.
- [x] Add diagnosis stylesheet to `index.html`. No extra navbar, persistence, backend or network requests.

### Task 4: Validate and review

- [x] Add `scripts/verify-guided-diagnosis.cjs`: all four recommendations, optional blanks, navigation, restart cancel/confirm, preserved custom result, clipboard fallback, explicit append/keep/overflow, service routing and reload reset.
- [x] Browser matrix: desktop, tablet, 320×568 and 844×390, PT/EN/ES and both themes; keyboard, focus and overflow; screenshot review.
- [x] `npm run validate`, rules and browser tests must pass. Run existing lazy editor and security regressions with evidence in `docs/validation/guided-diagnosis`.
- [x] Record implemented/validated/limited scope and leave changes on this branch for review.
