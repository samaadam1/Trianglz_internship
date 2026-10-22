# Lumen — product landing page

Landing page for the fictional Lumen L2 desk lamp, built from the "Assessment 01" design (style guide, 1440px desktop frame, 375px mobile frame) with semantic HTML, modern CSS and an SCSS architecture. No framework and no runtime JavaScript dependencies.

- **Live:** https://samaadam1.github.io/Trianglz_internship/
- **Repo:** https://github.com/samaadam1/Trianglz_internship
- **Deployment:** GitHub Pages, served from the root of the `main` branch.

## Run it

```bash
npm install
npm run dev     # builds, watches SCSS and serves with live reload at http://localhost:8080
npm run build   # one-off compile of scss/main.scss -> css/main.css
```

`css/main.css` is committed so the site works on GitHub Pages without a build step.

## Structure

```
index.html            semantic markup (one page, in-page anchors, inline SVG icon sprite)
js/main.js            mobile menu toggle (the only behaviour on the page)
scss/
  main.scss           entry point, only @use lines
  abstracts/          _variables (token maps), _mixins (desktop, focus-ring, text-small, stack)
  base/               _tokens (maps -> CSS custom properties), _reset, _typography
  layout/             _container (+ .section), _header, _footer
  components/         _icon, _button, _card, _spec-table, _form
  sections/           _hero, _features, _specs, _notify
css/main.css          compiled output
```

The page is a `header`, a `main` with four sections (hero, features, specs, notify) and a `footer`. Each full-width band holds a `.container` that centres the content.

## Responsive behaviour

One breakpoint, **768px**, as the style guide specifies ("mobile styles below 768 px"). The base styles are the 375px layout, and the `desktop` mixin (`min-width: 768px`) adds the 1440px layout.

| | Below 768px | 768px and up |
|---|---|---|
| Header | logo and hamburger; links open as a dropdown | logo, links and Cart button in one row |
| Hero, specs, notify | one column | two columns |
| Features | cards stacked | three equal cards in a row |
| Buttons | full width, stacked | compact, side by side |
| Section padding / grid gap | 64px / 16px | 128px / 24px |

## Main decisions and why

- **Tokens come straight from the style guide.** Colors, the 4–128px spacing scale, radii and fonts live in SCSS maps in `_variables.scss`. `_tokens.scss` loops over them and emits CSS custom properties (`--color-ink`, `--space-5`, `--radius-card`), so there is one source of truth and components stay readable and themable at runtime.
- **Mobile-first, one breakpoint.** Fewer breakpoints means fewer overrides. Section padding and grid gap switch through custom properties instead of repeated per-component overrides.
- **Content container:** 1200px of content with 24px side padding, centred, as specified (so the container box is 1248px).
- **Folder-per-concern SCSS (abstracts / base / layout / components / sections)** with `@use` modules rather than `@import`, so each partial only sees what it imports and there are no global leaks.
- **BEM naming** (`block__element--modifier`), one block per partial, so selectors stay one class deep and specificity stays low.
- **No repetition.** Icons are drawn once in an inline SVG sprite and reused with `<use>`; the section intro (eyebrow, heading, text) is one shared `.section__head`; repeated patterns are mixins (`desktop`, `focus-ring`, `text-small`, `stack`); spacing and colours are tokens.
- **Semantic, accessible HTML.** `header`, `nav`, `main`, `section` with `aria-labelledby`, `article`, `figure`, `footer`; the specs are a real `<table>` with row headers; the form has a real `<label>`; a skip link; the menu button uses `aria-expanded`/`aria-controls` and closes on link click or Escape. Visible `:focus-visible` states follow the style guide (3px ink outline, 2px lime ring on the input).
- **Grid for columns, flex for rows.** Grid handles the column layouts and the stacked blocks with a gap; flex handles single rows such as the header, button groups and icon-plus-text.
- **States from the style guide:** primary hover `#C6E03F`, secondary hover fills with ink, 200ms transitions; buttons are 52px tall, and full width on mobile.
- **Smooth in-page navigation** via `scroll-behavior: smooth` (disabled for `prefers-reduced-motion`) and `scroll-margin-top` so anchors clear the sticky header.
- **Fonts:** Bricolage Grotesque (headings) and Figtree (body) from Google Fonts with `display=swap` and system fallbacks.
- **Plain Sass CLI instead of a bundler.** The page needs no JavaScript build, so `sass` plus BrowserSync for live reload is the smallest setup that does the job.
- **Committed CSS build**, so deployment is just serving the repo root.

## Where it differs from the design, and why

- **Images are placeholders** from picsum.photos, shown at the design's sizes (hero 580×552 on desktop, 327×300 on mobile, radius 24/20). The photo needs an internet connection to load; the box keeps its size and a neutral background while it loads.
- **Hero image height:** the design's placeholder is labelled "580 × 460" but measures about 580×552 in the 1440px frame, and the other section heights only line up with the measured value, so I followed the measurement. It is one value (`aspect-ratio` in `scss/sections/_hero.scss`) if it needs to change.
- **Measured, not exported:** the design was provided as screenshots, so hex values were sampled from the style-guide swatches and spacing was measured from the frames. Values may be a pixel or two off the source.
- **Not functional (visual only):** the Cart button, the "Notify me" form (it has native email validation but no backend), and the footer links (`#` placeholders).
- **Cart on mobile:** the 375px frame shows only the logo and hamburger, so the Cart button is hidden below 768px.

## Possible next steps

- Real cart state and form submission.
- Self-hosted, optimised product images and fonts.
- Additional breakpoints if the design adds a tablet frame.
