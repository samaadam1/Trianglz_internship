# Lumen — product landing page

Landing page for the fictional Lumen L2 desk lamp, built from the "Assessment 01" design (style guide, 1440px desktop frame, 375px mobile frame) with semantic HTML, modern CSS and an SCSS architecture. No framework and no JS dependencies.

**Live:** _add the GitHub Pages link here_

## Run it

```bash
npm install
npm run build   # compiles scss/main.scss -> css/main.css
npm run watch   # recompile on change
npm start       # serve the folder locally
```

`css/main.css` is committed so the site works on GitHub Pages without a build step.

## Structure

```
index.html            semantic markup (one page, in-page anchors)
js/main.js            mobile menu toggle (only behaviour on the page)
scss/
  main.scss           entry point, only @use lines
  abstracts/          _variables (token maps), _mixins (desktop breakpoint, focus ring)
  base/               _tokens (maps -> CSS custom properties), _reset, _typography
  layout/             _container (+ .section), _header, _footer
  components/         _button, _card, _spec-table, _form
  sections/           _hero, _features, _specs, _notify
css/main.css          compiled output
```

## Main decisions and why

- **Tokens come straight from the style guide.** Colors, the 4–128px spacing scale, radii and fonts live in SCSS maps in `_variables.scss`. `_tokens.scss` loops over them and emits CSS custom properties (`--color-ink`, `--space-5`, `--radius-card`), so there is one source of truth and components stay readable and themable at runtime.
- **Mobile-first, one breakpoint.** The style guide says mobile styles apply below 768px, so the base styles are the 375px layout and a single `desktop` mixin (`min-width: 768px`) adds the 1440px layout. Section padding (64px → 128px) and grid gap (16px → 24px) switch through custom properties instead of repeated overrides.
- **Content container of 1200px with 24px side padding**, centred, as specified.
- **Folder-per-concern SCSS (abstracts / base / layout / components / sections)** with `@use` modules rather than `@import`, so each partial only sees what it imports and there are no global leaks. Components are BEM-named and flat to keep specificity low.
- **Semantic, accessible HTML.** `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`; the specs are a real `<table>` with row headers; the form has a real `<label>`; a skip link; the menu button uses `aria-expanded`/`aria-controls` and closes on link click or Escape. Visible `:focus-visible` states follow the style guide (3px ink outline, 2px lime ring on the input).
- **States from the style guide:** primary hover `#C6E03F`, secondary hover fills with ink, 200ms transitions, 52px mobile buttons/inputs at full width.
- **Fonts:** Bricolage Grotesque (headings) and Figtree (body) from Google Fonts with `display=swap` and system fallbacks.
- **Images** are placeholders at the design sizes (580×460 desktop, 327×300 mobile, radius 24/20) served from picsum.photos with `width`/`height` set to avoid layout shift.
- **Smooth in-page navigation** via `scroll-behavior: smooth` (disabled for `prefers-reduced-motion`) and `scroll-margin-top` so anchors clear the sticky header.
- **Committed CSS build** so deployment is just serving the repo root.
