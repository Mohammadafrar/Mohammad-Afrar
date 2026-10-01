import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  BookOpen,
  Code2,
  Terminal,
  Globe,
  Cpu,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { PORTFOLIO_CONFIG, ProjectItem, SkillItem } from './data/portfolioData';
import { HeroVisual3D } from './components/HeroVisual3D';
import { ProjectSchematic } from './components/ProjectSchematic';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { ResumeModal } from './components/ResumeModal';
import { ChatAssistant } from './components/ChatAssistant';

type NavSection = 'home' | 'about' | 'skills' | 'projects' | 'education' | 'contact';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ma_portfolio_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSection>('home');

  // Skills section state
  const [skillFilter, setSkillFilter] = useState<'All' | 'Programming Languages' | 'Web Technologies'>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(PORTFOLIO_CONFIG.skills[1]); // Default to C++

  // Projects section state
  const [projectFilter, setProjectFilter] = useState<'all' | 'hardware' | 'concept'>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [cardSchematicView, setCardSchematicView] = useState<Record<string, boolean>>({});

  // Resume modal state
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Social placeholder feedback toast
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmittedState, setFormSubmittedState] = useState<'idle' | 'fallback_ready'>('idle');
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Sync theme with document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.className =
        'bg-[#060913] text-slate-100 antialiased selection:bg-blue-500/30 selection:text-cyan-200';
    } else {
      root.classList.remove('dark');
      document.body.className =
        'bg-[#F8FAFC] text-slate-900 antialiased selection:bg-blue-600/20 selection:text-blue-900';
    }
    try {
      localStorage.setItem('ma_portfolio_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds: NavSection[] = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeAction = () => {
    setMobileMenuOpen(false);
    if (PORTFOLIO_CONFIG.resume.isFileAvailable && PORTFOLIO_CONFIG.resume.filePath) {
      window.location.href = PORTFOLIO_CONFIG.resume.filePath;
    } else {
      setResumeModalOpen(true);
    }
  };

  const handleSocialClick = (platform: 'GitHub' | 'LinkedIn', url: string, placeholder: string) => {
    if (url && url.trim() !== '') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setSocialNotice(
        `${platform} profile placeholder (${placeholder}). Add your live ${platform} URL in src/data/portfolioData.ts.`
      );
      setTimeout(() => {
        setSocialNotice(null);
      }, 5000);
    }
  };

  const filteredSkills = PORTFOLIO_CONFIG.skills.filter((skill) =>
    skillFilter === 'All' ? true : skill.category === skillFilter
  );

  const filteredProjects = PORTFOLIO_CONFIG.projects.filter((proj) =>
    projectFilter === 'all' ? true : proj.filterGroup === projectFilter
  );

  // Contact Form Validation & Honest Submission Handler
  const validateContactForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Please provide a brief subject (at least 3 characters).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please enter a message with at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmittedState('fallback_ready');
    }, 350);
  };

  const getMailtoHref = () => {
    const recipient = PORTFOLIO_CONFIG.contactAndSocial.emailPlaceholder;
    const subject = encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject.trim()} — from ${formData.fullName.trim()}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.fullName.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const handleCopyFormattedMessage = async () => {
    const text = `To: ${PORTFOLIO_CONFIG.contactAndSocial.emailPlaceholder}\nFrom: ${formData.fullName} <${formData.email}>\nSubject: ${formData.subject}\n\n${formData.message}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 3000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark
          ? 'bg-[#060913] text-slate-100 bg-grid-dark'
          : 'bg-[#F8FAFC] text-slate-900 bg-grid-light'
      }`}
    >
      {/* 1. STICKY TOP NAVIGATION BAR (Strict 3-Zone Contract) */}
      <header
        className={`sticky top-0 z-30 h-16 border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#060913]/85 border-slate-800/80'
            : 'bg-white/85 border-slate-200/90'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="font-display text-lg font-bold tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            Mohammad Afrar
          </a>

          {/* Zone 2: Clean text navigation links (Single-line, hover underline) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium"
          >
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' },
              ] as { id: NavSection; label: string }[]
            ).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`py-1 whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? isDark
                        ? 'border-cyan-400 text-white'
                        : 'border-blue-600 text-slate-900'
                      : isDark
                      ? 'border-transparent text-slate-400 hover:text-slate-100 hover:border-slate-700'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions (Theme Toggle + Resume Button + Mobile Menu Trigger) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/70'
                  : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleResumeAction}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className={`md:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-b px-4 pt-3 pb-5 space-y-2 ${
              isDark ? 'bg-[#080D1A] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' },
              ] as { id: NavSection; label: string }[]
            ).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-600/15 text-blue-500'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-800/60'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResumeAction}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Subtle Floating Toast for Unconfigured Social Placeholders */}
      {socialNotice && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] px-4 py-3 rounded-xl border text-xs flex items-center justify-between gap-3 shadow-xl ${
            isDark
              ? 'bg-[#0D1528] border-blue-500/40 text-slate-200'
              : 'bg-white border-blue-300 text-slate-800'
          }`}
        >
          <span className="leading-relaxed">{socialNotice}</span>
          <button
            type="button"
            onClick={() => setSocialNotice(null)}
            aria-label="Dismiss notification"
            className="p-1 rounded-md hover:bg-slate-800/30 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <main>
        {/* 2. HERO SECTION */}
        <section
          id="home"
          className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden"
        >
          {/* Restrained Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-12 left-1/4 -z-10 w-96 h-96 rounded-full blur-3xl opacity-25"
            style={{
              background:
                'radial-gradient(circle, rgba(37,99,235,0.45) 0%, rgba(6,182,212,0.15) 60%, transparent 80%)',
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Hero Typography & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Clean unboxed metadata kicker */}
                <p
                  className={`text-xs sm:text-sm font-mono tracking-wide ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  {PORTFOLIO_CONFIG.personal.title}
                </p>

                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Hi, I&apos;m{' '}
                  <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    {PORTFOLIO_CONFIG.personal.name}
                  </span>
                </h1>

                <p
                  className={`text-lg sm:text-xl font-medium leading-snug max-w-2xl ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                  style={{ textWrap: 'balance' }}
                >
                  {PORTFOLIO_CONFIG.personal.tagline}
                </p>

                <p
                  className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {PORTFOLIO_CONFIG.personal.heroIntro}
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <span>Explore My Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
                      isDark
                        ? 'bg-[#0B1120] border-slate-800 text-slate-100 hover:border-slate-700 hover:bg-slate-800/70'
                        : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>Contact Me</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResumeAction}
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                      isDark
                        ? 'border-slate-800/90 text-slate-300 hover:text-white hover:border-slate-700'
                        : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-cyan-500" />
                    <span>Download Resume</span>
                  </button>
                </div>

                {/* Social Icon Links & Core Stack Summary */}
                <div
                  className={`pt-4 flex flex-wrap items-center gap-6 border-t ${
                    isDark ? 'border-slate-800/70' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleSocialClick(
                          'GitHub',
                          PORTFOLIO_CONFIG.contactAndSocial.githubUrl,
                          PORTFOLIO_CONFIG.contactAndSocial.githubPlaceholder
                        )
                      }
                      aria-label="GitHub profile"
                      className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-[#0B1120] border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50'
                          : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-blue-400'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSocialClick(
                          'LinkedIn',
                          PORTFOLIO_CONFIG.contactAndSocial.linkedinUrl,
                          PORTFOLIO_CONFIG.contactAndSocial.linkedinPlaceholder
                        )
                      }
                      aria-label="LinkedIn profile"
                      className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-[#0B1120] border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50'
                          : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-blue-400'
                      }`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>

                  <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span>Core Focus: </span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>
                      C · C++ · Python · Java · HTML · CSS
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive 3D-Inspired Visual & Code Architecture Inspector */}
              <div className="lg:col-span-5">
                <HeroVisual3D isDark={isDark} />
              </div>
            </div>

            {/* Subtle Scroll-Down Indicator */}
            <div className="mt-14 sm:mt-16 flex justify-center">
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                aria-label="Scroll down to About Me section"
                className={`inline-flex items-center gap-2 text-xs font-medium transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                <span>Scroll to explore</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. ABOUT ME SECTION */}
        <section
          id="about"
          className={`py-20 sm:py-24 border-t ${
            isDark ? 'border-slate-800/70 bg-[#080D1A]/60' : 'border-slate-200/80 bg-white/60'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p
                className={`text-xs font-mono ${
                  isDark ? 'text-cyan-400' : 'text-blue-600'
                }`}
              >
                01 · Personal Profile
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                About Me
              </h2>
              <p
                className={`mt-5 text-base sm:text-lg leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {PORTFOLIO_CONFIG.personal.aboutIntro}
              </p>

              {/* Personal Statement Callout */}
              <blockquote
                className={`mt-6 pl-4 border-l-2 border-blue-500 text-sm sm:text-base font-medium italic ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                &ldquo;{PORTFOLIO_CONFIG.personal.personalStatement}&rdquo;
              </blockquote>
            </div>

            {/* Three Compact Information Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {PORTFOLIO_CONFIG.aboutCards.map((card, idx) => (
                <div
                  key={card.id}
                  className={`p-6 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-[#0B1120] border-slate-800/90 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <p className="text-xs font-mono text-blue-500">
                    0{idx + 1} · {card.label}
                  </p>
                  <h3 className="text-lg font-semibold mt-2 leading-snug">{card.value}</h3>
                  <p
                    className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL SKILLS SECTION */}
        <section
          id="skills"
          className={`py-20 sm:py-24 border-t ${
            isDark ? 'border-slate-800/70' : 'border-slate-200/80'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p
                  className={`text-xs font-mono ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  02 · Technical Foundation
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                  My Technical Skills
                </h2>
                <p
                  className={`mt-2 text-sm sm:text-base max-w-2xl ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Select or hover over any technology below to inspect how it is used and how it connects to my projects.
                </p>
              </div>

              {/* Interactive Category Filter Control */}
              <div
                role="tablist"
                aria-label="Filter technical skills by category"
                className={`inline-flex items-center p-1 rounded-xl border self-start ${
                  isDark ? 'bg-[#0B1120] border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                {(['All', 'Programming Languages', 'Web Technologies'] as const).map((cat) => {
                  const active = skillFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSkillFilter(cat)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? isDark
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-900 shadow-xs'
                          : isDark
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Skills Grid + Deep-Dive Inspector */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Interactive Skill Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkill.id === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-[#0F172A] border-blue-500 shadow-[0_0_30px_-10px_rgba(37,99,235,0.35)]'
                            : 'bg-white border-blue-600 shadow-md shadow-blue-500/5'
                          : isDark
                          ? 'bg-[#0B1120] border-slate-800/90 hover:border-slate-700'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`text-xs font-mono ${
                            isSelected
                              ? 'text-blue-500'
                              : isDark
                              ? 'text-slate-400'
                              : 'text-slate-500'
                          }`}
                        >
                          {skill.category}
                        </span>
                        {skill.category === 'Programming Languages' ? (
                          <Terminal
                            className={`w-4 h-4 ${
                              isSelected ? 'text-blue-500' : 'text-slate-500'
                            }`}
                          />
                        ) : (
                          <Globe
                            className={`w-4 h-4 ${
                              isSelected ? 'text-cyan-500' : 'text-slate-500'
                            }`}
                          />
                        )}
                      </div>

                      <h3 className="font-display text-xl font-bold mt-2">{skill.name}</h3>
                      <p
                        className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {skill.shortSummary}
                      </p>
                      <p
                        className={`mt-3 text-[11px] font-mono ${
                          isDark ? 'text-cyan-400/90' : 'text-blue-600'
                        }`}
                      >
                        {skill.relatedConcepts.join(' · ')}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right: Selected Skill Explanation & Connected Stack Network */}
              <div
                className={`lg:col-span-5 rounded-2xl border p-6 transition-colors ${
                  isDark
                    ? 'bg-[#0B1120] border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/40 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-mono text-blue-500">
                      Skill Inspector · {selectedSkill.category}
                    </p>
                    <h3 className="font-display text-2xl font-bold mt-0.5">
                      {selectedSkill.name}
                    </h3>
                  </div>
                  <Code2 className="w-5 h-5 text-blue-500 shrink-0" />
                </div>

                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      What It Is Used For
                    </h4>
                    <p
                      className={`mt-1 leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {selectedSkill.whatItIsUsedFor}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Application in My Work
                    </h4>
                    <p
                      className={`mt-1 leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {selectedSkill.portfolioApplication}
                    </p>
                  </div>

                  {/* Code Preview */}
                  <div
                    className={`rounded-xl border p-3.5 font-mono text-xs overflow-x-auto ${
                      isDark
                        ? 'bg-[#060913] border-slate-800 text-cyan-200'
                        : 'bg-slate-900 border-slate-800 text-cyan-100'
                    }`}
                  >
                    <pre className="leading-relaxed">
                      <code>{selectedSkill.codePreview}</code>
                    </pre>
                  </div>
                </div>

                {/* Connected Technology Stack Network SVG */}
                <div
                  className={`mt-6 pt-5 border-t ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <p className={`text-xs font-mono mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Connected Technology Stack Network
                  </p>
                  <svg
                    viewBox="0 0 380 110"
                    className="w-full h-24"
                    role="img"
                    aria-label="Network diagram connecting C, C++, Python, Java, HTML, and CSS"
                  >
                    {/* Connecting lines */}
                    <line x1="45" y1="30" x2="125" y2="30" stroke="#2563EB" strokeWidth="1.5" />
                    <line x1="125" y1="30" x2="215" y2="30" stroke="#06B6D4" strokeWidth="1.5" />
                    <line x1="215" y1="30" x2="315" y2="30" stroke="#2563EB" strokeWidth="1.5" />
                    <line x1="125" y1="30" x2="155" y2="82" stroke="#6366F1" strokeWidth="1.25" strokeDasharray="3 3" />
                    <line x1="215" y1="30" x2="255" y2="82" stroke="#06B6D4" strokeWidth="1.25" strokeDasharray="3 3" />
                    <line x1="155" y1="82" x2="255" y2="82" stroke="#2563EB" strokeWidth="1.5" />

                    {[
                      { id: 'c-lang', label: 'C', x: 45, y: 30 },
                      { id: 'cpp-lang', label: 'C++', x: 125, y: 30 },
                      { id: 'python-lang', label: 'Python', x: 215, y: 30 },
                      { id: 'java-lang', label: 'Java', x: 315, y: 30 },
                      { id: 'html-web', label: 'HTML', x: 155, y: 82 },
                      { id: 'css-web', label: 'CSS', x: 255, y: 82 },
                    ].map((node) => {
                      const active = selectedSkill.id === node.id;
                      return (
                        <g
                          key={node.id}
                          onClick={() => {
                            const found = PORTFOLIO_CONFIG.skills.find((s) => s.id === node.id);
                            if (found) setSelectedSkill(found);
                          }}
                          className="cursor-pointer"
                        >
                          <rect
                            x={node.x - 30}
                            y={node.y - 14}
                            width="60"
                            height="28"
                            rx="6"
                            fill={active ? '#2563EB' : isDark ? '#060913' : '#F1F5F9'}
                            stroke={active ? '#38BDF8' : isDark ? '#1E293B' : '#CBD5E1'}
                            strokeWidth="1.5"
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fontSize="11"
                            fontFamily="monospace"
                            fontWeight="600"
                            fill={active ? '#FFFFFF' : isDark ? '#E2E8F0' : '#0F172A'}
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROJECTS SECTION */}
        <section
          id="projects"
          className={`py-20 sm:py-24 border-t ${
            isDark ? 'border-slate-800/70 bg-[#080D1A]/60' : 'border-slate-200/80 bg-white/60'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p
                  className={`text-xs font-mono ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  03 · Engineering Portfolio
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                  My Projects
                </h2>
                <p
                  className={`mt-2 text-sm sm:text-base max-w-2xl ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  A collection of projects that demonstrate my interest in solving real-world problems through technology.
                </p>
              </div>

              {/* Interactive Project Filter */}
              <div
                role="tablist"
                aria-label="Filter projects"
                className={`inline-flex items-center p-1 rounded-xl border self-start ${
                  isDark ? 'bg-[#0B1120] border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                {(
                  [
                    { id: 'all', label: 'All Projects' },
                    { id: 'hardware', label: 'Hardware & Embedded' },
                    { id: 'concept', label: 'Future Concept' },
                  ] as const
                ).map((tab) => {
                  const active = projectFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setProjectFilter(tab.id)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? isDark
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-900 shadow-xs'
                          : isDark
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const showSchematic = Boolean(cardSchematicView[project.id]) || Boolean(brokenImages[project.id]);
                return (
                  <article
                    key={project.id}
                    className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                      isDark
                        ? 'bg-[#0B1120] border-slate-800/90 hover:border-slate-700'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Visual Illustration Slot with Render / Diagram Toggle */}
                      <div
                        className={`relative aspect-4/3 w-full overflow-hidden border-b ${
                          isDark ? 'bg-[#060913] border-slate-800/80' : 'bg-slate-100 border-slate-200'
                        }`}
                      >
                        {!showSchematic ? (
                          <img
                            src={project.imageUrl}
                            alt={project.imageAlt}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setBrokenImages((prev) => ({ ...prev, [project.id]: true }))
                            }
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                          />
                        ) : (
                          <ProjectSchematic type={project.schematicType} isDark={isDark} />
                        )}

                        {/* Functional Interactive View Switcher Button in Corner */}
                        <div className="absolute bottom-3 right-3">
                          <button
                            type="button"
                            onClick={() =>
                              setCardSchematicView((prev) => ({
                                ...prev,
                                [project.id]: !prev[project.id],
                              }))
                            }
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-950/80 text-slate-100 border border-slate-700/80 hover:bg-blue-600 hover:border-blue-500 transition-colors backdrop-blur-xs whitespace-nowrap cursor-pointer"
                          >
                            {showSchematic ? 'Show 3D Illustration' : 'Show Block Diagram'}
                          </button>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                        <div
                          className={`flex flex-wrap items-center gap-1.5 text-xs font-mono ${
                            isDark ? 'text-cyan-400' : 'text-blue-600'
                          }`}
                        >
                          <span>{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className={project.isConcept ? 'text-amber-400 font-semibold' : ''}>
                            {project.status}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold tracking-tight mt-2.5">
                          {project.title}
                        </h3>

                        <p
                          className={`mt-3 text-sm leading-relaxed ${
                            isDark ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {project.shortDescription}
                        </p>

                        {/* Honest Notice for Concept or Alcohol Detection System */}
                        {project.importantNotice && (
                          <p
                            className={`mt-3 text-xs leading-relaxed pl-3 border-l-2 ${
                              project.isConcept
                                ? isDark
                                  ? 'border-amber-400/70 text-amber-200/90'
                                  : 'border-amber-500 text-amber-800'
                                : isDark
                                ? 'border-slate-700 text-slate-400'
                                : 'border-slate-300 text-slate-500'
                            }`}
                          >
                            {project.importantNotice}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Technologies & Action Buttons */}
                    <div className="px-6 pb-6 pt-2 space-y-5">
                      <div
                        className={`pt-4 border-t ${
                          isDark ? 'border-slate-800/80' : 'border-slate-200/80'
                        }`}
                      >
                        <p className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {project.isConcept ? 'Technologies Under Consideration:' : 'Technologies:'}
                        </p>
                        <p
                          className={`mt-1 text-xs font-mono leading-relaxed ${
                            isDark ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          {project.technologies.join(' · ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveProjectModal(project)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        {project.githubUrl && project.githubUrl.trim() !== '' && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} GitHub repository`}
                            className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                              isDark
                                ? 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                                : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. EDUCATION & 7. LEARNING & DEVELOPMENT SECTION */}
        <section
          id="education"
          className={`py-20 sm:py-24 border-t ${
            isDark ? 'border-slate-800/70' : 'border-slate-200/80'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left 5 Columns: Education Timeline */}
              <div className="lg:col-span-5">
                <p
                  className={`text-xs font-mono ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  04 · Academic Background
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                  Education
                </h2>

                {/* Glowing Timeline Container */}
                <div className="mt-8 relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-cyan-400 before:to-transparent">
                  <div className="relative">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/40">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>

                    <div
                      className={`p-6 rounded-2xl border ${
                        isDark
                          ? 'bg-[#0B1120] border-slate-800'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <p
                        className={`text-xs font-mono ${
                          isDark ? 'text-cyan-400' : 'text-blue-600'
                        }`}
                      >
                        Status: {PORTFOLIO_CONFIG.education.status}
                      </p>

                      <h3 className="font-display text-xl font-bold mt-2">
                        {PORTFOLIO_CONFIG.education.degree}
                      </h3>

                      <p className="text-sm font-semibold text-blue-500 mt-1">
                        {PORTFOLIO_CONFIG.education.field}
                      </p>

                      <div
                        className={`mt-4 pt-4 border-t text-xs sm:text-sm space-y-2 ${
                          isDark
                            ? 'border-slate-800/80 text-slate-300'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        <p>
                          <span className="font-mono text-xs text-slate-400">Institution: </span>
                          <span className="italic">{PORTFOLIO_CONFIG.education.institution}</span>
                        </p>
                        <p className="leading-relaxed">
                          {PORTFOLIO_CONFIG.education.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Learning & Development */}
              <div className="lg:col-span-7" id="learning">
                <p
                  className={`text-xs font-mono ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  05 · Continuous Growth
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                  Learning &amp; Development
                </h2>

                {/* Tasteful Initial Foundation Banner */}
                <div
                  className={`mt-6 p-5 rounded-2xl border flex items-start gap-3.5 ${
                    isDark
                      ? 'bg-[#0B1120] border-blue-500/30 text-slate-200'
                      : 'bg-blue-50/70 border-blue-200 text-slate-800'
                  }`}
                >
                  <BookOpen className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {PORTFOLIO_CONFIG.learningAndDevelopment.bannerMessage}
                    </p>
                    <p
                      className={`mt-1 text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {PORTFOLIO_CONFIG.learningAndDevelopment.subtitle}
                    </p>
                  </div>
                </div>

                {/* 6 Editable Growth Tracks */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PORTFOLIO_CONFIG.learningAndDevelopment.categories.map((cat, idx) => (
                    <div
                      key={cat.id}
                      className={`p-5 rounded-xl border ${
                        isDark
                          ? 'bg-[#0B1120]/80 border-slate-800/90'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <p className="text-xs font-mono text-blue-500">0{idx + 1}</p>
                      <h3 className="text-base font-semibold mt-1">{cat.title}</h3>
                      <p
                        className={`mt-1.5 text-xs leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {cat.summary}
                      </p>
                      <p
                        className={`mt-3 pt-2.5 border-t text-xs font-mono ${
                          isDark
                            ? 'border-slate-800/80 text-slate-300'
                            : 'border-slate-100 text-slate-700'
                        }`}
                      >
                        {cat.currentFocus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. GITHUB & LINKEDIN SECTION + 9. CONTACT SECTION */}
        <section
          id="contact"
          className={`py-20 sm:py-24 border-t ${
            isDark ? 'border-slate-800/70 bg-[#080D1A]/60' : 'border-slate-200/80 bg-white/60'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* GitHub & LinkedIn Professional Social Links Banner */}
            <div
              className={`mb-16 p-6 sm:p-8 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                isDark
                  ? 'bg-[#0B1120] border-slate-800'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div>
                <p
                  className={`text-xs font-mono ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  Professional Profiles · Central Configuration
                </p>
                <h2 className="font-display text-2xl font-bold mt-1">
                  GitHub &amp; LinkedIn
                </h2>
                <p
                  className={`mt-1.5 text-xs sm:text-sm max-w-2xl ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Connect with me on GitHub and LinkedIn. Profile URLs are stored in{' '}
                  <code className="font-mono">src/data/portfolioData.ts</code> for one-line updating.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    handleSocialClick(
                      'GitHub',
                      PORTFOLIO_CONFIG.contactAndSocial.githubUrl,
                      PORTFOLIO_CONFIG.contactAndSocial.githubPlaceholder
                    )
                  }
                  className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'bg-[#060913] border-slate-800 text-slate-100 hover:border-blue-500/60'
                      : 'bg-slate-50 border-slate-300 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSocialClick(
                      'LinkedIn',
                      PORTFOLIO_CONFIG.contactAndSocial.linkedinUrl,
                      PORTFOLIO_CONFIG.contactAndSocial.linkedinPlaceholder
                    )
                  }
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left 5 Columns: Contact Details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p
                    className={`text-xs font-mono ${
                      isDark ? 'text-cyan-400' : 'text-blue-600'
                    }`}
                  >
                    06 · Get In Touch
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                    Let&apos;s Connect
                  </h2>
                  <p
                    className={`mt-3 text-sm sm:text-base leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    I&apos;m open to internship opportunities, collaborations, project discussions, and learning from other developers. Feel free to reach out.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Email Placeholder Card */}
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                      isDark
                        ? 'bg-[#0B1120] border-slate-800/90'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Email Address (Editable Placeholder)
                      </p>
                      <a
                        href={`mailto:${PORTFOLIO_CONFIG.contactAndSocial.emailPlaceholder}`}
                        className="text-sm font-medium hover:text-blue-500 transition-colors break-all"
                      >
                        {PORTFOLIO_CONFIG.contactAndSocial.emailPlaceholder}
                      </a>
                    </div>
                  </div>

                  {/* GitHub Link Item */}
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                      isDark
                        ? 'bg-[#0B1120] border-slate-800/90'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <Github className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        GitHub (Editable Placeholder)
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleSocialClick(
                            'GitHub',
                            PORTFOLIO_CONFIG.contactAndSocial.githubUrl,
                            PORTFOLIO_CONFIG.contactAndSocial.githubPlaceholder
                          )
                        }
                        className="text-sm font-medium hover:text-blue-500 transition-colors text-left break-all cursor-pointer"
                      >
                        {PORTFOLIO_CONFIG.contactAndSocial.githubUrl ||
                          PORTFOLIO_CONFIG.contactAndSocial.githubPlaceholder}
                      </button>
                    </div>
                  </div>

                  {/* LinkedIn Link Item */}
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                      isDark
                        ? 'bg-[#0B1120] border-slate-800/90'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <Linkedin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        LinkedIn (Editable Placeholder)
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleSocialClick(
                            'LinkedIn',
                            PORTFOLIO_CONFIG.contactAndSocial.linkedinUrl,
                            PORTFOLIO_CONFIG.contactAndSocial.linkedinPlaceholder
                          )
                        }
                        className="text-sm font-medium hover:text-blue-500 transition-colors text-left break-all cursor-pointer"
                      >
                        {PORTFOLIO_CONFIG.contactAndSocial.linkedinUrl ||
                          PORTFOLIO_CONFIG.contactAndSocial.linkedinPlaceholder}
                      </button>
                    </div>
                  </div>

                  {/* Optional Editable Location Field */}
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                      isDark
                        ? 'bg-[#0B1120] border-slate-800/90'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Location (Optional Editable Field)
                      </p>
                      <p className="text-sm font-medium">
                        {PORTFOLIO_CONFIG.contactAndSocial.location ||
                          PORTFOLIO_CONFIG.contactAndSocial.locationPlaceholder}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Validated Contact Form */}
              <div className="lg:col-span-7">
                <div
                  className={`p-6 sm:p-8 rounded-2xl border ${
                    isDark
                      ? 'bg-[#0B1120] border-slate-800'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <h3 className="font-display text-xl font-bold">Send a Message</h3>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    All fields are validated before preparing your message.
                  </p>

                  <form onSubmit={handleContactSubmit} noValidate className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-fullname"
                          className="block text-xs font-medium mb-1.5"
                        >
                          Full Name
                        </label>
                        <input
                          id="contact-fullname"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (formErrors.fullName) {
                              setFormErrors({ ...formErrors, fullName: '' });
                            }
                          }}
                          placeholder="Your name"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.fullName
                              ? 'border-rose-500'
                              : isDark
                              ? 'bg-[#060913] border-slate-800 text-slate-100 placeholder:text-slate-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-xs text-rose-400">{formErrors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) {
                              setFormErrors({ ...formErrors, email: '' });
                            }
                          }}
                          placeholder="you@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.email
                              ? 'border-rose-500'
                              : isDark
                              ? 'bg-[#060913] border-slate-800 text-slate-100 placeholder:text-slate-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-xs text-rose-400">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-medium mb-1.5"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          if (formErrors.subject) {
                            setFormErrors({ ...formErrors, subject: '' });
                          }
                        }}
                        placeholder="Internship opportunity / Project collaboration"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.subject
                            ? 'border-rose-500'
                            : isDark
                            ? 'bg-[#060913] border-slate-800 text-slate-100 placeholder:text-slate-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                      {formErrors.subject && (
                        <p className="mt-1 text-xs text-rose-400">{formErrors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) {
                            setFormErrors({ ...formErrors, message: '' });
                          }
                        }}
                        placeholder="Hello Mohammad, I would like to connect regarding..."
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.message
                            ? 'border-rose-500'
                            : isDark
                            ? 'bg-[#060913] border-slate-800 text-slate-100 placeholder:text-slate-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-xs text-rose-400">{formErrors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Validating Message...' : 'Send Message'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Honest Backend Setup Notice & Working Email Fallback */}
                  {formSubmittedState === 'fallback_ready' && (
                    <div
                      role="region"
                      aria-label="Email client fallback options"
                      className={`mt-6 p-5 rounded-xl border space-y-4 ${
                        isDark
                          ? 'bg-blue-950/30 border-blue-800/60 text-slate-200'
                          : 'bg-blue-50 border-blue-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm leading-relaxed">
                          <p className="font-semibold">
                            Message validated — Direct Email Fallback Ready
                          </p>
                          <p className="mt-1 opacity-90">
                            No external email backend service is currently connected to this static portfolio. To ensure your message is never lost, use the button below to launch your email client with your validated message pre-filled, or copy the formatted text directly.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                          href={getMailtoHref()}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors whitespace-nowrap"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Email Client (mailto)</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyFormattedMessage}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                            isDark
                              ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                              : 'border-slate-300 text-slate-800 hover:bg-white'
                          }`}
                        >
                          {copiedMessage ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Formatted Message</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER */}
      <footer
        className={`border-t py-12 ${
          isDark ? 'bg-[#050811] border-slate-800/80' : 'bg-slate-100/80 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-800/40 dark:border-slate-800">
            <div>
              <p className="font-display text-lg font-bold">{PORTFOLIO_CONFIG.personal.name}</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {PORTFOLIO_CONFIG.personal.title}
              </p>
              <p className={`text-xs font-mono mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {PORTFOLIO_CONFIG.contactAndSocial.emailPlaceholder}
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
              {(['home', 'about', 'skills', 'projects', 'education', 'contact'] as const).map(
                (sec) => (
                  <a
                    key={sec}
                    href={`#${sec}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(sec);
                    }}
                    className={`capitalize transition-colors ${
                      isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {sec}
                  </a>
                )
              )}
            </div>

            {/* Social Icons & Back to Top */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() =>
                  handleSocialClick(
                    'GitHub',
                    PORTFOLIO_CONFIG.contactAndSocial.githubUrl,
                    PORTFOLIO_CONFIG.contactAndSocial.githubPlaceholder
                  )
                }
                aria-label="GitHub"
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Github className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSocialClick(
                    'LinkedIn',
                    PORTFOLIO_CONFIG.contactAndSocial.linkedinUrl,
                    PORTFOLIO_CONFIG.contactAndSocial.linkedinPlaceholder
                  )
                }
                aria-label="LinkedIn"
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Linkedin className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('home')}
                aria-label="Back to top"
                className={`ml-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isDark
                    ? 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} {PORTFOLIO_CONFIG.personal.name}. All rights reserved.
            </p>
            <p>Designed and built with curiosity.</p>
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        isDark={isDark}
      />

      {/* Resume Status & Snapshot Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        isDark={isDark}
        onContactClick={() => scrollToSection('contact')}
      />

      {/* 10. Floating Portfolio Assistant Chatbot */}
      <ChatAssistant isDark={isDark} />
    </div>
  );
}
