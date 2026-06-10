import { Skill, Project, Testimonial, Service } from './types';

export const PERSONAL_INFO = {
  name: 'Kamran Khan',
  title: 'Front-End Developer & Web Designer',
  avatar: 'https://tse4.mm.bing.net/th/id/OIP.CtIkOu_P2SLVCz2Xp45izgHaJE?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  cvUrl: '#', // We will generate an alert or download trigger
  githubUrl: 'https://github.com/repos',
  linkedinUrl: 'https://www.linkedin.com/in/kamran-khan-764421312/',
  email: 'kamranarsahd0328@gmail.com',
  shortBio: 'Passionate and detail-oriented Front-End Developer & Web Designer dedicated to crafting stunning, interactive, and high-performance digital experiences.',
  detailedBio: 'I am a highly driven Front-End Developer and creative Web Designer with an extensive portfolio in translating complex designs into clean, responsive, and performance-optimized code. My love for web development stems from building interfaces that are not only visually sophisticated but also naturally intuitive for users. I specialize in building highly modular architectures, designing modern layouts with fluid spacing and premium micro-interactions, and leveraging utility-first workflows. My core mission is to bridge the gap between aesthetics and function, ensuring websites deliver impeccable performance across every desktop, tablet, and mobile interface.',
  
  // Stats
  stats: [
    { label: 'Projects Completed', value: 24, suffix: '+' },
    { label: 'Technologies Learned', value: 12, suffix: '' },
    { label: 'Certifications Obtained', value: 8, suffix: '+' }
  ]
};

export const SKILLS: Skill[] = [
  {
    name: 'HTML5',
    level: 95,
    category: 'frontend',
    iconName: 'Code'
  },
  {
    name: 'CSS3',
    level: 90,
    category: 'frontend',
    iconName: 'Layout'
  },
  {
    name: 'JavaScript (ES6+)',
    level: 88,
    category: 'frontend',
    iconName: 'Cpu'
  },
  {
    name: 'Tailwind CSS',
    level: 92,
    category: 'frontend',
    iconName: 'Palette'
  },
  {
    name: 'Responsive Design',
    level: 95,
    category: 'design',
    iconName: 'Smartphone'
  },
  {
    name: 'Git & GitHub',
    level: 85,
    category: 'tools',
    iconName: 'Github'
  },
  {
    name: 'Web Performance Optimization',
    level: 80,
    category: 'tools',
    iconName: 'Zap'
  },
  {
    name: 'UI/UX Design principles',
    level: 85,
    category: 'design',
    iconName: 'PenTool'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'fed',
    title: 'Front-End Development',
    description: 'Developing accessible, responsive, and blazing-fast client-side applications using modern frameworks and standard practices.',
    iconName: 'Code2',
    features: ['HTML5/CSS3/TS Integration', 'Component-Driven Architecture', 'Optimized Render Pipelines', 'W3C Standard Compliance']
  },
  {
    id: 'rwd',
    title: 'Responsive Web Design',
    description: 'Formulating complex digital canvas layouts that morph precisely across mobile screens, tablet displays, and ultra-wide desktops.',
    iconName: 'MonitorSmartphone',
    features: ['Fluid Grid Configurations', 'Responsive Media Embeds', 'Cross-Device Breakpoint Audits', 'Touch-Target Architecture']
  },
  {
    id: 'lpd',
    title: 'Landing Page Development',
    description: 'Architecting highly persuasive, Conversion-Rate Optimized (CRO) layouts with distinct interactive cues and minimal load lag.',
    iconName: 'Sparkles',
    features: ['AOS-style Scroll Animations', 'Integrated Lead Capture', 'Premium Floating Visual Assetry', 'High SEO-friendly Schema']
  },
  {
    id: 'wr',
    title: 'Website Redesign',
    description: 'Restructuring legacy online environments into modern, responsive spaces complete with state-of-the-art styling and robust typography.',
    iconName: 'RefreshCw',
    features: ['Light & Dark Modes Integration', 'Speed Performance Drills', 'Code Re-factor & Tailwind Upgrades', 'UX Friction Elimination']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'restaurant',
    title: 'E\'toile Restaurant Website',
    description: 'A luxurious fine-dining French restaurant landing page and reservations companion with golden-ratio layouts.',
    longDescription: 'E\'toile represents the peak of high-end digital gastronomy curation. This web experience features responsive menu tabs, integrated reservation schedule flows, beautiful masonry grids exhibiting gourmet collections, and premium glassmorphic cards representing active degustation courses. Custom parallax image segments and detailed micro-interactions provide the high-end sensory feedback appropriate for top-tier Michelin establishments.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.MJz1Y3Qo6I99LIMW4n3PvwHaE-?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    technologies: ['HTML5', 'Tailwind CSS', 'ES6 JavaScript', 'Scroll Animations'],
    category: 'web',
    liveUrl: 'https://etoile-resturent.vercel.app/',
    githubUrl: 'https://github.com/mrprogrammar17-create/Etoile-Resturent'
  },
  {
    id: 'gallery',
    title: 'Interactive Image Gallery',
    description: 'An elegant photography curation app featuring masonry grids, image sorting category filters, and modal view transitions.',
    longDescription: 'Formulated to showcase fine-art photography under extreme visual discipline. This image gallery processes custom categories dynamic filters instantly, rendering state changes with zero layout shaking. Users can expand images into an immersive light-box view complete with keyboard controls, scroll locking, detailed image metadata overlay, and high-performance pre-fetching of nearby slides.',
    image: 'https://th.bing.com/th/id/OIP.c7v_P0a8TbSVQcqYujKWUAHaEO?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    technologies: ['Vanilla JavaScript', 'Dynamic Grid Layouts', 'CSS Variables', 'Lightbox Engine'],
    category: 'design',
    liveUrl: 'https://codealpha-image-galleryy.netlify.app/',
    githubUrl: '#'
  },
  {
    id: 'calculator',
    title: 'Neumorphic Calculator App',
    description: 'An ultra-modern calculating machine interface featuring interactive typing tracking and glassmorphic glow profiles.',
    longDescription: 'A premium calculation utility focusing on physics-aligned feedback and sensory click satisfaction. Features standard expression calculations, continuous formula input history, responsive key-stroke support, custom variables capabilities, and a seamless toggle option across varied color layouts. Built strictly following high usability specifications for rapid interaction.',
    image: 'https://img.freepik.com/premium-photo/hand-drawn-stylized-calculator-design-vector-illustration_839035-1037607.jpg',
    technologies: ['JavaScript ES6+', 'Modern Flexbox', 'Sound Effects Synthesis', 'Local Persistence'],
    category: 'web',
    liveUrl: 'https://codealphacalculatorr.netlify.app/',
    githubUrl: 'https://github.com/kamrankhan-frontend/sleek-calculator'
  },
  
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Creative Director',
    company: 'Stellar Agency',
    comment: 'Kamran is an absolute master of front-end visuals. He converted our complex, micro-detailed Figma mockups into a completely pixel-perfect, highly responsive layout. The performance and attention to detail are top tier!',
    avatar: 'SJ',
    rating: 5
  },
  {
    id: '2',
    name: 'Vikram Mehta',
    role: 'Product Lead',
    company: 'HealthFlow Technologies',
    comment: 'Working with Kamran on our dental clinic appointment system redesign was seamless. He designed a serene, accessible portal that significantly decreased booking friction and increased patient checkins. Outstanding coder!',
    avatar: 'VM',
    rating: 5
  },
  {
    id: '3',
    name: 'David Larsson',
    role: 'E\'toile Founder',
    company: 'Etoile Restaurant Group',
    comment: 'The E\'toile restaurant website is a work of digital art. The premium animations, gold accents, and responsive menus look exceptional. It has brought a major wave of high-end corporate reservations to our venue.',
    avatar: 'DL',
    rating: 5
  }
];
