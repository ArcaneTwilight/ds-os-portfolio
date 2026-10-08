import { ProjectItem, ExperienceItem, TechItem, FileItem, PersonalData } from '../types/os';

export const DEVELOPER_PROFILE = {
  name: 'Deevann Shrestha',
  handle: '@deevannshrestha',
  role: 'Technical Product Delivery Specialist | Mobile Application Release | Application Support',
  tagline: 'Software Engineer and Technical Product Delivery Specialist with 5+ years of experience in mobile application delivery, application support, and software releases.',
  location: 'Mandaluyong City, Philippines',
  email: 'deevann.shrestha@gmail.com',
  github: '',
  linkedin: 'https://linkedin.com/in/deevann-shrestha',
  x: 'https://linkedin.com/in/deevann-shrestha',
  phone: '+63 928 932 8102',
  yearsExperience: '5+ Years',
  status: 'Open to technical product delivery, mobile release, and application support opportunities',
  bio: 'Software Engineer and Technical Product Delivery Specialist with 5+ years of experience in mobile application delivery, application support, and software releases. Built and released 30+ white label React Native applications for iOS and Android and managed delivery for more than 100 mobile app clients. Led a React Native upgrade, UI improvements, module enhancements and redesign, and AI feature implementations. Skilled in React Native, Xcode, Android Studio, App Store Connect, Google Play Console, team coordination, and stakeholder communication.'
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'company-nexus',
    title: 'Company Nexus',
    tagline: 'A private operations hub for company resources, team coordination, knowledge, and recurring work.',
    description: 'Company Nexus brings internal tools, FAQs, developer knowledge, team contacts, calendars, company applications, and operational trackers into one searchable workspace. It is designed for internal operations and investor-relations teams, with shared Firebase data or local development storage.',
    category: 'Systems',
    year: '2026',
    technologies: [
      'React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Motion', 'Lucide',
      'Node.js', 'Express', 'Vercel', 'Firebase Authentication', 'Cloud Firestore',
      'Google Gemini', 'Zod', 'MCP SDK', 'D3', 'ExcelJS', 'React Markdown'
    ],
    mainTechnologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Firebase', 'Google Gemini'],
    techStack: [
      { area: 'Frontend', technologies: ['React 19', 'TypeScript', 'Vite'] },
      { area: 'Styling & interaction', technologies: ['Tailwind CSS v4', 'Motion', 'Lucide icons'] },
      { area: 'Backend', technologies: ['Node.js', 'Express', 'Vercel serverless endpoints'] },
      { area: 'Authentication & data', technologies: ['Firebase Authentication', 'Cloud Firestore', 'localStorage fallback'] },
      { area: 'AI', technologies: ['Google Gemini', 'Server-side tool calling', 'Knowledge retrieval'] },
      { area: 'Validation & integrations', technologies: ['Zod', 'Model Context Protocol (MCP) SDK'] },
      { area: 'Other libraries', technologies: ['D3', 'ExcelJS', 'React Markdown'] },
      { area: 'Development & deployment', technologies: ['npm', 'TypeScript type-checking', 'esbuild', 'Vercel'] }
    ],
    accentColor: '#38bdf8',
    features: [
      'Overview dashboard with service metrics, quick links, market references, and regional clocks',
      'Searchable tools, FAQs, developer articles, knowledge documents, and team resources',
      'Team directory, contact information, shared calendar, and company application directory',
      'Application list with filters, saved views, configurable columns, comments, and spreadsheet export',
      'Report-upload tracking, production trackers, external trackers, and editable Kanban boards',
      'Firebase sign-in and shared Firestore data, with browser storage for local development',
      'Gemini assistant with cited knowledge retrieval; proposed updates require user confirmation'
    ],
    extendedCapabilities: [
      'Knowledge retrieval includes chunking, ranking, citations, caching, and evaluation tooling',
      'Optional MCP server supports knowledge search, FAQ lookup, and update proposals',
      'Supports local Express and Vite development alongside Vercel deployment'
    ],
    architectureNotes: 'Firebase Authentication and Cloud Firestore support team access and shared data. Local development can fall back to browser storage. Gemini uses server-side tool calling and knowledge retrieval; changes are proposed for review and only applied after explicit confirmation.',
    screenshotUrl: '/images/projects/company-nexus.png',
    audience: 'Internal team members, especially operations and investor-relations teams coordinating company applications, reporting, contacts, schedules, and shared knowledge.',
    designNotes: 'A cyber-inspired operations dashboard with technical typography, subtle grids, ambient gradients, glass-style panels, theme-aware accents, light and dark modes, and reduced-motion support.',
    projectStatus: 'Demo access available',
    demoAccess: { username: 'company@mail.com', password: 'password' }
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'euroland-software-engineer',
    role: 'Software Engineer',
    company: 'Euroland.com AB',
    period: 'Jul 2024 – Jul 2026',
    location: 'Metro Manila, Philippines',
    category: 'Mobile Delivery',
    description: 'Built, configured, tested, and released white label React Native investor relations apps for iOS and Android, while coordinating product delivery and production support.',
    highlights: [
      'Built, configured, tested, and released 30+ white label React Native investor relations mobile applications for iOS and Android for international clients.',
      'Managed mobile releases using Xcode, Android Studio, App Store Connect, and Google Play Console, including build configuration, code signing, provisioning, testing, store submission, and production release.',
      'Investigated application and deployment issues across APIs, XML, JSON, TypeScript, JavaScript, HTML, CSS, and platform specific configuration files.',
      'Coordinated with backend developers, QA, Production, and clients to resolve issues, validate application requirements, and address findings related to Vulnerability Assessment and Penetration Testing or mobile app security.',
      'Supported the Investor Relations App V3 rollout to approximately 90% of the client application portfolio.',
      'Performed Product Owner duties by coordinating sprint planning, user story creation, backlog coordination, feature prioritization, and release planning.',
      'Led React Native upgrade, user interface improvements, module enhancements, module redesign, and AI feature implementations.',
      'Created RCA, incident reports, infrastructure documents, business requirements documents, and mobile app launch roadmaps for complex client requests.',
      'Created mobile app analytics reports and an internal web application for uploading analytics data, generating reports, and reviewing AI assisted insights before client reporting.',
      'Analyzed mobile app KPIs including downloads, page views, sessions, user engagement, traffic sources, conversion rates, uninstall rates, persistence rates, daily active users, monthly active users, and push notification performance.',
      'Explored PostHog analytics implementation and created React dashboards using HogQL.'
    ],
    technologies: ['React Native', 'Xcode', 'Android Studio', 'App Store Connect', 'Google Play Console', 'PostHog', 'HogQL', 'TypeScript', 'JavaScript']
  },
  {
    id: 'euroland-product-support',
    role: 'Product Support Specialist',
    company: 'Euroland.com AB',
    period: 'Jun 2023 – Jun 2024',
    location: 'Metro Manila, Philippines',
    category: 'Application Support',
    description: 'Managed delivery for more than 100 investor relations app clients, from requirements collection through release and post-release support.',
    highlights: [
      'Managed application delivery for more than 100 investor relations app clients from requirements collection through development, QA, testing, release, and post release support.',
      'Coordinated client branding, app configuration, features, content, reports, and other assets with Sales, Customer Success, Development, QA, and Production teams.',
      'Translated client requirements into technical handover documents, Trello tasks, Figma requirements, and validation expectations, and uploaded files through Filezilla FTP.',
      'Monitored production issues, coordinated investigation and escalation, and followed through until resolution.',
      'Performed pre release checks, coordinated internal, external, and production testing, and provided post-launch app support.',
      'Led weekly mobile production standups to review priorities, blockers, risks, defects, and delivery status.'
    ],
    technologies: ['Application Support', 'Release Coordination', 'QA', 'Trello', 'Figma', 'FileZilla', 'Stakeholder Communication']
  },
  {
    id: 'accenture-application-development-analyst',
    role: 'Application Development Analyst',
    company: 'Accenture Inc.',
    period: 'Jun 2021 – Oct 2022',
    location: 'Metro Manila, Philippines',
    category: 'Enterprise Systems',
    description: 'Supported a Canadian client’s SAP Plant Maintenance and Master Data Governance processes while resolving application issues and implementing enhancements.',
    highlights: [
      'Supported Canadian clients using SAP Plant Maintenance and Master Data Governance processes.',
      'Investigated SAP application issues, analyzed business impact, implemented changes, and monitored outcomes.',
      'Customized SAP Plant Maintenance modules according to client requirements and business processes.',
      'Monitored integration points across SAP Plant Maintenance, Production Planning, Materials Management, Financial Accounting and Controlling, and Quality Management.',
      'Implemented feature enhancements and coordinated issue resolution with SAP Financial Accounting and Controlling and Materials Management teams.',
      'Supported Master Data Governance migration by validating records, performing data quality checks, and aligning migrated data with governance standards.',
      'Provided on call support and acted as liaison between operational users, corporate stakeholders, and SAP technical and functional teams.'
    ],
    technologies: ['SAP Plant Maintenance', 'SAP Master Data Governance', 'Production Planning', 'Materials Management', 'Financial Accounting and Controlling', 'Quality Management']
  },
  {
    id: 'ti-manufacturing-product-engineer',
    role: 'Manufacturing Product Engineer',
    company: 'Texas Instruments',
    period: 'Dec 2019 – Dec 2020',
    location: 'Baguio, Philippines',
    category: 'Manufacturing',
    description: 'Monitored yield and defect KPIs across six integrated circuit product lines and improved manufacturing quality and process efficiency.',
    highlights: [
      'Monitored yield and defect KPIs across six integrated circuit product lines and verified compliance with manufacturing and quality requirements.',
      'Analyzed test results to identify defect patterns and root causes, contributing to a reported 3% reduction in defects and 5% improvement in yield.',
      'Improved test environments, test cases, and automated testing systems to strengthen quality control and process efficiency.',
      'Audited production stages, documented process deviations, and coordinated corrective actions with raw materials, equipment, test, and manufacturing teams.'
    ],
    technologies: ['Yield Analysis', 'Defect Analysis', 'Automated Testing', 'Quality Engineering', 'Root-Cause Analysis']
  },
  {
    id: 'ti-software-developer-intern',
    role: 'Software Developer Intern',
    company: 'Texas Instruments',
    period: 'Jun 2018 – Jul 2018',
    location: 'Baguio, Philippines',
    category: 'Software Development',
    description: 'Supported and tested a Spring based Java application supporting a manufacturing machine product line.',
    highlights: [
      'Supported and tested a Spring based Java application supporting a manufacturing machine product line.',
      'Developed HTML and CSS interfaces, created SQL queries, and used Maven for application packaging.',
      'Supported deployment using Apache Tomcat and created JUnit tests for application validation and regression testing.'
    ],
    technologies: ['Java', 'Spring', 'HTML', 'CSS', 'SQL', 'Maven', 'Apache Tomcat', 'JUnit']
  },
  {
    id: 'taazacoupons-content-analyst',
    role: 'Content Analyst',
    company: 'TaazaCoupons',
    period: 'Apr 2014 – Dec 2016',
    location: 'Remote',
    category: 'Content Operations',
    description: 'Managed merchant listings and promotional content while improving SEO performance and digital marketing consistency.',
    highlights: [
      'Managed 350+ merchant listings and their associated coupons daily while maintaining content accuracy.',
      'Applied SEO practices to product listings and images, contributing to approximately 3x traffic growth.',
      'Created advertising copy, product descriptions, website content, and social media content for Twitter, Facebook, Instagram, and YouTube.',
      'Created promotional images using Photoshop while maintaining consistent brand and content standards.'
    ],
    technologies: ['SEO', 'Photoshop', 'Content Writing', 'Social Media', 'Content Operations']
  }
];

export const TECH_STACK_DATA: TechItem[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    proficiency: 92,
    experienceYears: 4,
    description: 'Used for application logic and front-end delivery across React Native and web-based client work.',
    iconName: 'code',
    featured: true
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    proficiency: 90,
    experienceYears: 4,
    description: 'Applied across client-facing web and mobile application features and release support.',
    iconName: 'code',
    featured: true
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'Frontend',
    proficiency: 93,
    experienceYears: 3,
    description: 'Built and released 30+ white-label mobile applications and managed app upgrades and module enhancements.',
    iconName: 'react',
    featured: true
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Backend',
    proficiency: 85,
    experienceYears: 3,
    description: 'Used in Spring-based application development and enterprise-side solution work.',
    iconName: 'server'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend',
    proficiency: 78,
    experienceYears: 3,
    description: 'Applied for data validation, automation, and supporting process and reporting workflows.',
    iconName: 'cpu'
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Backend',
    proficiency: 88,
    experienceYears: 5,
    description: 'Used for data validation, application support, and query-driven troubleshooting.',
    iconName: 'database',
    featured: true
  },
  {
    id: 'sap-pm-mdg',
    name: 'SAP PM & SAP MDG',
    category: 'Backend',
    proficiency: 82,
    experienceYears: 2,
    description: 'Supported enterprise maintenance and master data governance processes, issue resolution, and module customization.',
    iconName: 'shield'
  },
  {
    id: 'html-css',
    name: 'HTML5 / CSS',
    category: 'Frontend',
    proficiency: 88,
    experienceYears: 5,
    description: 'Used for UI work, content standardization, and cross-platform application presentation.',
    iconName: 'palette'
  },
  {
    id: 'git-gitlab',
    name: 'Git / GitLab / Jira',
    category: 'Tools & Cloud',
    proficiency: 90,
    experienceYears: 5,
    description: 'Used for version control, issue tracking, sprint planning, release coordination, and cross-team delivery workflow.',
    iconName: 'terminal',
    featured: true
  },
  {
    id: 'app-store',
    name: 'App Store Connect / Google Play Console',
    category: 'Tools & Cloud',
    proficiency: 88,
    experienceYears: 3,
    description: 'Supported mobile app deployment, code signing, release validation, and build management for client applications.',
    iconName: 'cloud',
    featured: true
  },
  {
    id: 'design-tools',
    name: 'Figma / Canva / Photoshop',
    category: 'Tools & Cloud',
    proficiency: 80,
    experienceYears: 4,
    description: 'Used for UI/UX collaboration, advertising copy standardization, and design-related workflow support.',
    iconName: 'palette'
  },
  {
    id: 'ai-tools',
    name: 'Google AI Studio / Gemini / Claude / Perplexity',
    category: 'AI',
    proficiency: 76,
    experienceYears: 2,
    description: 'Used as part of product experimentation and workflow support for AI-driven features and productivity enhancement.',
    iconName: 'sparkles'
  },
  {
    id: 'analytics',
    name: 'Tableau / Excel / Microsoft Clarity',
    category: 'Tools & Cloud',
    proficiency: 75,
    experienceYears: 3,
    description: 'Applied for data review, reporting, and supporting analysis in product and customer-facing operational workflows.',
    iconName: 'database'
  }
];

export const PERSONAL_DATA: PersonalData = {
  travelLocations: [
    {
      id: 'cats',
      title: 'My Cats',
      city: 'Baguio',
      country: 'Philippines',
      src: '/images/personal/My-Cats_Baguio_Philippines.jpg',
      alt: 'Three cats resting together',
      mapX: 14859,
      mapY: 16559
    },
    {
      id: 'hamster',
      title: 'My Hamster',
      city: 'Baguio',
      country: 'Philippines',
      src: '/images/personal/My-Hamster_Baguio_Philippines.jpg',
      alt: 'A golden hamster resting on a blanket',
      mapX: 14859,
      mapY: 16559
    },
    {
      id: 'cat',
      title: 'My Cat',
      city: 'Baguio',
      country: 'Philippines',
      src: '/images/personal/My-Cat_Baguio_Philippines.jpg',
      alt: 'A calico cat sitting beside a pair of shoes',
      mapX: 14859,
      mapY: 16559
    },
    {
      id: 'hundred-islands',
      title: 'Hundred Islands',
      city: 'Pangasinan',
      country: 'Philippines',
      src: '/images/personal/Hundred-Islands_Pangasinan_Philippines.jpg',
      alt: 'Green island surrounded by clear water at Hundred Islands',
      mapX: 12691,
      mapY: 17311
    },
    {
      id: 'mandaluyong-skyline',
      title: 'Mandaluyong Skyline',
      city: 'Mandaluyong',
      country: 'Philippines',
      src: '/images/personal/Mandaluyong-SKyline_Mandaluyong_Philippines.jpg',
      alt: 'Mandaluyong city skyline at sunset',
      mapX: 16423,
      mapY: 23217
    },
    {
      id: 'peoples-park',
      title: "People's Park in the Sky",
      city: 'Tagaytay',
      country: 'Philippines',
      src: "/images/personal/People's-Park-in-the-Sky_Tagaytay_Philippines.jpg",
      alt: "Panoramic view from People's Park in the Sky",
      mapX: 16366,
      mapY: 24829
    },
    {
      id: 'chocolate-hills',
      title: 'Chocolate Hills',
      city: 'Bohol',
      country: 'Philippines',
      src: '/images/personal/Chocolate-Hills_Bohol_Philippines.jpg',
      alt: 'Panoramic view across the Chocolate Hills in Bohol',
      mapX: 27340,
      mapY: 40386
    },
    {
      id: 'boudhanath',
      title: 'Boudhanath Stupa',
      city: 'Kathmandu',
      country: 'Nepal',
      src: '/images/personal/Boudhanath-Stupa_Kathmandu_Nepal.jpg',
      alt: 'Boudhanath Stupa and prayer flags in Kathmandu',
      mapX: 740.1,
      mapY: 468
    },
    {
      id: 'buddha-amideva-park',
      title: 'Buddha Amideva Park',
      city: 'Swayambhunath',
      country: 'Nepal',
      src: '/images/personal/Buddha-Amideva-Park_Swayambhunath_Nepal.jpg',
      alt: 'Golden statues at Buddha Amideva Park',
      mapX: 730.7,
      mapY: 469.1
    },
    {
      id: 'chandragiri-hills',
      title: 'Chandragiri Hills',
      city: 'Kathmandu',
      country: 'Nepal',
      src: '/images/personal/Chandragiri-Hills_Kathmandu_Nepal.jpg',
      alt: 'Himalayan mountain range viewed from Chandragiri Hills',
      mapX: 721.5,
      mapY: 476.6
    },
    {
      id: 'batu-caves',
      title: 'Batu Caves',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      src: '/images/personal/Batu-Caves_Kuala-Lumpur-Malaysia.jpg',
      alt: 'Sculpted temple facade at Batu Caves',
      mapX: 130.8,
      mapY: 249.9
    },
    {
      id: 'petronas-twin-towers',
      title: 'Petronas Twin Towers',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      src: '/images/personal/Petronas-Twin-Tower_Kuala-Lumpur-Malaysia.jpg',
      alt: 'Petronas Twin Towers in Kuala Lumpur',
      mapX: 132.4,
      mapY: 254.5
    }
  ],
  spotifyPlaylistUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator',
  youtubePlaylistUrl: 'https://www.youtube-nocookie.com/embed/jfKfPfyJRdk'
};

export const VIRTUAL_FILES: FileItem[] = [
  {
    id: 'folder-projects',
    name: 'Projects',
    type: 'folder',
    size: '1 item',
    updatedAt: '2026-10-06',
    appId: 'projects'
  },
  {
    id: 'folder-exp',
    name: 'Experience',
    type: 'folder',
    size: '6 items',
    updatedAt: '2026-10-08',
    appId: 'experience'
  },
  {
    id: 'file-resume',
    name: 'Resume.pdf',
    type: 'pdf',
    size: '113 KB',
    updatedAt: '2026-10-08',
    appId: 'resume'
  },
  {
    id: 'file-about',
    name: 'About.txt',
    type: 'txt',
    size: '1.4 KB',
    updatedAt: '2026-10-08',
    appId: 'about',
    content: `DS OS // DEVELOPER PROFILE
=====================================================

NAME: Deevann Shrestha
PRIMARY POSITIONING: Technical Product Delivery Specialist | Mobile Application Release | Application Support
OTHER POSITIONING: Software Engineer; Product Support Specialist; Application Development Analyst; Manufacturing Product Engineer
LOCATION: Mandaluyong City, Philippines
PHONE: +63 928 932 8102
EMAIL: deevann.shrestha@gmail.com
LINKEDIN: https://linkedin.com/in/deevann-shrestha
WEBSITE: ds-os-portfolio.vercel.app
EDUCATION: BS Electronics Engineering (Saint Louis University)
LICENSE: Licensed Electronics Engineer, 2020–present; valid until 2028
EXPERIENCE: 5+ years

SUMMARY:
Software Engineer and Technical Product Delivery Specialist with 5+ years of experience in mobile application delivery, application support, and software releases. Built and released 30+ white label React Native applications for iOS and Android and managed delivery for more than 100 mobile app clients.

SPECIALTIES:
- React Native application delivery and mobile releases for iOS and Android
- Product ownership, requirements gathering, sprint planning, and release planning
- Application support, incident management, and root-cause analysis
- SAP Plant Maintenance and Master Data Governance support
- Mobile app analytics, dashboards, and AI feature implementations

Type 'help' in Terminal or open the Resume app for the full profile.
`
  }
];

export const RESUME_DATA = {
  header: {
    name: 'Deevann Shrestha',
    title: 'Technical Product Delivery Specialist | Mobile Application Release | Application Support',
    location: 'Mandaluyong City, Philippines',
    email: 'deevann.shrestha@gmail.com',
    phone: '+63 928 932 8102',
    linkedin: 'linkedin.com/in/deevann-shrestha',
    website: 'ds-os-portfolio.vercel.app',
    summary: 'Software Engineer and Technical Product Delivery Specialist with 5+ years of experience in mobile application delivery, application support, and software releases. Built and released 30+ white label React Native applications for iOS and Android, managed delivery for more than 100 mobile app clients, and led React Native upgrades, UI improvements, module enhancements and redesign, and AI feature implementations.'
  },
  skills: [
    { label: 'Mobile Application Delivery', items: 'React Native; Xcode; Android Studio; App Store Connect; Google Play Console; TestFlight; iOS and Android deployment; code signing; provisioning profiles; certificates; entitlements; internal and external testing; release validation' },
    { label: 'Application Support and Operations', items: 'Application troubleshooting; API investigation; incident management; issue triage; root-cause analysis; production support; regression testing; configuration analysis; technical escalation; release coordination; change coordination; service-level tracking' },
    { label: 'Programming and Development', items: 'JavaScript; TypeScript; Python; SQL; HTML5; CSS; XML; JSON' },
    { label: 'Enterprise Applications', items: 'SAP Plant Maintenance; SAP Master Data Governance; SAP application support' },
    { label: 'Product and Delivery', items: 'Requirements gathering; user stories; technical handover; backlog coordination; sprint planning; Kanban; Agile delivery; release planning; QA coordination; stakeholder communication; risk and dependency tracking' },
    { label: 'Analytics and Reporting', items: 'Excel; pivot tables; Google Sheets; App Store Connect Analytics; Google Play Console Analytics; Microsoft Clarity; PostHog; HogQL; engagement analysis; conversion analysis; retention analysis; dashboard development' },
    { label: 'AI Tools', items: 'Stitch for AI-assisted UI design and prototyping; Google AI Studio and v0 for prototyping and initial application generation; Claude for software assistance; VS Code Copilot and Cursor for code completion and development support; Gemini for context analysis; ChatGPT for general AI assistance and image generation; Perplexity for research; ElevenLabs for AI text-to-speech; Vercel for hosting and deployment' },
    { label: 'Tools and Platforms', items: 'Git; GitLab; Jira; Confluence; Trello; ServiceNow; Microsoft Teams; FileZilla; Figma; Photoshop; Canva' }
  ],
  experience: EXPERIENCE_DATA.map(({ company, role, period, highlights }) => ({
    company,
    role,
    dates: period,
    bullets: highlights
  })),
  education: {
    degree: 'Bachelor of Science in Electronics Engineering',
    institution: 'Saint Louis University',
    year: '2014 – 2019'
  },
  licensure: 'Licensed Electronics Engineer · 2020 – present (Valid until 2028)'
};
