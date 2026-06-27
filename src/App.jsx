import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Terminal,
  Cpu,
  Lock,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  AlertTriangle,
  Server,
  ExternalLink,
  Award,
  Trophy,
  Menu,
  X,
  Radio,
  Wrench
} from 'lucide-react';

/**
 * SECURITY CONSOLE — Rohit Kumar Portfolio
 * Styled after the tools of the trade (Burp Suite's amber/charcoal palette,
 * SOC severity tagging) rather than Hollywood "matrix" hacker tropes.
 */

// --- Severity chip used throughout (mirrors real scanner output) ---
const SEVERITY = {
  CRITICAL: { label: 'CRITICAL', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
  HIGH: { label: 'HIGH', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  MEDIUM: { label: 'MEDIUM', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
  INFO: { label: 'INFO', color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
};

const SeverityChip = ({ level }) => {
  const s = SEVERITY[level] || SEVERITY.INFO;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono font-bold tracking-wider ${s.color}`}>
      {s.label}
    </span>
  );
};

// --- Recon panel: a simulated scan readout, the hero's "signature" element ---
const ReconPanel = () => {
  const lines = [
    { t: 0, text: '$ recon --target rohit.kumar --mode passive' },
    { t: 400, text: '[*] resolving identity...' },
    { t: 900, text: '[+] role: Senior Associate @ PwC' },
    { t: 1300, text: '[+] location: Kolkata, IN' },
    { t: 1700, text: '[+] experience: 5+ yrs offensive security' },
    { t: 2100, text: '[*] enumerating disclosures...' },
    { t: 2500, text: '[+] CVE-2024-35581  CVE-2024-35582  CVE-2024-35583' },
    { t: 2900, text: '[*] checking hall of fame acknowledgments...' },
    { t: 3300, text: '[+] Cisco · IBM · Philips · Autodesk' },
    { t: 3700, text: '[✓] scan complete — 0 false positives' },
  ];
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(lines.map(l => l.text));
      return;
    }
    const timers = lines.map(l => setTimeout(() => {
      setVisible(prev => [...prev, l.text]);
    }, l.t));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full bg-[#0B0F13] border border-amber-500/20 rounded-lg overflow-hidden shadow-2xl font-mono text-sm">
      <div className="bg-[#15191D] px-4 py-2.5 border-b border-amber-500/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
        </div>
        <span className="text-[11px] text-slate-500 tracking-wide">recon_session_01.log</span>
      </div>
      <div className="p-5 h-72 overflow-y-auto">
        {visible.map((line, i) => (
          <div key={i} className={`mb-1.5 ${
            line.startsWith('[+]') ? 'text-amber-300' :
            line.startsWith('[✓]') ? 'text-emerald-400' :
            line.startsWith('$') ? 'text-slate-200' : 'text-slate-500'
          }`}>
            {line}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse"></span>
      </div>
    </div>
  );
};

const SectionHeading = ({ children, icon: Icon, eyebrow }) => (
  <div className="mb-10">
    {eyebrow && (
      <div className="text-amber-500/70 text-xs font-mono tracking-[0.2em] mb-2 uppercase">{eyebrow}</div>
    )}
    <div className="flex items-center gap-3">
      <Icon size={20} className="text-amber-500" />
      <h2 className="text-2xl font-bold tracking-tight text-white">{children}</h2>
      <div className="h-px bg-gradient-to-r from-amber-500/40 to-transparent flex-grow ml-2"></div>
    </div>
  </div>
);

const SkillModule = ({ title, skills, status = 'LOADED' }) => (
  <div className="bg-[#0E1116] border border-slate-800 p-6 rounded-lg hover:border-amber-500/40 transition-colors duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-200 font-bold text-sm font-mono tracking-wide">{title}</h3>
      <span className="text-[10px] font-mono text-emerald-400/80 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
        {status}
      </span>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span key={skill} className="px-2.5 py-1 bg-slate-800/60 text-slate-300 text-xs rounded border border-slate-700 font-mono">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const CveCard = ({ cve, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-between p-4 bg-[#0E1116] border border-slate-800 rounded-lg hover:border-rose-500/40 hover:bg-rose-500/5 transition-all group"
  >
    <div className="flex items-center gap-3">
      <AlertTriangle className="text-rose-400 w-5 h-5" />
      <span className="font-mono text-slate-200 font-bold text-sm">{cve}</span>
      <SeverityChip level="HIGH" />
    </div>
    <div className="flex items-center text-xs text-slate-500 group-hover:text-rose-400">
      NVD <ExternalLink className="w-3 h-3 ml-1.5" />
    </div>
  </a>
);

// Disclosure log entry — career history reframed as a security finding.
// Severity is a playful self-portrait device, not a claim about real CVEs.
const DisclosureEntry = ({ id, severity, dates, title, org, bullets, active }) => (
  <div className={`relative pl-8 border-l ${active ? 'border-amber-500/40' : 'border-slate-800'}`}>
    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${
      active ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]' : 'bg-slate-700'
    }`}></div>
    <div className="flex items-center gap-3 mb-1 flex-wrap">
      <span className="text-xs font-mono text-slate-500">{id}</span>
      <SeverityChip level={severity} />
      <span className={`text-sm font-mono ${active ? 'text-amber-400' : 'text-slate-500'}`}>{dates}</span>
    </div>
    <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
    <p className="text-slate-500 mb-4">{org}</p>
    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-amber-500/70">
      {bullets.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </div>
);

const BrandIcon = ({ brand }) => {
  switch (brand) {
    case 'Cisco':
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-cyan-500 group-hover:text-cyan-400 transition-colors">
          <path d="M2 13v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1zm6-6v13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1zm6-5v18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1zm6 5v13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1z" opacity="0.9" />
        </svg>
      );
    case 'IBM':
      return (
        <svg viewBox="0 0 32 16" className="w-12 h-8 fill-current text-blue-500 group-hover:text-blue-400 transition-colors">
          <rect x="0" y="0" width="8" height="2" rx="0.5" />
          <rect x="0" y="3" width="8" height="2" rx="0.5" />
          <rect x="0" y="6" width="8" height="2" rx="0.5" />
          <rect x="10" y="0" width="8" height="2" rx="0.5" />
          <rect x="10" y="3" width="8" height="2" rx="0.5" />
          <rect x="10" y="6" width="8" height="2" rx="0.5" />
          <rect x="20" y="0" width="2" height="6" rx="0.5" />
          <rect x="23" y="0" width="2" height="6" rx="0.5" />
          <rect x="26" y="0" width="2" height="6" rx="0.5" />
          <text x="0" y="14" fontSize="8" fontWeight="bold" fontFamily="monospace">IBM</text>
        </svg>
      );
    case 'Philips':
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-blue-600 group-hover:text-blue-400 transition-colors">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z" />
        </svg>
      );
    case 'Autodesk':
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-teal-500 group-hover:text-teal-400 transition-colors">
          <path d="M3 21h18v-2H3v2zm1.6-4h14.8l-1.8-3H6.4l-1.8 3zm5-8.4L12 3l2.4 5.6H9.6z" />
        </svg>
      );
    default:
      return <Trophy className="w-8 h-8 text-slate-600 group-hover:text-amber-500 transition-colors mb-3 duration-300" />;
  }
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 450);
    return () => clearTimeout(timer);
  }, []);

  if (scanning) {
    return (
      <div className="fixed inset-0 bg-[#06080A] flex items-center justify-center font-mono text-amber-400">
        <div className="space-y-2 text-center">
          <p className="animate-pulse text-sm tracking-widest">[ ESTABLISHING SECURE SESSION ]</p>
          <p className="text-xs text-slate-600">loading rohit_kumar.profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080A] text-slate-300 font-sans selection:bg-amber-500/30">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#06080A]/85 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono text-amber-400 font-bold text-lg tracking-tight flex items-center gap-2">
            <Shield size={18} />
            rohit_kumar
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-amber-400 transition-colors">PROFILE</a>
            <a href="#cves" className="hover:text-amber-400 transition-colors">RESEARCH</a>
            <a href="#skills" className="hover:text-amber-400 transition-colors">SKILLS</a>
            <a href="#experience" className="hover:text-amber-400 transition-colors">LOG</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">CONTACT</a>
          </div>
          <div className="hidden md:block">
            <a
              href="/Rohit_Resume.pdf"
              download
              className="px-4 py-2 border border-amber-500/40 text-amber-400 text-xs font-mono rounded hover:bg-amber-500/10 transition"
            >
              DOWNLOAD_RESUME
            </a>
          </div>
          <button
            className="md:hidden text-amber-400 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#06080A] border-t border-slate-800 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-400">
            <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">PROFILE</a>
            <a href="#cves" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">RESEARCH</a>
            <a href="#skills" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">SKILLS</a>
            <a href="#experience" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">LOG</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">CONTACT</a>
            <a
              href="/Rohit_Resume.pdf"
              download
              className="px-4 py-2 border border-amber-500/40 text-amber-400 text-xs font-mono rounded hover:bg-amber-500/10 transition text-center"
            >
              DOWNLOAD_RESUME
            </a>
          </div>
        )}
      </nav>

      {/* Hero — two-pane console layout */}
      <section className="pt-28 pb-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-amber-500/25 bg-amber-500/5 text-amber-400 text-xs font-mono mb-6">
              <Radio size={12} className="animate-pulse" />
              SESSION_ACTIVE · KOLKATA, IN
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
              Rohit Kumar
            </h1>
            <p className="text-amber-400 font-mono text-sm mb-6 tracking-wide">
              SENIOR ASSOCIATE · PwC — APPLICATION SECURITY
            </p>

            <p className="text-slate-400 max-w-xl mb-8 leading-relaxed">
              I break web, mobile, and API applications for a living — then write the report
              that gets them fixed. 5+ years across banking, e-commerce, and enterprise.
              3 CVEs published. 240+ assessments delivered.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#experience" className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded transition-colors">
                View Disclosure Log <ChevronRight size={16} />
              </a>
              <a href="#contact" className="flex items-center gap-2 px-5 py-2.5 border border-slate-700 hover:border-amber-500/40 text-slate-300 text-sm font-medium rounded transition-colors">
                Get In Touch
              </a>
            </div>
          </div>

          <ReconPanel />
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-y border-slate-800 bg-[#0A0D10]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Total Exp', val: '5+ Years' },
            { label: 'Mobile Apps Audited', val: '40+' },
            { label: 'Published CVEs', val: '03' },
            { label: 'Web Apps Tested', val: '240+' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-1 font-mono">{stat.val}</div>
              <div className="text-xs text-amber-500/70 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">

        {/* Profile */}
        <section id="about">
          <SectionHeading icon={Shield} eyebrow="00 / Profile">Professional Profile</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                Currently serving as a <strong className="text-white">Senior Associate at PwC</strong>.
                I possess a proven track record of identifying critical vulnerabilities and delivering
                executive-level remediation roadmaps for C-suite stakeholders.
              </p>
              <p>
                My expertise spans identifying business logic flaws, broken access control, and zero-day
                class vulnerabilities within banking, fintech, and e-commerce sectors. I actively mentor
                junior consultants on OWASP methodologies and secure coding practices.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="flex items-center gap-2 text-amber-400 border border-amber-500/20 bg-amber-500/5 px-4 py-2 rounded">
                  <Award size={16} />
                  <span className="text-sm font-bold">CEH & LPT Certified</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 border border-slate-700 bg-slate-800/50 px-4 py-2 rounded">
                  <Award size={16} />
                  <span className="text-sm">OSCP (Pursuing)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0E1116] p-6 rounded-lg border border-slate-800 font-mono text-sm">
              <div className="text-amber-400 mb-3 text-xs">// core_competencies.json</div>
              <pre className="text-slate-400 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
{`{
  "role": "Senior Associate, PwC",
  "location": "Kolkata, West Bengal",
  "education": "B.Tech Computer Engineering",
  "key_skills": [
    "Web/Mobile VAPT",
    "Source Code Analysis (SCA)",
    "Threat Modeling",
    "DevSecOps Integration"
  ],
  "languages": ["Python", "Bash", "Java", "C++"]
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* CVE Research */}
        <section id="cves">
          <SectionHeading icon={AlertTriangle} eyebrow="01 / Research">Vulnerability Research &amp; Honors</SectionHeading>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <p className="text-slate-400 mb-6">
                Actively involved in zero-day vulnerability research in web applications and
                open-source software. Discovered and responsibly disclosed the following
                vulnerabilities, published in MITRE and NVD databases.
              </p>
              <CveCard cve="CVE-2024-35581" link="https://nvd.nist.gov/vuln/detail/CVE-2024-35581" />
              <CveCard cve="CVE-2024-35582" link="https://nvd.nist.gov/vuln/detail/CVE-2024-35582" />
              <CveCard cve="CVE-2024-35583" link="https://nvd.nist.gov/vuln/detail/CVE-2024-35583" />
            </div>
            <div className="bg-gradient-to-br from-rose-500/5 to-transparent border border-rose-500/20 p-8 rounded-lg flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-2">Research Focus</h3>
              <ul className="space-y-3 text-slate-400 mt-4 list-disc list-inside">
                <li>Business Logic Abuse</li>
                <li>Broken Authentication Mechanisms</li>
                <li>Insecure Object References (IDOR)</li>
                <li>Zero-day Exploitation in OSS</li>
              </ul>
            </div>
          </div>

          {/* Tools Built */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#0E1116] border border-amber-500/15 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wrench size={14} className="text-amber-400" />
                <h4 className="text-amber-400 font-bold font-mono text-sm">burp_extender.py</h4>
              </div>
              <p className="text-slate-400 text-sm">
                Internal Burp Suite extension built at PwC to help the assessment team manage and
                track flagged/hidden issues, streamlining the vulnerability triage workflow.
              </p>
            </div>
            <div className="bg-[#0E1116] border border-amber-500/15 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wrench size={14} className="text-amber-400" />
                <h4 className="text-amber-400 font-bold font-mono text-sm">session_cookie_finder.py</h4>
              </div>
              <p className="text-slate-400 text-sm">
                Custom tool to identify session management weaknesses and surface session
                cookie issues during web application assessments.
              </p>
            </div>
          </div>

          {/* Hall of Fame */}
          <div className="pt-8 border-t border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded text-amber-500">
                <Trophy size={22} />
              </div>
              Hall of Fame Acknowledgments
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Cisco', color: 'border-cyan-500/30 hover:bg-cyan-500/5' },
                { name: 'IBM', color: 'border-blue-500/30 hover:bg-blue-500/5' },
                { name: 'Philips', color: 'border-blue-600/30 hover:bg-blue-500/5' },
                { name: 'Autodesk', color: 'border-teal-500/30 hover:bg-teal-500/5' }
              ].map((company) => (
                <div key={company.name} className={`flex flex-col items-center justify-center p-8 bg-[#0E1116] border ${company.color} rounded-lg transition-all group cursor-default h-40`}>
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <BrandIcon brand={company.name} />
                  </div>
                  <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills">
          <SectionHeading icon={Cpu} eyebrow="02 / Capabilities">Technical Capabilities</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            <SkillModule
              title="security_testing"
              skills={['Web App VAPT', 'Mobile (iOS/Android)', 'API Security', 'Network Security', 'Source Code Analysis']}
            />
            <SkillModule
              title="tools"
              skills={['Burp Suite Pro', 'OWASP ZAP', 'Postman', 'MobSF', 'Frida', 'Objection', 'Metasploit', 'JADX']}
            />
            <SkillModule
              title="standards"
              skills={['OWASP Top 10', 'OWASP Mobile Top 10', 'CWE/SANS 25', 'SOC2', 'GDPR', 'Secure SDLC']}
            />
          </div>
        </section>

        {/* Disclosure Log (career history) */}
        <section id="experience">
          <SectionHeading icon={FileText} eyebrow="03 / Log">Disclosure Log</SectionHeading>
          <p className="text-slate-500 text-xs font-mono mb-10 -mt-4">
            Note: Synopsys Software Integrity Group (SIG) was divested and became Black Duck
            Software in 2024 — ADV-002 and ADV-003 reflect one continuous tenure through that
            transition.
          </p>
          <div className="space-y-10">
            <DisclosureEntry
              id="ADV-001" severity="CRITICAL" dates="Mar 2026 – Present" active
              title="Senior Associate" org="PwC · Kolkata"
              bullets={[
                'Conducting web, Android, iOS, and API penetration testing and source code analysis (SCA) for enterprise clients.',
                'Built an internal Burp Suite extender tool to help the team manage and track flagged/hidden issues, streamlining triage.',
                'Developed a session cookie analysis tool to identify session management weaknesses during assessments.',
              ]}
            />
            <DisclosureEntry
              id="ADV-002" severity="HIGH" dates="Mar 2025 – Mar 2026"
              title="Senior Security Consultant" org="Black Duck (Synopsys) · Bengaluru"
              bullets={[
                'Directed end-to-end security assessments for enterprise clients (Web, Mobile, API).',
                'Executed advanced iOS/Android testing on 40+ apps, finding critical auth bypasses.',
                'Mentored a team of 5 junior consultants on vulnerability exploitation.',
                'Designed scalable testing frameworks in Python/Bash, reducing manual time by 30%.',
              ]}
            />
            <DisclosureEntry
              id="ADV-003" severity="HIGH" dates="Sep 2024 – Mar 2025"
              title="Security Consultant" org="Black Duck (Synopsys) · Bengaluru"
              bullets={[
                'Executed 80+ web assessments for banking/fintech (IDOR, XXE, SQLi).',
                'Completed 50+ REST/GraphQL API tests, uncovering business logic flaws.',
                'Collaborated with 10+ dev teams to integrate security into CI/CD pipelines.',
              ]}
            />
            <DisclosureEntry
              id="ADV-004" severity="MEDIUM" dates="Mar 2022 – Sep 2024"
              title="Security Service Associate" org="Synopsys Inc · Bengaluru"
              bullets={[
                'Orchestrated 160+ web app tests and 70+ mobile audits (e-commerce/healthcare).',
                'Conducted threat modeling for 30+ cloud-native apps, reducing attack surface by 40%.',
                'Discovered and reported 3 CVEs (published in MITRE/NVD).',
              ]}
            />
            <DisclosureEntry
              id="ADV-005" severity="INFO" dates="Jul 2021 – Mar 2022"
              title="Cyber Security Analyst" org="CSCC Labs · Hyderabad"
              bullets={[
                'Managed engagements for 40+ web applications.',
                'Spearheaded forensic analysis for security breaches, reducing resolution time by 50%.',
              ]}
            />
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <SectionHeading icon={Terminal} eyebrow="04 / Contact">Initiate Communication</SectionHeading>
          <div className="bg-gradient-to-r from-amber-500/5 to-[#0E1116] border border-amber-500/15 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Secure Your Infrastructure?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Currently open to security leadership roles and select consulting engagements.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="mailto:er.rohitkumar1410@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded transition-colors">
                <Mail size={18} />
                Email Me
              </a>
              <a href="https://linkedin.com/in/rohitkumar384" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded transition-all border border-slate-700">
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a href="https://github.com/r04i7" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded transition-all border border-slate-700">
                <Github size={18} />
                GitHub
              </a>
            </div>
            <div className="mt-8 text-slate-500 text-sm font-mono">
              Phone: +91 6290342545 (IN)
            </div>
          </div>
        </section>

      </div>

      <footer className="border-t border-slate-800 bg-[#040506] py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-600 text-sm">
          <p className="mb-2">&copy; 2026 Rohit Kumar. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="flex items-center gap-1"><Lock size={12} /> B.Tech Computer Engineering</span>
            <span className="flex items-center gap-1"><Server size={12} /> Punjab Technical University</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
