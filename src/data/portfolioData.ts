import { ProjectItem, ExperienceItem, TechItem, FileItem, PersonalData } from '../types/os';

export const DEVELOPER_PROFILE = {
  name: 'Deevann Shrestha',
  handle: '@deevannshrestha',
  role: 'Software Delivery & Product Operations Specialist',
  tagline: 'Software Engineer and Technical Delivery Specialist with 8+ years across mobile applications, enterprise systems, product support, and software releases.',
  location: 'Philippines',
  email: 'deevann.shrestha@gmail.com',
  github: '',
  linkedin: 'https://linkedin.com/in/deevann-shrestha',
  x: 'https://linkedin.com/in/deevann-shrestha',
  phone: '+63 928 932 8102',
  yearsExperience: '8+ Years',
  status: 'Open to software delivery, product operations, mobile, and application support opportunities',
  bio: `Software Engineer and Technical Delivery Specialist with 8+ years of professional experience in mobile applications, enterprise systems, product operations, software releases, and technical support. Bridges business and technical teams by translating requirements into actionable work, coordinating delivery, resolving issues, and improving process reliability.`
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'ir-app-portfolio',
    title: 'Investor Relations App Portfolio',
    tagline: 'End-to-end delivery for 110+ investor relations app clients across requirements, development, QA, and release.',
    description: 'Supported the delivery lifecycle for a large investor relations application portfolio, coordinating requirements gathering, development handover, QA, and release execution across client-facing product work.',
    category: 'Systems',
    year: '2023–2026',
    technologies: ['React Native', 'Mobile Release Management', 'QA', 'Client Support', 'Jira'],
    accentColor: '#38bdf8',
    stats: [
      { label: 'Clients Supported', value: '110+' },
      { label: 'White-label Apps', value: '30+' },
      { label: 'Portfolio Rollout', value: '~90%' }
    ],
    features: [
      'Handled end-to-end delivery for 110+ investor relations app clients including requirements, QA, release coordination, and client support',
      'Built and released 30+ white-label React Native applications with end-to-end ownership',
      'Served as product owner for feature upgrades, UI/UX improvements, module enhancements, and VAPT security testing',
      'Acted as the primary liaison among Sales, QA, Development, and Client Support'
    ],
    architectureNotes: 'Focused on product operations, delivery coordination, and release reliability for a broad mix of B2B investor relations applications and white-label mobile builds.'
  },
  {
    id: 'ir-app-v3',
    title: 'IR App v3 Rollout',
    tagline: 'Led the IR App v3 evolution and rollout to approximately 90% of the client portfolio.',
    description: 'Owned the rollout of the next-generation investor relations app experience, covering new product features, release alignment, and cross-functional coordination across client teams.',
    category: 'Interface',
    year: '2024–2026',
    technologies: ['React Native', 'Product Ownership', 'Agile', 'Release Management', 'Stakeholder Coordination'],
    accentColor: '#a855f7',
    stats: [
      { label: 'Portfolio Coverage', value: '~90%' },
      { label: 'Major Features', value: 'Watchlist, AI Podcast, AI Search' },
      { label: 'Delivery Scope', value: 'Cross-functional' }
    ],
    features: [
      'Led the rollout of IR App v3 across approximately 90% of the client portfolio',
      'Coordinated delivery of a revamped watchlist, AI podcast, and AI Search',
      'Ran sprint planning, biweekly alignment meetings, and weekly standups to prioritize execution and resolve production issues',
      'Managed stakeholder alignment across product, development, QA, and support teams'
    ],
    architectureNotes: 'This work centered on product readiness, delivery governance, and the operational discipline required to roll out multiple product updates at scale.'
  },
  {
    id: 'sap-pm-mdg',
    title: 'SAP PM & MDG Support',
    tagline: 'Supported a Canadian client’s SAP Plant Maintenance and Master Data Governance processes.',
    description: 'Worked as an Application Development Analyst supporting enterprise application workflows, issue resolution, feature implementation, and cross-functional coordination in SAP PM and MDG environments.',
    category: 'Systems',
    year: '2021–2022',
    technologies: ['SAP PM', 'SAP MDG', 'Data Governance', 'Application Support', 'Stakeholder Liaison'],
    accentColor: '#10b981',
    stats: [
      { label: 'Enterprise Scope', value: 'SAP PM + MDG' },
      { label: 'Support Model', value: 'On-call' },
      { label: 'Cross-team Work', value: 'FI/CO · MM · PP · QM' }
    ],
    features: [
      'Resolved application issues and implemented new features in SAP PM modules',
      'Coordinated with FI/CO, MM, PP, and QM teams on cross-functional application work',
      'Served as a liaison between corporate and operational stakeholders',
      'Provided on-call support to maintain continuity across client environments'
    ],
    architectureNotes: 'Combined application support, data governance, and cross-functional business coordination to improve reliability in enterprise operations.'
  },
  {
    id: 'quality-improvement',
    title: 'Manufacturing Quality Improvement',
    tagline: 'Reduced defects and improved yield through test analysis, root-cause action, and process auditing.',
    description: 'Analyzed production test results across six IC product lines and collaborated with cross-functional teams to improve quality control and manufacturing efficiency.',
    category: 'Systems',
    year: '2019–2020',
    technologies: ['Quality Engineering', 'Root-Cause Analysis', 'Automated Testing', 'Process Auditing'],
    accentColor: '#f59e0b',
    stats: [
      { label: 'Product Lines', value: '6' },
      { label: 'Defect Reduction', value: '3%' },
      { label: 'Yield Improvement', value: '5%' }
    ],
    features: [
      'Analyzed test results across six IC product lines and drove root-cause corrective actions',
      'Reduced defects by 3% and improved yield by 5%',
      'Audited production processes and modified automated testing systems with cross-functional teams',
      'Strengthened quality control and process efficiency in manufacturing operations'
    ],
    architectureNotes: 'This experience reinforced structured problem-solving, process rigor, and data-based decision making in high-variance production environments.'
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Software Engineer / Product Support Specialist',
    company: 'Euroland.com AB',
    period: 'June 2023 — July 2026',
    location: 'Metro Manila, Philippines',
    category: 'Systems',
    description: 'Delivered and supported a portfolio of investor relations mobile applications, coordinating delivery across product, QA, development, and client support.',
    highlights: [
      'Handled end-to-end delivery for 110+ investor relations app clients, including requirements gathering, development handover, QA, release coordination, and client-facing support',
      'Built and released 30+ white-label React Native applications with end-to-end ownership',
      'Served as Product Owner for feature upgrades including React Native version upgrades, UI/UX improvements, module enhancements, and VAPT security testing',
      'Led the IR App v3 rollout to approximately 90% of the client portfolio, including a revamped watchlist, AI podcast, and AI Search'
    ],
    technologies: ['React Native', 'Product Ownership', 'QA', 'Release Management', 'Client Support', 'Jira', 'Confluence']
  },
  {
    id: 'exp-2',
    role: 'Application Development Analyst / Associate',
    company: 'Accenture Inc.',
    period: 'June 2021 — October 2022',
    location: 'Metro Manila, Philippines',
    category: 'Systems',
    description: 'Supported a Canadian client’s SAP Plant Maintenance and Master Data Governance processes while resolving application issues and implementing enhancements.',
    highlights: [
      'Supported a Canadian client’s SAP Plant Maintenance and Master Data Governance processes',
      'Resolved application issues, implemented new features, and customized SAP PM modules',
      'Coordinated with FI/CO, MM, PP, and QM teams on cross-functional application work',
      'Provided on-call support to maintain continuity across client environments'
    ],
    technologies: ['SAP PM', 'SAP MDG', 'Data Governance', 'Application Support', 'Stakeholder Coordination']
  },
  {
    id: 'exp-3',
    role: 'Manufacturing Product Engineer',
    company: 'Texas Instruments',
    period: 'December 2019 — December 2020',
    location: 'Baguio, Philippines',
    category: 'Systems',
    description: 'Analyzed manufacturing test results and improved process quality across IC product lines using root-cause analysis and corrective action.',
    highlights: [
      'Analyzed test results across six IC product lines and drove root-cause corrective actions',
      'Reduced defects by 3% and improved yield by 5%',
      'Audited production processes and modified automated testing systems with cross-functional teams',
      'Strengthened quality control and process efficiency'
    ],
    technologies: ['Quality Engineering', 'Root-Cause Analysis', 'Automated Testing', 'Manufacturing Processes']
  },
  {
    id: 'exp-4',
    role: 'Software Developer Intern',
    company: 'Texas Instruments',
    period: 'June 2018 — July 2018',
    location: 'Baguio, Philippines',
    category: 'Frontend',
    description: 'Built and tested a Spring-based Java application for a manufacturing machine product line.',
    highlights: [
      'Built and tested a Spring-based Java application to support a manufacturing machine product line',
      'Used HTML/CSS, SQL, Maven, Tomcat, and JUnit',
      'Improved data handling and workflow reliability'
    ],
    technologies: ['Java', 'Spring', 'SQL', 'HTML', 'CSS', 'Maven', 'JUnit']
  },
  {
    id: 'exp-5',
    role: 'Content Analyst',
    company: 'TaazaCoupons',
    period: 'April 2014 — December 2016',
    location: 'Remote',
    category: 'Frontend',
    description: 'Managed merchant listings and promotional content while improving SEO performance and digital marketing consistency.',
    highlights: [
      'Managed and maintained accuracy across 350+ merchant listings and 1,750+ associated coupons in online stores',
      'Applied SEO best practices that drove approximately 3x traffic growth',
      'Produced social media content for Twitter, Facebook, and Instagram',
      'Standardized advertising copy and promotional imagery using Photoshop'
    ],
    technologies: ['SEO', 'Content Operations', 'Photoshop', 'Social Media Marketing', 'Content Standardization']
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
      id: 'chocolate-hills',
      title: 'Chocolate Hills',
      city: 'Bohol',
      country: 'Philippines',
      src: '/images/personal/Chocolate-Hills_Bohol_Philippines.jpg',
      alt: 'Panoramic view across the Chocolate Hills in Bohol',
      mapX: 27340,
      mapY: 40386
    }
  ],
  spotifyPlaylistUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator',
  youtubePlaylistUrl: 'https://www.youtube-nocookie.com/embed/jfKfPfyJRdk'
};

export const VIRTUAL_FILES: FileItem[] = [
  {
    id: 'folder-exp',
    name: 'Experience',
    type: 'folder',
    size: '5 items',
    updatedAt: '2026-09-29',
    appId: 'experience'
  },
  {
    id: 'file-resume',
    name: 'Resume.pdf',
    type: 'pdf',
    size: '224 KB',
    updatedAt: '2026-09-29',
    appId: 'resume'
  },
  {
    id: 'file-about',
    name: 'About.txt',
    type: 'txt',
    size: '2.1 KB',
    updatedAt: '2026-09-29',
    appId: 'about',
    content: `DS OS // DEVELOPER PROFILE
=====================================================

NAME: Deevann Shrestha
PRIMARY POSITIONING: Software Delivery and Product Operations Specialist
OTHER POSITIONING: Software Engineer; Technical Delivery Specialist; Product Support Specialist; Product Owner; Application Development Analyst; Manufacturing Product Engineer
LOCATION: Philippines
PHONE: +63 928 932 8102
EMAIL: deevann.shrestha@gmail.com
LINKEDIN: https://linkedin.com/in/deevann-shrestha
EDUCATION: BS Electronics Engineering (Saint Louis University)
LICENSE: Licensed Electronics Engineer, 2020–present; valid until 2028
EXPERIENCE: 8+ years

SUMMARY:
Software Engineer and Technical Delivery Specialist with 8+ years of experience in mobile applications, enterprise systems, product operations, software releases, and technical support. Strong in stakeholder communication, structured problem solving, cross-functional coordination, and end-to-end ownership.

SPECIALTIES:
- Product ownership and requirements gathering
- Release management and QA coordination
- React Native mobile app delivery and deployment
- SAP PM / SAP MDG support and application issue resolution
- Root-cause analysis and quality improvement

Type 'help' in Terminal or open the Resume app for the full profile.
`
  }
];

export const RESUME_DATA = {
  header: {
    name: 'Deevann Shrestha',
    title: 'Software Delivery & Product Operations Specialist',
    contact: '+63 928 932 8102 · deevann.shrestha@gmail.com · linkedin.com/in/deevann-shrestha',
    summary: 'Software Delivery and Product Operations Specialist with 8+ years of experience across mobile applications, enterprise systems, product support, and software releases. Built and released 30+ white-label React Native apps, supported end-to-end delivery for 110+ investor relations app clients, and led an IR App v3 rollout to approximately 90% of the client portfolio.'
  },
  skills: [
    { label: 'Product & Delivery', items: 'Requirements Gathering; Backlog Prioritization; Sprint Planning; Release Management; Agile/Scrum; Stakeholder Alignment; QA; Regression Testing; Incident Management; Root-Cause Analysis' },
    { label: 'Software & Mobile', items: 'Java; JavaScript; TypeScript; Python; SQL; HTML5; CSS; React Native mobile applications' },
    { label: 'Enterprise & Data', items: 'SAP Master Data Governance; SAP Plant Maintenance; Master Data Management; Data Governance; Data Validation; Excel; Tableau; App Store Connect Analytics; Google Play Console Analytics; Microsoft Clarity' },
    { label: 'Collaboration & Tools', items: 'Git; GitLab; Jira; Confluence; Trello; ServiceNow; Figma; Canva; Photoshop; AutoCAD; FileZilla' },
    { label: 'AI & Productivity', items: 'Cursor; Google AI Studio; Google Stitch; Perplexity; Claude; Gemini; PostHog' }
  ],
  experience: [
    {
      company: 'Euroland.com AB',
      role: 'Software Engineer / Product Support Specialist',
      dates: 'June 2023 — July 2026',
      location: 'Client-facing delivery',
      bullets: [
        'Handled end-to-end delivery for 110+ investor relations app clients, including requirements gathering, development handover, QA, release coordination, and client-facing support.',
        'Built and released 30+ white-label React Native applications with end-to-end ownership.',
        'Served as Product Owner for feature upgrades, including React Native version upgrades, UI/UX improvements, module enhancements, and VAPT security testing.',
        'Led the IR App v3 rollout to approximately 90% of the client portfolio, coordinating delivery of a revamped watchlist, AI podcast, and AI Search.'
      ]
    },
    {
      company: 'Accenture Inc.',
      role: 'Application Development Analyst / Associate',
      dates: 'June 2021 — October 2022',
      location: 'SAP support',
      bullets: [
        'Supported a Canadian client’s SAP Plant Maintenance and Master Data Governance processes.',
        'Resolved application issues, implemented new features, and customized SAP PM modules.',
        'Coordinated with FI/CO, MM, PP, and QM teams on cross-functional application work.',
        'Served as liaison between corporate and operational stakeholders and provided on-call support across client environments.'
      ]
    },
    {
      company: 'Texas Instruments',
      role: 'Manufacturing Product Engineer',
      dates: 'December 2019 — December 2020',
      location: 'Manufacturing quality',
      bullets: [
        'Analyzed test results across six IC product lines and drove root-cause corrective actions that reduced defects by 3% and improved yield by 5%.',
        'Audited production processes and modified automated testing systems with cross-functional teams.',
        'Strengthened quality control and process efficiency through structured issue analysis and corrective action.'
      ]
    },
    {
      company: 'Texas Instruments',
      role: 'Software Developer Intern',
      dates: 'June 2018 — July 2018',
      location: 'Engineering intern',
      bullets: [
        'Built and tested a Spring-based Java application to support a manufacturing machine product line.',
        'Used HTML/CSS, SQL, Maven, Tomcat, and JUnit to improve data handling and workflow reliability.'
      ]
    },
    {
      company: 'TaazaCoupons',
      role: 'Content Analyst',
      dates: 'April 2014 — December 2016',
      location: 'SEO and content operations',
      bullets: [
        'Managed and maintained accuracy across 350+ merchant listings and 1,750+ associated coupons in online stores.',
        'Applied SEO best practices that drove approximately 3x traffic growth.',
        'Produced social media content for Twitter, Facebook, and Instagram and standardized advertising copy and promotional imagery using Photoshop.'
      ]
    }
  ],
  education: {
    degree: 'Bachelor of Science in Electronics Engineering',
    institution: 'Saint Louis University',
    year: '2014–2019',
    honors: 'Licensed Electronics Engineer (2020–present; valid until 2028)'
  },
  certifications: [
    'Licensed Electronics Engineer, 2020–present; valid until 2028'
  ]
};
