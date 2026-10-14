# VÉRON · Phases 1 and 2

React + TypeScript + Vite. Phase 1 is approved and locked. Phase 2 opens directly after the hero with a single cinematic skeleton movement composition.

## Commands

- `npm run dev`
- `npm run build` checks TypeScript and creates `dist`.
- `npm run lint`
- `npm run preview`

## Approved hero

Source, layout, responsive behavior, typography, navigation, video and blending remain unchanged in `src/App.tsx`, `src/App.css`, and `src/index.css`. Background: #010102. Self-hosted Cormorant Garamond display with Helvetica/Arial UI. Font license: `public/fonts/OFL.txt`.

The unchanged hero video checksum is `6B5F4328F5336E651C4FD32168C10863C98160E26BC67BEAC5EB7A869D3E19A3`.

## Phase 2

Implementation: `src/PhaseTwo.tsx` and `src/PhaseTwo.css`.

- `/media/movement-skeleton.mp4` is the only Phase 2 video. It occupies an 85% desktop canvas with a monumental full-height crop, text in the left negative space, and no gap after the hero. The label is 01 — THE MOVEMENT. Soft #010102 edge feathering integrates it into the page.
- Autoplay, muted, loop, inline, no controls. No scroll-driven playback, parallax, pinned scrolling or UI animation. Reduced-motion preference pauses on a visible frame and responds to preference changes live.
- Mobile integrates the statement with the upper edge of the large watch visual; supporting copy sits below the image to protect mechanical detail.
- The four supplied specifications remain in an unboxed rail immediately below the scene, with two columns on mobile.
- `movement-gold.mp4` and `movement-macro.png` remain in public/media but are not rendered or requested by Phase 2. Gold-specific and obsolete placeholder styling is removed.
- No new dependencies or sections.

## Verification

TypeScript, production build, lint, responsive checks from 320 to 1920px, no horizontal overflow, actual video loop wraparound, and reduced-motion pausing. The approved hero screenshot hash matches with Phase 2 present or removed at the same decoded frame and scrollbar width.
