# Judah Campbell — Game Developer Portfolio

A static personal portfolio for a game developer who also has software experience. It is built with plain HTML, CSS, and vanilla JavaScript so it can be hosted on **GitHub Pages** with no build step.

The visual language is a dark, professional developer site with restrained sci-fi details: charcoal surfaces, thin borders, and selective pure RGB accents (`#FF0000`, `#00FF00`, `#0000FF`).

Temporary sample content is labeled in the data file, in the UI (dashed outlines and “Sample” badges), and in this README as **`TODO: REPLACE WITH YOUR INFORMATION`**. Search the repository for that phrase.

This site is **not** indexed or measured unless you add that yourself. `robots.txt` and `sitemap.xml` exist so search engines *can* find the pages after GitHub Pages is enabled; they do not mean indexing is configured.

---

## 1. File structure

```
/
├── index.html                 Home
├── projects.html              Full project gallery
├── about.html                 Biography, education, approach
├── resume.html                Resume page + PDF download
├── contact.html               Email, LinkedIn, GitHub (no form)
├── 404.html                   GitHub Pages not-found page
├── robots.txt
├── sitemap.xml
├── .nojekyll                  Stops Jekyll from ignoring files
├── projects/
│   ├── project-template.html  Copy this for a new detail page
│   ├── portfolio-website.html
│   ├── sample-arena-shooter.html
│   └── sample-procedural-dungeon.html
├── assets/
│   ├── css/                   style.css, components.css, animations.css
│   ├── js/
│   │   ├── projects-data.js   All project content lives here
│   │   ├── project-cards.js   Card rendering + 3D flip
│   │   ├── project-detail.js  Detail page rendering
│   │   ├── main.js            Nav, year, resume PDF check
│   │   └── animations.js      Parallax and scroll reveal
│   ├── fonts/                 Self-hosted Inter, Space Grotesk, JetBrains Mono
│   ├── images/
│   │   ├── favicon.svg
│   │   ├── og-image.png       Social preview (placeholder)
│   │   ├── profile/           Profile photo placeholder
│   │   ├── projects/          Card / screenshot artwork
│   │   └── backgrounds/
│   └── documents/
│       └── resume.pdf         PLACEHOLDER — not a real resume
└── README.md
```

Paths are **relative**, never `/css/...`. That keeps the site working at a GitHub Pages project URL such as `https://username.github.io/judah-campbell-portfolio/`.

---

## 2. Preview locally

Do not open the HTML files with `file://` if you can avoid it. Some checks (resume PDF detection, fonts) work more reliably over HTTP.

From the repository root, in PowerShell:

```powershell
python -m http.server 8080
```

If Python is not installed, any static server is fine, for example:

```powershell
npx --yes serve -p 8080
```

Then open `http://localhost:8080/`.

---

## 3. Add a project

1. Open `assets/js/projects-data.js`.
2. Copy an existing object in `window.Portfolio.projects` and paste it where you want it in the list. **Order in this array is the order on the site.**
3. Give it a unique `id` (URL-friendly, for example `space-miner`).
4. Fill in `title`, descriptions, images, and `technologies`.
5. Set `featured: true` if it should appear on the home page.
6. If you want a dedicated write-up:
   - Copy `projects/project-template.html` to `projects/your-id.html`.
   - Set `data-project-detail="your-id"` on the `<article>`.
   - Set `detailsUrl: "projects/your-id.html"` in the data file.
7. Refresh the browser. You do not edit the card HTML by hand.

Quick preview of a detail page without copying the template:

`projects/project-template.html?id=your-id`

---

## 4. Remove or reorder projects

- **Remove:** delete the object from `window.Portfolio.projects`. Delete the matching HTML file in `projects/` if you created one.
- **Reorder:** move objects in the array. The gallery, resume list, and featured row all follow this order.
- **Featured row:** set `featured: true` or `false`. How many cards appear on the home page is `featuredLimit` at the top of the data file (default `3`).

---

## 5. Change title, description, and technologies

Edit these fields on the project object:

- `title`
- `shortDescription` — one sentence on the card front
- `description` — two or three sentences on the card back
- `technologies` — array of strings. Cards show the first four; detail pages show all.

Leave optional strings as `""` rather than inventing links.

---

## 6. Replace front and back images

1. Add files under `assets/images/projects/` (1200×900, WebP or JPG, under ~250 KB is a good target).
2. Set `frontImage` and `backImage` to paths like `assets/images/projects/my-game-front.webp`.
3. Set `frontImageAlt` to a short description of the screenshot.

Do **not** start paths with `/`. Full `https://` URLs also work.

If an image path is empty or the file is missing, a generated fallback pattern is shown instead of a broken image.

Sample SVG files in that folder are labeled `SAMPLE IMAGE` in the artwork itself. Replace them when you have real screenshots.

---

## 7. Repository, demo, and detail links

| Field         | Use                                      | Empty value        |
| ------------- | ---------------------------------------- | ------------------ |
| `githubUrl`   | Public repository                        | Hides the GitHub button |
| `demoUrl`     | Playable build (itch.io, WebGL, Pages)   | Hides the demo button |
| `videoUrl`    | Trailer or gameplay video                | Hides the video button |
| `detailsUrl`  | Dedicated HTML page in `projects/`       | Hides “View details” |

Empty strings are omitted. The site will not render a button that goes nowhere.

Clicking a card **flips** it. Links on the back face navigate and do not flip the card.

---

## 8. Name and professional title

Search for **Judah Campbell** and **Game Developer** and update:

- The `<title>` and Open Graph tags on every HTML page
- The brand name in the navigation (`nav__brand`)
- The hero heading on `index.html`
- Footer name on every page
- `og:site_name` and the social image alt text

The hero title “Game Developer & Software Developer” lives in `index.html` in the `.hero__title` block.

---

## 9. Biography, education, experience, skills, hobbies

| Content              | File |
| -------------------- | ---- |
| Biography            | `about.html` |
| Education            | `about.html` and `resume.html` (keep them in sync) |
| Coursework / experience | `about.html`, `resume.html` |
| Approach / principles | `about.html` |
| Hobbies              | `about.html` |
| Skills               | `index.html` (overview cards) and `resume.html` (skill table) |
| Hero introduction    | `index.html` |

Anything with class `todo` or the dashed outline is still sample text. Remove the `todo` class after you replace it so the outline goes away.

Do not invent degrees, jobs, awards, or shipped-game claims.

---

## 10. Profile picture

Replace `assets/images/profile/profile-placeholder.svg` with a photo (a 4:5 crop works well). Keep the same filename **or** update both `<img>` tags:

- `index.html` (hero)
- `about.html`

Update the `alt` text to something like `Portrait of Judah Campbell`.

---

## 11. Resume PDF

Replace `assets/documents/resume.pdf` with your real PDF, keeping that filename.

The current file is a **placeholder** that says so on the page. It is not a real resume.

`resume.html` uses `data-resume-download` on the download buttons. If the PDF is missing (HTTP 404), those controls are replaced with “Resume PDF coming soon” so visitors never hit a broken link. If the check cannot run (`file://` or a network error), the link is left as-is.

Keep the on-page resume sections consistent with the PDF.

---

## 12. Email, LinkedIn, and GitHub

Search the repository for:

- `your.email@example.com`
- `linkedin.com/in/your-profile`
- `github.com/LasagnaWaffle` (already set to this repo’s owner; change if needed)

Those strings appear in the header/footer, home call-to-action, About, Contact, and project data. Contact is **mailto / profile links only** — there is no form and no backend.

---

## 13. Color palette

Global tokens live in `assets/css/style.css` under `:root`.

```css
--color-red: #ff0000;    /* RGB(255, 0, 0) */
--color-green: #00ff00;  /* RGB(0, 255, 0) */
--color-blue: #0000ff;   /* RGB(0, 0, 255) */
--color-bg: #0f1012;
--color-bg-alt: #131417;
--color-surface: #181a1e;
--color-text: #e8e9eb;
```

Change those custom properties to retheme the site. Do not use the pure RGB colors for small body text; they are accents.

Fonts are self-hosted (SIL Open Font License): Inter, Space Grotesk, and JetBrains Mono. If they fail to load, system sans/mono stacks take over.

---

## 14. Enable GitHub Pages

The site is static. No Node.js is required at runtime.

1. Push this repository to GitHub (this repo’s origin is `LasagnaWaffle/judah-campbell-portfolio`).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`main`**
   - Folder: **`/ (root)`**
4. Save. After a minute or two the site is at:

   `https://lasagnawaffle.github.io/judah-campbell-portfolio/`

5. Update Open Graph image URLs, `robots.txt`, and `sitemap.xml` if the username or repo name is different.

A `.nojekyll` file is included so GitHub Pages does not process the site with Jekyll.

Deployment has **not** been verified from this environment.

---

## 15. What is still placeholder content

| Item | Where |
| ---- | ----- |
| Email | Search `your.email@example.com` |
| LinkedIn | Search `your-profile` |
| GitHub URL | Confirm `LasagnaWaffle` is the account you want public |
| Hero intro, availability, city, school | `index.html` |
| Skills | `index.html`, `resume.html` |
| Biography, education, coursework, hobbies | `about.html` |
| Resume narrative, education, experience | `resume.html` |
| Resume PDF | `assets/documents/resume.pdf` |
| Profile photo | `assets/images/profile/profile-placeholder.svg` |
| Favicon | `assets/images/favicon.svg` |
| Social preview image | `assets/images/og-image.png` |
| Sample projects | `assets/js/projects-data.js` (`isSample: true`) plus SVG artwork |
| Sample detail pages | `projects/sample-*.html` |
| Open Graph / sitemap URL | HTML heads, `robots.txt`, `sitemap.xml` |

Sample projects are **not** shipped games or professional work. They exist so the layout, card flip, and detail pages can be tested.

The **Portfolio Website** entry in the data file is a real project (this site). Confirm the GitHub URL is public and set `demoUrl` to your Pages URL once it is live.

---

## Project cards (interaction)

- Front: screenshot, title, short summary.
- Click / tap / keyboard on **Details** (or the card) flips 180° on the Y axis to the back face.
- Back: different image when provided, longer description, technologies, and links.
- Links on the back do **not** flip the card.
- Hidden faces use `inert` plus `backface-visibility` so they cannot be seen or tabbed to.
- `prefers-reduced-motion: reduce` shortens the flip and disables parallax.

---

## Prioritized checklist before publishing

Work top-down. Items at the top are the ones recruiters notice first.

1. **Confirm your display name** in nav, hero, titles, and footer (currently “Judah Campbell”).
2. **Replace email and LinkedIn** everywhere. Confirm the GitHub URL.
3. **Add a real profile photo.** Update alt text.
4. **Rewrite the hero introduction** and remove the availability/city placeholders.
5. **Replace `assets/documents/resume.pdf`** with your PDF. Align `resume.html` with it.
6. **Fill About:** biography, education, coursework, approach, hobbies. Remove `todo` classes.
7. **Replace sample projects** in `assets/js/projects-data.js` with real work. Delete sample objects and `projects/sample-*.html` when they are gone.
8. **Add real screenshots** (front and back images). Write honest descriptions and your actual role — no invented achievements.
9. **Set `githubUrl` / `demoUrl` / `detailsUrl`** only when those destinations exist.
10. **Trim skills** to technologies you can discuss in an interview.
11. **Replace favicon and `og-image.png`.** Put the live Pages URL in Open Graph tags, `robots.txt`, and `sitemap.xml`.
12. **Enable GitHub Pages** from `main` / root. Open the live URL and click every nav item, card flip, detail page, mailto link, and the resume download.
13. Search the repo for `TODO: REPLACE WITH YOUR INFORMATION`, `todo`, `isSample`, `your.email@example.com`, and `your-profile`. Nothing in that list should remain.

When those are done, remove the dashed placeholder outlines by deleting `class="todo"` from the markup you replaced.
