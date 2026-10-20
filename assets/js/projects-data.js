/* ==========================================================================
   PROJECT DATA
   --------------------------------------------------------------------------
   This file is the single source of truth for every project card (home page
   "Featured projects" and the Projects page), the project list on the Resume
   page, and every project detail page. Add, remove, reorder, or edit entries
   here; no changes to the rendering code are needed.

   ORDER     Projects appear everywhere in the order they are listed below.
   FEATURED  Projects with `featured: true` appear on the home page, in list
             order, up to `featuredLimit` cards (see settings below).
   PATHS     Image and page paths are relative to the site root (the folder
             containing index.html), for example
             "assets/images/projects/my-game-front.webp" or
             "projects/my-game.html". Do NOT start them with "/" because that
             breaks on GitHub Pages project URLs. Full https:// URLs also work.

   FIELDS    Only `id` and `title` are required. Leave optional fields as ""
             (or delete them). Empty links are hidden instead of being shown as
             broken buttons, and missing images fall back to a generated pattern.

     id               Unique, URL-friendly identifier, e.g. "space-miner".
                      Detail pages look projects up by this id.
     title            Project name.
     isSample         true = temporary sample content. Shows a "Sample" badge.
                      Delete sample entries once you add your real projects.
     projectType      Short label, e.g. "Unity game", "C++ tool", "Web app".
     status           e.g. "Completed", "In development", "Game jam entry".
     year             e.g. "2025".
     shortDescription One sentence, shown on the front of the card.
     description      2-3 sentences, shown on the back of the card
                      (about 45 words fits best).
     frontImage       Fills the card front. Recommended 1200x900 px (4:3),
                      WebP or JPG, under ~250 KB.
     frontImageAlt    Alt text describing the front image.
     backImage        A different image, shown dimmed behind the back-face text.
     technologies     Array of strings. Cards show the first 4; detail pages show all.
     featured         true to show on the home page.
     githubUrl        Repository URL. "" hides the link (e.g. private repos).
     demoUrl          Playable build or live demo (itch.io, WebGL, etc.). "" hides it.
     videoUrl         Gameplay video or trailer. "" hides it.
     detailsUrl       Detail page path, e.g. "projects/space-miner.html". "" hides it.
     accent           Optional "red" | "green" | "blue". Defaults to cycling by position.
     details          Optional content for the detail page:
       overview       Array of paragraphs (the longer description).
       role           Your role, e.g. "Solo developer", "Gameplay programmer (team of 4)".
       contributions  Array of bullet points describing what YOU built.
       challenges     Array of { title, challenge, solution }.
       gallery        Array of { src, alt, caption }.

   Any text that starts with "TODO" is outlined in the browser as placeholder content.
   ========================================================================== */

window.Portfolio = window.Portfolio || {};

window.Portfolio.settings = {
  /* Maximum number of featured projects shown on the home page. */
  featuredLimit: 3
};

window.Portfolio.projects = [
  /* ------------------------------------------------------------------------
     SAMPLE PROJECT. TODO: REPLACE WITH YOUR INFORMATION
     Everything in this entry is placeholder text, not a real project.
     ------------------------------------------------------------------------ */
  {
    id: "sample-arena-shooter",
    title: "Sample: Arena Shooter Prototype",
    isSample: true,
    projectType: "Game prototype",
    status: "Sample data",
    year: "",
    shortDescription: "Placeholder card for a top-down action game. Replace with your own project.",
    description:
      "Sample text. Describe the game in two or three sentences: the core loop, what makes it interesting, and the part you are most proud of building. Mention the platform and whether it is playable.",
    frontImage: "assets/images/projects/sample-arena-front.svg",
    frontImageAlt: "Placeholder artwork of a top-down arena with a glowing player marker",
    backImage: "assets/images/projects/sample-arena-back.svg",
    technologies: ["Unity", "C#", "Example tech", "Example tech"],
    featured: true,
    githubUrl: "",
    demoUrl: "",
    videoUrl: "",
    detailsUrl: "projects/sample-arena-shooter.html",
    details: {
      overview: [
        "TODO: Write a few paragraphs about the project. What is it, who is it for, and what was the goal? This sample entry exists only to show the layout.",
        "TODO: Describe the scope (solo or team, timeline, engine or framework) and the current state of the project, such as prototype, released build, or game jam entry."
      ],
      role: "TODO: Your role, for example \"Solo developer\" or \"Gameplay programmer on a team of 4\"",
      contributions: [
        "TODO: A system or feature you built yourself",
        "TODO: Another concrete contribution, such as a tool, mechanic, or optimization",
        "TODO: Anything you did beyond programming, such as design, art, or production"
      ],
      challenges: [
        {
          title: "TODO: Name of a technical challenge",
          challenge: "TODO: What problem did you run into, and why was it difficult?",
          solution: "TODO: How did you solve it? What did you learn or measure afterwards?"
        }
      ],
      gallery: [
        {
          src: "assets/images/projects/sample-arena-front.svg",
          alt: "Placeholder artwork of a top-down arena",
          caption: "TODO: Replace with a gameplay screenshot and describe what it shows."
        },
        {
          src: "assets/images/projects/sample-arena-back.svg",
          alt: "Placeholder artwork of a radar-style minimap",
          caption: "TODO: Replace with a second screenshot (UI, editor tooling, debug view)."
        }
      ]
    }
  },

  /* ------------------------------------------------------------------------
     SAMPLE PROJECT. TODO: REPLACE WITH YOUR INFORMATION
     ------------------------------------------------------------------------ */
  {
    id: "sample-procedural-dungeon",
    title: "Sample: Procedural Dungeon Generator",
    isSample: true,
    projectType: "Tool / systems",
    status: "Sample data",
    year: "",
    shortDescription: "Placeholder card for a systems-focused project. Replace with your own work.",
    description:
      "Sample text. Use this space to explain the technical idea behind the project, such as the algorithm, architecture, or pipeline, and the result it produces. Keep it short and concrete.",
    frontImage: "assets/images/projects/sample-dungeon-front.svg",
    frontImageAlt: "Placeholder artwork of connected dungeon rooms on a grid",
    backImage: "assets/images/projects/sample-dungeon-back.svg",
    technologies: ["C++", "Example tech", "Example tech", "Example tech", "Example tech"],
    featured: true,
    githubUrl: "",
    demoUrl: "",
    videoUrl: "",
    detailsUrl: "projects/sample-procedural-dungeon.html",
    details: {
      overview: [
        "TODO: Explain what the project does and why you built it. This is sample text, not a description of real work."
      ],
      role: "TODO: Your role",
      contributions: [
        "TODO: A concrete contribution",
        "TODO: Another concrete contribution"
      ],
      challenges: [
        {
          title: "TODO: Name of a technical challenge",
          challenge: "TODO: Describe the problem.",
          solution: "TODO: Describe your solution and its outcome."
        }
      ],
      gallery: []
    }
  },

  /* ------------------------------------------------------------------------
     THIS WEBSITE. A real entry; edit the wording as you like.
     TODO: Confirm the repository is public (or set githubUrl to ""), and set
     demoUrl to your GitHub Pages URL once the site is published.
     ------------------------------------------------------------------------ */
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    isSample: false,
    projectType: "Web",
    status: "In progress",
    year: "2026",
    shortDescription: "This site: a static portfolio built with HTML, CSS, and vanilla JavaScript.",
    description:
      "A data-driven portfolio hosted on GitHub Pages. Project cards and detail pages are generated from a single JavaScript data file, with 3D card flips, subtle parallax, and reduced-motion support.",
    frontImage: "assets/images/projects/portfolio-front.svg",
    frontImageAlt: "Stylized mockup of this portfolio's home page",
    backImage: "assets/images/projects/portfolio-back.svg",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    featured: true,
    githubUrl: "https://github.com/LasagnaWaffle/judah-campbell-portfolio",
    demoUrl: "",
    videoUrl: "",
    detailsUrl: "projects/portfolio-website.html",
    details: {
      overview: [
        "This website. A static portfolio built with HTML, CSS, and vanilla JavaScript so it can be hosted on GitHub Pages without a build step or backend.",
        "Project cards, the resume project list, and detail pages are generated from a single data file. Interactions include a 3D card flip, a keyboard-accessible mobile menu, and subtle parallax that is disabled when the visitor prefers reduced motion."
      ],
      role: "Solo developer",
      contributions: [
        "Designed the page structure, visual system, and relative-path setup for GitHub Pages.",
        "Implemented data-driven project cards so new work can be added without duplicating markup.",
        "Added accessible flip controls, missing-PDF handling, and reduced-motion support."
      ],
      challenges: [
        {
          title: "Keeping the site working under a GitHub Pages project URL",
          challenge: "Absolute paths that start with / resolve to the domain root, which breaks when the site is served from /repository-name/.",
          solution: "Asset and navigation paths are relative. JavaScript resolves project image and page URLs from the site root derived from the script location."
        }
      ],
      gallery: [
        {
          src: "assets/images/projects/portfolio-front.svg",
          alt: "Stylized mockup of the portfolio home page",
          caption: "Replace with a screenshot of the live home page once GitHub Pages is enabled."
        },
        {
          src: "assets/images/projects/portfolio-back.svg",
          alt: "Stylized mockup of a content layout from the portfolio",
          caption: "Replace with a second screenshot, such as the projects gallery or a detail page."
        }
      ]
    }
  },

  /* ------------------------------------------------------------------------
     SAMPLE PROJECT. TODO: REPLACE WITH YOUR INFORMATION
     Has no back image and no links, to show how missing fields are handled.
     ------------------------------------------------------------------------ */
  {
    id: "sample-inventory-app",
    title: "Sample: Inventory Management App",
    isSample: true,
    projectType: "Software",
    status: "Sample data",
    year: "",
    shortDescription: "Placeholder card for a software or database project.",
    description:
      "Sample text. Describe the problem the software solves, who used it, and how it is structured, for example a desktop client with a SQL database.",
    frontImage: "assets/images/projects/sample-inventory-front.svg",
    frontImageAlt: "Placeholder artwork of a data table interface",
    backImage: "",
    technologies: ["C#", "SQL", "Example tech"],
    featured: false,
    githubUrl: "",
    demoUrl: "",
    videoUrl: "",
    detailsUrl: ""
  },

  /* ------------------------------------------------------------------------
     SAMPLE PROJECT. TODO: REPLACE WITH YOUR INFORMATION
     Has no images at all, to show the generated fallback artwork.
     ------------------------------------------------------------------------ */
  {
    id: "sample-puzzle-platformer",
    title: "Sample: Puzzle Platformer",
    isSample: true,
    projectType: "Game jam",
    status: "Sample data",
    year: "",
    shortDescription: "Placeholder card with no images. A pattern is generated automatically.",
    description:
      "Sample text. Game jam projects are great to include: mention the theme, the time limit, the team size, and what you were responsible for.",
    frontImage: "",
    backImage: "",
    technologies: ["Example engine", "Example language"],
    featured: false,
    githubUrl: "",
    demoUrl: "",
    videoUrl: "",
    detailsUrl: ""
  }
];
