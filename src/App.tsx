import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  Award,
  Briefcase,
  Building2,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sparkles,
  Sun,
  Target,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import { FaAws, FaBrain, FaChartBar, FaChartLine, FaCode, FaCodeBranch, FaDatabase, FaEnvelope, FaFileExcel, FaLinkedinIn, FaRobot } from 'react-icons/fa6';
import {
  SiCss,
  SiGeeksforgeeks,
  SiGithub,
  SiGooglecloud,
  SiGooglecolab,
  SiHtml5,
  SiJavascript,
  SiLeetcode,
  SiMongodb,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiScipy,
  SiGit,
  SiGmail,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import emailjs from '@emailjs/browser';

type ThemeMode = 'dark' | 'light';

type SkillGroup = {
  title: string;
  icon: typeof Globe;
  items: { name: string; level: string; icon: IconType; color?: string }[];
};

type Project = {
  title: string;
  description: string;
  category: string;
  image: string;
  stack: string[];
  highlights: string[];
  featured?: boolean;
};

type ExperienceDocument = { label: string; href: string };

const RESUME_PATH = '/resume/Jyothsna_Angadi_SE_Resume.pdf';
const RECEIVER_EMAIL = 'jyothsnaangadi7@gmail.com';

function createGmailComposeUrl(values: { name: string; email: string; subject: string; message: string }) {
  const bodyText = `Name: ${values.name}\nEmail: ${values.email}\nReply-To: ${values.email}\n\n${values.message}`;
  const query = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: RECEIVER_EMAIL,
    su: values.subject,
    body: bodyText,
  });
  return `https://mail.google.com/mail/?${query.toString()}`;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const skillGroups: SkillGroup[] = [
  {
    title: 'Programming & Databases',
    icon: Code2,
    items: [
      { name: 'Python', level: 'Comfortable', icon: SiPython, color: '#3776AB' },
      { name: 'SQL', level: 'Comfortable', icon: FaDatabase, color: '#7A8794' },
      { name: 'MySQL', level: 'Familiar', icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', level: 'Familiar', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', level: 'Familiar', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    title: 'Data Analytics & Libraries',
    icon: Sparkles,
    items: [
      { name: 'Pandas', level: 'Comfortable', icon: SiPandas, color: '#150458' },
      { name: 'NumPy', level: 'Comfortable', icon: SiNumpy, color: '#4DABCF' },
      { name: 'SciPy', level: 'Familiar', icon: SiScipy, color: '#8CAAE6' },
      { name: 'Matplotlib', level: 'Comfortable', icon: FaChartLine, color: '#11557C' },
      { name: 'Excel', level: 'Comfortable', icon: FaFileExcel, color: '#217346' },
      { name: 'Power BI', level: 'Comfortable', icon: FaChartBar, color: '#D5A900' },
    ],
  },
  {
    title: 'Development & APIs',
    icon: Globe,
    items: [
      { name: 'HTML', level: 'Comfortable', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', level: 'Comfortable', icon: SiCss, color: '#1572B6' },
      { name: 'JavaScript', level: 'Familiar', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'React', level: 'Familiar', icon: SiReact, color: '#61DAFB' },
      { name: 'REST APIs', level: 'Familiar', icon: FaCode, color: '#7A8794' },
    ],
  },
  {
    title: 'AI, Machine Learning & Cloud',
    icon: Target,
    items: [
      { name: 'Machine Learning', level: 'Familiar', icon: FaBrain, color: '#657C9A' },
      { name: 'Generative AI / LLMs', level: 'Familiar', icon: FaRobot, color: '#7461A8' },
      { name: 'Scikit-learn', level: 'Familiar', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'Google Cloud', level: 'Comfortable', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'AWS', level: 'Comfortable', icon: FaAws, color: '#FF9900' },
      { name: 'DevOps Fundamentals', level: 'Learning', icon: FaCodeBranch, color: '#7A8794' },
    ],
  },
  {
    title: 'Tools',
    icon: Building2,
    items: [
      { name: 'Git', level: 'Familiar', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', level: 'Comfortable', icon: SiGithub },
      { name: 'VS Code', level: 'Comfortable', icon: VscVscode, color: '#007ACC' },
      { name: 'Google Colab', level: 'Comfortable', icon: SiGooglecolab, color: '#F9AB00' },
    ],
  },
];

const education = [
  {
    title: 'B.E-Information Technology(IT)',
    institution: 'Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad',
    duration: 'Aug 2024 – May 2027',
    detail: 'CGPA: 7.91',
    logo: '/institutions/CBIT%20LOGO.png',
    logoClass: 'cbit-logo',
  },
  {
    title: 'Diploma in Computer Science Engineering',
    institution: 'Dr. B.R. Ambedkar GMR Polytechnic for Women, Karimnagar',
    duration: 'July 2021 – May 2024',
    detail: 'CGPA: 9.79 • Academic Rank: 1',
    logo: '/institutions/diploma-logo.png',
  },
  {
    title: 'SSC',
    institution: 'Zilla Parishad High School (ZPHS), Ambaripet',
    duration: 'May 2016 – May 2021',
    detail: 'CGPA: 10.0',
    logo: '/institutions/SSC%20LOGO.png',
  },
];

const experience = [
  {
    company: 'NorthSouth Foundation (NSF)',
    logo: '/organizations/northsouth-foundation-logo.png',
    role: 'Data Analyst Intern',
    duration: 'December 5, 2025 – January 17, 2026',
    description:
      'Extracted, validated, cleaned and transformed school assessment datasets across Grades 1–10 to support academic reporting and decision-making.',
    bulletPoints: [
      'Worked with Mathematics, Physics, Chemistry and English datasets.',
      'Developed student report cards, subject-wise performance analysis and mark verification dashboards.',
      'Supported teacher and student access, downloadable progress cards and Learning Outcome mapping.',
      'Explored AI-assisted suggestions for improving question papers and reporting workflows.',
    ],
    technologies: ['Excel', 'Power BI', 'Python', 'Google Colab', 'VS Code', 'Antigravity', 'LLMs', 'HTML', 'CSS', 'JavaScript', 'React'],
    documents: [
      { label: 'View Offer Letter', href: '/assets/experience/nsf/NSF%20Offer%20Letter_Jyothsna.docx%20(1).pdf' },
      { label: 'View Experience Letter', href: '/assets/experience/nsf/NSF-experince%20letter.pdf' },
    ] satisfies ExperienceDocument[],
  },
  {
    company: 'Future Interns',
    logo: '/organizations/future-interns-logo.png',
    role: 'Data Analyst Intern',
    duration: 'August 2025 – September 2025',
    description:
      'Built analytics dashboards to interpret e-commerce and college event insights using structured data workflows and visual reporting.',
    bulletPoints: [
      'Worked on E-commerce Dashboard and College Events Dashboard projects.',
      'Used Python, SQL, Excel and Power BI to clean, structure and visualize data.',
      'Delivered practical dashboard insights and reporting for business-ready analysis.',
    ],
    technologies: ['Python', 'SQL', 'Excel', 'Power BI'],
    recognition: 'Letter of Recommendation',
    documents: [
      { label: 'View Offer Letter', href: '/assets/experience/future-interns/future-interns%20offer%20letter.pdf' },
      { label: 'View Letter of Recommendation', href: '/assets/experience/future-interns/future-interns%20letter%20of%20recommendation.pdf' },
    ] satisfies ExperienceDocument[],
  },
];

const projects: Project[] = [
  {
    title: 'Employee Productivity Analytics System',
    description: 'An AI-powered desktop application designed to analyze employee work patterns and provide meaningful productivity insights and intelligent recommendations.',
    category: 'Featured Project',
    image: '/projects/project-1-placeholder.svg',
    stack: ['React.js', 'Electron.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'Groq API', 'Llama 3.3 70B'],
    highlights: [
      'Independently developed a full-stack desktop application.',
      'Integrated Groq API with Llama 3.3 70B for AI-powered insights.',
      'Built backend services and REST API integrations.',
      'Focused on employee productivity analytics and recommendations.',
    ],
    featured: true,
  },
  {
    title: 'Student Performance Analytics Dashboard',
    description: 'A web-based analytics platform designed to analyze student academic performance and generate actionable insights through interactive dashboards and visualizations.',
    category: 'Analytics Platform',
    image: '/projects/project-2-placeholder.svg',
    stack: ['Python', 'SQL', 'JavaScript', 'HTML', 'CSS', 'Chart.js'],
    highlights: [
      'Analyzed 10,000+ student records.',
      'Performed data cleaning, transformation and validation.',
      'Created school-wise, district-wise and student-wise performance dashboards.',
      'Delivered structured data-driven reports for performance analysis.',
    ],
  },
];

const certificationGroups = [
  {
    title: 'Professional Certifications & Programs',
    items: [
      'MongoDB Certified Associate Developer',
      'AI Creators Internship Program',
      'Google Cloud Computing Foundations',
      'Certified AI Associate',
      'GeeksforGeeks – 160 Days of Problem Solving',
    ],
  },
  {
    title: 'Workshops',
    items: [
      'India Startup Week – Bengaluru',
      'EPAM Systems – Agentic AI and RAG',
      'Power BI – Office Master Workshop',
    ],
  },
  {
    title: 'Internship Certificates & Recommendations',
    items: [
      'Future Interns – Letter of Recommendation',
      'NorthSouth Foundation – Internship Experience Certificate',
      'Vidyadhan – 2-Day Training Certificate',
      'NSF Volunteering Certificate',
      'Skill Craft Technology – Web Development Certificate and Letter of Recommendation',
    ],
  },
];

const achievements = [
  { title: 'Diploma Academic Rank 1', detail: 'CGPA 9.79', icon: Trophy, color: '#C79218' },
  { title: 'Vidyadhan Scholarship', detail: 'Academic support', icon: Award, color: '#4169E1' },
  { title: '207+ LeetCode problems solved', detail: 'Problem-solving focus', icon: SiLeetcode, color: '#FFA116' },
  { title: 'GeeksforGeeks – 160 Days of Problem Solving', detail: 'Coding consistency', icon: SiGeeksforgeeks, color: '#2F8D46' },
];

const hackathons: { name: string; status: string; description: string; logo: string }[] = [
  { name: 'Cine AI Hackathon', status: 'Participated', description: 'Explored AI-led creative and technical problem solving.', logo: '/assets/hackathons/cine-ai-logo.png' },
  { name: 'Smart India Hackathon', status: 'Participated', description: 'Engaged with national-level innovation challenge experiences.', logo: '/assets/hackathons/smart-india-hackathon-logo.png' },
  { name: 'CodeTech IT Solutions – Hackathon Participation', status: 'Participated', description: 'Completed participation in a software challenge initiative.', logo: '/assets/hackathons/codetech-logo.png' },
];

const volunteering: { title: string; role: string; description: string; logo?: string; logoPending?: string }[] = [
  {
    title: 'NorthSouth Foundation',
    logo: '/organizations/northsouth-foundation-logo.png',
    role: 'Volunteer',
    description: 'Conducting examinations and coordinating scholars.',
  },
  {
    title: 'CSI Club',
    logo: '/assets/organizations/csi-club%20logo.png',
    role: 'Design Member',
    description: 'Participated in creative and design-related club activities.',
  },
];

const codingProfiles = [
  {
    platform: 'LeetCode',
    url: 'https://leetcode.com/u/Jyothsna-306/',
    stats: '207+ problems solved',
    icon: SiLeetcode,
    color: '#FFA116',
  },
  {
    platform: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/profile/jyothsna923w',
    stats: '160 Days of Problem Solving',
    icon: SiGeeksforgeeks,
    color: '#2F8D46',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/Jyothsna306',
    stats: 'Portfolio projects and code repositories',
    icon: SiGithub,
    color: 'var(--text)',
  },
];

const socialLinks: { label: string; href: string; icon: IconType; external: boolean; color?: string }[] = [
  { label: 'Email', href: 'mailto:jyothsnaangadi7@gmail.com', icon: FaEnvelope, external: false, color: '#7A8794' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jyothsna-angadi-394992314/', icon: FaLinkedinIn, external: true, color: '#0A66C2' },
  { label: 'GitHub', href: 'https://github.com/Jyothsna306', icon: SiGithub, external: true },
  { label: 'LeetCode', href: 'https://leetcode.com/u/Jyothsna-306/', icon: SiLeetcode, external: true, color: '#FFA116' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('jyothsna-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pendingSectionRef = useRef<string | null>(null);
  const pendingSectionTimerRef = useRef<number | null>(null);
  const [resumeAvailable, setResumeAvailable] = useState<boolean | null>(null);
  const [availableDocuments, setAvailableDocuments] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<{ type: 'idle' | 'notice' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jyothsna-theme', theme);
  }, [theme]);

  useEffect(() => {
    let active = true;
    fetch(RESUME_PATH, { method: 'HEAD' })
      .then((response) => response.ok && response.headers.get('content-type')?.includes('application/pdf') === true)
      .then((available) => {
        if (active) setResumeAvailable(available);
      })
      .catch(() => {
        if (active) setResumeAvailable(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const documents = experience.flatMap((item) => item.documents);
    Promise.all(documents.map(async (document) => {
      try {
        const response = await fetch(document.href, { method: 'HEAD' });
        const isPdf = response.ok && response.headers.get('content-type')?.toLowerCase().includes('application/pdf') === true;
        return [document.href, isPdf] as const;
      } catch {
        return [document.href, false] as const;
      }
    })).then((results) => {
      if (active) setAvailableDocuments(Object.fromEntries(results));
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const pendingSection = pendingSectionRef.current;
        if (pendingSection) {
          const pendingEntry = entries.find((entry) => entry.target.id === pendingSection && entry.isIntersecting);
          if (!pendingEntry) return;
          pendingSectionRef.current = null;
          if (pendingSectionTimerRef.current !== null) window.clearTimeout(pendingSectionTimerRef.current);
          pendingSectionTimerRef.current = null;
          setActiveSection(pendingEntry.target.id);
          return;
        }
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: [0.25, 0.6], rootMargin: '-12% 0px -30% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      if (pendingSectionTimerRef.current !== null) window.clearTimeout(pendingSectionTimerRef.current);
    };
  }, []);

  const getValidatedFormValues = () => {
    if (!formRef.current) return null;
    const formData = new FormData(formRef.current);
    const values = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      subject: String(formData.get('subject') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };

    if (!values.name || !values.email || !values.subject || !values.message) {
      setFormState({ type: 'error', message: 'Please fill in all required fields (Name, Email, Subject, Message).' });
      return null;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email)) {
      setFormState({ type: 'error', message: 'Please enter a valid email address.' });
      return null;
    }

    return values;
  };

  const handleOpenGmail = () => {
    const values = getValidatedFormValues();
    if (!values) return;

    const gmailUrl = createGmailComposeUrl(values);
    const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (!opened || opened.closed || typeof opened.closed === 'undefined') {
      window.location.href = gmailUrl;
    }
    setFormState({
      type: 'notice',
      message: 'Opening Gmail compose window in a new tab with your message pre-filled. Click Send in Gmail to complete delivery.',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const values = getValidatedFormValues();
    if (!values) return;

    const formspreeEndpoint =
      import.meta.env.VITE_FORMSPREE_ENDPOINT ||
      (import.meta.env.VITE_FORMSPREE_ID ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}` : '');

    const isFormspreeConfigured = Boolean(
      formspreeEndpoint &&
      !formspreeEndpoint.includes('YOUR_FORM_ID') &&
      formspreeEndpoint.startsWith('https://formspree.io/f/')
    );

    const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const isEmailJsConfigured = Boolean(emailJsServiceId && emailJsTemplateId && emailJsPublicKey);

    // If Formspree is configured, send via Formspree API
    if (isFormspreeConfigured) {
      setIsSubmitting(true);
      setFormState({ type: 'idle', message: 'Sending your message...' });
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            _replyto: values.email,
            subject: values.subject,
            message: values.message,
          }),
        });

        if (response.ok) {
          setFormState({
            type: 'success',
            message: 'Your message has been sent successfully to jyothsnaangadi7@gmail.com! Thank you.',
          });
          formRef.current?.reset();
          return;
        }

        const data = await response.json().catch(() => null);
        const errorDetail =
          data?.errors?.map((err: { message: string }) => err.message).join(', ') ||
          'Email service submission failed. Please try again or click "Open in Gmail" below.';
        setFormState({ type: 'error', message: errorDetail });
      } catch (err) {
        console.error('Formspree delivery error:', err);
        setFormState({
          type: 'error',
          message: 'Network error submitting to email service. Click "Open in Gmail" below to send directly.',
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // If EmailJS is configured, send via EmailJS
    if (isEmailJsConfigured) {
      setIsSubmitting(true);
      setFormState({ type: 'idle', message: 'Sending your message...' });
      try {
        await emailjs.send(emailJsServiceId, emailJsTemplateId, values, { publicKey: emailJsPublicKey });
        setFormState({
          type: 'success',
          message: 'Your message has been sent successfully to jyothsnaangadi7@gmail.com! Thank you.',
        });
        formRef.current?.reset();
        return;
      } catch (err) {
        console.error('EmailJS delivery error:', err);
        setFormState({
          type: 'error',
          message: 'EmailJS delivery error. Click "Open in Gmail" below to send directly.',
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // When no email backend is configured yet:
    // Open Gmail web compose directly in a new browser tab with pre-filled fields (NO Outlook / NO mailto)
    const gmailUrl = createGmailComposeUrl(values);
    const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (!opened || opened.closed || typeof opened.closed === 'undefined') {
      window.location.href = gmailUrl;
    }
    setFormState({
      type: 'notice',
      message: 'Opening Gmail compose window in a new tab with your message pre-filled. Please click Send in Gmail to complete delivery.',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="topbar">
        <nav className="navbar container" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="JYOTHSNA ANGADI home">
            <span className="brand-mark">JA</span>
            <span>JYOTHSNA ANGADI</span>
          </a>

          <button type="button" className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((state) => !state)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className={`nav-panel ${menuOpen ? 'open' : ''}`}>
            <div className="nav-links">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? 'active' : ''} onClick={() => {
                  const sectionId = item.href.slice(1);
                  setActiveSection(sectionId);
                  pendingSectionRef.current = sectionId;
                  if (pendingSectionTimerRef.current !== null) window.clearTimeout(pendingSectionTimerRef.current);
                  pendingSectionTimerRef.current = window.setTimeout(() => {
                    pendingSectionRef.current = null;
                    pendingSectionTimerRef.current = null;
                  }, 2000);
                  setMenuOpen(false);
                }}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="nav-actions">
              <button type="button" className="icon-button" aria-label={theme === 'dark' ? 'Switch to white theme' : 'Switch to dark theme'} onClick={() => setTheme((state) => (state === 'dark' ? 'light' : 'dark'))}>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="section hero-section">
          <div className="container hero-layout">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <p className="eyebrow">Software Developer | Data & Analytics Enthusiast | Data Engineer</p>
              <h1>JYOTHSNA ANGADI</h1>
              <p className="intro-text">
                Engineering student passionate about technology, data and innovation. I enjoy building practical solutions, exploring emerging technologies, and transforming data into meaningful insights.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="primary-button">
                  <ArrowRight size={18} />
                  View Projects
                </a>
                {resumeAvailable ? (
                  <>
                    <a href={RESUME_PATH} className="secondary-button" target="_blank" rel="noreferrer">
                      <ExternalLink size={18} />
                      View Resume
                    </a>
                    <a href={RESUME_PATH} className="secondary-button" download="Jyothsna_Angadi_SE_Resume.pdf">
                      <Download size={18} />
                      Download Resume
                    </a>
                  </>
                ) : resumeAvailable === false ? (
                  <span className="resume-unavailable">Resume PDF not uploaded yet</span>
                ) : null}
              </div>

              <div className="social-row" aria-label="Social links">
                {socialLinks.map(({ label, href, icon: Icon, external, color }) => (
                  <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={label} title={label} data-brand={label} className="social-link">
                    <Icon size={18} style={color ? { color } : undefined} />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <div className="photo-frame">
                <img src="/profile/image.png" alt="Jyothsna Angadi" />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container section-head">
            <p className="eyebrow">About</p>
            <h2>Building practical solutions through technology and data.</h2>
          </div>
          <div className="container about-grid">
            <div className="panel">
              <p>
                I am an Information Technology engineering student at Chaitanya Bharathi Institute of Technology, Hyderabad, with a strong interest in Data Science, Data Analytics, Data Engineering and Software Development.
              </p>
              <p>
                I enjoy working with data, developing applications, exploring AI technologies and solving real-world problems through technology.
              </p>
              <p>
                Through internships and independent projects, I have gained practical experience in data analysis, dashboard development, database management and application development.
              </p>
              <p>
                I am continuously learning new technologies and looking forward to opportunities where I can contribute, grow and build impactful solutions.
              </p>
            </div>
            <div className="panel info-panel">
              <div className="info-row"><Building2 size={18} /><span>Hyderabad, Telangana, India</span></div>
              <div className="info-row"><GraduationCap size={18} /><span>Information Technology</span></div>
              <div className="info-row">
                <Briefcase size={18} aria-hidden="true" />
                <span>Open to Internships &amp; Full-Time Opportunities<br />From <strong>May 2027</strong></span>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <div className="container section-head">
            <p className="eyebrow">Education</p>
            <h2>Academic journey</h2>
          </div>
          <div className="container timeline">
            {education.map((item) => (
              <article key={item.title} className="timeline-item">
                <div className="timeline-marker"><GraduationCap size={16} /></div>
                <div className="timeline-card panel">
                  <div className="education-content">
                    {item.logo ? <img src={item.logo} alt={`${item.institution} logo`} className={`organization-logo education-logo ${item.logoClass ?? ''}`} loading="lazy" /> : <span className="education-logo-fallback" aria-hidden="true"><GraduationCap size={22} /></span>}
                    <div>
                      <span className="timeline-duration">{item.duration}</span>
                      <h3>{item.title}</h3>
                      <p>{item.institution}</p>
                      <strong>{item.detail}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container section-head">
            <p className="eyebrow">Skills</p>
            <h2>Technical skills</h2>
          </div>
          <div className="container skills-grid">
            {skillGroups.map(({ title, icon: Icon, items }) => (
              <article key={title} className="panel skill-card">
                <div className="skill-header">
                  <span className="skill-icon"><Icon size={18} /></span>
                  <h3>{title}</h3>
                </div>
                <ul className="skill-list">
                  {items.map(({ name, level, icon: SkillIcon, color }) => (
                    <li key={name} className={name === 'Python' || name === 'SQL' || name === 'Power BI' ? 'featured' : ''}>
                      <span className="skill-name"><SkillIcon className="skill-item-icon" data-brand={name} style={color ? { color } : undefined} aria-hidden="true" /><span>{name}</span></span>
                      <em>{level}</em>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container section-head">
            <p className="eyebrow">Experience</p>
            <h2>Internships and practical learning</h2>
          </div>
          <div className="container timeline">
            {experience.map((item) => (
              <article key={item.company} className="timeline-item">
                <div className="timeline-marker"><Briefcase size={16} /></div>
                <div className="timeline-card panel experience-card">
                  <div className="experience-topline">
                    <div>
                      <span className="timeline-duration">{item.duration}</span>
                      <div className="organization-heading">
                        <img src={item.logo} alt={`${item.company} logo`} className="organization-logo experience-logo" loading="lazy" />
                        <div><h3>{item.company}</h3><p>{item.role}</p></div>
                      </div>
                    </div>
                    <span className="chip experience-role">{item.role}</span>
                  </div>
                  <p>{item.description}</p>
                  <ul>
                    {item.bulletPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="badge-row">
                    {item.technologies.map((tech) => (
                      <span className="badge" key={tech}>{tech}</span>
                    ))}
                  </div>
                  {item.documents.some((document) => availableDocuments[document.href]) ? (
                    <div className="document-actions">
                      {item.documents.filter((document) => availableDocuments[document.href]).map((document) => (
                        <a key={document.href} href={document.href} className="secondary-button inline-button document-button" target="_blank" rel="noreferrer">
                          <FileText size={16} aria-hidden="true" />{document.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                  {import.meta.env.DEV && item.documents.some((document) => availableDocuments[document.href] === false) && (
                    <p className="document-unavailable">
                      Pending uploads: {item.documents.filter((document) => availableDocuments[document.href] === false).map((document) => document.label.replace(/^View /, '')).join(', ')}
                    </p>
                  )}
                  {item.recognition && <div className="recognition"><Award size={14} /> {item.recognition}</div>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container section-head">
            <p className="eyebrow">Projects</p>
            <h2>Two major portfolio projects</h2>
          </div>
          <div className="container project-grid">
            {projects.map((project) => (
              <article key={project.title} className={`project-card panel ${project.featured ? 'featured' : ''}`}>
                <img src={project.image} alt={`Illustrative dashboard preview for ${project.title}`} className="project-image" loading="lazy" decoding="async" />
                <div className="project-body">
                  <div className="project-meta">
                    <span>{project.category}</span>
                    {project.featured && <span className="featured-tag">Featured</span>}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="badge-row">
                    {project.stack.map((tech) => (
                      <span className="badge" key={tech}>{tech}</span>
                    ))}
                  </div>
                  <ul>
                    {project.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="project-actions">
                    <a href="https://github.com/Jyothsna306" target="_blank" rel="noreferrer" className="secondary-button inline-button">
                      GitHub
                    </a>
                    <a href="#contact" className="secondary-button inline-button">
                      Demo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="container section-head">
            <p className="eyebrow">Certifications</p>
            <h2>Professional learning and workshops</h2>
          </div>
          <div className="container cert-grid">
            {certificationGroups.map((group) => (
              <div key={group.title} className="panel cert-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="achievements" className="section">
          <div className="container section-head">
            <p className="eyebrow">Achievements</p>
            <h2>Recognition and milestones</h2>
          </div>
          <div className="container achievement-grid">
            {achievements.map(({ title, detail, icon: Icon, color }) => (
              <article key={title} className="panel achievement-card">
                <div className="achievement-icon"><Icon size={18} style={color ? { color } : undefined} /></div>
                <p>{title}</p>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container section-head">
            <p className="eyebrow">Hackathons & Competitions</p>
            <h2>Participation record</h2>
          </div>
          <div className="container hack-grid">
            {hackathons.map((event) => (
              <article key={event.name} className="panel hack-card">
                <div className="hack-card-top">
                  <div className="hackathon-logo-frame">
                    <img src={event.logo} alt={`${event.name} logo`} className="hackathon-logo" loading="lazy" decoding="async" />
                  </div>
                  <div className="hack-card-heading">
                    <span className="chip">{event.status}</span>
                    <h3>{event.name}</h3>
                  </div>
                </div>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container section-head">
            <p className="eyebrow">Volunteering & Activities</p>
            <h2>Community contribution</h2>
          </div>
          <div className="container activity-grid">
            {volunteering.map((activity) => (
              <article key={activity.title} className="panel activity-card">
                {activity.logo ? <img src={activity.logo} alt={`${activity.title} logo`} className="organization-logo activity-logo" loading="lazy" /> : activity.logoPending ? (
                  <div className="activity-logo-pending" role="img" aria-label={`${activity.title} official logo pending`}>
                    <Users size={18} aria-hidden="true" />
                    <span>Logo pending</span>
                  </div>
                ) : <div className="activity-icon"><Users size={18} /></div>}
                <h3>{activity.title}</h3>
                <span className="chip alt">{activity.role}</span>
                <p>{activity.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container section-head">
            <p className="eyebrow">Coding Profiles</p>
            <h2>Problem solving and collaboration</h2>
          </div>
          <div className="container profile-grid">
            {codingProfiles.map(({ platform, url, stats, icon: Icon, color }) => (
              <article key={platform} className="panel profile-card">
                <div className="achievement-icon"><Icon size={18} style={color ? { color } : undefined} /></div>
                <h3>{platform}</h3>
                <p>{stats}</p>
                <a href={url} target="_blank" rel="noreferrer" className="text-link">
                  Open profile <ExternalLink size={14} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-shell">
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2>Let's connect and explore opportunities to build impactful solutions together.</h2>
              <div className="contact-list">
                <p><Mail size={16} /> <a href="mailto:jyothsnaangadi7@gmail.com">jyothsnaangadi7@gmail.com</a></p>
                <p><Phone size={16} /> <a href="tel:+917601052632">+91 7601052632</a></p>
                <p><MapPin size={16} /> Hyderabad, Telangana, India</p>
              </div>
              <div className="social-row compact-row">
                {socialLinks.map(({ label, href, icon: Icon, external, color }) => (
                  <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={label} title={label} data-brand={label} className="social-link">
                    <Icon size={18} style={color ? { color } : undefined} />
                  </a>
                ))}
              </div>
            </div>

            <form ref={formRef} className="panel contact-form" onSubmit={handleSubmit} noValidate>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" required autoComplete="name" disabled={isSubmitting} />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="your@email.com" required autoComplete="email" disabled={isSubmitting} />
              </label>
              <label>
                Subject
                <input type="text" name="subject" placeholder="Project discussion" required disabled={isSubmitting} />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} placeholder="Tell me about the opportunity" required disabled={isSubmitting} />
              </label>

              {formState.message && (
                <p id="contact-form-status" className={`form-status ${formState.type}`} role={formState.type === 'error' ? 'alert' : 'status'}>
                  {formState.message}
                </p>
              )}

              <div className="contact-form-actions">
                <button type="submit" className="primary-button width-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
                <button type="button" className="secondary-button width-full" onClick={handleOpenGmail} disabled={isSubmitting}>
                  <SiGmail size={18} style={{ color: '#EA4335' }} aria-hidden="true" />
                  Open in Gmail
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col footer-brand">
            <a href="#home" className="footer-brand-title" aria-label="Jyothsna Angadi home">
              <span className="brand-mark">JA</span>
              <span>JYOTHSNA ANGADI</span>
            </a>
            <p className="footer-tagline">
              Software Developer | Data & Analytics Enthusiast | Data Engineer
            </p>
            <p className="footer-meta">Hyderabad, Telangana, India</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Social Links</h4>
            <ul className="footer-social-list">
              <li>
                <a href="https://www.linkedin.com/in/jyothsna-angadi-394992314/" target="_blank" rel="noreferrer">
                  <FaLinkedinIn size={14} style={{ color: '#0A66C2' }} aria-hidden="true" />
                  <span>LinkedIn</span>
                  <ExternalLink size={12} className="footer-ext-icon" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Jyothsna306" target="_blank" rel="noreferrer">
                  <SiGithub size={14} aria-hidden="true" />
                  <span>GitHub</span>
                  <ExternalLink size={12} className="footer-ext-icon" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://leetcode.com/u/Jyothsna-306/" target="_blank" rel="noreferrer">
                  <SiLeetcode size={14} style={{ color: '#FFA116' }} aria-hidden="true" />
                  <span>LeetCode</span>
                  <ExternalLink size={12} className="footer-ext-icon" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://www.geeksforgeeks.org/profile/jyothsna923w" target="_blank" rel="noreferrer">
                  <SiGeeksforgeeks size={14} style={{ color: '#2F8D46' }} aria-hidden="true" />
                  <span>GeeksforGeeks</span>
                  <ExternalLink size={12} className="footer-ext-icon" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="mailto:jyothsnaangadi7@gmail.com">
                  <Mail size={14} style={{ color: '#7A8794' }} aria-hidden="true" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="footer-divider" />
          <div className="footer-bottom">
            <p className="copyright">© {currentYear} JYOTHSNA ANGADI. All Rights Reserved.</p>
            <button
              type="button"
              className="back-to-top"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp size={16} aria-hidden="true" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
