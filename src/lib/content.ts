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
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
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
      sections: [
        {
          heading: "What it does",
          body: "Built a real-time computer-vision pipeline to detect, track and count multiple object classes from live camera streams with low-latency, GPU-accelerated inference.",
        },
        {
          heading: "Line-crossing counter",
          body: "Designed a line-crossing counter with occlusion handling, ghost-track suppression and multi-class aggregation across concurrent video streams.",
        },
        {
          heading: "Stream-health monitoring",
          body: "Implemented automated stream-health monitoring to dynamically score and select viable camera feeds based on scene visibility, traffic density and frame integrity.",
        },
      ],
      techStack: ["Python", "Computer Vision", "GPU Inference", "Multi-object Tracking"],
      timeline: "Miraigate Technology · 2026",
    },
  },
  {
    id: "disease-asthma-prediction",
    slug: "disease-asthma-prediction-api",
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
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

// Verbatim from the resume.
export const experience: ExperienceItem[] = [
  {
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
