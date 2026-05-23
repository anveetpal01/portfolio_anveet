/* =============================================================================
 *  ✏️  EDIT THIS FILE TO MAKE THE SITE YOURS
 * -----------------------------------------------------------------------------
 *  Everything personal lives here — name, bio, projects, skills, experience,
 *  and social links. Change the values below and the whole site updates.
 *  You should not need to touch the component files for normal content edits.
 * ========================================================================== */

export type ProjectCategory =
  | "Development"
  | "Design"
  | "Photography"
  | "Video";

/* --- Media -----------------------------------------------------------------
 * A project can have a gallery of photos and/or videos. Photos are local
 * files under /public/work/<slug>/. Videos are YouTube/Vimeo links (embedded
 * as iframes — paste the normal share URL, the site derives the embed).
 * Omit `media` entirely → the card shows a styled gradient placeholder.
 * ------------------------------------------------------------------------- */
export type MediaProvider = "youtube" | "vimeo";

export interface MediaImage {
  type: "image";
  /** Local path under /public, e.g. "/work/my-project/01.jpg". */
  src: string;
  /** Alt text — required for accessibility. */
  alt: string;
}

export interface MediaVideo {
  type: "video";
  /** Normal share/watch URL: youtu.be/…, watch?v=…, vimeo.com/ID. */
  url: string;
  provider: MediaProvider;
  /** Local poster image shown on the card & before the video plays. */
  thumbnail: string;
  alt: string;
}

export type MediaItem = MediaImage | MediaVideo;

/* --- Case study ------------------------------------------------------------
 * Optional detailed write-up shown on /work/<slug>. Every field is optional
 * so a project can be as shallow or as deep as you want — empty sections
 * simply don't render. Numbers go in `metrics` (big callouts) and `charts`
 * (custom bar/line graphs — great for ML accuracy/loss, benchmarks, etc.).
 * ------------------------------------------------------------------------- */
export interface Metric {
  /** Short label, e.g. "Accuracy", "p95 latency". */
  label: string;
  /** The number itself, e.g. "98.4%", "2.1B/day", "−64%". */
  value: string;
  /** Optional change/context, e.g. "+12 pts vs baseline". */
  delta?: string;
}

export interface ChartData {
  kind: "bar" | "line";
  title: string;
  /** Optional y-axis unit suffix, e.g. "%", "ms". */
  unit?: string;
  series: { label: string; value: number }[];
}

export interface CaseStudyLink {
  label: string;
  href: string;
  kind: "live" | "repo" | "external";
}

export interface CaseStudy {
  /** 1–2 line summary, also used in the grid's inline expand. */
  summary: string;
  problem?: string;
  approach?: string;
  role?: string;
  outcome?: string;
  /** Free-form extra sections (any headings you want). */
  sections?: { heading: string; body: string }[];
  techStack?: string[];
  timeline?: string;
  metrics?: Metric[];
  charts?: ChartData[];
  /** Optional filename under src/content/case-studies/ — when set, the page
   *  reads and renders it as styled Markdown (tables, code blocks, etc.). */
  docFile?: string;
}

export interface Project {
  id: string;
  /** URL segment for the case-study page (/work/<slug>). Keep it kebab-case. */
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  blurb: string;
  tags: string[];
  /** Optional external link ("" hides the link button). */
  href: string;
  /** Featured projects render larger in the grid. */
  featured?: boolean;
  /** Optional photo/video gallery. Omit → gradient placeholder. */
  media?: MediaItem[];
  /** Optional buttons: live demo, source repo, personal site, etc. */
  links?: CaseStudyLink[];
  /** Optional deep write-up shown on /work/<slug>. */
  caseStudy?: CaseStudy;
  /** Optional company slug (must match an ExperienceItem.slug). When set,
   *  this project also appears on /company/<slug>'s "Built here" grid. */
  companyId?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  /** Optional URL slug — when set, the Experience card becomes a link to
   *  /company/<slug> showing that company's detail + linked projects. Omit
   *  for education / non-company entries. */
  slug?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/*  Personal                                                                  */
/* -------------------------------------------------------------------------- */

export const personal = {
  firstName: "Anveet",
  lastName: "Pal",
  /** Shown rotating in the hero — each role's brief slides in sync with it. */
  roles: [
    {
      title: "Python Developer",
      brief:
        "Building clean backend, automation and scripting that holds up in production.",
    },
    {
      title: "Computer Vision Engineer",
      brief:
        "Real-time detection, tracking and counting from live camera streams.",
    },
    {
      title: "Backend Developer",
      brief:
        "REST APIs with FastAPI, Flask, Django and .NET — auth, validation and error handling.",
    },
    {
      title: "ML / Data Analytics",
      brief:
        "Training models and turning raw data into decisions with EDA and BI.",
    },
  ],
  tagline:
    "Python developer building clean backend, automation and computer-vision systems.",
  // TODO: confirm your city — it isn't in your resume, so this is a safe
  // placeholder. It shows in the Hero, About and Contact sections.
  location: "India",
  email: "anveetpal12@gmail.com",
  /** Real, from the resume. Not rendered anywhere yet — say the word and I'll
   *  add it to the Contact section. */
  phone: "8602875539",
  /** The real resume lives at /public/resume.pdf. */
  resumeUrl: "/resume.pdf",
  available: true,
  // From the resume summary (his own words), split into two for layout.
  bio: [
    "Recent B.Tech Computer Science graduate and current Python Developer with hands-on experience in full-stack development — Python backend scripting, automation, REST APIs, computer-vision projects, and React for interactive frontends.",
    "Passionate about building clean, user-focused applications and quickly adapting to real-world challenges in a fast-paced startup environment. Eager to explore cutting-edge technologies, grow as a developer, and contribute to solutions that make a real impact.",
  ],
};

// Honest, resume-derived — no invented counts.
export const stats: { value: string; label: string }[] = [
  { value: "2025", label: "B.Tech CSE" },
  { value: "3", label: "Roles & internships" },
  { value: "7", label: "Projects" },
  { value: "Open", label: "To opportunities" },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

// Absolute (/#…) so they also work from sub-pages like /work/<slug>.
export const navLinks: { label: string; href: string }[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

/* -------------------------------------------------------------------------- */
/*  Disciplines (About section cards)                                         */
/* -------------------------------------------------------------------------- */

export const disciplines: { title: string; desc: string }[] = [
  {
    title: "Python Development",
    desc: "Backend scripting and automation in Python — clean, testable code across multiple concurrent projects.",
  },
  {
    title: "Computer Vision",
    desc: "Real-time detection, tracking and counting from live camera streams with GPU-accelerated inference.",
  },
  {
    title: "Backend & APIs",
    desc: "REST APIs with FastAPI, Flask, Django and .NET — auth, validation and production-ready error handling.",
  },
  {
    title: "Data Analytics & BI",
    desc: "ETL, EDA and dashboards with Pandas, Seaborn and Power BI to turn raw data into decisions.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects / Work                                                           */
/* -------------------------------------------------------------------------- */

/* HOW TO ADD / EXTEND A PROJECT
 * -----------------------------
 * These are your real projects (from your resume + previous portfolio).
 * To add media later: drop photos in /public/work/<slug>/ and add a `media`
 * array, or paste a YouTube/Vimeo link. To add numbers: fill `metrics` and
 * `charts` in `caseStudy` — they only render if present. `year` values are
 * taken from your resume periods; tweak any you want more precise. */
export const projects: Project[] = [
  {
    id: "cctv-vehicle-counter",
    slug: "cctv-vehicle-counter",
    companyId: "miraigate",
    title: "CCTV Vehicle Counter",
    category: "Development",
    year: "2026",
    blurb:
      "Real-time CCTV computer-vision pipeline that detects, tracks and counts vehicles from live camera streams with low-latency, GPU-accelerated inference.",
    tags: ["Computer Vision", "Python", "GPU Inference", "Real-time", "Tracking"],
    href: "",
    featured: true,
    media: [
      {
        type: "video",
        url: "https://youtu.be/58bdAUT59jk",
        provider: "youtube",
        thumbnail: "/work/cctv-vehicle-counter/poster.jpg",
        alt: "CCTV Vehicle Counter — live vehicle detection and counting demo",
      },
    ],
    caseStudy: {
      summary:
        "A real-time CCTV vehicle-counting computer-vision system, built at Miraigate Technology.",
      role: "Built as a Python Developer at Miraigate Solutions, working across coding, debugging and testing within a fast-paced startup team.",
      techStack: [
        "Python",
        "YOLO11x",
        "ByteTrack",
        "OpenCV",
        "Ultralytics",
        "TensorRT (FP16)",
        "GPU Inference",
      ],
      timeline: "Miraigate Technology · 2026",
      // Honest highlight stats — true facts from the system spec, not
      // fabricated result claims. No charts (no measured accuracy numbers).
      metrics: [
        { label: "Stage pipeline", value: "3" },
        { label: "Vehicle classes", value: "5" },
        { label: "Counting window", value: "35 s" },
        { label: "GPU speedup", value: "FP16", delta: "~2× faster" },
      ],
      // Full technical deep-dive rendered from this curated Markdown file.
      docFile: "cctv-vehicle-counter.md",
    },
  },
  {
    id: "disease-asthma-prediction",
    slug: "disease-asthma-prediction-api",
    companyId: "alveofit",
    title: "Disease & Asthma Prediction API",
    category: "Development",
    year: "2025",
    blurb:
      "ETL-driven Flask REST API using a two-stage XGBoost pipeline for real-time asthma / disease severity prediction, with feature encoding, validation and robust error handling.",
    tags: ["XGBoost", "Flask", "ETL", "Machine Learning", "Python"],
    href: "",
    featured: true,
    links: [
      {
        label: "Source",
        href: "https://github.com/anveetpal01/myProjects/tree/main/xgboost_treat_api",
        kind: "repo",
      },
    ],
    caseStudy: {
      summary:
        "A production-oriented ML API for real-time disease prediction — developed during the Python-ML internship at Alveofit (Roundwork Technologies) and extended as a personal project.",
      role: "Python-ML Intern at Alveofit (Roundwork Technologies), Feb–Mar 2025.",
      sections: [
        {
          heading: "Model pipeline",
          body: "Developed and deployed a two-stage XGBoost ML pipeline for real-time asthma predictions, monitoring model performance and debugging via EDA on datasets.",
        },
        {
          heading: "Serving",
          body: "Built an ETL-driven Flask REST API with feature encoding, robust validation and error handling, integrating the models for production use and real-time inference.",
        },
      ],
      techStack: ["Python", "XGBoost", "Flask", "ETL", "Pandas"],
      timeline: "Alveofit (Roundwork Technologies) · 2025",
    },
  },
  {
    id: "task-management-system",
    slug: "multi-user-task-management-system",
    title: "Multi-User Task Management System",
    category: "Development",
    year: "2025",
    blurb:
      "Scalable, secured task-management backend with a FastAPI + SQL API, automated testing and cloud deployment.",
    tags: ["Python", "FastAPI", "Streamlit", "SQL", "JWT", "Pytest"],
    href: "",
    caseStudy: {
      summary:
        "A production-like multi-user task manager focused on reliability and security.",
      sections: [
        {
          heading: "Backend",
          body: "Developed a scalable backend API with FastAPI and SQL, implementing automated testing (Pytest) and cloud deployment (Render) to ensure reliable, production-like operations.",
        },
        {
          heading: "Security",
          body: "Secured the system with JWT and password hashing, focusing on data privacy and error handling for seamless user management.",
        },
      ],
      techStack: ["Python", "FastAPI", "Streamlit", "SQL", "JWT", "Pytest", "Render"],
    },
  },
  {
    id: "multi-domain-recommender",
    slug: "multi-domain-recommender-system",
    title: "Multi-domain Recommender System",
    category: "Development",
    year: "2025",
    blurb:
      "Streamlit app that recommends Songs, Movies, Books, Courses and Colleges using reinforcement learning and collaborative-filtering algorithms, deployed for real-time recommendations.",
    tags: ["Python", "Streamlit", "Reinforcement Learning", "Collaborative Filtering"],
    href: "",
    links: [
      {
        label: "Source",
        href: "https://github.com/anveetpal01/multi-domain-recommender-system",
        kind: "repo",
      },
    ],
    caseStudy: {
      summary:
        "A multi-domain recommendation engine in a single Streamlit application.",
      sections: [
        {
          heading: "Overview",
          body: "Streamlit application that recommends Songs, Movies, Books, Courses and Colleges using reinforcement learning and collaborative-filtering algorithms. Built with Python and deployed for real-time recommendations.",
        },
      ],
      techStack: ["Python", "Streamlit", "Reinforcement Learning", "Collaborative Filtering"],
    },
  },
  {
    id: "power-bi-analytics",
    slug: "power-bi-analytics",
    title: "Power BI Analytics Dashboards",
    category: "Development",
    year: "2025",
    blurb:
      "Interactive Power BI dashboards visualising KPIs and trends for real-world datasets, with dynamic filtering, drill-down and real-time data insights.",
    tags: ["Power BI", "Data Visualization", "Dashboards", "Analytics"],
    href: "",
    links: [
      {
        label: "Source",
        href: "https://github.com/anveetpal01/Power-BI-",
        kind: "repo",
      },
    ],
    caseStudy: {
      summary:
        "Business-intelligence dashboards turning raw datasets into actionable insight.",
      sections: [
        {
          heading: "Overview",
          body: "Interactive Power BI dashboards to visualise key performance indicators and trends for real-world datasets. Features dynamic filtering, drill-down capabilities and real-time data insights.",
        },
      ],
      techStack: ["Power BI", "Data Modeling", "DAX"],
    },
  },
  {
    id: "rewards-management-api",
    slug: "rewards-management-api",
    companyId: "hosho",
    title: "Rewards Management API (Only Members)",
    category: "Development",
    year: "2025",
    blurb:
      ".NET 8 RESTful API for managing member accounts, reward-point accumulation and coupon redemption, built on MySQL following clean-architecture principles.",
    tags: [".NET 8", "C#", "MySQL", "REST API", "Clean Architecture"],
    href: "",
    links: [
      {
        label: "Source",
        href: "https://github.com/anveetpal01/HoshoOnlyMembers",
        kind: "repo",
      },
    ],
    caseStudy: {
      summary:
        "A clean-architecture .NET 8 backend for a members reward & coupon system.",
      sections: [
        {
          heading: "Overview",
          body: ".NET 8 RESTful API for managing member accounts, reward-points accumulation and a coupon-redemption system. Built with a MySQL database and following clean-architecture principles.",
        },
      ],
      techStack: [".NET 8", "C#", "MySQL", "REST"],
    },
  },
  {
    id: "learning-logs",
    slug: "learning-logs",
    title: "Learning Logs",
    category: "Development",
    year: "2025",
    blurb:
      "Django web app where users track topics they're learning, creating and editing journal entries per topic with a full authentication system. Deployed on Render.",
    tags: ["Django", "Python", "Authentication", "Render"],
    href: "",
    links: [
      {
        label: "Live demo",
        href: "https://django-learninglog-1.onrender.com/",
        kind: "live",
      },
      {
        label: "Source",
        href: "https://github.com/anveetpal01/Django_LearningLog",
        kind: "repo",
      },
    ],
    caseStudy: {
      summary:
        "A journaling web app for tracking what you're learning, with full auth.",
      sections: [
        {
          heading: "Overview",
          body: "Django web application where users can track topics they are learning about — create and edit journal entries for each topic with a full authentication system. Deployed on Render.",
        },
      ],
      techStack: ["Django", "Python", "SQLite", "Render"],
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "C#", "SQL", "HTML/CSS"],
  },
  {
    label: "Frontend & Backend",
    items: ["React.js", "Streamlit", "FastAPI", "Flask", "Django", ".NET"],
  },
  {
    label: "Data, ML & Tools",
    items: [
      "Power BI",
      "Pandas",
      "Seaborn",
      "XGBoost",
      "MySQL",
      "MSSQL",
      "Git / GitHub",
      "Selenium",
    ],
  },
  {
    label: "Certifications",
    items: ["Microsoft Power BI", "Alteryx (ETL)", "Figma UI/UX"],
  },
];

/** Flat list used by the scrolling marquee band. */
export const marqueeSkills: string[] = [
  "Python",
  "Computer Vision",
  "FastAPI",
  "Flask",
  "Django",
  "XGBoost",
  "Machine Learning",
  "REST APIs",
  "React.js",
  "Power BI",
  "Pandas",
  ".NET",
  "SQL",
  "Automation",
  "Git / GitHub",
];

/* -------------------------------------------------------------------------- */
/*  Skills (clickable) — interview prep + cheatsheet + calibration meter      */
/* -------------------------------------------------------------------------- */

export interface InterviewQA {
  q: string;
  /** Concise, technically correct answer (2–5 sentences). */
  a?: string;
  difficulty?: "easy" | "medium" | "hard";
  /** Optional grouping label (e.g. "GIL", "async", "validation"). */
  topic?: string;
}

export interface Skill {
  /** URL segment, kebab-case (e.g. "fastapi"). */
  slug: string;
  /** Visible name — must match the string in `skillGroups.items` exactly. */
  name: string;
  /** Single-sentence definition rendered LARGE on the skill page. */
  oneLiner?: string;
  /** 0.0–1.0 self-assessment. Banded into honest labels in the meter. */
  proficiency: number;
  /** Optional lowercase tags to also match in "Where I've used it" (e.g.
   *  ["git", "github"] for "Git / GitHub"). */
  aliases?: string[];
  interviewQuestions?: InterviewQA[];
  /** Optional Markdown cheatsheet under src/content/skills/. */
  docFile?: string;
  /** Shock-worthy, web-researched facts shown in the "Interesting facts"
   *  section. Keep each fact a single sentence. */
  interestingFacts?: string[];
  /** Optional source URLs (one per fact in order, or general references). */
  sources?: string[];
}

/* --- Tech (project-only) ---------------------------------------------------
 * Distinct from Skill. Project tech-stack badges link here when a tech is
 * not part of the homepage Skills section. No proficiency / calibration —
 * just info + interesting facts.
 * ------------------------------------------------------------------------- */
export interface Tech {
  slug: string;
  name: string;
  oneLiner: string;
  aliases?: string[];
  /** Web-researched, citation-backed. Each fact is a single sentence. */
  interestingFacts: string[];
  /** Source URLs (general references for the facts, in rough order). */
  sources?: string[];
}

// TODO: update each `proficiency` to your real self-assessment (default 0.6
// = "Comfortable"). Bands shown on the meter:
//   0.00–0.20 TINKERED · 0.21–0.40 SHIPPED · 0.41–0.60 COMFORTABLE
//   0.61–0.80 PROFICIENT · 0.81–1.00 FLUENT
export const skills: Skill[] = [
  /* ===== PRIORITY SKILLS — full cheatsheet + verified interview Q&A ===== */
  {
    slug: "python",
    name: "Python",
    oneLiner:
      "A general-purpose, dynamically-typed language whose ecosystem dominates web backends, data, ML and automation.",
    proficiency: 0.6,
    aliases: ["python"],
    docFile: "python.md",
    interestingFacts: [
      "Guido van Rossum started Python during the Christmas-1989 holidays at CWI, Amsterdam — he wanted a hobby project while the office was closed.",
      "The name has nothing to do with snakes — Guido named it after Monty Python's Flying Circus, his favourite BBC comedy show.",
      "There's a hidden Easter egg manifesto: type `import this` in any Python REPL and you'll get Tim Peters' 'Zen of Python' (19 aphorisms).",
      "Python 2 → 3 migration officially ended on January 1, 2020 — 11+ years after Python 3 first shipped in 2008.",
      "The high-performance scientific stack (NumPy, Pandas, PyTorch, scikit-learn) is mostly C, C++ and Fortran under the hood — Python is the 'glue' that makes them feel like one language.",
    ],
    sources: [
      "https://en.wikipedia.org/wiki/History_of_Python",
      "https://www.python.org/doc/humor/",
      "https://peps.python.org/pep-0020/",
      "https://en.wikipedia.org/wiki/Python_(programming_language)",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Language",
        q: "What is the difference between a list and a tuple?",
        a: "Lists are mutable (you can append/replace items) and use square brackets; tuples are immutable and use parentheses. Tuples are hashable when their contents are hashable, so they can be dict keys; lists cannot.",
      },
      {
        difficulty: "easy",
        topic: "Language",
        q: "What are *args and **kwargs?",
        a: "`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dict. They let a function accept a variable number of inputs and are commonly used to forward arguments to a wrapped function.",
      },
      {
        difficulty: "medium",
        topic: "Memory",
        q: "How does Python manage memory?",
        a: "CPython uses reference counting for most objects: when an object's refcount drops to zero, memory is freed immediately. A separate cyclic garbage collector (`gc` module) handles reference cycles. Small ints and short strings are interned/cached for reuse.",
      },
      {
        difficulty: "medium",
        topic: "GIL",
        q: "What is the GIL and what does it mean for concurrency?",
        a: "The Global Interpreter Lock allows only one thread to execute Python bytecode at a time per interpreter. So CPU-bound multithreading does not get speedup; use `multiprocessing` (separate processes) or async I/O for I/O-bound work. (Python 3.13+ ships an experimental free-threaded build that can disable the GIL.)",
      },
      {
        difficulty: "medium",
        topic: "Decorators",
        q: "What is a decorator?",
        a: "A decorator is a callable that takes a function and returns a new function — `@deco` is syntactic sugar for `func = deco(func)`. Decorators are used for logging, caching, auth, timing, etc. Wrap with `functools.wraps` to preserve the original function's name and docstring.",
      },
      {
        difficulty: "medium",
        topic: "Iteration",
        q: "Difference between a generator and an iterator?",
        a: "Every generator is an iterator, but not vice-versa. A generator is created with `yield` (or a generator expression) and produces values lazily on each `next()` call, keeping state automatically. A plain iterator is any object implementing `__iter__` and `__next__`.",
      },
      {
        difficulty: "medium",
        topic: "Async",
        q: "What is the difference between `async def` and a regular function?",
        a: "An `async def` function returns a coroutine — it doesn't run until awaited (e.g. `await fn()` or scheduled on the event loop). It can use `await` to yield control while waiting on I/O so other tasks can run. Blocking calls inside an async function will freeze the loop, defeating the purpose.",
      },
      {
        difficulty: "medium",
        topic: "Types",
        q: "Are Python type hints enforced at runtime?",
        a: "No — they are hints. Tools like `mypy`, `pyright` and Pydantic enforce them statically or via runtime validation, but the interpreter itself does not check or coerce annotated types.",
      },
      {
        difficulty: "hard",
        topic: "OOP",
        q: "What is MRO (Method Resolution Order)?",
        a: "MRO is the order in which Python looks up methods on a class with multiple inheritance. CPython uses the C3 linearization algorithm so the order is deterministic and monotonic; you can inspect it with `Cls.__mro__` or `Cls.mro()`.",
      },
      {
        difficulty: "hard",
        topic: "Context",
        q: "How do context managers work? What is the difference between `__enter__/__exit__` and `contextlib.contextmanager`?",
        a: "A context manager defines setup/teardown via `__enter__` and `__exit__` and is used with `with`. `contextlib.contextmanager` lets you write a generator-based context manager: code before `yield` runs on enter, after `yield` runs on exit (in a `try/finally` style). Both guarantee cleanup even if an exception is raised.",
      },
      {
        difficulty: "hard",
        topic: "Memory",
        q: "What are __slots__ and when would you use them?",
        a: "Defining `__slots__ = ('a','b')` on a class replaces the per-instance `__dict__` with a fixed-size descriptor layout — reducing memory and slightly speeding up attribute access. Useful when creating millions of small objects; downsides: no dynamic attributes and no per-instance `__dict__`/`__weakref__` unless added explicitly.",
      },
      {
        difficulty: "hard",
        topic: "Concurrency",
        q: "When would you choose multiprocessing over threading?",
        a: "For CPU-bound work — multiprocessing sidesteps the GIL by running each task in its own interpreter process, so multiple cores actually do work in parallel. Threading is better for I/O-bound code (network, disk) where threads spend time waiting. Asyncio is preferred over threading for high-concurrency I/O.",
      },
    ],
  },
  {
    slug: "fastapi",
    name: "FastAPI",
    oneLiner:
      "A modern Python web framework built on Starlette + Pydantic for fast, type-safe async APIs with automatic OpenAPI docs.",
    proficiency: 0.4,
    aliases: ["fastapi"],
    docFile: "fastapi.md",
    interestingFacts: [
      "FastAPI was created by Colombian developer Sebastián Ramírez (tiangolo) in 2018 — and is now one of the fastest-growing Python projects on GitHub.",
      "On the TechEmpower benchmarks it's among the fastest Python frameworks ever — practically tied with Node.js and Go on plaintext throughput.",
      "Microsoft hired Sebastián full-time specifically to work on FastAPI; companies like Netflix, Microsoft and Uber list FastAPI in their public stack.",
      "The underlying validation library Pydantic was rewritten in Rust for v2 (2023) — claims of 5–50× speedup over Pydantic v1 on the same code.",
      "FastAPI's auto-generated `/docs` (Swagger UI) and `/redoc` are free side-effects of your type hints — most teams discover this and use it as a developer-facing API console.",
    ],
    sources: [
      "https://fastapi.tiangolo.com/",
      "https://www.techempower.com/benchmarks/",
      "https://docs.pydantic.dev/latest/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "How does FastAPI differ from Flask and Django?",
        a: "FastAPI is built on Starlette (async ASGI) and uses Pydantic for type-driven validation and auto-generated OpenAPI/Swagger docs. Flask is a sync micro-framework that needs extensions for validation/docs. Django is a full-stack framework with ORM, admin and templating — heavier and more opinionated than either.",
      },
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is Pydantic and why does FastAPI rely on it?",
        a: "Pydantic uses Python type hints to define schemas and validates/coerces request data against them. FastAPI uses these models for request bodies, response serialization, dependency types and to emit a JSON Schema (the basis of the auto Swagger UI). Invalid payloads return a 422 automatically.",
      },
      {
        difficulty: "easy",
        topic: "Routing",
        q: "Path parameters vs query parameters in FastAPI — how does it decide?",
        a: "Anything in the route template (`/items/{item_id}`) is a path parameter. Anything else declared as a function argument with a default or basic type becomes a query parameter. Pydantic models in the signature are treated as request bodies. All of them get validated against their type hint.",
      },
      {
        difficulty: "medium",
        topic: "async",
        q: "When should a route be `async def` vs plain `def`?",
        a: "Use `async def` when the handler awaits I/O (async DB driver, `httpx.AsyncClient`, etc.) so the event loop can serve other requests concurrently. Use plain `def` when the work is CPU-bound or uses only blocking libraries — FastAPI runs those in a threadpool so they don't block the loop.",
      },
      {
        difficulty: "medium",
        topic: "async",
        q: "What is the biggest async pitfall in FastAPI?",
        a: "Calling a blocking function inside an `async def` route — e.g. synchronous `requests.get()`, blocking DB drivers, `time.sleep()`. It blocks the event loop and kills concurrency. Either await an async equivalent (`httpx.AsyncClient`, `asyncpg`) or move the function to `def` so FastAPI runs it in a threadpool.",
      },
      {
        difficulty: "medium",
        topic: "Dependencies",
        q: "What is dependency injection in FastAPI?",
        a: "Declare shared logic (DB session, current user, settings) as a function and pass it into routes via `Depends(get_db)`. FastAPI resolves and caches the dependency per request, supports yield-based teardown, and lets you swap dependencies in tests with `app.dependency_overrides[get_db] = …`.",
      },
      {
        difficulty: "medium",
        topic: "Auth",
        q: "How do you implement authentication?",
        a: "Use the built-in `OAuth2PasswordBearer` (or `HTTPBearer`) as a dependency that extracts a token, then a separate `get_current_user` dependency that verifies the JWT and returns the user. Apply the user dependency to protected routes; unauthenticated requests automatically return 401.",
      },
      {
        difficulty: "medium",
        topic: "Lifecycle",
        q: "Startup and shutdown events — how do you do them now?",
        a: "The modern way (FastAPI ≥ 0.93) is an async context manager passed via `lifespan=` to the `FastAPI(...)` constructor: code before `yield` runs at startup, after `yield` runs at shutdown. The older `@app.on_event(\"startup\")` / `(\"shutdown\")` decorators are deprecated.",
      },
      {
        difficulty: "medium",
        topic: "Testing",
        q: "How do you test a FastAPI app?",
        a: "Use `from fastapi.testclient import TestClient`; instantiate `client = TestClient(app)` and call it like a requests-style client (`client.post('/items', json={...})`). It handles startup/shutdown automatically. For async tests against the running loop, use `httpx.AsyncClient(app=app, base_url=...)` with `pytest-asyncio`.",
      },
      {
        difficulty: "hard",
        topic: "Deployment",
        q: "How do you deploy FastAPI in production?",
        a: "FastAPI is an ASGI app, so run it under an ASGI server: Uvicorn directly, or Gunicorn with the `uvicorn.workers.UvicornWorker` for multiple worker processes + a process manager. Put it behind a reverse proxy (nginx) for TLS, static files and request limits. Tune workers ≈ cores; use connection pooling for DBs.",
      },
      {
        difficulty: "hard",
        topic: "Validation",
        q: "How do you return a custom response model that hides internal fields?",
        a: "Declare `response_model=PublicSchema` on the route. FastAPI validates and filters the returned data against that schema before serialization — fields not in `PublicSchema` are dropped, even if the handler returns extra data (e.g. internal user fields). You can also use `response_model_exclude` / `_include`.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "How do you avoid N+1 queries and blocking the loop with databases?",
        a: "Use an async driver (`asyncpg`, `databases`, SQLAlchemy 2.0 async, Tortoise, motor). For SQLAlchemy use eager loading (`selectinload`, `joinedload`) to fetch related rows in one query. Pool connections via the driver's pool. Never call sync ORMs inside `async def` — either switch to async or move the route to plain `def`.",
      },
    ],
  },
  {
    slug: "flask",
    name: "Flask",
    oneLiner:
      "A WSGI micro-framework for Python — minimal core (routing, request, Jinja2), everything else via extensions.",
    proficiency: 0.4,
    aliases: ["flask"],
    docFile: "flask.md",
    interestingFacts: [
      "Flask was created by Armin Ronacher in April 2010 — its very first announcement was an April Fools' joke (the 'micro' framework was originally a parody of overweight web frameworks).",
      "Armin built almost the entire Pallets stack alone: Flask, Jinja2 (templates), Werkzeug (WSGI), Click (CLI) and MarkupSafe — all five are best-in-class.",
      "'Micro' doesn't mean 'small' — it means Flask doesn't force decisions on you (no built-in ORM, no auth, no admin). You bring your own stack via extensions.",
      "Flask 1.0 took 8 years to ship after the first release (2010 → 2018) — the team explicitly held the version number until the API felt right and backward-compatibility was solid.",
      "Many ML model demos you see on the internet are secretly a Flask app + an HTML form — it's the de-facto 'wrap my model behind a REST endpoint' framework in the data world.",
    ],
    sources: [
      "https://flask.palletsprojects.com/",
      "https://en.wikipedia.org/wiki/Flask_(web_framework)",
      "https://lucumr.pocoo.org/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is Flask and why is it a 'micro-framework'?",
        a: "Flask is a lightweight Python web framework built on Werkzeug (WSGI) and Jinja2 (templating). 'Micro' means the core stays minimal — it doesn't ship an ORM, form validation, or auth. You add what you need via extensions (Flask-SQLAlchemy, Flask-Login, Flask-WTF).",
      },
      {
        difficulty: "easy",
        topic: "Routing",
        q: "How do routes work in Flask?",
        a: "Use the `@app.route(\"/path\", methods=[\"GET\",\"POST\"])` decorator on a view function. Variables in the URL like `/users/<int:id>` become arguments. You can name routes for `url_for()` reverse lookup so you don't hard-code URLs in templates.",
      },
      {
        difficulty: "easy",
        topic: "Templates",
        q: "What is Jinja2 and how do you pass data to a template?",
        a: "Jinja2 is the templating engine that ships with Flask: HTML with `{{ expressions }}` and `{% statements %}`. Render with `render_template(\"page.html\", user=user)` — keyword arguments become template variables. It auto-escapes HTML to prevent XSS unless you mark a value `safe`.",
      },
      {
        difficulty: "medium",
        topic: "Context",
        q: "What is the application context vs the request context?",
        a: "The request context (`request`, `session`) is pushed for every incoming HTTP request and torn down at the end. The application context (`current_app`, `g`) wraps a request context and is also pushed manually with `with app.app_context():` for CLI/background tasks. `g` is a per-request scratchpad cleared after the request ends.",
      },
      {
        difficulty: "medium",
        topic: "Structure",
        q: "What are Blueprints and when do you use them?",
        a: "Blueprints group related routes, templates and static files into a module that's registered onto the app (`app.register_blueprint(bp, url_prefix=\"/api\")`). They're the way to split a Flask app into features (auth, admin, api) without circular imports.",
      },
      {
        difficulty: "medium",
        topic: "State",
        q: "How does Flask handle sessions?",
        a: "By default Flask uses signed cookies — the session dict is serialized, signed with `app.secret_key` and stored in the client cookie. The client can read it but cannot tamper without invalidating the signature. For larger or sensitive data use Flask-Session with a server-side store (Redis, DB).",
      },
      {
        difficulty: "medium",
        topic: "Patterns",
        q: "Why is the application factory pattern recommended?",
        a: "A `create_app()` function constructs and configures a fresh `Flask` instance. This avoids module-level globals that bind config at import time, makes testing simpler (each test gets a clean app with test config), and is required for extensions like Flask-SQLAlchemy that should be initialized once per app.",
      },
      {
        difficulty: "medium",
        topic: "Errors",
        q: "How do you handle errors and return JSON for an API?",
        a: "Register handlers with `@app.errorhandler(404)` or `@app.errorhandler(MyException)` and return `jsonify(...)`, status. Or raise `werkzeug.exceptions.HTTPException` subclasses for standard codes. Returning a dict from a view in Flask 1.1+ auto-jsonifies it.",
      },
      {
        difficulty: "hard",
        topic: "Deployment",
        q: "Why don't you run `app.run()` in production?",
        a: "`app.run()` starts Werkzeug's dev server: single-threaded by default, no graceful reload, no process management, debug-mode security risks. In production use a WSGI server — Gunicorn or uWSGI — behind a reverse proxy (nginx) for TLS, static files and buffering.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "Flask is sync. How do you scale it?",
        a: "Scale horizontally with multiple Gunicorn workers (≈ 2×cores + 1) behind a load balancer. Use gevent/eventlet workers for many concurrent slow I/O connections. Cache (Redis, CDN) and offload long jobs to a queue (Celery, RQ). For native async, FastAPI is the modern alternative.",
      },
      {
        difficulty: "hard",
        topic: "Security",
        q: "How does Flask protect against CSRF?",
        a: "Flask core does not — CSRF protection is added by Flask-WTF / Flask-SeaSurf. They embed a per-session token in forms and validate it on POST. For JSON APIs you typically rely on a token-based auth header (which CSRF-attacking pages cannot forge), and set `SameSite=Lax/Strict` on session cookies.",
      },
    ],
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    oneLiner:
      "Algorithms that learn patterns from data so a system can predict, classify or cluster without being explicitly programmed for each case.",
    proficiency: 0.3,
    aliases: ["machine learning", "ml", "xgboost", "scikit-learn"],
    docFile: "machine-learning.md",
    interestingFacts: [
      "The term 'machine learning' was coined by Arthur Samuel at IBM in 1959 — his self-playing Checkers program (1956–1962) is arguably the first real ML system, and it learnt by playing itself.",
      "Backpropagation — the algorithm that makes neural nets learnable — was independently rediscovered at least four times before Rumelhart, Hinton & Williams' famous 1986 paper made it mainstream.",
      "AlexNet (2012) won the ImageNet challenge by ~10 percentage points over second place and singlehandedly kicked off the deep-learning era — it was trained on two GTX 580 gaming GPUs in Alex Krizhevsky's bedroom.",
      "Netflix offered a $1,000,000 prize (2006–2009) for a 10% improvement on their recommender; the winning team's algorithm was so complex that Netflix never actually deployed it.",
      "ChatGPT and most modern LLMs are aligned with humans using RLHF — Reinforcement Learning from Human Feedback — meaning the same RL ideas behind Atari-playing bots now shape how every chatbot you use answers questions.",
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Machine_learning",
      "https://en.wikipedia.org/wiki/Arthur_Samuel_(computer_scientist)",
      "https://en.wikipedia.org/wiki/AlexNet",
      "https://en.wikipedia.org/wiki/Netflix_Prize",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "Supervised vs unsupervised vs reinforcement learning?",
        a: "Supervised learning trains on labelled examples (regression/classification). Unsupervised finds structure in unlabelled data (clustering, dimensionality reduction). Reinforcement learning learns a policy by interacting with an environment and receiving rewards.",
      },
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is overfitting and how do you detect it?",
        a: "Overfitting is when a model memorizes the training set and generalizes poorly. Detect it via a large gap between training and validation/test metrics. Mitigate with more data, simpler models, regularization (L1/L2, dropout), early stopping or cross-validation.",
      },
      {
        difficulty: "medium",
        topic: "Theory",
        q: "Explain the bias-variance tradeoff.",
        a: "Bias is error from wrong assumptions (model too simple → underfit). Variance is error from sensitivity to training data (model too complex → overfit). Total error roughly = bias² + variance + irreducible noise. Increasing model capacity reduces bias but raises variance, so we tune for the sweet spot.",
      },
      {
        difficulty: "medium",
        topic: "Evaluation",
        q: "Precision, recall, F1 — when do you care about which?",
        a: "Precision = TP / (TP + FP), recall = TP / (TP + FN), F1 = harmonic mean of the two. Use precision when false positives are costly (spam filter), recall when false negatives are costly (cancer screening, fraud), F1 when you want a single balanced score and classes are imbalanced.",
      },
      {
        difficulty: "medium",
        topic: "Evaluation",
        q: "What does ROC-AUC measure and when is PR-AUC better?",
        a: "ROC-AUC is the probability the model ranks a random positive higher than a random negative across all thresholds. It can look misleadingly high on heavily imbalanced data because the negative class dominates. PR-AUC (precision-recall curve) focuses on the positive class and is the better metric for rare-event problems.",
      },
      {
        difficulty: "medium",
        topic: "Regularization",
        q: "Difference between L1 and L2 regularization?",
        a: "L1 (Lasso) adds the sum of absolute weights to the loss — drives weights to exactly zero, doing implicit feature selection. L2 (Ridge) adds the sum of squared weights — shrinks weights toward zero but rarely to zero, smoothing the model. ElasticNet combines both.",
      },
      {
        difficulty: "medium",
        topic: "Tree models",
        q: "Random Forest vs Gradient Boosting (XGBoost)?",
        a: "Random Forest builds many deep trees independently in parallel on bootstrapped data and averages them (bagging) — robust, low-tuning, harder to overfit. Gradient Boosting builds trees sequentially where each tree corrects the previous one's residuals — often higher accuracy, more sensitive to hyperparameters, but slower to train. XGBoost/LightGBM are highly optimized GBDT implementations.",
      },
      {
        difficulty: "medium",
        topic: "Validation",
        q: "What is k-fold cross-validation and why use it?",
        a: "Split the data into k folds, train on k-1 and validate on the held-out fold, rotating k times and averaging the metric. It gives a more reliable performance estimate than a single train/val split and uses all data for both training and validation. Use stratified k-fold for classification to preserve class ratios.",
      },
      {
        difficulty: "hard",
        topic: "Imbalance",
        q: "How do you handle class imbalance?",
        a: "Several options, often combined: resample (SMOTE oversampling, random undersampling), use class weights (`class_weight='balanced'`), pick threshold by validation-set precision/recall, or change the metric (F1, PR-AUC) so the model is optimised for the rare class.",
      },
      {
        difficulty: "hard",
        topic: "Data",
        q: "What is data leakage and how do you prevent it?",
        a: "Leakage is when information from outside the training distribution sneaks into training — e.g. fitting a scaler on the full dataset before the train/test split, or using a feature that is only known after the label. Prevent it by fitting any preprocessing inside a `Pipeline` cross-validation, splitting by time for time-series, and auditing each feature for future-information.",
      },
      {
        difficulty: "hard",
        topic: "Production",
        q: "What is concept/data drift and how do you monitor it?",
        a: "Drift is when the input distribution (data drift) or the input→target relationship (concept drift) changes after deployment, degrading model performance. Monitor input feature distributions (PSI, KL divergence) and live metrics; trigger retraining when thresholds are crossed.",
      },
      {
        difficulty: "hard",
        topic: "Theory",
        q: "Generative vs discriminative models?",
        a: "Generative models learn P(X, y) (joint) so they can also sample new data — Naive Bayes, GMMs, GANs, diffusion. Discriminative models learn P(y | X) directly — logistic regression, SVMs, most neural classifiers. Discriminative usually wins on pure prediction; generative wins when you also need to model or generate the data distribution.",
      },
    ],
  },
  {
    slug: "computer-vision",
    name: "Computer Vision",
    oneLiner:
      "Algorithms and models that let machines interpret images and video — detect, classify, track and reason about visual content.",
    proficiency: 0.3,
    aliases: ["computer vision", "cv", "tracking"],
    docFile: "computer-vision.md",
    interestingFacts: [
      "In 1966, MIT's Seymour Papert proposed solving computer vision as a one-summer undergraduate project — known as the 'Summer Vision Project'. It took the field roughly fifty more years to get close.",
      "The first proper computer-vision system was Larry Roberts' 1963 MIT PhD thesis on extracting 3D blocks from 2D images — making him often called the 'father of CV'.",
      "Yann LeCun's LeNet (1989–1998) was the first practical CNN — by 1998 it was reading 10–20% of all handwritten cheques cashed in the United States.",
      "The dataset that made modern CV possible — ImageNet (2009) — was built by Fei-Fei Li's team using ~50,000 Mechanical Turk workers from 167 countries over 2½ years, labelling 14M+ images.",
      "Almost every production CV model today is fine-tuned from an ImageNet- or COCO-pretrained backbone — original-from-scratch training is rare, even at frontier labs.",
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Computer_vision",
      "https://en.wikipedia.org/wiki/AI_winter#The_Summer_Vision_Project",
      "https://en.wikipedia.org/wiki/LeNet",
      "https://www.image-net.org/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "Difference between image classification, object detection and segmentation?",
        a: "Classification gives one label per image. Object detection gives bounding boxes + labels for each object instance. Segmentation gives a per-pixel label — semantic segmentation labels each pixel by class, instance segmentation also separates each object.",
      },
      {
        difficulty: "easy",
        topic: "Convolutions",
        q: "Why CNNs instead of plain fully-connected networks for images?",
        a: "Convolutions exploit two properties of images: locality (nearby pixels are correlated) and translation invariance (a cat looks the same anywhere in the frame). They use shared weights across the image — drastically fewer parameters than a dense layer, faster to train, and better generalization.",
      },
      {
        difficulty: "easy",
        topic: "Metrics",
        q: "What is Intersection over Union (IoU)?",
        a: "IoU = area(predicted ∩ ground-truth) / area(predicted ∪ ground-truth). It ranges 0–1 and measures how well a predicted box overlaps the true box. A detection is typically considered correct if IoU ≥ a threshold (e.g. 0.5).",
      },
      {
        difficulty: "medium",
        topic: "Detection",
        q: "How does YOLO work, and how does it differ from R-CNN?",
        a: "YOLO predicts bounding boxes and class probabilities directly in one forward pass over the whole image (single-stage). R-CNN/Faster R-CNN is two-stage: first a region-proposal network, then a classifier per region. YOLO is much faster and well-suited to real-time, while two-stage detectors traditionally have a small accuracy edge on hard datasets.",
      },
      {
        difficulty: "medium",
        topic: "Post-processing",
        q: "What is Non-Maximum Suppression (NMS)?",
        a: "After detection you usually get many overlapping boxes for the same object. NMS keeps the highest-confidence box, suppresses any other box with IoU above a threshold (commonly 0.5), and repeats. Variants: Soft-NMS (down-weights instead of removing), class-aware NMS (per class).",
      },
      {
        difficulty: "medium",
        topic: "Metrics",
        q: "What is mAP (mean Average Precision)?",
        a: "For each class, compute the precision-recall curve across thresholds, take the area under it (Average Precision), then mean across classes — that's mAP. COCO reports mAP averaged across IoU thresholds from 0.5 to 0.95 in 0.05 steps; PASCAL VOC uses IoU=0.5 only.",
      },
      {
        difficulty: "medium",
        topic: "Detection vs Tracking",
        q: "Object detection vs object tracking — when do you need each?",
        a: "Detection finds objects in one frame independently. Tracking assigns a persistent ID to the same object across frames so you can count, measure trajectory or analyse behaviour. Most pipelines combine the two: detect per frame, then a tracker (SORT, DeepSORT, ByteTrack) associates detections across frames using motion and appearance.",
      },
      {
        difficulty: "medium",
        topic: "Tracking",
        q: "Tracking-by-detection vs joint detection-and-tracking — pros/cons?",
        a: "Tracking-by-detection (SORT/ByteTrack on top of YOLO) is modular and easy to swap models — but each component is optimized independently. Joint approaches (FairMOT, JDE) share a backbone for detection + re-ID embedding, often faster end-to-end and more consistent on dense scenes, but harder to retrain and tune.",
      },
      {
        difficulty: "hard",
        topic: "Anchors",
        q: "Anchor-based vs anchor-free detectors — what changed?",
        a: "Older YOLO/Faster R-CNN use predefined anchor boxes at each spatial location and regress offsets — requires tuning anchor sizes per dataset. Anchor-free detectors (FCOS, CenterNet, modern YOLO versions) predict the object directly from each pixel/location, removing the anchor hyperparameter burden and often simplifying training.",
      },
      {
        difficulty: "hard",
        topic: "Data",
        q: "What augmentations matter most for detection?",
        a: "Geometric: random flip, scale, crop (especially Mosaic in YOLO, which composes 4 images into one to boost small-object diversity). Photometric: brightness, contrast, HSV jitter to combat lighting changes. Mixup/Copy-Paste help on class imbalance. All augmentations must transform the boxes consistently with the image.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "How do you speed up real-time inference?",
        a: "Use a smaller / quantized model (FP16 or INT8), export to an optimized runtime (TensorRT, ONNX Runtime, OpenVINO), batch frames where latency budget allows, downsize input resolution, and skip frames or run detection every N frames while the tracker fills the gaps.",
      },
      {
        difficulty: "hard",
        topic: "Calibration",
        q: "How do you decide a confidence threshold for production?",
        a: "Don't trust the default. Build a labelled validation set that reflects production conditions, sweep thresholds, and pick the one matching your precision/recall target (or your business cost of FP vs FN). Re-check after any model retrain, augmentation change, or scene change — thresholds are dataset-specific.",
      },
    ],
  },

  /* ===== SCAFFOLDED SKILLS — meter + linked projects + placeholders ===== */
  // TODO: ask Claude to expand any of these into a full cheatsheet + Q&A.
  {
    slug: "javascript",
    name: "JavaScript",
    oneLiner:
      "A dynamically-typed, single-threaded language that runs in every browser and on Node.js — the lingua franca of the web.",
    proficiency: 0.3,
    aliases: ["javascript", "js", "ecmascript"],
    docFile: "javascript.md",
    interestingFacts: [
      "JavaScript was written in **10 days** in May 1995 by Brendan Eich at Netscape — and was originally called 'Mocha', then 'LiveScript', before being renamed for marketing to ride Java's hype.",
      "Despite the name, JavaScript and Java have almost nothing in common — the joke is that 'Java is to JavaScript what car is to carpet'.",
      "Every browser ships its own JS engine: V8 (Chrome / Edge / Node.js), SpiderMonkey (Firefox), JavaScriptCore (Safari) — all of them JIT-compile JS to optimized machine code at runtime.",
      "JavaScript is single-threaded by design — its concurrency model (event loop + microtasks + macrotasks) is the reason `setTimeout(fn, 0)` doesn't run immediately.",
      "ECMAScript (the standard) ships roughly one new edition every year since ES6 (2015) — so 'modern JavaScript' is a moving target on a tight release cadence.",
    ],
    sources: [
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      "https://en.wikipedia.org/wiki/JavaScript",
      "https://tc39.es/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Types",
        q: "What is the difference between `==` and `===`?",
        a: "`==` performs type coercion before comparing (so `\"5\" == 5` is true). `===` is strict equality — same type AND same value, no coercion. Modern style: always use `===` unless you specifically want coercion.",
      },
      {
        difficulty: "easy",
        topic: "Scope",
        q: "`var` vs `let` vs `const` — what changed in ES6?",
        a: "`var` is function-scoped and hoisted as `undefined`. `let` and `const` are block-scoped and hoisted but uninitialized (the 'temporal dead zone' — accessing them before declaration throws). `const` also prevents re-assignment, but the *value* can still be mutated if it's an object/array.",
      },
      {
        difficulty: "medium",
        topic: "Closures",
        q: "What is a closure and where would you use one?",
        a: "A closure is a function that 'remembers' the variables of the scope where it was created, even after that outer scope has finished executing. Classic uses: data privacy (`makeCounter()` keeps a private `count`), partial application, and event-handler factories that capture per-call config.",
      },
      {
        difficulty: "medium",
        topic: "Hoisting",
        q: "What is hoisting, and how does it differ for `var`, `let`, function declarations and expressions?",
        a: "At compile time the JS engine 'hoists' declarations to the top of their scope. `var` is hoisted and initialized to `undefined`. `let`/`const` are hoisted but *not* initialized — the 'temporal dead zone' between hoist and declaration throws on access. Function *declarations* are fully hoisted (callable before the line). Function *expressions* (`const f = function(){}`) follow the variable's rules.",
      },
      {
        difficulty: "medium",
        topic: "Event loop",
        q: "Explain the event loop — what is the difference between the microtask and macrotask queues?",
        a: "JS runs a single thread. The call stack runs sync code. When async work completes, its callback is queued: **microtasks** (Promise `.then`, `queueMicrotask`, `MutationObserver`) and **macrotasks** (`setTimeout`, `setInterval`, I/O). After each macrotask the engine drains the *entire* microtask queue before the next macrotask — which is why a Promise `.then` always runs before a `setTimeout(fn, 0)` scheduled at the same time.",
      },
      {
        difficulty: "medium",
        topic: "this",
        q: "How is `this` determined in an arrow function vs a regular function?",
        a: "A regular function's `this` depends on **how it's called** (method call → object, `new` → new instance, plain call → global / undefined in strict). An arrow function has **no `this` of its own** — it captures `this` from the lexical scope where it was defined. That's why arrow functions are the right choice for callbacks inside class methods.",
      },
      {
        difficulty: "medium",
        topic: "Prototypes",
        q: "What is prototypal inheritance?",
        a: "Every object has an internal `[[Prototype]]` link to another object (`Object.getPrototypeOf(obj)`). Property lookup walks the prototype chain until it finds the property or hits `null`. `class` syntax (ES6+) is sugar over this — methods live on `ClassName.prototype`, shared by all instances.",
      },
      {
        difficulty: "medium",
        topic: "Async",
        q: "Promise vs async/await — when do you use which?",
        a: "`async/await` is syntactic sugar over Promises that makes async code read like sync. Prefer it for sequential awaits. Use raw Promises (`Promise.all`, `Promise.race`, `.then`) when you need to fan-out concurrently, chain transformations, or compose without an enclosing async function.",
      },
      {
        difficulty: "hard",
        topic: "Equality",
        q: "What does `[] == ![]` evaluate to, and why?",
        a: "`true` — because `![]` is `false` (an array is truthy, so `!` flips it). Then `[] == false` triggers coercion: `false` becomes `0`, `[]` becomes `\"\"` then `0` — `0 == 0` is `true`. This is exactly the kind of footgun why teams ban `==`.",
      },
      {
        difficulty: "hard",
        topic: "Memory",
        q: "What are memory leaks in JS and how do you avoid them?",
        a: "Common causes: forgotten timers/intervals, detached DOM nodes still referenced by JS, closures keeping large scopes alive, global variables. Avoid via: clearing timers on unmount, using `WeakMap`/`WeakSet` for object metadata, and DevTools' memory profiler to spot retained trees.",
      },
      {
        difficulty: "hard",
        topic: "Modules",
        q: "ES modules vs CommonJS — key differences?",
        a: "**ESM** (`import`/`export`): static, tree-shakeable, async-loaded, file extension required in Node. **CommonJS** (`require`/`module.exports`): dynamic, synchronous, Node's original module system. ESM is the modern standard; CommonJS persists in old npm packages and Node's `*.cjs` files.",
      },
      {
        difficulty: "hard",
        topic: "Patterns",
        q: "Debouncing vs throttling?",
        a: "Both rate-limit function calls. **Debounce** waits until the calls stop for X ms then fires once (search-as-you-type — fire after the user stops typing). **Throttle** lets at most one call through every X ms (scroll/resize handlers — fire at most 10 times/sec).",
      },
    ],
  },
  {
    slug: "csharp",
    name: "C#",
    oneLiner:
      "A statically-typed, object-oriented language designed by Microsoft for the .NET runtime — strong tooling, mature ecosystem, top-tier async.",
    proficiency: 0.2,
    aliases: ["c#", "csharp"],
    docFile: "csharp.md",
    interestingFacts: [
      "C# was designed in 1999–2000 by Anders Hejlsberg at Microsoft — the same person who created Turbo Pascal, Delphi, and later TypeScript.",
      "The name 'C#' comes from musical notation — the sharp (♯) symbol means 'a half-step higher', positioning it as 'a step up from C/C++'. In code, the `#` is a typographic stand-in for the actual sharp sign.",
      "C# was the first mainstream language to ship `async`/`await` (C# 5.0, 2012) — JavaScript, Python, Rust and others all picked the same syntax later.",
      "Since .NET 5 (2020), C# is fully cross-platform and open-source under the MIT license — the same language now runs on Windows, Linux, macOS, iOS, Android and WebAssembly.",
      "Unity's entire scripting layer is C# — meaning a huge chunk of mobile/PC games (Pokémon Go, Hollow Knight, Cities: Skylines, Genshin Impact) ship gameplay logic written in C#.",
    ],
    sources: [
      "https://learn.microsoft.com/en-us/dotnet/csharp/",
      "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)",
      "https://github.com/dotnet/csharplang",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Types",
        q: "Value type vs reference type — what's the difference?",
        a: "**Value types** (`int`, `bool`, `struct`, `enum`) are stored on the stack and assignment copies the whole value. **Reference types** (`class`, `string`, `array`, `interface`) live on the heap and assignment copies the reference. So mutating a struct in a method doesn't affect the caller; mutating a class object does.",
      },
      {
        difficulty: "easy",
        topic: "OOP",
        q: "What's the difference between an `interface` and an `abstract class`?",
        a: "An **interface** is a pure contract (in modern C# 8+ it can have default methods, but no state). A class can implement many interfaces. An **abstract class** can hold state, constructors, fields and shared implementation — but a class can only inherit one. Use interfaces for capability, abstract classes for shared base behaviour.",
      },
      {
        difficulty: "easy",
        topic: "Memory",
        q: "How does garbage collection work in .NET?",
        a: ".NET uses a **generational GC** — Gen 0 (new objects, collected often), Gen 1 (survivors), Gen 2 (long-lived, expensive to collect). Most objects die young (the 'generational hypothesis'), so collecting Gen 0 is cheap and frequent. The runtime triggers GC automatically when allocation pressure crosses thresholds.",
      },
      {
        difficulty: "medium",
        topic: "Async",
        q: "How does `async`/`await` actually work under the hood?",
        a: "The compiler rewrites your `async` method into a **state machine**. Each `await` becomes a checkpoint that captures local state and the synchronization context, releases the thread back to the pool, and resumes the method when the awaited task completes. No new thread per call — that's why async scales for I/O.",
      },
      {
        difficulty: "medium",
        topic: "Async",
        q: "When should you NOT use `async`/`await`?",
        a: "For pure CPU-bound work — `async/await` is for I/O concurrency, not parallelism. CPU-bound work needs `Task.Run` to offload to a thread-pool thread. Also never wrap a sync I/O call in `Task.Run` — it just wastes a thread that's still blocked. And never call `.Result` / `.Wait()` in UI/ASP.NET contexts — it can deadlock.",
      },
      {
        difficulty: "medium",
        topic: "LINQ",
        q: "What is LINQ and what's the difference between `IEnumerable` and `IQueryable`?",
        a: "**LINQ** (Language-INtegrated Query) lets you query collections with SQL-like syntax (`from x in list where x.Age > 18 select x`). **`IEnumerable<T>`** executes in-memory in C#. **`IQueryable<T>`** builds an expression tree the provider (EF Core, etc.) translates to SQL — filtering happens *on the database*, not in memory.",
      },
      {
        difficulty: "medium",
        topic: "Errors",
        q: "What's the difference between `throw` and `throw ex` inside a catch?",
        a: "`throw;` rethrows the original exception preserving the full stack trace. `throw ex;` resets the stack trace to the rethrow point — destroying the trail back to the original failure. Always prefer `throw;` (or wrap in a new exception with `throw new MyEx(\"...\", ex)`).",
      },
      {
        difficulty: "medium",
        topic: "OOP",
        q: "`virtual`, `override`, `new`, `abstract` — when do you use which?",
        a: "**`virtual`** on a base method allows derived classes to override it. **`override`** in a derived class actually does the override. **`new`** *shadows* a base member (compile-time, not polymorphic — usually a code smell). **`abstract`** declares a method without an implementation, forcing derived classes to provide one (and the class itself must be `abstract`).",
      },
      {
        difficulty: "hard",
        topic: "Dispose",
        q: "What is `IDisposable` and how does `using` work?",
        a: "`IDisposable` is the contract for releasing unmanaged resources (file handles, DB connections, sockets). `using (var x = new Stream(...))` is sugar for `try { ... } finally { x.Dispose(); }`. C# 8+ adds `using var x = ...;` — the variable is disposed when it goes out of scope. The GC won't reliably free unmanaged resources on its own.",
      },
      {
        difficulty: "hard",
        topic: "Records",
        q: "What are `record` types and why use them?",
        a: "Introduced in C# 9, `record` is a reference type with built-in **value-based equality** (two records with the same field values are equal), `with` expressions for non-destructive mutation, and concise positional syntax. Great for DTOs, domain events, and any 'data carrier' type where identity = data.",
      },
      {
        difficulty: "hard",
        topic: "Patterns",
        q: "Difference between `Task` and `ValueTask`?",
        a: "`Task` is a reference type — allocated on the heap, suitable for long-running async work. `ValueTask` is a struct — avoids heap allocation when the operation completes synchronously (e.g. a cache hit). Use `ValueTask` for hot paths where most calls return immediately; otherwise default to `Task`.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "What is `Span<T>` and why was it added?",
        a: "`Span<T>` (C# 7.2, 2017) is a stack-only struct representing a contiguous region of memory — array slice, string slice, stackalloc buffer, native memory. It lets you slice and process buffers **without allocating** — huge win for parsers, serializers and high-throughput I/O. Restriction: it can't be stored on the heap (no fields in classes).",
      },
    ],
  },
  {
    slug: "sql",
    name: "SQL",
    oneLiner:
      "A declarative query language for relational databases — you describe WHAT data you want, the engine figures out HOW to fetch it.",
    proficiency: 0.6,
    aliases: ["sql", "tsql", "psql"],
    docFile: "sql.md",
    interestingFacts: [
      "SQL was created at IBM in the early 1970s by Donald D. Chamberlin and Raymond F. Boyce — and was originally called **SEQUEL** ('Structured English Query Language') before being renamed for trademark reasons.",
      "Despite being from 1974, SQL remains the most-used database language in the world — it's been on the StackOverflow developer survey's Top 5 for over a decade running.",
      "Every major SQL dialect (PostgreSQL, MySQL, SQL Server, Oracle, SQLite) is *almost* the same — but each has its own quirks (window function syntax, NULL handling, date types) that make 'portable' SQL hard.",
      "The SQL standard explicitly says NULL is **not equal** to NULL — `NULL = NULL` returns NULL (not true), which is the single biggest source of subtle SQL bugs.",
      "Modern PostgreSQL and SQLite can handle JSON, full-text search, geospatial data and even vector embeddings — making 'relational' databases way more flexible than the textbook image.",
    ],
    sources: [
      "https://en.wikipedia.org/wiki/SQL",
      "https://www.postgresql.org/docs/current/",
      "https://dev.mysql.com/doc/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Joins",
        q: "Difference between INNER JOIN, LEFT JOIN and FULL OUTER JOIN?",
        a: "**INNER JOIN** returns only rows that match on both sides. **LEFT JOIN** returns every row from the left table plus matching rows from the right (NULLs where no match). **FULL OUTER JOIN** returns every row from both tables, NULLs where no match. RIGHT JOIN exists too but most people just swap the table order and use LEFT.",
      },
      {
        difficulty: "easy",
        topic: "Aggregation",
        q: "What's the difference between WHERE and HAVING?",
        a: "`WHERE` filters **rows** before grouping; `HAVING` filters **groups** after `GROUP BY` (so you can use aggregate functions like `COUNT(*) > 5` in `HAVING`, but not in `WHERE`). Order of evaluation: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.",
      },
      {
        difficulty: "easy",
        topic: "Keys",
        q: "Primary key vs unique constraint vs foreign key?",
        a: "**Primary key**: uniquely identifies a row, NOT NULL, one per table. **Unique constraint**: enforces uniqueness on a column or combo, allows NULLs (one in standard SQL; some engines allow many). **Foreign key**: a column whose values must exist as a key in another table — enforces referential integrity.",
      },
      {
        difficulty: "medium",
        topic: "Indexes",
        q: "Clustered vs non-clustered index — what's the difference?",
        a: "A **clustered index** physically orders the table rows by the index key — so the index *is* the data, and you can only have one. A **non-clustered index** is a separate structure that points back to the table — you can have many. Clustered is ideal for range scans and the primary key; non-clustered for selective filter/lookup columns.",
      },
      {
        difficulty: "medium",
        topic: "Normalization",
        q: "What is normalization and why do we do it?",
        a: "Splitting tables to eliminate redundancy and update anomalies — usually up to 3NF: 1NF (atomic columns, no repeating groups), 2NF (no partial dependency on a composite key), 3NF (no transitive dependency — non-keys depend only on the key). The trade-off is more joins on read; OLTP wants normalization, analytics warehouses often *de*-normalize for speed.",
      },
      {
        difficulty: "medium",
        topic: "Subqueries",
        q: "What's the difference between a subquery, a CTE, and a window function?",
        a: "**Subquery**: a SELECT nested inside another query. **CTE** (`WITH name AS (...)`): a named, reusable subquery placed at the top — easier to read, often the right way to express recursive queries. **Window function** (`SUM(x) OVER (PARTITION BY ...)`): aggregates that don't collapse rows — perfect for running totals, ranks, row-over-row deltas.",
      },
      {
        difficulty: "medium",
        topic: "Performance",
        q: "How does an index speed up queries — and when does it HURT?",
        a: "An index is a sorted (B-tree) or hashed structure on a column, so the engine can find rows in O(log n) instead of scanning. It hurts on **writes** (every INSERT/UPDATE/DELETE must also update every index) and on **low-cardinality columns** (an index on a boolean is rarely useful). Rule: index frequent WHERE/JOIN columns, not every column.",
      },
      {
        difficulty: "medium",
        topic: "NULL",
        q: "Why does `WHERE x = NULL` never return rows?",
        a: "SQL treats NULL as 'unknown', and `unknown = unknown` is *also* unknown — not true. So the row gets filtered out. To find NULLs you must use `WHERE x IS NULL`. Same logic breaks `NOT IN (subquery)` if the subquery returns any NULL — use `NOT EXISTS` instead.",
      },
      {
        difficulty: "hard",
        topic: "ACID",
        q: "Explain ACID. Why does it matter?",
        a: "**Atomicity** (all-or-nothing per transaction), **Consistency** (constraints always hold), **Isolation** (concurrent txns don't corrupt each other), **Durability** (committed data survives crashes). Together they're the foundation of trustworthy OLTP — without them, banking, inventory, anything money-shaped is unsafe.",
      },
      {
        difficulty: "hard",
        topic: "Isolation",
        q: "What are the SQL isolation levels?",
        a: "Four standard levels: **READ UNCOMMITTED** (dirty reads possible), **READ COMMITTED** (default in most engines — no dirty reads, but non-repeatable reads), **REPEATABLE READ** (no non-repeatable reads, but phantom rows possible), **SERIALIZABLE** (full serial-equivalent — slowest). Postgres defaults to READ COMMITTED; SQL Server to the same; MySQL InnoDB to REPEATABLE READ.",
      },
      {
        difficulty: "hard",
        topic: "Optimization",
        q: "How do you debug a slow query?",
        a: "Run `EXPLAIN` (or `EXPLAIN ANALYZE` in Postgres) to see the planner's chosen execution plan. Watch for full table scans on big tables, missing indexes (Seq Scan / Table Scan), hash joins on huge intermediates, and bad row estimates (caused by stale statistics — `ANALYZE` to refresh). Fixes: add an index, rewrite a correlated subquery to a JOIN, partition, or denormalize.",
      },
      {
        difficulty: "hard",
        topic: "Window functions",
        q: "Write a query to find the second-highest salary per department.",
        a: "Use a window function with `DENSE_RANK`:\n```sql\nSELECT department, employee, salary FROM (\n  SELECT department, employee, salary,\n         DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rk\n  FROM employees\n) t WHERE rk = 2;\n```\nUse `DENSE_RANK` (not `RANK`) so two #1s don't skip the #2 slot.",
      },
    ],
  },
  {
    slug: "html-css",
    name: "HTML/CSS",
    oneLiner:
      "The structural & presentational backbone of every web page — HTML describes meaning, CSS describes appearance.",
    proficiency: 0.6,
    aliases: ["html", "css", "html/css", "html5", "css3"],
    docFile: "html-css.md",
    interestingFacts: [
      "HTML was invented in 1989 at CERN by Tim Berners-Lee — and the first website (`info.cern.ch`) is still online today, restored to its original 1991 form.",
      "CSS was proposed by Håkon Wium Lie in **1994** but didn't become a W3C recommendation until 1996 — for the first ~5 years of the web, developers styled pages with `<font>` tags and table-based layouts.",
      "Flexbox shipped in browsers around 2012–2013 and CSS Grid in 2017 — before that, *centering a div* was genuinely hard and the source of countless StackOverflow questions.",
      "HTML5's `<canvas>` element is what powers most of the in-browser games, charts, and creative coding sites you've ever used — including most of Figma's rendering.",
      "Modern CSS now ships features that used to require Sass/Less: nesting (2023), `:has()` parent selector (2023+), container queries (2023), and `@layer` cascade layers — vanilla CSS is closing the gap with preprocessors.",
    ],
    sources: [
      "https://developer.mozilla.org/en-US/docs/Web/HTML",
      "https://developer.mozilla.org/en-US/docs/Web/CSS",
      "https://en.wikipedia.org/wiki/HTML",
      "https://en.wikipedia.org/wiki/Cascading_Style_Sheets",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "HTML",
        q: "What is semantic HTML and why does it matter?",
        a: "Semantic tags (`<header>`, `<main>`, `<article>`, `<nav>`, `<section>`, `<aside>`, `<footer>`) describe the *meaning* of content, not just its layout. Browsers and screen readers use that meaning for accessibility, and search engines use it to understand page structure for SEO. Avoid `<div>` soup when a semantic tag exists.",
      },
      {
        difficulty: "easy",
        topic: "CSS",
        q: "Explain the CSS box model.",
        a: "Every element is a box of four nested layers: **content** (the text/image), **padding** (space inside the border), **border**, and **margin** (space outside). Default `box-sizing: content-box` makes width refer only to content — most teams set `box-sizing: border-box` globally so width includes padding+border (much easier mental math).",
      },
      {
        difficulty: "easy",
        topic: "CSS",
        q: "Difference between `display: none`, `visibility: hidden` and `opacity: 0`?",
        a: "**`display: none`** — element is removed from layout completely (no space taken). **`visibility: hidden`** — invisible but still occupies space. **`opacity: 0`** — fully transparent but still in layout AND still receives pointer events / focus. For accessibility, prefer `display: none` or `hidden` attribute to truly hide.",
      },
      {
        difficulty: "medium",
        topic: "Layout",
        q: "Flexbox vs CSS Grid — when do you use which?",
        a: "**Flexbox** is one-dimensional — lay items along a single row OR column (navbar, button group, card row). **Grid** is two-dimensional — control rows AND columns at the same time (page layouts, image galleries, dashboards). Modern sites use Grid for the page shell and Flexbox for components inside.",
      },
      {
        difficulty: "medium",
        topic: "Specificity",
        q: "How does CSS specificity work?",
        a: "When two rules match the same element, the more specific one wins. Specificity is a 4-tuple `(inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements)` — higher tuple wins. `!important` overrides any specificity (use sparingly). Tied specificity → later rule wins. Inline styles beat selectors.",
      },
      {
        difficulty: "medium",
        topic: "Positioning",
        q: "Difference between `position: relative`, `absolute`, `fixed` and `sticky`?",
        a: "**`relative`** — element stays in flow, offsets nudge it visually. **`absolute`** — removed from flow, positioned against the nearest *positioned* ancestor. **`fixed`** — removed from flow, positioned against the viewport (stays during scroll). **`sticky`** — behaves like `relative` until you scroll past its threshold, then like `fixed` within its parent.",
      },
      {
        difficulty: "medium",
        topic: "Responsive",
        q: "How do media queries work, and what's a 'mobile-first' approach?",
        a: "`@media (min-width: 768px) { ... }` applies rules conditionally on viewport features. **Mobile-first**: write the small-screen styles by default, then layer up with `min-width` queries. This usually yields less CSS than desktop-first (`max-width`) and matches how most users actually load pages.",
      },
      {
        difficulty: "medium",
        topic: "CSS",
        q: "What is the difference between `em` and `rem`?",
        a: "**`em`** is relative to the *parent's* font size — nests/compounds (`1.2em` inside `1.2em` ≈ `1.44em`). **`rem`** is relative to the *root* (`<html>`) font size — predictable, doesn't compound. Modern teams use `rem` for spacing/typography and `em` only where compounding is intentional (e.g. padding inside buttons that scales with their own font size).",
      },
      {
        difficulty: "hard",
        topic: "Accessibility",
        q: "What is ARIA and when should you NOT use it?",
        a: "ARIA (Accessible Rich Internet Applications) adds `role`, `aria-*` attributes to tell screen readers about non-semantic UI. The **first rule of ARIA** (per W3C) is: *don't use ARIA*. Use the native semantic element first — `<button>` is always better than `<div role=\"button\" tabindex=\"0\">`. ARIA is for when no native element fits.",
      },
      {
        difficulty: "hard",
        topic: "CSS",
        q: "Explain CSS custom properties (variables) and when to use them.",
        a: "`--name: value;` declares a variable; `var(--name)` consumes it. Unlike Sass variables (compile-time), CSS variables are *runtime* — you can change them with JS or media queries, which is how every modern dark-mode toggle works. They cascade and inherit, so define brand tokens on `:root` and override per component as needed.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "What is CLS (Cumulative Layout Shift) and how do you avoid it?",
        a: "CLS is a Core Web Vital that measures how much visible content jumps around as the page loads (e.g. a late-loading image pushing text down). Fixes: set explicit `width`/`height` (or `aspect-ratio`) on images and videos, reserve space for ads/embeds, and avoid inserting content above existing content.",
      },
      {
        difficulty: "hard",
        topic: "Modern CSS",
        q: "What is the `:has()` selector and why is it a big deal?",
        a: "`:has()` (widely supported since 2023) is the first true 'parent selector' in CSS — `article:has(img)` selects articles that contain an image. Before `:has()` this required JavaScript. It unlocks conditional styling based on descendants/siblings — a huge expressive boost.",
      },
    ],
  },
  {
    slug: "react",
    name: "React.js",
    oneLiner:
      "A component-based UI library by Meta that uses a virtual DOM + reactive state to keep your interface in sync with your data.",
    proficiency: 0.4,
    aliases: ["react.js", "react", "reactjs"],
    docFile: "react.md",
    interestingFacts: [
      "React was created by Jordan Walke at Facebook in 2011 and open-sourced in 2013 at JSConf US — the audience initially booed JSX (mixing HTML in JavaScript looked heretical) before it became the dominant frontend pattern.",
      "React's name is from the **'reactive data flow'** idea — UI is a *function* of state, and changes flow one direction (top-down), unlike two-way binding frameworks of the early 2010s.",
      "JSX is **not part of JavaScript** — it's a Meta-proposed syntax extension transpiled to `React.createElement(...)` calls by Babel or SWC. Every `<div>` you write is sugar for a function call.",
      "React 18 (2022) introduced **concurrent rendering** — interruptible renders, automatic batching, `<Suspense>` for data fetching. React 19 (2024) added the `use` hook, Actions, and the React Compiler.",
      "Despite popular belief, the virtual DOM isn't 'fast' compared to direct DOM manipulation — it's *predictable*. Frameworks like Svelte and Solid skip it entirely and are often faster; React's win is the programming model.",
    ],
    sources: [
      "https://react.dev/",
      "https://en.wikipedia.org/wiki/React_(software)",
      "https://github.com/facebook/react",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is the Virtual DOM and why does React use it?",
        a: "A lightweight in-memory representation of the real DOM. On state change React builds a new VDOM, **diffs** it against the previous one, and patches only the changed real DOM nodes. The win isn't raw speed — it's a simple mental model (write UI as a function of state) without manual DOM updates.",
      },
      {
        difficulty: "easy",
        topic: "JSX",
        q: "What is JSX and how does it work under the hood?",
        a: "JSX is a syntax extension that looks like HTML but compiles down to `React.createElement(type, props, ...children)` calls (via Babel/SWC). So `<div className=\"x\">hi</div>` becomes `React.createElement('div', {className:'x'}, 'hi')`. The compiled output is plain JS — JSX is not magic, it's a transpiled function call.",
      },
      {
        difficulty: "easy",
        topic: "Hooks",
        q: "What does `useState` return and how do you update state correctly?",
        a: "`useState(initial)` returns `[value, setValue]`. Updates are **asynchronous** and **batched** — never trust `value` to be updated on the next line. If the new state depends on the old, use the functional form: `setCount(c => c + 1)` (otherwise you race in async handlers).",
      },
      {
        difficulty: "medium",
        topic: "Hooks",
        q: "Explain `useEffect`'s dependency array and the three modes.",
        a: "**No array** → runs after every render. **Empty array `[]`** → runs once after mount, cleanup on unmount. **`[a, b]`** → runs after every render where `a` or `b` changed. The cleanup function (return value) runs before the next effect AND on unmount — use it for unsubscribe, clearTimeout, abortController.",
      },
      {
        difficulty: "medium",
        topic: "Hooks",
        q: "What are the **Rules of Hooks**?",
        a: "1) Only call hooks at the **top level** — never inside loops, conditions, or nested functions (React relies on stable call order to track them). 2) Only call hooks from **React function components or other hooks** (not regular JS functions). The `react-hooks` ESLint plugin enforces both.",
      },
      {
        difficulty: "medium",
        topic: "Performance",
        q: "When should you use `useMemo` / `useCallback` / `React.memo`?",
        a: "Sparingly. `useMemo` caches an expensive computation, `useCallback` caches a function reference, `React.memo` skips re-render when props are shallowly equal. Use only when profiling shows a real bottleneck — they have their own cost (deps array comparisons, memory). Default to clean code; optimize on evidence.",
      },
      {
        difficulty: "medium",
        topic: "Keys",
        q: "Why do React lists need a `key` prop?",
        a: "Keys help React's diff algorithm match elements between renders — without stable keys, the diff falls back to index, causing stale state or wrong re-renders on reorder. Use a stable, unique ID per item (`item.id`), never the array index unless the list is static and never reorders.",
      },
      {
        difficulty: "medium",
        topic: "State",
        q: "When do you reach for Context vs a state library (Redux/Zustand/Jotai)?",
        a: "Context is fine for **rarely-changing, global-ish state** (theme, auth, locale). It causes every consumer to re-render on every change — bad for high-churn state. For that, use Zustand/Jotai/Redux Toolkit, which let components subscribe to slices of state.",
      },
      {
        difficulty: "hard",
        topic: "Concurrent",
        q: "What did **React 18's concurrent rendering** change?",
        a: "Rendering became **interruptible**: React can pause work, prioritise urgent updates (input, click), and resume the rest. `useTransition` marks updates as non-urgent so a slow render doesn't block the UI. `<Suspense>` for data fetching, automatic batching across promises/timeouts, and `useDeferredValue` all build on this.",
      },
      {
        difficulty: "hard",
        topic: "SSR",
        q: "CSR vs SSR vs SSG vs RSC — what's the difference?",
        a: "**CSR**: bundle ships, browser fetches data + renders. **SSR**: server renders HTML per request. **SSG**: HTML built at build time. **RSC** (React Server Components, React 19+): components run on the server only — never ship to the client — drastically cutting bundle size. Next.js App Router uses RSC by default.",
      },
      {
        difficulty: "hard",
        topic: "Hooks",
        q: "What does `useRef` actually do — and how is it different from state?",
        a: "`useRef(initial)` returns a mutable `{ current }` object that persists across renders **without triggering re-renders** on mutation. Use it for DOM nodes (`ref={myRef}`), values you need to read in effects without causing re-renders, timer IDs, prev-value snapshots. State triggers re-renders; refs don't.",
      },
      {
        difficulty: "hard",
        topic: "React 19",
        q: "What's the React 19 `use` hook and why does it matter?",
        a: "`use(promise)` lets a component **await a Promise (or read a Context) inline** — it suspends rendering until the value resolves and integrates with `<Suspense>`. It's the foundation of streaming + RSC data flow; you can call it conditionally (unlike other hooks). Available in React 19+, also `use(Context)` works the same as `useContext`.",
      },
    ],
  },
  {
    slug: "streamlit",
    name: "Streamlit",
    oneLiner:
      "A Python framework that turns scripts into interactive web apps — write top-to-bottom Python, get a UI for free.",
    proficiency: 0.6,
    aliases: ["streamlit"],
    docFile: "streamlit.md",
    interestingFacts: [
      "Streamlit was created by ex-Google engineers Adrien Treuille, Thiago Teixeira and Amanda Kelly in 2018 — purpose-built so data scientists could ship apps **without learning Flask, HTML, CSS or JS**.",
      "**Snowflake acquired Streamlit in March 2022 for ~$800 million** — proof that 'turn a Python script into a web app' is a multi-billion-dollar market.",
      "Streamlit's core trick: the entire script **re-runs top-to-bottom on every interaction**, and the framework figures out what changed. That's why state needs `st.session_state` and expensive ops need `@st.cache_data`.",
      "Over **75% of Fortune 50 companies** use Streamlit for internal dashboards, per Streamlit's own numbers — it became the default 'ML demo' framework.",
      "The HuggingFace Spaces gallery hosts tens of thousands of free Streamlit ML demos — many SOTA model papers ship one as a side-by-side comparison tool.",
    ],
    sources: [
      "https://docs.streamlit.io/",
      "https://en.wikipedia.org/wiki/Streamlit",
      "https://blog.streamlit.io/snowflake-to-acquire-streamlit/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is Streamlit and what problem does it solve?",
        a: "An open-source Python framework that turns a `.py` script into an interactive web app — no HTML/CSS/JS, no Flask routing. Ideal for ML model demos, internal data tools, and dashboards where the audience is technical and the iteration speed matters more than design polish.",
      },
      {
        difficulty: "easy",
        topic: "Execution",
        q: "How does Streamlit's execution model work?",
        a: "The entire script **re-runs top-to-bottom on every user interaction** (button click, slider move, text input). Streamlit tracks widget values and diffs the rendered output. This 'rerun the world' model is dead simple to reason about, but means expensive ops need caching.",
      },
      {
        difficulty: "easy",
        topic: "Widgets",
        q: "How do you collect user input?",
        a: "Use widget functions: `st.slider(\"Age\", 0, 100)`, `st.text_input(\"Name\")`, `st.selectbox(\"Pick\", options)`, `st.file_uploader()`. They return the current value; using that return value in the rest of the script makes it reactive.",
      },
      {
        difficulty: "medium",
        topic: "State",
        q: "What is `st.session_state` and why do you need it?",
        a: "A dict-like object that **survives across reruns** for a given user session. Since the script reruns from the top on every interaction, normal Python variables reset; persistent state (login, multi-step forms, counters) lives in `st.session_state['key']`.",
      },
      {
        difficulty: "medium",
        topic: "Caching",
        q: "`@st.cache_data` vs `@st.cache_resource` — when to use which?",
        a: "**`@st.cache_data`**: caches *return values* (DataFrames, dicts, JSON) — they're copied per session. Use for expensive loads, API calls, computations. **`@st.cache_resource`**: caches *singletons* (DB connections, ML models, large objects) — shared across sessions, **not** copied. Use for things that are expensive to construct AND safe to share.",
      },
      {
        difficulty: "medium",
        topic: "Layout",
        q: "How do you build multi-column or sidebar layouts?",
        a: "`st.columns(n)` returns column objects you write into: `col1, col2 = st.columns(2); col1.write(...)`. `st.sidebar.write(...)` (or `with st.sidebar:`) puts widgets in the left sidebar. `st.tabs([\"A\",\"B\"])`, `st.expander(...)` and `st.container()` cover the rest.",
      },
      {
        difficulty: "medium",
        topic: "Forms",
        q: "Why use `st.form` instead of bare widgets?",
        a: "Inside a `with st.form(\"f\"):` block, widgets do NOT trigger a rerun on every keystroke — only the form's `st.form_submit_button` does. Great for multi-field inputs (login, filter panels) where you want all values submitted atomically, not on every interaction.",
      },
      {
        difficulty: "medium",
        topic: "Deploy",
        q: "How is a Streamlit app deployed?",
        a: "Locally: `streamlit run app.py`. Production: **Streamlit Community Cloud** (free, git-push to deploy), or Docker + cloud VM, or a PaaS like Render / Hugging Face Spaces. Behind a reverse proxy, set `--server.baseUrlPath` and enable websockets — Streamlit needs them for live updates.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "Why is my Streamlit app slow on every click — and how do you fix it?",
        a: "Because the *entire script reruns*. Diagnose: wrap expensive functions with `@st.cache_data` / `@st.cache_resource`; check that big DataFrames aren't re-fetched per rerun; use `st.fragment` (Streamlit 1.32+) to rerun only part of the app; move CPU-heavy compute behind a button so it doesn't fire on slider drags.",
      },
      {
        difficulty: "hard",
        topic: "vs alternatives",
        q: "When would you NOT pick Streamlit?",
        a: "When the audience is non-technical and the UI needs to look polished (use a real frontend), when you need fine-grained UI control (CSS animations, complex layouts), when you need multi-user with auth/RBAC (Streamlit's auth story is thin), or when traffic is huge (each session holds a websocket; scale is more limited than a stateless FastAPI app).",
      },
      {
        difficulty: "hard",
        topic: "Multi-page",
        q: "How do you build a multi-page app?",
        a: "Create a `pages/` directory next to your main script: `app.py`, `pages/1_Home.py`, `pages/2_Settings.py`. Streamlit auto-detects them and renders a sidebar nav. Filenames become page labels (with `_` → space). Alternatively, the newer `st.navigation` + `st.Page` API (1.36+) gives programmatic control.",
      },
      {
        difficulty: "hard",
        topic: "Internals",
        q: "What does `st.experimental_rerun()` / `st.rerun()` do, and when do you need it?",
        a: "Manually triggers a script rerun from the next line. Useful after mutating `st.session_state` in a callback or after a long background task finishes — when you want the UI to refresh without a user interaction. Renamed from `experimental_rerun` to `st.rerun` in modern versions.",
      },
    ],
  },
  {
    slug: "django",
    name: "Django",
    oneLiner:
      "A 'batteries-included' Python web framework — ORM, admin, auth, migrations, templating all shipped together, on the MTV pattern.",
    proficiency: 0.6,
    aliases: ["django"],
    docFile: "django.md",
    interestingFacts: [
      "Django was extracted from the **Lawrence Journal-World newspaper's web team** in 2003 and open-sourced in 2005 — it was named after jazz guitarist **Django Reinhardt**.",
      "Django's free **admin site** is its single most-loved feature — generated from your models in seconds, it's the reason newsrooms, NGOs, and startups pick Django for internal tools.",
      "Instagram (originally), Pinterest, Disqus, Mozilla, NASA and **The Washington Post** all ran on Django at scale — proving 'monolith Django' can power top-1000 traffic sites.",
      "Django 3.0 (2019) added **ASGI / async support**, Django 4.1+ has native async views and ORM. The decade-old 'Django is sync-only' criticism is no longer true.",
      "The Django Software Foundation is a 501(c)(3) non-profit — Django itself has no commercial 'enterprise edition'; every feature is in the same open-source codebase.",
    ],
    sources: [
      "https://docs.djangoproject.com/",
      "https://en.wikipedia.org/wiki/Django_(web_framework)",
      "https://www.djangoproject.com/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Architecture",
        q: "Explain Django's MTV pattern.",
        a: "Django calls itself **Model-Template-View** — analogous to MVC but the framework is the 'controller'. **Model** = data layer (ORM classes). **Template** = presentation (HTML with `{{ var }}` and `{% tag %}`). **View** = function/class that takes a request and returns a response (in MVC terms it's the controller; the 'view' name comes from publishing tradition).",
      },
      {
        difficulty: "easy",
        topic: "ORM",
        q: "What is the Django ORM and how do you query it?",
        a: "An object-relational mapper — define models as Python classes; Django generates SQL. Query with QuerySets: `User.objects.filter(active=True).exclude(country='US').order_by('-joined')[:10]`. QuerySets are **lazy** — they don't hit the DB until iterated, sliced, or `.count()`-ed.",
      },
      {
        difficulty: "easy",
        topic: "Admin",
        q: "What is the Django admin and why is it special?",
        a: "An auto-generated CRUD admin UI for your models — register a class in `admin.py` and Django builds a list view, search, filters, edit forms, permissions. Other frameworks need extensions or extra apps for this; Django ships it in core.",
      },
      {
        difficulty: "medium",
        topic: "Migrations",
        q: "How do Django migrations work?",
        a: "Change a model → `manage.py makemigrations` generates a Python file in `<app>/migrations/` describing the schema change → `manage.py migrate` applies it. Migrations are tracked in the `django_migrations` table, so each one runs exactly once. Always check generated migrations into git.",
      },
      {
        difficulty: "medium",
        topic: "Middleware",
        q: "What is middleware and where does it sit?",
        a: "A chain of classes/functions that wrap every request/response. Each middleware gets a chance to inspect or modify the request before the view runs, and the response on the way back. Built-ins: `SecurityMiddleware`, `SessionMiddleware`, `AuthenticationMiddleware`, `CsrfViewMiddleware`. Order in `MIDDLEWARE` matters.",
      },
      {
        difficulty: "medium",
        topic: "Signals",
        q: "What are Django signals and when do you use them?",
        a: "A publish-subscribe system — `post_save`, `pre_delete`, `user_logged_in`, etc. emit events; you connect receivers via `@receiver(post_save, sender=MyModel)`. Useful for cross-cutting concerns (cache invalidation, audit logs). Caveat: they hide control flow — overuse makes code hard to trace.",
      },
      {
        difficulty: "medium",
        topic: "Performance",
        q: "How do you avoid the N+1 query problem in Django?",
        a: "Use **`select_related('fk')`** for forward foreign keys (single JOIN) and **`prefetch_related('reverse')`** for reverse FK / many-to-many (separate query + Python-side join). Watch your DB log in `DEBUG`; tools like django-debug-toolbar make N+1 obvious.",
      },
      {
        difficulty: "medium",
        topic: "Class vs function views",
        q: "Function-based views vs class-based views — when do you use which?",
        a: "**FBVs** are simpler and explicit — great for one-off endpoints. **CBVs** (`ListView`, `DetailView`, `CreateView`) eliminate boilerplate for standard CRUD via inheritance and mixins, but the inheritance graph can be hard to follow. Modern community advice: FBVs for unique logic, generic CBVs for plain CRUD.",
      },
      {
        difficulty: "hard",
        topic: "Async",
        q: "How does async work in modern Django?",
        a: "Django 3.0+ supports ASGI; 3.1+ added `async def` views; 4.1+ has async ORM (`User.objects.aget()`, `await qs.acount()`, async cursors). You must run an ASGI server (Daphne, Uvicorn) for the async parts. Sync code is still fully supported via the `sync_to_async` and `async_to_sync` adapters.",
      },
      {
        difficulty: "hard",
        topic: "Security",
        q: "What does Django give you for free against the OWASP Top 10?",
        a: "CSRF protection (token + middleware), XSS-safe templates (auto-escaping), SQL-injection-safe ORM (parametrized queries), strong password hashing (PBKDF2/Argon2), clickjacking protection (`X-Frame-Options: DENY`), and `SecurityMiddleware` (HSTS, XSS filter, etc.). Most issues come from disabling these on purpose.",
      },
      {
        difficulty: "hard",
        topic: "REST",
        q: "Django REST Framework — what does it add?",
        a: "Serializers (declarative Python → JSON converters), generic ViewSets, automatic OpenAPI/browsable API, token + JWT + session auth, throttling, permissions, pagination — everything you'd write by hand if Django alone shipped only the templating side. The de-facto choice for REST APIs in Django.",
      },
      {
        difficulty: "hard",
        topic: "Deployment",
        q: "Walk me through deploying Django to production.",
        a: "1) Run with **Gunicorn** (sync) or **Uvicorn** (async ASGI) — never `runserver`. 2) Reverse-proxy behind **nginx** for TLS, static, gzip. 3) `collectstatic` to S3/CloudFront for static files. 4) `manage.py migrate` in your deploy script. 5) `DEBUG=False`, set `ALLOWED_HOSTS`, secret in env vars. 6) Long jobs via **Celery + Redis/RabbitMQ**.",
      },
    ],
  },
  {
    slug: "dotnet",
    name: ".NET",
    oneLiner:
      "Microsoft's open-source, cross-platform runtime and framework family (CLR + BCL + ASP.NET Core + EF Core) for building anything from APIs to games to ML.",
    proficiency: 0.2,
    aliases: [".net", ".net 8", ".net 9", "dotnet", "asp.net", "asp.net core"],
    docFile: "dotnet.md",
    interestingFacts: [
      "Modern .NET (5+) is **open-source, MIT-licensed, and cross-platform** — runs natively on Windows, Linux, macOS, iOS, Android and WebAssembly. The 'Microsoft Windows-only' image is a decade out of date.",
      ".NET ships an even-numbered **LTS release every 2 years** (.NET 6 → 8 → 10 → ...) — supported for 3 years; odd versions are STS (18 months).",
      "On the **TechEmpower benchmarks**, ASP.NET Core consistently lands in the top 5 web frameworks across all languages — typically out-performing Node.js, Spring, and Django.",
      ".NET 8+ supports **Native AOT** — compile a self-contained binary that boots in **<50 ms** with no JIT, no GC overhead at start. Game-changing for serverless & CLI tools.",
      "Microsoft itself runs Bing, Office 365, Xbox Live, Stack Overflow, and most of the Azure portal on .NET — so 'enterprise-only' criticism doesn't survive contact with their own scale.",
    ],
    sources: [
      "https://learn.microsoft.com/en-us/dotnet/",
      "https://github.com/dotnet/runtime",
      "https://en.wikipedia.org/wiki/.NET",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Runtime",
        q: "What is the CLR?",
        a: "The **Common Language Runtime** — .NET's execution engine. Takes IL (intermediate language) emitted by the C#/F#/VB compilers, JIT-compiles it to native machine code, and manages garbage collection, type safety, exceptions, threading and assembly loading. Same role Java's JVM plays for the JVM ecosystem.",
      },
      {
        difficulty: "easy",
        topic: ".NET vs .NET Framework",
        q: "What's the difference between **.NET Framework** and **.NET (Core)**?",
        a: "**.NET Framework** (1.0 – 4.8): Windows-only, closed history, on maintenance mode. **.NET** (5+, was '.NET Core'): cross-platform, open-source, faster, regular releases. New code should always target modern .NET — Framework only exists for legacy Windows apps.",
      },
      {
        difficulty: "easy",
        topic: "GC",
        q: "How does .NET's garbage collector work at a high level?",
        a: "Generational: Gen 0 (new), Gen 1 (mid-life), Gen 2 (long-lived). Most allocations die in Gen 0, so collecting it is cheap and frequent. Survivors are promoted up. Large objects (>85 KB) go into the **LOH** (Large Object Heap), collected with Gen 2.",
      },
      {
        difficulty: "medium",
        topic: "DI",
        q: "How does built-in dependency injection in ASP.NET Core work?",
        a: "Configure services in `Program.cs`: `builder.Services.AddSingleton<IFoo, Foo>()`, `AddScoped<...>()`, `AddTransient<...>()`. The framework injects them into controllers, minimal-API handlers, or other services via constructors. **Singleton** = one for the app's lifetime. **Scoped** = one per HTTP request. **Transient** = new instance every resolution.",
      },
      {
        difficulty: "medium",
        topic: "Middleware",
        q: "What is middleware in ASP.NET Core?",
        a: "A pipeline of components that process each HTTP request and response. Each can short-circuit, modify, or pass to the next. Configure with `app.UseRouting()`, `app.UseAuthentication()`, `app.UseAuthorization()` in `Program.cs`. Order matters — auth must run before authorization, exception handler usually first.",
      },
      {
        difficulty: "medium",
        topic: "Hosting",
        q: "Kestrel — what is it and how do you deploy ASP.NET Core?",
        a: "**Kestrel** is the high-performance cross-platform web server built into ASP.NET Core. You can run it directly (Linux/Windows), or behind a reverse proxy (nginx/IIS) for TLS termination, request limits and additional security. `dotnet publish` produces a deployable bundle; for containers, the official `mcr.microsoft.com/dotnet/aspnet` image is the base.",
      },
      {
        difficulty: "medium",
        topic: "ORM",
        q: "What is Entity Framework Core?",
        a: "Microsoft's ORM for .NET — model your DB as C# classes, query with LINQ (`db.Users.Where(u => u.Active).ToListAsync()`), translated to SQL. Code-first or DB-first; migrations via `dotnet ef migrations add ...`. Async-first; supports PostgreSQL, SQL Server, SQLite, MySQL via providers.",
      },
      {
        difficulty: "medium",
        topic: "Minimal API",
        q: "What are Minimal APIs (ASP.NET Core 6+)?",
        a: "A reduced-ceremony way to define endpoints right in `Program.cs`: `app.MapGet(\"/users/{id}\", (int id, IUserService svc) => svc.GetAsync(id));`. No controller classes needed. Same performance as MVC, less boilerplate. Best for small APIs/microservices; controllers still win for large, structured codebases.",
      },
      {
        difficulty: "hard",
        topic: "Native AOT",
        q: "What is Native AOT and what does it trade off?",
        a: "**Ahead-of-Time** compilation: at publish time, your app is compiled directly to native machine code — no JIT at startup, no IL. Result: **<50 ms cold start, smaller memory footprint, smaller deploy size**. Trade-offs: no runtime reflection/Emit, no dynamic loading (so ASP.NET MVC isn't fully AOT-friendly yet; Minimal APIs are).",
      },
      {
        difficulty: "hard",
        topic: "Async",
        q: "Why is `ConfigureAwait(false)` important in library code?",
        a: "By default, `await` captures the current **SynchronizationContext** and resumes on it. In ASP.NET Core that's fine (no UI context), but in library code, capturing context risks deadlocks if a caller blocks on `.Result`. `ConfigureAwait(false)` skips the capture — best practice in any reusable library.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "What's `Span<T>` and why does it matter?",
        a: "A stack-only struct representing a contiguous block of memory (array slice, string slice, `stackalloc` buffer, native memory). Lets you slice and process buffers **without allocating** — huge wins for parsers, serializers, high-throughput I/O. Can't be stored on the heap (no fields in classes); for that, use `Memory<T>`.",
      },
      {
        difficulty: "hard",
        topic: "Channels",
        q: "When would you use `System.Threading.Channels`?",
        a: "For high-throughput producer/consumer patterns in-process — `Channel<T>` is a thread-safe queue with built-in async APIs (`WriteAsync`, `ReadAsync`), backpressure (bounded mode blocks producers when full), and excellent perf. Modern replacement for `BlockingCollection<T>` when you want async-first.",
      },
    ],
  },
  {
    slug: "power-bi",
    name: "Power BI",
    oneLiner:
      "Microsoft's business-intelligence platform — connect to data, model it with DAX, build interactive dashboards, publish to the cloud.",
    proficiency: 0.4,
    aliases: ["power bi", "powerbi", "pbi", "dax"],
    docFile: "power-bi.md",
    interestingFacts: [
      "Power BI evolved out of **Excel's PowerPivot/PowerQuery add-ins** (2009–2013) and was released as a standalone product in 2015 — every analyst who knew Excel had a near-zero learning ramp.",
      "It's consistently rated a **Leader in Gartner's Magic Quadrant for Analytics & BI Platforms** for over a decade running — typically ranked #1 alongside Tableau.",
      "The DAX formula language was designed by Microsoft to be **Excel-like on purpose** — so 'SUM' and 'IF' feel familiar, even though under the hood it's a columnar in-memory engine (VertiPaq).",
      "**`CALCULATE` is the most powerful function in DAX** — it's the only function that can modify filter context, and mastering it is widely considered the line between an intermediate and advanced Power BI dev.",
      "Power BI's underlying engine (Analysis Services Tabular + VertiPaq) compresses columnar data so aggressively that **multi-GB models often fit in <500 MB of RAM** — making interactive multi-million-row dashboards possible on a laptop.",
    ],
    sources: [
      "https://learn.microsoft.com/en-us/power-bi/",
      "https://learn.microsoft.com/en-us/dax/",
      "https://en.wikipedia.org/wiki/Microsoft_Power_BI",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What are the main components of Power BI?",
        a: "**Power BI Desktop** (Windows app — model + author reports), **Power BI Service** (powerbi.com cloud — publish, share, schedule refresh), **Power BI Mobile** (consume on phone), **Power Query** (data prep / ETL), **DAX** (formula language), **Power BI Report Server** (on-prem hosting).",
      },
      {
        difficulty: "easy",
        topic: "Components",
        q: "What is Power Query and what does it do?",
        a: "Power Query is the **data-prep / ETL layer** — connects to 100+ sources (SQL, files, web, REST), transforms with a visual editor (filter, pivot, merge, unpivot), and the steps are recorded in **M** (a functional language). Output feeds the data model. Think 'Excel's transform features, but versioned and repeatable'.",
      },
      {
        difficulty: "easy",
        topic: "Data model",
        q: "Star schema vs snowflake schema — which does Power BI prefer?",
        a: "**Star schema** (fact table in the middle + denormalized dimension tables) — strongly preferred for Power BI. The VertiPaq engine is columnar and joins between fact + dim tables are cheap; deeply normalized models (snowflake) hurt both performance and DAX simplicity.",
      },
      {
        difficulty: "medium",
        topic: "DAX",
        q: "What is `CALCULATE` and why is it the most important DAX function?",
        a: "`CALCULATE(<expression>, <filter1>, <filter2>, ...)` evaluates the expression with a **modified filter context** — adding, replacing, or removing filters before the calculation runs. It's the only function that can do this; almost every non-trivial measure (year-over-year, percent of total, what-if) uses it.",
      },
      {
        difficulty: "medium",
        topic: "Context",
        q: "Row context vs filter context — explain the difference.",
        a: "**Row context** = 'I am operating on a single row' — automatically created in calculated columns and inside iterators (`SUMX`, `FILTER`). **Filter context** = 'these filters narrow the table I'm querying' — set by slicers, visual filters, page filters, and `CALCULATE`. Row context does not propagate to other tables automatically; use `RELATED` or wrap in `CALCULATE` to convert.",
      },
      {
        difficulty: "medium",
        topic: "DAX",
        q: "Calculated column vs measure — when do you use which?",
        a: "**Calculated column**: stored in the model, computed at refresh, uses **row context**. Use when you need a value per row (categorisation, key for relationship). Costs memory. **Measure**: computed at query time in the visual's filter context, uses **filter context**. Use for aggregations (Total Sales, % of Total). Cheaper, more flexible — default to measures unless you need a column.",
      },
      {
        difficulty: "medium",
        topic: "DAX",
        q: "What does `RELATED` do, and when do you use `RELATEDTABLE`?",
        a: "**`RELATED(col)`** — in a row context on the *many* side, pulls a column value from the *one* side of an active relationship. Used in calculated columns on a fact table to fetch a dim attribute. **`RELATEDTABLE(table)`** — the inverse: from the one side, returns the related rows on the many side (typically wrapped in `COUNTROWS` or `SUMX`).",
      },
      {
        difficulty: "medium",
        topic: "Performance",
        q: "How do you speed up a slow Power BI report?",
        a: "Star-schema the model · pre-aggregate in Power Query / source · disable Auto Date/Time (creates hidden date tables per date column) · use measures over calculated columns · `SUMX`/`COUNTROWS` only when needed (prefer set-based) · reduce visual count per page · enable **Performance Analyzer** to find the slow DAX, then rewrite via **DAX Studio**.",
      },
      {
        difficulty: "hard",
        topic: "Time intelligence",
        q: "How do you calculate Year-Over-Year growth?",
        a: "Mark a date table as the model's date table, then:\n```dax\nSales YoY % = \n  DIVIDE(\n    [Sales] - CALCULATE([Sales], SAMEPERIODLASTYEAR('Date'[Date])),\n    CALCULATE([Sales], SAMEPERIODLASTYEAR('Date'[Date]))\n  )\n```\nRequires a contiguous, marked date table — date column on the fact table alone isn't enough.",
      },
      {
        difficulty: "hard",
        topic: "Refresh",
        q: "What is incremental refresh and when do you enable it?",
        a: "Instead of reloading the whole fact table on every refresh, Power BI partitions by a date and only refreshes the latest N days/months — the rest is cached. Requires a query parameter (`RangeStart`/`RangeEnd`) and a source that supports query folding. Essential for fact tables > a few million rows or refresh windows > a minute.",
      },
      {
        difficulty: "hard",
        topic: "Connectivity",
        q: "Import vs DirectQuery vs Composite — when each?",
        a: "**Import**: copy data into Power BI's VertiPaq engine — fastest queries, periodic refresh, full DAX. **DirectQuery**: every visual sends a live query to the source — always fresh, slower, DAX subset. **Composite**: mix per table — small dims as Import, huge facts as DirectQuery. Default to Import unless data must be live or is too big to copy.",
      },
      {
        difficulty: "hard",
        topic: "Security",
        q: "What is Row-Level Security (RLS) and how do you implement it?",
        a: "Filter rows visible to a user based on their identity. In Power BI Desktop: Modeling → Manage Roles → define a DAX filter (e.g. `[Country] = USERPRINCIPALNAME()`). Assign users/AAD groups to roles in the Service. Dynamic RLS uses a security table that maps users to allowed values, joined into the model.",
      },
    ],
  },
  {
    slug: "pandas",
    name: "Pandas",
    oneLiner:
      "Python's standard library for tabular data — Series + DataFrame, fast vectorised ops over NumPy arrays, SQL-style joins and groupby.",
    proficiency: 0.6,
    aliases: ["pandas", "pd"],
    docFile: "pandas.md",
    interestingFacts: [
      "Pandas was created in **2008 by Wes McKinney** at AQR Capital — he needed an R-like DataFrame in Python so quant teams could move off R. Open-sourced in 2009.",
      "The name 'pandas' is from **'PANel DAta'** — the econometric term for multi-dimensional structured datasets, not the animal.",
      "Pandas is built on **NumPy** — DataFrames are basically aligned columnar NumPy arrays with labelled axes, which is why operations are vectorised C-fast.",
      "Pandas 2.0 (2023) added **Apache Arrow as a backing store** — string columns alone can be 10–100× smaller in memory and faster on common ops.",
      "Wes McKinney went on to **start Apache Arrow + Voltron Data + Ibis** — basically the entire modern dataframe ecosystem traces back to him.",
    ],
    sources: [
      "https://pandas.pydata.org/docs/",
      "https://en.wikipedia.org/wiki/Pandas_(software)",
      "https://wesmckinney.com/book/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "Series vs DataFrame — what's the difference?",
        a: "A **Series** is a 1-D labelled array (single column with an index). A **DataFrame** is a 2-D labelled structure — a dict of Series sharing the same index. Selecting a single column from a DataFrame returns a Series; selecting a row also typically returns a Series.",
      },
      {
        difficulty: "easy",
        topic: "Selection",
        q: "`.loc` vs `.iloc` vs `[]` — when to use which?",
        a: "**`.loc[row_label, col_label]`** — label-based selection. **`.iloc[row_pos, col_pos]`** — positional (integer) selection. Plain **`df['col']`** — single column by name. Always use `.loc` / `.iloc` to avoid the 'chained assignment' SettingWithCopyWarning.",
      },
      {
        difficulty: "easy",
        topic: "Missing",
        q: "How do you handle missing values?",
        a: "`df.isna()` / `df.notna()` — detect. `df.dropna(subset=['x'])` — drop rows where `x` is NaN. `df.fillna(value)` — replace with a constant, dict, Series, or `method='ffill'/'bfill'` for forward/back fill. `df.interpolate()` — numeric/time interpolation.",
      },
      {
        difficulty: "medium",
        topic: "Groupby",
        q: "How does `groupby` work and how do you do multi-aggregation?",
        a: "`df.groupby('col')` returns a DeferredGroupBy that you finalise with an aggregate. Multi-agg: `df.groupby('city').agg(avg_age=('age','mean'), n=('id','count'))`. Group by multiple columns with a list. Use `.transform()` to broadcast group-wise results back to the original row shape.",
      },
      {
        difficulty: "medium",
        topic: "Merge",
        q: "`merge` vs `join` vs `concat`?",
        a: "**`pd.merge(a, b, on=..., how=...)`** — SQL-style joins (inner, left, right, outer). **`a.join(b)`** — convenience wrapper for index-aligned joins. **`pd.concat([a, b])`** — stack along an axis (no key matching), useful for vertical stacking same-shape DataFrames.",
      },
      {
        difficulty: "medium",
        topic: "Performance",
        q: "Why are loops over a DataFrame so slow, and what should you do instead?",
        a: "Each `df.iloc[i]` creates a Series object — Python overhead per row. Use **vectorised ops** instead: arithmetic between columns, `.apply` (still Python but cleaner), or `.map` for Series. For real speed: NumPy ufuncs, `df.eval(\"a + b\")`, or move to PyArrow-backed types (2.0+).",
      },
      {
        difficulty: "medium",
        topic: "Index",
        q: "What's the index and why does it matter?",
        a: "Every DataFrame has a row index (default: 0, 1, 2…). Operations align on it — `df1 + df2` matches by index, not position. `set_index('col')` makes a column the index for faster lookups; `reset_index()` flattens it back to a column.",
      },
      {
        difficulty: "medium",
        topic: "Reshaping",
        q: "Wide vs long format — `pivot` vs `melt`?",
        a: "**Wide**: one column per category (a column called `2024`, another `2025`). **Long**: one row per observation with category as a value (a `year` column). `df.pivot(index, columns, values)` — long → wide. `df.melt(id_vars, value_vars)` — wide → long. ML / charting libraries prefer long; humans often prefer wide.",
      },
      {
        difficulty: "hard",
        topic: "Memory",
        q: "How do you reduce a DataFrame's memory footprint?",
        a: "1) Downcast numerics: `df['x'] = pd.to_numeric(df['x'], downcast='integer')`. 2) Convert low-cardinality strings to `category` dtype. 3) Pandas 2.0+: use `dtype_backend='pyarrow'` on read — huge wins for string columns. 4) Read only the columns you need (`usecols=...` in `read_csv`). 5) Filter early; don't load everything then drop.",
      },
      {
        difficulty: "hard",
        topic: "SettingWithCopyWarning",
        q: "Explain the `SettingWithCopyWarning` and how to avoid it.",
        a: "Triggered when you assign to a slice that might be a copy or a view (`df[df.x > 5]['y'] = 0` — Pandas can't tell if it'll affect `df`). Always use `.loc` with both axes: `df.loc[df.x > 5, 'y'] = 0`. The warning prevents silent bugs where mutations don't actually mutate.",
      },
      {
        difficulty: "hard",
        topic: "Time series",
        q: "What's the workflow for time-series data in Pandas?",
        a: "Parse with `pd.to_datetime(...)`, set as index (`set_index('date')`), then use `resample('1D').mean()` for time-based aggregation, `rolling(7).mean()` for rolling windows, `shift(1)` for lags, `tz_localize`/`tz_convert` for timezones, and `dt` accessor (`s.dt.year`, `.dt.dayofweek`) on Series of datetimes.",
      },
      {
        difficulty: "hard",
        topic: "Alternatives",
        q: "When would you reach for Polars / DuckDB instead of Pandas?",
        a: "Pandas is single-threaded and copies a lot. **Polars** (Rust, multi-threaded, lazy execution) is often 5–30× faster on bigger-than-memory or many-core workloads, with a similar API. **DuckDB** lets you write SQL against Parquet/CSV files with zero load step — great for ad-hoc analytics > 10M rows. Pandas still wins on ecosystem (matplotlib, sklearn integration).",
      },
    ],
  },
  {
    slug: "seaborn",
    name: "Seaborn",
    oneLiner:
      "A high-level statistical-plotting library on top of Matplotlib — sensible defaults, DataFrame-aware API, beautiful charts in one line.",
    proficiency: 0.6,
    aliases: ["seaborn", "sns"],
    docFile: "seaborn.md",
    interestingFacts: [
      "Seaborn was created in **2012 by Michael Waskom** (then a Stanford neuroscience PhD student) to make publication-quality stats charts trivial in Python.",
      "Every Seaborn plot is **technically a Matplotlib plot** — you can grab the underlying Axes object and customise with full Matplotlib power. Best-of-both.",
      "Seaborn's **0.12 release (2022)** introduced the entirely new `seaborn.objects` interface — a declarative grammar-of-graphics API inspired by ggplot2 — running in parallel with the classic functions.",
      "Default Seaborn colour palettes are designed to be **colour-blind friendly** (especially `viridis`, `mako`, `rocket`) — a big deal in scientific publishing.",
      "It's a default visualization library in almost every Kaggle notebook and ML tutorial — its `sns.pairplot()` and `sns.heatmap()` are visual signatures of the data-science community.",
    ],
    sources: [
      "https://seaborn.pydata.org/",
      "https://en.wikipedia.org/wiki/Seaborn_(software)",
      "https://github.com/mwaskom/seaborn",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "Seaborn vs Matplotlib — what's the relationship?",
        a: "Seaborn is a **higher-level wrapper around Matplotlib**. Same plot in Matplotlib often takes 10–20 lines; Seaborn does it in 1 line with much better defaults (colour palettes, themes, axis spacing). Under the hood, every Seaborn plot returns a Matplotlib `Axes` — you can drop down for fine control.",
      },
      {
        difficulty: "easy",
        topic: "API",
        q: "What is the difference between figure-level and axes-level functions?",
        a: "**Axes-level** functions (`scatterplot`, `boxplot`, `barplot`) draw onto an existing `Axes` you control. **Figure-level** functions (`relplot`, `catplot`, `displot`) create the whole figure for you with built-in faceting (`col=`, `row=`). Use figure-level for multi-panel layouts; axes-level for fine control inside a Matplotlib figure.",
      },
      {
        difficulty: "easy",
        topic: "Plots",
        q: "Which Seaborn plot would you use for the distribution of a numeric column?",
        a: "`sns.histplot(data=df, x='col')` for histograms (with optional KDE via `kde=True`), `sns.kdeplot()` for pure density, `sns.ecdfplot()` for the CDF — or `sns.displot()` (figure-level) to switch between them via a `kind=` parameter.",
      },
      {
        difficulty: "medium",
        topic: "Categorical",
        q: "What's the difference between `barplot`, `countplot` and `boxplot`?",
        a: "**`barplot`** — aggregates a numeric column (default: mean) per category, with error bars. **`countplot`** — frequency of each category (count of rows), no numeric column needed. **`boxplot`** — full distribution per category (quartiles, whiskers, outliers).",
      },
      {
        difficulty: "medium",
        topic: "Faceting",
        q: "How do you create a grid of small multiples (faceting)?",
        a: "Use **figure-level functions** with `col` / `row`:\n```python\nsns.relplot(data=df, x='age', y='income',\n            col='gender', row='country',\n            kind='scatter')\n```\nFor manual control, use `FacetGrid` directly: `g = sns.FacetGrid(df, col='cat'); g.map_dataframe(sns.scatterplot, x='x', y='y')`.",
      },
      {
        difficulty: "medium",
        topic: "Heatmap",
        q: "How do you create a correlation matrix heatmap?",
        a: "```python\ncorr = df.select_dtypes('number').corr()\nsns.heatmap(corr, annot=True, fmt='.2f',\n            cmap='coolwarm', center=0,\n            vmin=-1, vmax=1, square=True)\n```\nThe `center=0` makes the diverging colormap meaningful around zero correlation.",
      },
      {
        difficulty: "medium",
        topic: "Styling",
        q: "How do you change the overall look?",
        a: "`sns.set_theme(style='whitegrid', context='notebook', palette='viridis')` — `style` controls grid/axes, `context` scales fonts (`paper` < `notebook` < `talk` < `poster`), `palette` is the default colour cycle. Apply once at the top of your notebook/script.",
      },
      {
        difficulty: "medium",
        topic: "Pairplot",
        q: "When do you use `pairplot`?",
        a: "Exploratory data analysis (EDA) — `sns.pairplot(df, hue='target')` plots every numeric column against every other, with histograms on the diagonal. Instantly surfaces correlations, clusters, outliers. Slow on >10 columns; subset first.",
      },
      {
        difficulty: "hard",
        topic: "Regression",
        q: "What's `lmplot` and what's it doing under the hood?",
        a: "`sns.lmplot(x, y, data=df, hue='cat')` fits a regression model (OLS by default) per group and overlays it with confidence bands. It's a figure-level wrapper around `regplot` with faceting. Use `order=N` for polynomial fits, `logistic=True` for logistic regression, `lowess=True` for non-parametric smoothing.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "Your `sns.pairplot` on a 500k-row DataFrame is slow. What do you do?",
        a: "Sample first — `df.sample(5000)` — pairplot is for EDA, not population statistics. Or switch to a faster tool (Plotly with WebGL, datashader for huge scatter, DuckDB for aggregation). Seaborn's strength is exploratory plots on summarised data, not raw millions of rows.",
      },
      {
        difficulty: "hard",
        topic: "Tidy data",
        q: "Why does Seaborn want 'tidy / long' data?",
        a: "Seaborn's API assumes one row per observation with categories as values (e.g. `year`, `value`, `country` columns) — not wide format (separate column per year). It then maps columns to aesthetics (`x=`, `y=`, `hue=`, `col=`). If your data is wide, reshape it with `df.melt()` first.",
      },
      {
        difficulty: "hard",
        topic: "Objects API",
        q: "What's the new `seaborn.objects` interface?",
        a: "Introduced in Seaborn 0.12 (2022) — a **grammar of graphics** API inspired by ggplot2: `so.Plot(df, x='a', y='b').add(so.Dots()).add(so.Line())`. Composable, declarative, and more flexible than the classic functions. Runs in parallel with the classic API — both are supported indefinitely.",
      },
    ],
  },
    {
    slug: "xgboost",
    name: "XGBoost",
    oneLiner:
      "An extreme gradient-boosting library for tabular ML — fast, regularized, and the workhorse behind countless Kaggle wins and production scoring systems.",
    proficiency: 0.6,
    aliases: ["xgboost", "xgb"],
    docFile: "xgboost.md",
    interestingFacts: [
      "XGBoost was created in **2014 by Tianqi Chen** (then a PhD student at the University of Washington) as a research project — it went on to power **17 of 29 winning solutions** on Kaggle in 2015 alone.",
      "The name stands for **eXtreme Gradient Boosting** — 'extreme' = the engineering effort to make GBDT fast and scalable, not a new algorithm.",
      "XGBoost added **DART** (dropouts for regression trees), **monotonic constraints**, and **GPU training** years before scikit-learn — it's been an algorithmic-features leader, not just a faster implementation.",
      "On tabular benchmarks, XGBoost / LightGBM / CatBoost **still beat deep-learning models** in most studies — for structured data, tree boosting remains the state of the art.",
      "Tianqi Chen also created **TVM, MXNet, and Apache Spark MLlib's tree boosters** — basically a one-person infrastructure layer underneath modern ML.",
    ],
    sources: [
      "https://xgboost.readthedocs.io/",
      "https://en.wikipedia.org/wiki/XGBoost",
      "https://arxiv.org/abs/1603.02754",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What kind of algorithm is XGBoost?",
        a: "**Gradient-boosted decision trees (GBDT)**: train trees sequentially where each new tree fits the *residuals* (errors) of the ensemble so far. XGBoost is a highly optimized GBDT library — adding L1/L2 regularization, second-order gradients, parallel tree-building, and efficient handling of sparse / missing data.",
      },
      {
        difficulty: "easy",
        topic: "vs",
        q: "XGBoost vs Random Forest — which works better and why?",
        a: "Different paradigms. **Random Forest** = bagging: many *independent* deep trees on bootstrapped samples, averaged. **XGBoost** = boosting: many *sequential* shallow trees, each fixing the previous ensemble's residuals. Boosting usually wins on accuracy but needs more tuning and overfits faster; RF is more robust with default params.",
      },
      {
        difficulty: "easy",
        topic: "API",
        q: "Train a basic XGBoost classifier — minimal code?",
        a: "```python\nfrom xgboost import XGBClassifier\nmodel = XGBClassifier(\n    n_estimators=500, max_depth=6, learning_rate=0.05,\n    eval_metric='logloss', early_stopping_rounds=20,\n    tree_method='hist')\nmodel.fit(X_train, y_train, eval_set=[(X_val, y_val)])\n```\n`tree_method='hist'` is the modern fast histogram-based splitter; `early_stopping_rounds` halts when val loss stops improving.",
      },
      {
        difficulty: "medium",
        topic: "Hyperparameters",
        q: "What are the most important XGBoost hyperparameters to tune?",
        a: "**`learning_rate` (`eta`)** + **`n_estimators`** — lower lr + more trees = smoother convergence. **`max_depth`** (default 6) — tree complexity. **`min_child_weight`** — min sum of instance weight per leaf (regularizer). **`subsample` / `colsample_bytree`** — bagging fraction per tree. **`reg_alpha` (L1)** / **`reg_lambda` (L2)** — weight regularization. Tune learning rate + depth first.",
      },
      {
        difficulty: "medium",
        topic: "Theory",
        q: "What does 'second-order gradient' mean in XGBoost?",
        a: "Standard gradient boosting fits each new tree to the **first derivative** (gradient) of the loss. XGBoost uses both the **first AND second derivative (Hessian)** — a second-order Taylor expansion. This gives a more accurate split criterion and lets it support a wide range of custom losses without algorithm changes.",
      },
      {
        difficulty: "medium",
        topic: "Missing",
        q: "How does XGBoost handle missing values?",
        a: "Built-in: at each split, XGBoost learns the **'default direction'** missing values should go (left or right) by trying both during training and picking whichever reduces loss more. So you can pass NaNs directly — no imputation required. Often outperforms hand-imputed mean/median.",
      },
      {
        difficulty: "medium",
        topic: "Overfitting",
        q: "Your XGBoost model has 99% train accuracy but 65% val. What do you do?",
        a: "Classic overfit. Fixes: 1) lower `max_depth` (try 3–6), 2) raise `min_child_weight`, 3) add L1/L2 regularization (`reg_alpha`, `reg_lambda`), 4) lower `subsample` / `colsample_bytree` (e.g. 0.8), 5) lower `learning_rate` and let `early_stopping_rounds` find the right `n_estimators`, 6) check for data leakage — that gap is often a leak, not a model issue.",
      },
      {
        difficulty: "medium",
        topic: "Evaluation",
        q: "How do you do cross-validation with XGBoost?",
        a: "`xgboost.cv(params, dtrain, num_boost_round, nfold=5, early_stopping_rounds=20, metrics='auc')` — built-in CV that reports per-iteration scores across folds and returns the optimal `n_estimators` via early stopping. Or use scikit-learn's `cross_val_score(XGBClassifier(...), ...)`.",
      },
      {
        difficulty: "hard",
        topic: "Imbalance",
        q: "How do you handle class imbalance in XGBoost?",
        a: "Set **`scale_pos_weight = negative_count / positive_count`** (binary classification) — re-weights the positive class. Also evaluate with **PR-AUC** instead of accuracy, and tune the decision threshold on validation. SMOTE + base XGBoost is rarely worth it; `scale_pos_weight` is the cleaner lever.",
      },
      {
        difficulty: "hard",
        topic: "Interpretability",
        q: "How do you explain an XGBoost model's predictions?",
        a: "1) **Feature importance**: `model.feature_importances_` (gain/cover/weight). 2) **SHAP values**: `shap.TreeExplainer(model).shap_values(X)` — model-agnostic, per-row contribution per feature, sums to the prediction. 3) **Partial dependence plots**: marginal effect of a feature. SHAP is the modern default — much more trustworthy than the built-in importance.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "What's the difference between `tree_method='hist'` and `tree_method='gpu_hist'`?",
        a: "**`hist`** — histogram-based splitter (XGBoost 0.7+): bins feature values into ~256 buckets so split-finding is O(buckets) not O(rows). Much faster than the exact `tree_method='exact'`. **`gpu_hist`** (or modern `device='cuda'` + `tree_method='hist'`) — same histogram algo on GPU, often 5–20× faster on big data.",
      },
      {
        difficulty: "hard",
        topic: "Production",
        q: "How do you serve XGBoost in production?",
        a: "Save with `model.save_model('model.json')` (the modern portable format, not pickle). Serve via your own Python service (Flask/FastAPI), or convert to ONNX for cross-language deployment, or use NVIDIA Triton's XGBoost backend for GPU-batched inference. Track features carefully — feature order and dtype must match training exactly.",
      },
    ],
  },
  {
    slug: "mysql",
    name: "MySQL",
    oneLiner:
      "The world's most popular open-source relational database — fast, reliable, and the M in the original LAMP stack.",
    proficiency: 0.6,
    aliases: ["mysql", "mariadb"],
    docFile: "mysql.md",
    interestingFacts: [
      "MySQL was created in **1995 by Michael 'Monty' Widenius** (and David Axmark, Allan Larsson) — it's named after Monty's daughter **My**, and the dolphin logo's name is **Sakila**.",
      "Sun Microsystems bought MySQL AB for $1B in 2008; **Oracle inherited it when it acquired Sun in 2010** — leading Monty to fork the codebase and create **MariaDB** out of concern Oracle would slow open-source development.",
      "MySQL still ranks **#2 in the DB-Engines popularity index globally** — behind only Oracle — and powers Facebook, Twitter, YouTube, Booking, GitHub, and most of WordPress's hosted sites.",
      "InnoDB (the default storage engine since MySQL 5.5, 2010) is **ACID-compliant, supports foreign keys, and uses MVCC** for non-locking reads — the older MyISAM engine has neither.",
      "MySQL's **`utf8` charset historically meant 3-byte UTF-8** (no emoji 🧨). Always use **`utf8mb4`** in new projects — the silent truncation of 4-byte chars on `utf8` is one of MySQL's most infamous footguns.",
    ],
    sources: [
      "https://dev.mysql.com/doc/",
      "https://en.wikipedia.org/wiki/MySQL",
      "https://db-engines.com/en/ranking",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is MySQL and how does it differ from MariaDB?",
        a: "MySQL is an open-source RDBMS owned by Oracle. **MariaDB** is a community-driven fork (started by MySQL's original creator) — wire-compatible with MySQL but evolves independently. For most projects they're drop-in equivalents; pick MariaDB if you want a non-Oracle path.",
      },
      {
        difficulty: "easy",
        topic: "Engines",
        q: "InnoDB vs MyISAM — which should you use and why?",
        a: "**InnoDB** (default since 5.5) — ACID transactions, foreign keys, MVCC reads, row-level locking. Use it for almost everything. **MyISAM** — older, no transactions, table-level locking, no FKs; only meaningful for legacy or rare read-only / full-text workloads (and InnoDB now has full-text indexes too).",
      },
      {
        difficulty: "easy",
        topic: "Types",
        q: "When do you use `VARCHAR` vs `TEXT`?",
        a: "**`VARCHAR(n)`** — variable length up to `n` chars (max 65,535 bytes per row total), stored in-row, can be indexed easily. **`TEXT`** — up to 64KB, stored off-row, can be indexed only with a prefix length. Rule: use VARCHAR for known-bounded user data (name, slug); TEXT for prose / long content.",
      },
      {
        difficulty: "medium",
        topic: "Indexes",
        q: "What is a clustered index in InnoDB?",
        a: "InnoDB stores table rows **physically ordered by the primary key** — the primary key IS the clustered index. If you don't define a PK, MySQL invents a hidden 6-byte one. Secondary indexes store the PK value as their pointer, so look-up via a secondary index costs two B-tree lookups (one in the secondary, one in the clustered).",
      },
      {
        difficulty: "medium",
        topic: "Indexes",
        q: "What is a covering index and why is it fast?",
        a: "An index that contains all the columns the query needs in its SELECT list — so MySQL can answer the query from the index alone, **without reading the table data**. For `SELECT id, name FROM users WHERE email='x'`, an index `(email, name)` covers it. EXPLAIN shows `Using index` in `Extra`.",
      },
      {
        difficulty: "medium",
        topic: "Performance",
        q: "How do you debug a slow query in MySQL?",
        a: "Run **`EXPLAIN <query>`** to see the chosen plan: look at `type` (`ALL` = full table scan, bad), `rows` (estimated rows examined), `key` (which index was used), and `Extra` (`Using filesort`, `Using temporary` flag costly ops). Then add an index, rewrite to enable an existing index, or check stats with `ANALYZE TABLE`.",
      },
      {
        difficulty: "medium",
        topic: "Transactions",
        q: "What's MySQL's default isolation level and what does it mean?",
        a: "**`REPEATABLE READ`** (InnoDB default — differs from most other DBs which default to READ COMMITTED). Within a transaction, every read sees the same snapshot — no non-repeatable reads. InnoDB's MVCC makes this near-free for reads. Phantom rows are still theoretically possible but mostly prevented in InnoDB by gap locking.",
      },
      {
        difficulty: "medium",
        topic: "Replication",
        q: "What is MySQL replication and what are the main types?",
        a: "Replication copies changes from a **source (master)** to one or more **replicas (slaves)**. Modes: **statement-based** (replays SQL — small binlogs but non-deterministic queries can diverge), **row-based** (replays actual row changes — safer, default in modern MySQL), and **mixed**. Replicas are used for read scaling, backups, and failover.",
      },
      {
        difficulty: "hard",
        topic: "Locking",
        q: "Explain MySQL's gap locks and how they prevent phantoms.",
        a: "InnoDB locks not just rows but **gaps between index records** in REPEATABLE READ. A range query (`WHERE x BETWEEN 10 AND 20`) places gap locks so no other transaction can insert rows in that range — preventing phantom rows. Side effect: gap locks can deadlock concurrent inserts; switching to READ COMMITTED disables them.",
      },
      {
        difficulty: "hard",
        topic: "Charset",
        q: "Why should you always use `utf8mb4` instead of `utf8` in MySQL?",
        a: "MySQL's `utf8` charset is historically only **3-byte UTF-8**, which **cannot store 4-byte characters** (emoji, many Asian characters, mathematical symbols). Writes silently truncate at the first 4-byte char. Always use `utf8mb4` (full UTF-8) + `utf8mb4_unicode_ci` (or `_0900_ai_ci` in 8.0+) collation.",
      },
      {
        difficulty: "hard",
        topic: "Storage",
        q: "Why is the choice of primary key so important in InnoDB?",
        a: "Because the PK is the clustered index — inserts in random PK order (e.g. random UUIDs) cause **page splits** and fragmentation, killing write throughput. Use auto-increment integers OR sortable IDs (UUIDv7, ULID, snowflake) so new rows append to the end of the B-tree. Wide PKs also bloat every secondary index.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "What is the InnoDB Buffer Pool and how should it be sized?",
        a: "An in-memory cache of data + index pages — InnoDB's most important performance lever. Sized via `innodb_buffer_pool_size`; typical recommendation is **~70–80% of system RAM** on a dedicated DB server. Monitor `Innodb_buffer_pool_read_requests` vs `Innodb_buffer_pool_reads` — a high ratio (≥99%) means most reads are served from RAM.",
      },
    ],
  },
  {
    slug: "mssql",
    name: "MSSQL",
    oneLiner:
      "Microsoft SQL Server — a battle-tested enterprise RDBMS with T-SQL, world-class tooling (SSMS), and tight .NET integration.",
    proficiency: 0.6,
    aliases: ["mssql", "sql server", "ms sql server", "tsql"],
    docFile: "mssql.md",
    interestingFacts: [
      "SQL Server has its roots in **Sybase SQL Server**, which Microsoft co-developed in the late 1980s before going its own way with SQL Server 4.21 (1993) on Windows NT.",
      "Since **SQL Server 2017**, it runs natively on **Linux and Docker** — ending decades of Windows-only deployment. There's even an ARM build for Macs (via Docker).",
      "SQL Server includes a **built-in column-store engine (since 2012)** that can give 10–100× speedup on analytical queries — making the line between OLTP and OLAP much blurrier.",
      "**T-SQL** (Transact-SQL) is Microsoft's procedural extension to SQL — adds variables, control flow, exception handling, and is the language for stored procedures and functions.",
      "SQL Server's **SQL Server Management Studio (SSMS)** is widely considered the best DB IDE in the industry — free, mature, with query plan visualisation, profiling, and source control integration.",
    ],
    sources: [
      "https://learn.microsoft.com/en-us/sql/sql-server/",
      "https://en.wikipedia.org/wiki/Microsoft_SQL_Server",
      "https://learn.microsoft.com/en-us/sql/t-sql/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is the difference between SQL Server, MSSQL, and T-SQL?",
        a: "**SQL Server** (a.k.a. MSSQL) is Microsoft's RDBMS product. **T-SQL** (Transact-SQL) is the SQL dialect SQL Server uses — standard SQL plus Microsoft's procedural extensions (variables, IF/WHILE, TRY/CATCH, stored procedures). All SQL Server queries are T-SQL.",
      },
      {
        difficulty: "easy",
        topic: "Editions",
        q: "What's the difference between Express, Standard and Enterprise editions?",
        a: "**Express**: free, max 10 GB DB, 1 socket / 4 cores / 1.4 GB RAM — fine for dev or tiny apps. **Standard**: paid, mid-tier limits, most features. **Enterprise**: top tier — unlimited resources, partitioning, online indexing, AlwaysOn AGs, in-memory OLTP at full strength. **Developer** = Enterprise free for non-prod.",
      },
      {
        difficulty: "easy",
        topic: "Types",
        q: "`VARCHAR` vs `NVARCHAR` — when do you use which?",
        a: "**`VARCHAR`** stores 1 byte per ASCII char. **`NVARCHAR`** stores Unicode (UTF-16, 2 bytes per char — or UTF-8 since SQL Server 2019 with a `_UTF8` collation). Always prefer `NVARCHAR` for user-facing text unless you're sure data is pure ASCII and storage matters.",
      },
      {
        difficulty: "medium",
        topic: "Indexes",
        q: "Clustered vs non-clustered index in SQL Server?",
        a: "**Clustered**: data rows are physically stored in the order of the clustered key — one per table (usually the PK). **Non-clustered**: separate structure with a copy of the key + a pointer (the clustered key, or RID if no clustered index) — many per table. Non-clustered with included columns can be a covering index.",
      },
      {
        difficulty: "medium",
        topic: "Stored procedures",
        q: "Stored procedure vs function — what's the difference in T-SQL?",
        a: "**Stored procedure**: can have multiple statements, side effects, returns 0..N result sets + output params, called with `EXEC`. **Function**: returns a single value (scalar) or table, no side effects (no DML on tables), can be used inline in queries. Scalar functions historically killed parallelism; inline TVFs are the modern replacement.",
      },
      {
        difficulty: "medium",
        topic: "T-SQL",
        q: "What is the difference between `TRUNCATE`, `DELETE` and `DROP`?",
        a: "**`DELETE`** — row-by-row, logged, fires triggers, can have WHERE clause, slower. **`TRUNCATE`** — deallocates pages, minimal logging, no triggers, no WHERE, resets identity. **`DROP`** — removes the table object entirely. TRUNCATE is faster than DELETE for clearing a whole table; both leave the schema.",
      },
      {
        difficulty: "medium",
        topic: "Isolation",
        q: "Default isolation level in SQL Server, and what does READ COMMITTED SNAPSHOT change?",
        a: "Default is **READ COMMITTED** (locking-based — readers block on writers). Enabling **READ COMMITTED SNAPSHOT** (RCSI) switches to MVCC — readers see a snapshot, don't block writers and vice versa. Huge concurrency win; comes at the cost of using tempdb for the version store.",
      },
      {
        difficulty: "medium",
        topic: "Performance",
        q: "How do you diagnose a slow query in SQL Server?",
        a: "Run the query with **`SET STATISTICS IO, TIME ON`** to see logical reads + CPU. Use **'Display Estimated/Actual Execution Plan'** in SSMS to see the plan — look for table scans on big tables, key/RID lookups (often fix with included columns), expensive sorts/hash joins. **Query Store** (2016+) tracks plan regressions over time.",
      },
      {
        difficulty: "hard",
        topic: "Concurrency",
        q: "What is a deadlock and how do you investigate one?",
        a: "Two (or more) transactions wait on locks each other holds — SQL Server picks a **victim** and rolls it back (error 1205). Diagnose: enable **Extended Events / deadlock graph** capture (or trace flag 1222 in older versions), open the graph in SSMS, identify the queries + objects + lock types, then re-order DML, add indexes (often the cause), or shorten transactions.",
      },
      {
        difficulty: "hard",
        topic: "HA",
        q: "What are AlwaysOn Availability Groups?",
        a: "SQL Server's HA/DR feature: a primary + 1..N secondary replicas synced via log shipping over TCP. Provides automatic failover, read-only routing to secondaries, and basis for the SQL Server side of disaster recovery. Requires Enterprise Edition (Basic AGs are limited in Standard).",
      },
      {
        difficulty: "hard",
        topic: "Tempdb",
        q: "Why is tempdb so important and how do you tune it?",
        a: "**tempdb** is the system database for temp tables, sorts, hash joins, version store (under RCSI/snapshot), and intermediate results. Heavy workloads create contention on its allocation pages. Best practices: split tempdb into **multiple equally-sized data files** (1 per logical CPU up to 8), put on fast storage, enable trace flag 1118/1117 (or auto-enabled in 2016+).",
      },
      {
        difficulty: "hard",
        topic: "Recovery",
        q: "Difference between Simple, Full and Bulk-Logged recovery models?",
        a: "**Simple** — no log backup possible, log auto-truncates after checkpoint; can only restore to last full/diff backup. **Full** — every transaction logged, log grows until backed up; supports point-in-time recovery. **Bulk-Logged** — like Full but minimally logs bulk ops (BULK INSERT, SELECT INTO) for speed; loses fine-grained PIT for those operations.",
      },
    ],
  },
  {
    slug: "git-github",
    name: "Git / GitHub",
    oneLiner:
      "Git is a distributed version control system; GitHub is the world's largest hosted Git platform with reviews, issues, Actions and a 100M+ developer community.",
    proficiency: 0.6,
    aliases: ["git", "github", "git / github"],
    docFile: "git-github.md",
    interestingFacts: [
      "Git was written in **just a few weeks in April 2005 by Linus Torvalds** — created out of necessity after the Linux kernel team lost free access to BitKeeper.",
      "Every Git commit is identified by a **SHA-1 hash of its content + parent commits** — meaning a commit's ID is cryptographically tied to the entire history before it.",
      "GitHub was founded in 2008 and acquired by **Microsoft for $7.5 billion in 2018** — a deal that initially worried developers but turned out fine; GitHub's pace of features actually accelerated.",
      "GitHub hosts over **400 million repositories** and **150 million developers** (as of 2024 numbers) — making it the largest single codebase repository in human history.",
      "**`git reflog`** keeps a local history of every move HEAD has made for ~30 days — so 'I deleted my branch / hard-reset / lost work' is almost always recoverable. Most developers don't know this exists.",
    ],
    sources: [
      "https://git-scm.com/doc",
      "https://en.wikipedia.org/wiki/Git",
      "https://docs.github.com/",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is the difference between Git and GitHub?",
        a: "**Git** is the open-source distributed version control system you run locally (`git commit`, `git branch`, etc.). **GitHub** is a hosted service (owned by Microsoft) that adds remote repos, pull requests, issues, Actions, reviews, and a social layer around Git. You can use Git without GitHub (GitLab, Bitbucket, plain SSH server).",
      },
      {
        difficulty: "easy",
        topic: "Workflow",
        q: "Walk me through the basic Git workflow.",
        a: "1) `git clone <repo>` (or `git init`). 2) Edit files. 3) `git add <files>` to stage. 4) `git commit -m \"...\"` to record the snapshot. 5) `git push` to upload to the remote. To get others' changes: `git pull` (= `fetch` + `merge`).",
      },
      {
        difficulty: "easy",
        topic: "Branches",
        q: "How do you create and switch branches?",
        a: "`git switch -c feature-x` (modern, since Git 2.23) creates AND switches. Older syntax: `git checkout -b feature-x`. List branches: `git branch`. Switch to existing: `git switch feature-x`. Delete a merged branch: `git branch -d feature-x` (capital `-D` to force).",
      },
      {
        difficulty: "medium",
        topic: "Rebase",
        q: "Merge vs rebase — what's the difference?",
        a: "**Merge** creates a new merge commit that joins two histories — preserves the actual order of events but produces a 'criss-cross' history. **Rebase** rewrites your branch's commits on top of the target — produces a clean, linear history but **rewrites SHAs**. Golden rule: never rebase commits that are already pushed and shared.",
      },
      {
        difficulty: "medium",
        topic: "HEAD",
        q: "What is HEAD and what does 'detached HEAD' mean?",
        a: "**HEAD** is the symbolic pointer to your current branch tip (`HEAD → main → <sha>`). **Detached HEAD** means HEAD points directly at a commit, not a branch — usually after `git checkout <sha>`. New commits in detached HEAD are unreachable once you switch away unless you create a branch first.",
      },
      {
        difficulty: "medium",
        topic: "Stash",
        q: "What's `git stash` for?",
        a: "Temporarily set aside uncommitted changes so the working tree is clean (e.g. to switch branches quickly). `git stash` saves; `git stash pop` re-applies the latest stash; `git stash list` shows all. Always `git status` first — untracked files aren't stashed unless you add `-u`.",
      },
      {
        difficulty: "medium",
        topic: "Conflicts",
        q: "Two people edit the same file. How does Git handle the conflict?",
        a: "On `git merge` (or pull), Git auto-merges where possible; for overlapping changes it writes both into the file with `<<<<<<<`, `=======`, `>>>>>>>` markers and pauses. You edit the file, remove markers, `git add` it, then `git commit` (merge) or `git rebase --continue`. Abort with `--abort` to bail.",
      },
      {
        difficulty: "medium",
        topic: "Undo",
        q: "How do you undo: a) unstaged file edits, b) the last commit, c) a pushed commit?",
        a: "**a)** `git restore <file>` (or older `git checkout -- <file>`). **b)** Local-only: `git reset --soft HEAD~1` (keeps changes staged) or `--hard` (throws them away). **c)** Pushed and shared: `git revert <sha>` creates a *new* commit that undoes the change — safe for shared history. Avoid force-pushing rewritten history to shared branches.",
      },
      {
        difficulty: "hard",
        topic: "Internals",
        q: "What does Git actually store under `.git/`?",
        a: "Git is a content-addressable filesystem. Every blob (file content), tree (directory listing), commit, and tag is stored as an **object** in `.git/objects/`, keyed by SHA-1 of its content. Branches and tags are just **refs** — text files in `.git/refs/` containing a SHA. History is the parent-chain of commit objects.",
      },
      {
        difficulty: "hard",
        topic: "Reflog",
        q: "I accidentally `git reset --hard` and lost commits. How do I recover them?",
        a: "**`git reflog`** — shows every place HEAD has been over the last ~30 days. Find the commit by its old position (`HEAD@{2}` etc.), then `git reset --hard <sha>` or create a branch at it: `git switch -c rescue <sha>`. Reflog is local and unreachable from a fresh clone — but for your machine, it's a lifesaver.",
      },
      {
        difficulty: "hard",
        topic: "Workflows",
        q: "GitFlow vs Trunk-based development — which do modern teams use?",
        a: "**GitFlow** (2010): long-lived `develop`/`release`/`hotfix` branches — overkill for most teams; the inventor himself later disavowed it for web/SaaS. **Trunk-based**: everyone commits to `main` (or short-lived feature branches that merge in ≤1 day), feature flags hide unfinished work, CI catches breakage. Modern high-velocity teams (Google, Meta, most YC-backed startups) use trunk-based.",
      },
      {
        difficulty: "hard",
        topic: "GitHub",
        q: "What are GitHub Actions and when do you use them?",
        a: "GitHub's built-in CI/CD — define YAML workflows in `.github/workflows/*.yml` that run on triggers (push, PR, schedule, manual). Hosted runners on Linux/Mac/Windows; thousands of community Actions in the Marketplace. Use for lint+test on every PR, deploy on tag, scheduled jobs (cron), and release automation.",
      },
    ],
  },
  {
    slug: "selenium",
    name: "Selenium",
    oneLiner:
      "An open-source toolkit that drives real browsers (Chrome / Firefox / Safari / Edge) programmatically — used for end-to-end testing and browser automation.",
    proficiency: 0.6,
    aliases: ["selenium", "webdriver"],
    docFile: "selenium.md",
    interestingFacts: [
      "Selenium was created in **2004 by Jason Huggins at ThoughtWorks** — its 'in-browser JavaScript' design is so old it predates the modern WebDriver API entirely.",
      "**Selenium WebDriver became a W3C standard in 2018** — every modern browser ships a built-in WebDriver implementation conforming to the spec.",
      "The name 'Selenium' is a **chemistry pun on Mercury** — at the time, the dominant commercial competitor was 'Mercury Interactive' (later HP/Micro Focus), and the antidote to mercury poisoning is selenium.",
      "Selenium IDE (the **record-and-playback** browser extension) is widely used by QA engineers who don't code — exported scripts can be run in any language WebDriver supports.",
      "Modern competitors **Playwright (Microsoft, 2020) and Cypress** are eating Selenium's e2e share for new projects — Selenium is now most often used for cross-browser test farms (BrowserStack, Sauce Labs) and legacy enterprise QA.",
    ],
    sources: [
      "https://www.selenium.dev/documentation/",
      "https://www.w3.org/TR/webdriver2/",
      "https://en.wikipedia.org/wiki/Selenium_(software)",
    ],
    interviewQuestions: [
      {
        difficulty: "easy",
        topic: "Basics",
        q: "What is Selenium and what are its main components?",
        a: "An open-source suite for automating browsers. Main pieces: **WebDriver** (the W3C-standard API to drive browsers programmatically — the main thing today), **Selenium IDE** (browser extension for record-and-playback), **Selenium Grid** (run tests on many browsers / machines in parallel). Bindings exist for Java, Python, C#, JS, Ruby, Kotlin.",
      },
      {
        difficulty: "easy",
        topic: "Locators",
        q: "What are the main types of locators?",
        a: "`By.id`, `By.name`, `By.className`, `By.tagName`, `By.linkText`, `By.partialLinkText`, `By.cssSelector`, `By.xpath`. **`id`** is fastest and most reliable; **CSS selectors** are next most performant; **XPath** is the most expressive (and most fragile). Modern best practice: use stable `data-testid` attributes via CSS selectors.",
      },
      {
        difficulty: "easy",
        topic: "API",
        q: "How do you open a page and click a button — minimal Python example?",
        a: "```python\nfrom selenium import webdriver\nfrom selenium.webdriver.common.by import By\n\ndriver = webdriver.Chrome()\ntry:\n    driver.get(\"https://example.com/login\")\n    driver.find_element(By.ID, \"email\").send_keys(\"user@x.com\")\n    driver.find_element(By.ID, \"submit\").click()\nfinally:\n    driver.quit()\n```\nAlways `driver.quit()` in a `finally` — orphaned browsers eat memory.",
      },
      {
        difficulty: "medium",
        topic: "Waits",
        q: "Implicit vs explicit vs fluent waits — when do you use each?",
        a: "**Implicit wait** — set once: `driver.implicitly_wait(10)` — poll up to 10 s for every `find_element`. Set once for whole session. **Explicit wait** — `WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, 'go')))` — waits for a specific condition. Most flexible. **Fluent wait** — explicit wait with custom polling interval + ignored exceptions. Modern advice: **avoid mixing implicit + explicit** (they compound).",
      },
      {
        difficulty: "medium",
        topic: "XPath",
        q: "Absolute vs relative XPath — and which should you prefer?",
        a: "**Absolute** (`/html/body/div[2]/section/...`) — full path from root; breaks at the slightest DOM change. **Relative** (`//button[@id='submit']`, `//div[contains(@class,'card')]//a`) — anchored to attributes/text. Always prefer relative XPath. Even better: stable `data-testid` attributes + CSS selectors.",
      },
      {
        difficulty: "medium",
        topic: "Stale element",
        q: "What is a `StaleElementReferenceException` and how do you fix it?",
        a: "You held a reference to an element, then the DOM was re-rendered (React update, AJAX, page nav) and your reference no longer points to a live node. Fix: **re-find the element** every time you need it (especially after any action), or wrap interactions in a retry helper that catches the stale exception.",
      },
      {
        difficulty: "medium",
        topic: "Frames",
        q: "How do you interact with elements inside an iframe?",
        a: "Switch context first: `driver.switch_to.frame(\"iframe-name\")` (or by id, index, or WebElement). Do your work. Then `driver.switch_to.default_content()` to return to the main frame. Forget the switch back and subsequent finds will fail.",
      },
      {
        difficulty: "medium",
        topic: "Best practice",
        q: "What is the Page Object Model and why use it?",
        a: "A design pattern where **each page (or major component) of the app gets a Python/Java class** that exposes high-level methods (`login_page.submit(email, password)`) and hides locators. Tests become readable use cases; locator changes need only one file. Standard for any test suite >50 cases.",
      },
      {
        difficulty: "hard",
        topic: "Grid",
        q: "What is Selenium Grid and when do you use it?",
        a: "A hub-and-node architecture (modern Grid 4 uses 'router + sessions + nodes') that distributes test runs across many browsers and OSes in parallel. Use it for cross-browser matrices, large CI fan-out, or pinning specific OS/browser combos. SaaS alternatives: BrowserStack, Sauce Labs, LambdaTest — same idea, hosted.",
      },
      {
        difficulty: "hard",
        topic: "vs alternatives",
        q: "Selenium vs Playwright vs Cypress — when do you pick each?",
        a: "**Selenium** — broadest browser + language support, W3C standard, mature; pick for legacy projects, cross-browser matrices, or polyglot teams. **Playwright** (Microsoft) — modern, async, auto-waits, parallel by default; new e2e projects pick this. **Cypress** — JS/TS only, runs inside the browser (limited cross-domain), great DX for frontend teams.",
      },
      {
        difficulty: "hard",
        topic: "Flakiness",
        q: "Selenium tests are flaky in CI but pass locally. What do you do?",
        a: "1) Run **headless** (`--headless=new`) so CI matches local conditions. 2) Replace any sleeps with **explicit waits** on element conditions. 3) Use **stable locators** (`data-testid` instead of class names). 4) Always `driver.quit()` in cleanup so processes don't leak. 5) For network flakiness, retry the *test*, not the action. 6) Capture screenshots + page source on failure to debug.",
      },
      {
        difficulty: "hard",
        topic: "Performance",
        q: "Your suite takes 90 minutes — how do you speed it up?",
        a: "1) **Parallelize** with pytest-xdist / TestNG / Mocha parallel. 2) **Run on Selenium Grid** to spread across machines. 3) **Skip UI for setup** — log in via direct API call + set cookies, instead of going through the login form. 4) Use **headless** browsers. 5) Audit slow tests — often a single waitFor hides 30 s; fix the wait condition. 6) Split smoke / regression suites so PRs only run the fast subset.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Tech stack (project-only) — separate registry from homepage Skills.       */
/*  Linked from /work/<project> tech badges → /tech/<slug>.                   */
/* -------------------------------------------------------------------------- */

export const techs: Tech[] = [
  {
    slug: "yolo",
    name: "YOLO",
    oneLiner:
      "Single-stage neural-network object detector that predicts every bounding box and class in one forward pass — purpose-built for real-time use.",
    aliases: ["yolo", "yolo11x", "yolo11", "yolov8", "yolov5", "ultralytics"],
    interestingFacts: [
      "'YOLO' literally means 'You Only Look Once' — the entire architectural pitch is that the image is processed in a single forward pass, unlike R-CNN's thousands of region proposals.",
      "The original 2015 paper by Joseph Redmon et al. achieved 45 FPS — and a 'Fast YOLO' variant hit 155 FPS — making it the first detector that could run on live video in real-time without specialised hardware.",
      "In February 2020, Joseph Redmon publicly quit computer-vision research, citing the field's military and privacy uses — he never authored YOLOv5 or any later version.",
      "After Redmon left, the 'YOLO' brand was effectively picked up by the Ultralytics company (YOLOv5 onwards) — so 'YOLOv8', 'YOLO11' etc. are technically not from the original author.",
      "YOLO papers are some of the most-cited in computer vision — collectively well over 100,000 citations, more than most full research labs produce in a decade.",
    ],
    sources: [
      "https://arxiv.org/abs/1506.02640",
      "https://en.wikipedia.org/wiki/You_Only_Look_Once",
      "https://docs.ultralytics.com/",
    ],
  },
  {
    slug: "bytetrack",
    name: "ByteTrack",
    oneLiner:
      "A simple but state-of-the-art multi-object tracker that associates EVERY detection — including low-confidence ones — to recover occluded objects.",
    aliases: ["bytetrack"],
    interestingFacts: [
      "ByteTrack's core insight (ECCV 2022) flipped a 'rule' every previous tracker followed: instead of throwing away low-confidence detections, ByteTrack uses them in a second matching pass to recover objects under occlusion.",
      "Despite being simpler than most predecessors, ByteTrack hit 80.3 MOTA / 77.3 IDF1 on MOT17 at 30 FPS — state-of-the-art on multiple benchmarks for over a year after release.",
      "It needs no appearance embedding network — unlike DeepSORT, which uses a separate CNN for re-identification. Just a Kalman filter + IoU matching is enough.",
      "The paper title — 'Multi-Object Tracking by Associating EVERY Detection Box' — is unusually direct for an ML paper, and tells you the entire algorithm in 8 words.",
      "ByteTrack is now the default tracker for Ultralytics YOLO (`tracker=\"bytetrack.yaml\"`) — meaning thousands of production CV pipelines use it without realising the name.",
    ],
    sources: [
      "https://arxiv.org/abs/2110.06864",
      "https://github.com/FoundationVision/ByteTrack",
    ],
  },
  {
    slug: "opencv",
    name: "OpenCV",
    oneLiner:
      "The world's most-used computer-vision library — 2,500+ algorithms for image/video processing, written in C++ with bindings for Python, Java and more.",
    aliases: ["opencv", "cv2"],
    interestingFacts: [
      "OpenCV was started inside Intel in 1999 by Gary Bradski — and was originally meant to be a closed-source product called 'CVL' (Computer Vision Library) before Gary convinced Intel to open-source it.",
      "The name 'OpenCV' is a deliberate echo of OpenGL — Bradski wanted the same brand recognition for vision that OpenGL had built for 3D graphics.",
      "OpenCV was unveiled at the CVPR 2000 conference (Hilton Head Island, South Carolina) — its launch venue is one of the most prestigious in the field.",
      "It's used by Google, Microsoft, Sony, Honda, Toyota, IBM and NASA among many others — and is downloaded ~40 million times per month.",
      "OpenCV powers everything from your phone's camera filters to industrial inspection lines to medical imaging — making it arguably the most ubiquitous CV library on earth.",
    ],
    sources: [
      "https://opencv.org/anniversary/",
      "https://en.wikipedia.org/wiki/OpenCV",
      "https://opencv.org/about/",
    ],
  },
  {
    slug: "tensorrt",
    name: "TensorRT",
    oneLiner:
      "NVIDIA's deep-learning inference compiler — converts trained models into fused, quantized engines that run dramatically faster on NVIDIA GPUs.",
    aliases: ["tensorrt", "tensorrt (fp16)", "fp16", "trt"],
    interestingFacts: [
      "TensorRT can deliver 2–5× speedup over plain PyTorch on the SAME GPU — and up to 40× over CPU inference — without changing your model's accuracy meaningfully.",
      "A YOLOv8 nano model that takes ~15–20 ms per frame in PyTorch drops to ~5–8 ms after TensorRT FP16 conversion — usable in real production budget for live video.",
      "FP16 (half-precision) provides roughly 2× theoretical throughput on NVIDIA Tensor Cores while preserving training accuracy via FP32 accumulation — almost a free win.",
      "INT8 quantization yields ~2.5× additional speedup with calibration — and INT8/FP8 recipes can deliver 35–45% extra speedup on generative models with near-FP16 quality.",
      "Most autonomous-driving stacks (NVIDIA Drive, Tesla AI/AP — when on NVIDIA GPUs — etc.) run inference through TensorRT, because the latency budget per camera frame is in single-digit milliseconds.",
    ],
    sources: [
      "https://developer.nvidia.com/tensorrt",
      "https://developer.nvidia.com/blog/speed-up-inference-tensorrt/",
      "https://docs.nvidia.com/deeplearning/tensorrt/",
    ],
  },
  {
    slug: "gpu-inference",
    name: "GPU Inference",
    oneLiner:
      "Running a trained model on a GPU — typically with reduced precision (FP16/INT8) — to exploit thousands of parallel cores and dedicated matrix engines.",
    aliases: ["gpu", "gpu inference", "cuda", "tensor cores"],
    interestingFacts: [
      "NVIDIA's CUDA — the language and runtime that made GPU programming mainstream — launched in 2007. Almost every modern AI training and inference stack ultimately runs on it.",
      "Modern data-centre GPUs (e.g. H100) can sustain hundreds of teraflops of FP16/BF16 throughput per card — that's more compute than the world's #1 supercomputer in the year 2000.",
      "Tensor Cores (introduced in Volta, 2017) and their successors do 4×4 mixed-precision matrix multiplies in one clock cycle — orders of magnitude faster than the regular CUDA cores for matmul.",
      "Mixed-precision inference (FP16 weights, FP32 accumulators) typically halves memory bandwidth and roughly doubles throughput with essentially zero accuracy loss for well-trained models.",
      "Google built TPUs (and Apple/Intel/AMD their own NPUs) specifically because GPU inference is so dominant that custom silicon is one of the only ways left to compete on cost per inference.",
    ],
    sources: [
      "https://developer.nvidia.com/cuda-zone",
      "https://en.wikipedia.org/wiki/CUDA",
      "https://www.nvidia.com/en-us/data-center/tensor-cores/",
    ],
  },
  {
    slug: "etl",
    name: "ETL",
    oneLiner:
      "Extract, Transform, Load — the canonical three-step pipeline for moving data from source systems into an analytics-ready store.",
    aliases: ["etl", "elt"],
    interestingFacts: [
      "ETL emerged with the rise of data warehousing in the late 1970s/1980s — long before 'data engineering' was a job title. The order (E → T → L) made sense when storage was expensive and transform had to happen before load.",
      "Modern cloud warehouses (Snowflake, BigQuery, Redshift) flipped the order to ELT — load raw data first, transform inside the warehouse — because compute is cheap and SQL is now the transformation engine.",
      "Tools like dbt (2016+) turned analytics ETL into 'just SQL, versioned with Git' — and triggered an industry shift sometimes called the 'Modern Data Stack'.",
      "Industry surveys repeatedly find that data engineers spend 50–80% of their time on data cleaning / ETL — not modelling or ML — making it one of the most cost-intensive parts of any data product.",
      "An invisible ETL job runs every time you log in to a website that shows analytics ('your views last week', 'top categories') — those numbers are almost never computed live; they're precomputed in an ETL pipeline.",
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Extract,_transform,_load",
      "https://www.getdbt.com/what-is-analytics-engineering/",
    ],
  },
  {
    slug: "jwt",
    name: "JWT",
    oneLiner:
      "JSON Web Token — a compact, signed, URL-safe token format for stateless authentication, defined in RFC 7519.",
    aliases: ["jwt", "json web token", "jsonwebtoken"],
    interestingFacts: [
      "A JWT is just three Base64Url-encoded JSON pieces joined by dots: `header.payload.signature` — copy any JWT into jwt.io and you can read the user's identity in plain text (only the signature is secret).",
      "Storing JWTs in `localStorage` is one of the most common security mistakes — any XSS on your page can steal the token, log in as the user, and you can't even revoke the token until it expires.",
      "Once upon a time, many JWT libraries accepted `\"alg\": \"none\"` — meaning an attacker could literally remove the signature and the server would still trust the token. This bug class crashed many real systems before being patched.",
      "JWTs feel stateless, but most production apps end up needing a server-side revocation list (or short expiry + refresh tokens) — making them only 'mostly' stateless in practice.",
      "Google, Auth0, Okta, AWS Cognito and Firebase Auth all issue JWTs by default for federated identity — so even if you've never used the format directly, you've consumed one today.",
    ],
    sources: [
      "https://datatracker.ietf.org/doc/html/rfc7519",
      "https://jwt.io/introduction",
      "https://owasp.org/www-project-cheat-sheets/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html",
    ],
  },
  {
    slug: "pytest",
    name: "Pytest",
    oneLiner:
      "The de-facto Python testing framework — fixtures, parametrization and plain `assert` statements with rich failure introspection.",
    aliases: ["pytest", "py.test"],
    interestingFacts: [
      "Pytest started in 2004 as part of Holger Krekel's larger 'py' library — its original command was literally `py.test`, an alias still recognised today.",
      "Unlike `unittest`, pytest uses plain Python `assert` statements — and uses AST rewriting under the hood to give you detailed failure messages like `assert a == b -> 5 != 7`.",
      "The fixture system (parametrize, dependency-injected setup) is widely considered the best testing API in any mainstream language — many other ecosystems (Rust's `rstest`, JS's `vitest`) explicitly cite it as inspiration.",
      "Pytest plugins (~1,000+) cover everything from snapshot testing to async, coverage, property-based testing and database fixtures — its plugin architecture is what made it eat the entire Python testing world.",
      "The most successful open-source Python projects (Django, Flask, FastAPI, scikit-learn, NumPy, Pandas) all use pytest as their test runner — even though some of them started on `unittest`.",
    ],
    sources: [
      "https://docs.pytest.org/",
      "https://en.wikipedia.org/wiki/Pytest",
    ],
  },
  {
    slug: "reinforcement-learning",
    name: "Reinforcement Learning",
    oneLiner:
      "An ML paradigm where an agent learns a policy by interacting with an environment and receiving reward signals — no labels, just trial and error.",
    aliases: ["reinforcement learning", "rl"],
    interestingFacts: [
      "DeepMind's DQN agent (2013/2015) learned to play 49 Atari games from raw pixels alone — surpassing human level on 29 of them, using the same network architecture for every game.",
      "AlphaGo's 2016 victory over Lee Sedol (4-1) was a watershed for RL — Go has more legal board positions than there are atoms in the observable universe, and a human-level expert was thought to be a decade away.",
      "ChatGPT and most modern LLMs are 'aligned' using RLHF — Reinforcement Learning from Human Feedback — meaning the same RL ideas that play games now decide how every chatbot you've ever used phrases its answers.",
      "RL is older than most people realise — Sutton & Barto's seminal textbook came out in 1998, and the temporal-difference learning idea behind it dates back to the 1950s and Arthur Samuel's checkers program.",
      "OpenAI's hide-and-seek RL agents (2019) spontaneously discovered tool use — agents learned to grab and place objects to build walls — emergent behaviour nobody programmed in.",
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Reinforcement_learning",
      "https://www.nature.com/articles/nature14236",
      "https://www.deepmind.com/research/highlighted-research/alphago",
    ],
  },
  {
    slug: "collaborative-filtering",
    name: "Collaborative Filtering",
    oneLiner:
      "A recommender-system technique that predicts what you'll like by finding users with similar taste — 'people who liked X also liked Y'.",
    aliases: ["collaborative filtering", "cf"],
    interestingFacts: [
      "The Netflix Prize (2006–2009) offered $1,000,000 for a 10% improvement on their recommender — and team 'BellKor's Pragmatic Chaos' won by 10.06%, edging out 40,000+ competing teams.",
      "Netflix never actually deployed the winning algorithm — by the time the prize concluded, the company had pivoted to streaming and the ensemble was too engineering-heavy to run in production.",
      "The competition single-handedly popularised matrix factorization (SVD) for recommender systems — a technique that's now standard at almost every major e-commerce, music and video site.",
      "Most large-scale recommenders combine multiple methods: collaborative filtering (user similarity), content-based filtering (item features), and increasingly deep-learning embeddings — but CF is almost always one of the layers.",
      "The 'cold-start problem' (new user / new item, no data) is collaborative filtering's classic weakness — and is the reason new accounts everywhere get those onboarding 'pick 3 favourites' questionnaires.",
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Netflix_Prize",
      "https://en.wikipedia.org/wiki/Collaborative_filtering",
    ],
  },
  {
    slug: "rest-apis",
    name: "REST APIs",
    oneLiner:
      "An architectural style for networked APIs — stateless, resource-oriented, using HTTP verbs — defined by Roy Fielding in his 2000 PhD dissertation.",
    aliases: ["rest", "rest api", "rest apis", "restful", "restful api"],
    interestingFacts: [
      "REST was introduced by Roy Fielding in his 2000 PhD dissertation at UC Irvine — chapter 5 of which essentially designed the modern web API.",
      "Strict REST defines six constraints (client-server, stateless, cacheable, layered system, uniform interface, optional code-on-demand) — and Fielding himself has said most 'REST APIs' violate at least one.",
      "HATEOAS — the 'links inside responses' constraint that makes REST self-discoverable — is arguably the most-skipped REST principle in industry practice.",
      "REST overtook SOAP/WSDL not because it was more capable, but because it was dramatically simpler — JSON over HTTP needed no XML schemas, no envelopes and no special tooling.",
      "Today GraphQL and gRPC pitch themselves as REST alternatives — but the public APIs of GitHub, Stripe, Twitter and most SaaS still default to REST, because it's the lingua franca every developer already knows.",
    ],
    sources: [
      "https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm",
      "https://en.wikipedia.org/wiki/REST",
    ],
  },
  {
    slug: "dax",
    name: "DAX",
    oneLiner:
      "Data Analysis Expressions — Microsoft's formula language for Power BI, Power Pivot and Analysis Services, designed to feel like Excel but think like SQL.",
    aliases: ["dax"],
    interestingFacts: [
      "DAX shipped in 2009 with PowerPivot for Excel — Microsoft deliberately made the syntax Excel-style (e.g. `SUM(Sales[Amount])`) so analysts wouldn't have to learn MDX or T-SQL.",
      "It now powers four major Microsoft products: Power BI, Power Pivot (Excel), Analysis Services Tabular, and Power Apps — most analysts using DAX don't realise the same engine is under all four.",
      "The function that trips up most newcomers is `CALCULATE` — it modifies 'filter context' on the fly, and mastering it is widely considered the line between a beginner and an intermediate DAX user.",
      "Time-intelligence in DAX is one of its killer features — `TOTALYTD`, `SAMEPERIODLASTYEAR`, `DATEADD` make year-over-year and rolling-window analytics one-liners that would be 30+ lines of SQL.",
      "DAX is single-threaded per query in the formula engine — heavy DAX models often hit performance issues that are solved not by faster hardware but by switching to the storage engine via `SUMX` patterns and variables.",
    ],
    sources: [
      "https://learn.microsoft.com/en-us/dax/",
      "https://en.wikipedia.org/wiki/Data_Analysis_Expressions",
    ],
  },
  {
    slug: "sqlite",
    name: "SQLite",
    oneLiner:
      "A serverless, zero-configuration, single-file SQL database engine — the most-deployed database in the world.",
    aliases: ["sqlite", "sqlite3"],
    interestingFacts: [
      "There are over one TRILLION SQLite databases in active use — every smartphone, every modern browser, every Mac, every Windows 10+ install, and even commercial aircraft like the Airbus A350 ship SQLite.",
      "Despite being the world's most-deployed database, SQLite is maintained by exactly THREE people: D. Richard Hipp (founder), Dan Kennedy and Joe Mistachkin — compare to Oracle's ~140,000 employees.",
      "SQLite is in the public domain — not just open-source. Anyone can use it for anything, no attribution, no license file. It's one of the very few major software projects to make this choice.",
      "The entire database is stored as a SINGLE FILE — copy it, email it, version it, ship it inside your app. This 'just a file' design is why iOS / Android / browsers all picked it.",
      "The US Library of Congress officially recommends SQLite as a long-term archival storage format for digital preservation — it's one of the only formats they trust will still be readable a century from now.",
    ],
    sources: [
      "https://sqlite.org/mostdeployed.html",
      "https://sqlite.org/famous.html",
      "https://en.wikipedia.org/wiki/SQLite",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

// Verbatim from the resume.
export const experience: ExperienceItem[] = [
  {
    slug: "miraigate",
    role: "Python Developer",
    company: "Miraigate Solutions",
    period: "Feb 2026 — Present",
    summary:
      "Developing and maintaining Python automation scripts and computer-vision modules across multiple ongoing projects in a dynamic startup setting.",
    highlights: [
      "Build and maintain Python automation scripts and computer-vision modules across ongoing projects",
      "Collaborate on coding, debugging, testing and project coordination for simultaneous deliverables",
      "Multitask across 4+ concurrent projects, adapting quickly to shifting priorities and evolving tech needs",
    ],
  },
  {
    slug: "hosho",
    role: "Junior Consultant Intern",
    company: "Hosho Digital",
    period: "Jul 2025 — Nov 2025",
    summary:
      "Built Python backend data pipelines and APIs for a real-world project, managing databases and frontend integration.",
    highlights: [
      "Developed Python scripts for backend data pipelines and APIs, managing databases and frontend integration",
      "Automated software tasks with Python and .NET, including data modeling with Microsoft Power Platform",
      "Performed data engineering and analysis with Pandas and Seaborn to handle client requirements efficiently",
    ],
  },
  {
    slug: "alveofit",
    role: "Python-ML Intern",
    company: "Alveofit (Roundwork Technologies)",
    period: "Feb 2025 — Mar 2025",
    summary:
      "Developed and deployed a two-stage XGBoost ML pipeline for real-time asthma predictions.",
    highlights: [
      "Built and deployed a two-stage XGBoost pipeline for real-time asthma predictions, monitoring performance via EDA",
      "Built a Flask REST API with robust validation and error handling, integrating models for production use",
    ],
  },
  {
    role: "B.Tech, Computer Science & Engineering",
    company: "Medicaps University",
    period: "2021 — 2025",
    summary: "Bachelor of Technology in Computer Science and Engineering.",
    highlights: [],
  },
];

/* -------------------------------------------------------------------------- */
/*  Socials                                                                   */
/* -------------------------------------------------------------------------- */

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/anveetpal01" },
  { label: "LinkedIn", href: "https://linkedin.com/in/anveet-pal" },
];
