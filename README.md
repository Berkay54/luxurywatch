# VÉRON · Five editorial chapters

React + TypeScript + Vite. All five chapters are structurally complete. Approved compositions are preserved; the final polish pass awaits visual approval. Phase notes below record implementation history; the final audit supersedes their historical approval and validation statements.

## Commands

- `npm run dev`
- `npm run build` checks TypeScript and creates `dist`.
- `npm run lint`
- `npm run preview`

## Approved hero

`src/App.tsx`, `src/App.css`, `src/index.css` and hero assets remain unchanged from checkpoint `9ab3725caaa580059460e5f7dad5c887596bdca5`. Background #010102, self-hosted Cormorant Garamond with Helvetica/Arial UI. Font license: `public/fonts/OFL.txt`.

## Phase 2 — editorial movement study

Implementation: `src/PhaseTwo.tsx` and `src/PhaseTwo.css`. Replaces the previous side-by-side text/video layout and separate specification rail.

- One asymmetric 110svh desktop scene (780px minimum, 1320px maximum), beginning immediately after the hero. Oversized ENGINEERED sits behind a central mechanical object; TO ENDURE. crosses the foreground. Index, small technical annotations and four unboxed specifications anchor the composition.
- `/media/movement-skeleton.mp4` is the only movement asset present and rendered. An elliptical feather and close crop integrate its mechanical detail into #010102. Neither movement-gold.mp4 nor movement-macro.png exists in this checkout; neither is requested.
- Natural autoplay/muted/loop/playsInline playback at normal speed, without controls or scroll-driven playback. Reduced motion pauses on a decoded frame and responds live to preference changes.
- One IntersectionObserver entrance: slow opacity and 16px type movement, restrained data stagger. No pinning, parallax or dependencies. Content remains visible when IntersectionObserver is unavailable.
- Tablet repositions the object and annotations. Mobile uses a compact central detail, independently positioned title lines, supporting note and a two-column data rail.
- 21st editorial line-reveal search informed the entrance mechanic; no catalog component was installed.

## Validation

TypeScript, lint, production build and git diff checks pass. Browser inspection covers desktop, tablet and mobile, widths 320–1920px, horizontal overflow, media requests, console errors and live reduced-motion changes. Hero sources are unchanged; before/after screenshots compare the same video frame, excluding the browser scrollbar whose thumb changes with document length.

## Phase 3 — The Collection (pending visual approval)

Five editorial chapters are now approved and locked. Phase 3 is appended in `src/main.tsx`; their component and stylesheet files were not changed for this addition.

- `src/PhaseThree.tsx` and `src/PhaseThree.css` implement one product exhibition scene: editorial index, large transparent watch, subdued model name behind the object, foreground numbering and technical information.
- The supplied `nocturne-41.png`, `squelette-41.png`, and `eclipse-42.png` are 1145 × 1374 RGBA PNGs, approximately 2.0–2.2 MiB each. Original assets remain unchanged.
- The first image loads lazily. Subsequent images decode on demand before a 900ms masked reveal, subtle translate and scale transition. Only one product image remains in the DOM at rest, with two during a transition. Loading failures retain the previous model and allow retry. Rapid input is guarded while a selection completes.
- No autoplay, carousel, background video, pointer tracking, scroll-jacking or added dependencies. One native viewport entrance. Reduced motion removes animation and switches models immediately after decoding.
- Desktop uses a vertical model index; tablet preserves the large product; mobile recomposes the chapter, statement, object, model details, numbered selectors and CTA in that order. Model selectors have full accessible names, pressed state and keyboard focus styles.
- DISCOVER THE COLLECTION opens a native modal register of the three models. It supports keyboard focus containment, Escape, close button, outside-click close, and model selection.
- Verified TypeScript, lint, production build, diff whitespace, 320–1920px overflow, all model specifications, model transitions, reduced motion, modal behavior and image failure/retry. No normal-use console errors or missing product assets. Hero and Movement sources were left untouched. Visual comparisons with Phase 3 present versus omitted confirm their layout, typography, media positioning and overall appearance remain preserved; browser scrollbar length changes with the new chapter.

## Phase 4 — The Atelier (pending visual approval)

Phases 1–3 are approved and locked. `src/PhaseFour.tsx` and `src/PhaseFour.css` append an isolated Atelier environment through `src/main.tsx`. No approved component or stylesheet changed for this phase.

- Verified supplied `atelier-case.png`, `atelier-calibre.png`, and `atelier-craft.png`: 1672 × 941px each (approximately 16:9). Their original files are used without substitution or modification.
- Desktop: a 300svh native-scroll region with a 100svh CSS sticky stage. Scroll selects MATERIAL, CALIBRE or ASSEMBLY; it does not scrub animations or control page position.
- Chapter changes run a 900ms independent sequence: directional clip departure, slight scale/darkening by opacity, masked incoming image with a 16px settle, then staggered editorial information. Fast direction changes resolve the latest target after the current transition, without stacking timelines.
- Macro photography is feathered into #010102. Cormorant architectural labels, thin technical rules and tiny detail leaders form the editorial composition. No cards, new videos, WebGL or animation dependencies.
- At widths up to 1023px, heights up to 650px, or with reduced motion, the stage becomes an intentional non-sticky sequence with all three images and chapter information. Scene-specific crops preserve crown, balance and tweezers/jewel detail. Reduced motion removes chapter choreography.
- Images are warmed and decoded as the reader approaches Atelier. Later scenes decode before transitioning. Desktop retains one full-resolution DOM image at rest, two during a transition; the sequence has one image per chapter. Explicit image dimensions and fixed stages prevent loading layout shifts. Desktop screen readers can access all chapter information without relying on scroll activation.
- Verified forward/backward/fast scroll activation, sticky positioning, 320–1920px overflow, short-view and reduced-motion fallbacks, TypeScript, lint, production build and diff whitespace. Hash comparison confirms approved source/style files unchanged. No normal-use console errors or missing Atelier assets.

## Phase 5 — Brand Closing (pending final visual approval)

Phases 1–4 are approved and locked. The closing is appended through `src/main.tsx`; its implementation lives in `src/PhaseFive.tsx` and `src/PhaseFive.css` with no global selectors or new media/dependencies.

- A quiet 04 — VÉRON chapter follows Atelier's existing black feathering. Flat, sharp ivory BEYOND / TIME. uses the established serif at 19vw on desktop, with asymmetric placement and a small philosophy statement in the lower-right.
- A single IntersectionObserver entrance clips the two lines into view with 30px travel, scale 1.02 → 1, a 160ms stagger, and 1210ms total duration. Settled transforms are removed. There is no looping, parallax or pointer response. Reduced motion shows the final composition immediately.
- A smaller VÉRON signature, GENEVA / 2026 and MECHANICAL HOROLOGY lead to native text anchors for Collection, Movement and Atelier. CONTACT, INSTAGRAM and LEGAL expose explicit fictional-concept notes in a focusable status area; no invented addresses, email accounts or external destinations. One footer hairline is the only added graphic detail.
- Tablet keeps the asymmetric statement with two-column closing navigation. Mobile keeps monumental intentional line breaks, then a compact philosophy/signature/navigation/footer rhythm without forced viewport spacing.
- Verified TypeScript, lint, production build and diff whitespace; all five chapters at desktop/tablet/mobile widths; no overflow from 320–1920px; native anchor targets; keyboard activation and conceptual-note focus; reduced motion; no closing media; no normal-use console errors. Before/after hashes confirm all approved component, stylesheet and global token files remain unchanged.

## Final polish audit — 15 October 2026

- Header and hero CTA now use native anchors to the completed chapters. Header CONTACT opens the existing explicit concept note. Removed obsolete unavailable-destination state/styles. Before/after hero content pixels match at 1440px and 390px, excluding the scrollbar. Historical unchanged-source statements above predate these functional fixes.
- Movement uses metadata-only preload and paused playback until its section enters view, then normal looping. Reduced motion still pauses the decoded frame. Fresh Chromium initial transfer observed approximately 3 MiB for this 46.4 MB video; original media quality remains intact. Browser theme color now matches #010102.
- Required untracked source/styles (A): src/PhaseThree.tsx, src/PhaseThree.css, src/PhaseFour.tsx, src/PhaseFour.css, src/PhaseFive.tsx, src/PhaseFive.css. Required untracked production media (B): public/media/nocturne-41.png, public/media/squelette-41.png, public/media/eclipse-42.png, public/media/atelier-case.png, public/media/atelier-calibre.png, public/media/atelier-craft.png. All twelve were individually inspected and retained; none belongs to C/D/E.
- All nine production media files are used: those six PNGs, hero-watch.mov, hero-watch-poster.jpg and movement-skeleton.mp4. No unused production media remains. Local font, license and favicon are retained.
- Verified 320/360/390/430/768/820/1024/1440/1920px without horizontal overflow; full forward/backward traversal; anchors; all models and rapid selection; native dialog focus containment/Escape; Atelier forward/backward/skipped/rapid targets; footer notes; reduced motion. No console warnings/errors, missing images or video errors observed. Intentional asymmetry and technical-label scales retained.
- Accessibility: one h1 and main landmark, named controls, image alt text, valid anchor targets, visible keyboard focus, native controls/dialog and static reduced-motion compositions. Browser/code review, not formal assistive-technology certification.
- TypeScript, lint, production build and git diff --check pass. Vite output: JS 243.33 kB (74.78 kB gzip), CSS 38.14 kB (8.04 kB gzip). Original video/PNG assets dominate transfer weight; no dependencies or recompression added. 21st review: zero errors/warnings, informational color suggestions retained for approved masks/depth palette.
- No approved composition, layout, height, model transition, crop, typography or global style changed. No commit or push; required untracked files remain pending visual approval.
