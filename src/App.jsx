import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Terminal, 
  Cpu, 
  Lock, 
  Globe, 
  ChevronRight, 
  Github, 
  Linkedin, 
  Mail, 
  FileText,
  AlertTriangle,
  Server,
  ExternalLink,
  Award,
  Trophy
} from 'lucide-react';

/**
 * SENIOR OFFENSIVE SECURITY PORTFOLIO
 * Updated with Real-World Resume Data & Hall of Fame
 */

// --- Components ---

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = new Array(columns).fill(1);
    
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981'; // Tailwind emerald-500
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        if (Math.random() > 0.95) {
            ctx.fillStyle = '#ecfdf5'; 
        } else {
            ctx.fillStyle = '#059669'; 
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
    />
  );
};

const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Initializing Rohit_OS v3.0.0 (Bengaluru Node)...' },
    { type: 'system', content: 'Loading modules: [BLACK_DUCK] [SYNOPSYS] [CSCC_LABS]' },
    { type: 'success', content: 'Identity Verified: Senior Security Consultant. Access Granted.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', content: input }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'info', content: 'Available commands: whoami, cve, hof, certifications, contact, clear' });
          break;
        case 'whoami':
          newHistory.push({ type: 'success', content: 'Rohit Kumar. Senior Security Consultant at Black Duck (Synopsys). Specializing in Mobile & Web App Security.' });
          break;
        case 'cve':
          newHistory.push({ type: 'warning', content: 'Disclosed: CVE-2024-35581, CVE-2024-35582, CVE-2024-35583' });
          break;
        case 'hof':
          newHistory.push({ type: 'success', content: 'Hall of Fame: Cisco, IBM, Philips, Autodesk' });
          break;
        case 'certifications':
          newHistory.push({ type: 'info', content: '>> CEH (Certified Ethical Hacker)\n>> LPT (Licensed Penetration Tester)\n>> OSCP (Pursuing)' });
          break;
        case 'contact':
          newHistory.push({ type: 'info', content: 'Opening secure channel... (Scroll to footer)' });
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          newHistory.push({ type: 'error', content: `Command not found: ${cmd}. Try "help".` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-lg overflow-hidden shadow-2xl font-mono text-sm">
      <div className="bg-emerald-900/20 p-2 border-b border-emerald-500/20 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        <span className="ml-2 text-xs text-emerald-400 opacity-70">root@rohit-synopsys:~</span>
      </div>
      <div className="p-4 h-64 overflow-y-auto font-mono">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap ${
            line.type === 'error' ? 'text-red-400' : 
            line.type === 'success' ? 'text-emerald-400' : 
            line.type === 'warning' ? 'text-yellow-400' :
            line.type === 'user' ? 'text-white' : 'text-slate-400'
          }`}>
            {line.type === 'user' ? '> ' : ''}{line.content}
          </div>
        ))}
        <div className="flex items-center text-emerald-500">
          <span className="mr-2">{'>'}</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none flex-1 text-white focus:ring-0"
            autoFocus
          />
        </div>
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

const SectionHeading = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
      <Icon size={24} />
    </div>
    <h2 className="text-2xl font-bold tracking-wider text-white uppercase">{children}</h2>
    <div className="h-px bg-emerald-500/30 flex-grow ml-4"></div>
  </div>
);

const SkillCard = ({ title, skills }) => (
  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 group">
    <h3 className="text-emerald-400 font-bold mb-4 flex items-center">
      <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span key={skill} className="px-3 py-1 bg-emerald-900/20 text-emerald-100/80 text-xs rounded-full border border-emerald-500/20 font-mono">
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
    className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-700 rounded-lg hover:border-red-500/50 hover:bg-red-900/10 transition-all group"
  >
    <div className="flex items-center gap-3">
      <AlertTriangle className="text-red-500 w-5 h-5" />
      <span className="font-mono text-slate-200 font-bold">{cve}</span>
    </div>
    <div className="flex items-center text-xs text-slate-500 group-hover:text-red-400">
      NVD DATABASE <ExternalLink className="w-3 h-3 ml-2" />
    </div>
  </a>
);

// --- Custom Brand Icons ---
const BrandIcon = ({ brand }) => {
  switch (brand) {
    case 'Cisco':
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-cyan-500 group-hover:text-cyan-400 transition-colors">
           {/* Cisco Bridge Metaphor */}
           <path d="M2 13v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1zm6-6v13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1zm6-5v18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1zm6 5v13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1z" opacity="0.9" />
        </svg>
      );
    case 'IBM':
      return (
        <svg viewBox="0 0 32 16" className="w-12 h-8 fill-current text-blue-500 group-hover:text-blue-400 transition-colors">
          {/* Stylized IBM text block representation */}
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
           {/* Philips Shield Metaphor */}
           <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z" />
        </svg>
      );
    case 'Autodesk':
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-teal-500 group-hover:text-teal-400 transition-colors">
           {/* Stylized 'A' Fold */}
           <path d="M3 21h18v-2H3v2zm1.6-4h14.8l-1.8-3H6.4l-1.8 3zm5-8.4L12 3l2.4 5.6H9.6z" />
        </svg>
      );
    default:
      return <Trophy className="w-8 h-8 text-slate-600 group-hover:text-amber-500 transition-colors mb-3 duration-300" />;
  }
};

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center font-mono text-emerald-500">
        <div className="space-y-2">
          <p className="animate-pulse">[ INITIALIZING SECURE ENVIRONMENT ]</p>
          <p className="text-xs text-emerald-800">Loading profile data: Rohit_Resume.pdf...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-emerald-500/30">
      <MatrixBackground />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-emerald-900/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono text-emerald-500 font-bold text-xl tracking-tighter">
            ./ROHIT_KUMAR
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-emerald-400 transition-colors">PROFILE</a>
            <a href="#cves" className="hover:text-emerald-400 transition-colors">RESEARCH</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">EXPERIENCE</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">CONTACT</a>
          </div>
<a
  href="/Rohit_Kumar_Resume.pdf"
  download
  className="px-4 py-2 border border-emerald-500/50 text-emerald-400 text-xs font-mono rounded hover:bg-emerald-500/10 transition"
>
  DOWNLOAD_RESUME
</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            BASED IN BENGALURU, INDIA
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Senior Security <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Consultant
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Senior Application Security Engineer with 5+ years of experience specializing in web & mobile penetration testing, 
            API security, and CVE research across banking and enterprise environments.
          </p>

          <InteractiveTerminal />
        </div>
      </section>

      {/* Stats/Quick Info */}
      <div className="border-y border-emerald-900/30 bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Total Exp', val: '5+ Years' },
            { label: 'Mobile Apps Audited', val: '40+' },
            { label: 'Published CVEs', val: '03' },
            { label: 'Web Apps Tested', val: '240+' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-1 font-mono">{stat.val}</div>
              <div className="text-xs text-emerald-500/70 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        
        {/* Profile Section */}
        <section id="about">
          <SectionHeading icon={Shield}>Professional Profile</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                Currently serving as a <strong>Senior Security Consultant at Black Duck (Synopsys)</strong>. 
                I possess a proven track record of identifying critical vulnerabilities and delivering executive-level 
                remediation roadmaps for C-suite stakeholders.
              </p>
              <p>
                My expertise spans identifying business logic flaws, broken access control, and zero-day class vulnerabilities 
                within banking, fintech, and e-commerce sectors. I actively mentor junior consultants on OWASP methodologies 
                and secure coding practices.
              </p>
              
              <div className="flex gap-4 mt-6">
                 <div className="flex items-center gap-2 text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 rounded-lg">
                    <Award size={16} />
                    <span className="text-sm font-bold">CEH & LPT Certified</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-400 border border-slate-700 bg-slate-800/50 px-4 py-2 rounded-lg">
                    <Award size={16} />
                    <span className="text-sm">OSCP (Pursuing)</span>
                 </div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 font-mono text-sm">
              <div className="text-emerald-400 mb-2">// core_competencies.json</div>
              <pre className="text-slate-400 overflow-x-auto whitespace-pre-wrap">
{`{
  "role": "Senior AppSec Engineer",
  "location": "Bengaluru, Karnataka",
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

        {/* CVE Research & Hall of Fame Section */}
        <section id="cves">
          <SectionHeading icon={AlertTriangle}>Vulnerability Research & Honors</SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <p className="text-slate-400 mb-6">
                Actively involved in zero-day vulnerability research in web applications and open-source software. 
                Discovered and responsibly disclosed the following vulnerabilities published in MITRE and NVD databases.
              </p>
              <CveCard cve="CVE-2024-35581" link="https://nvd.nist.gov/vuln/detail/CVE-2024-35581" />
              <CveCard cve="CVE-2024-35582" link="https://nvd.nist.gov/vuln/detail/CVE-2024-35582" />
              <CveCard cve="CVE-2024-35583" link="https://nvd.nist.gov/vuln/detail/CVE-2024-35583" />
            </div>
            <div className="bg-gradient-to-br from-red-900/10 to-transparent border border-red-900/30 p-8 rounded-xl flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-2">Research Focus</h3>
                <ul className="space-y-3 text-slate-400 mt-4 list-disc list-inside">
                    <li>Business Logic Abuse</li>
                    <li>Broken Authentication Mechanisms</li>
                    <li>Insecure Object References (IDOR)</li>
                    <li>Zero-day Exploitation in OSS</li>
                </ul>
            </div>
          </div>

          {/* Hall of Fame */}
          <div className="mt-16 pt-8 border-t border-slate-800">
             <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <Trophy size={24} /> 
                </div>
                Hall of Fame Acknowledgments
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Cisco', color: 'border-cyan-500/30 hover:bg-cyan-900/10' }, 
                  { name: 'IBM', color: 'border-blue-500/30 hover:bg-blue-900/10' }, 
                  { name: 'Philips', color: 'border-blue-600/30 hover:bg-blue-900/10' }, 
                  { name: 'Autodesk', color: 'border-teal-500/30 hover:bg-teal-900/10' }
                ].map((company) => (
                    <div key={company.name} className={`flex flex-col items-center justify-center p-8 bg-slate-900/30 border ${company.color} rounded-xl transition-all group cursor-default h-40`}>
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                            <BrandIcon brand={company.name} />
                        </div>
                        <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{company.name}</span>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section id="skills">
          <SectionHeading icon={Cpu}>Technical Capabilities</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            <SkillCard 
              title="Security Testing" 
              skills={['Web App VAPT', 'Mobile (iOS/Android)', 'API Security', 'Network Security', 'Source Code Analysis']} 
            />
            <SkillCard 
              title="Tools" 
              skills={['Burp Suite Pro', 'OWASP ZAP', 'Postman', 'MobSF', 'Frida', 'Objection', 'Metasploit', 'JADX']} 
            />
            <SkillCard 
              title="Standards" 
              skills={['OWASP Top 10', 'OWASP Mobile Top 10', 'CWE/SANS 25', 'SOC2', 'GDPR', 'Secure SDLC']} 
            />
          </div>
        </section>

        {/* Experience / Log */}
        <section id="experience">
          <SectionHeading icon={FileText}>Career Trajectory</SectionHeading>
          <div className="space-y-10">
            
            {/* Job 1 */}
            <div className="relative pl-8 border-l border-emerald-500/20">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
              <div className="mb-1 text-sm text-emerald-500 font-mono">Mar 2025 - Present</div>
              <h3 className="text-xl font-bold text-white">Senior Security Consultant</h3>
              <p className="text-slate-500 mb-4">Black Duck (Synopsys) · Bengaluru</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-emerald-500">
                <li>Directing end-to-end security assessments for enterprise clients (Web, Mobile, API).</li>
                <li>Executing advanced iOS/Android testing on 40+ apps, finding critical auth bypasses.</li>
                <li>Mentoring a team of 5 junior consultants on vulnerability exploitation.</li>
                <li>Designing scalable testing frameworks in Python/Bash, reducing manual time by 30%.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="relative pl-8 border-l border-emerald-500/20">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              <div className="mb-1 text-sm text-slate-500 font-mono">Sep 2024 - Mar 2025</div>
              <h3 className="text-xl font-bold text-white">Security Consultant</h3>
              <p className="text-slate-500 mb-4">Black Duck (Synopsys) · Bengaluru</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-slate-500">
                <li>Executed 80+ web assessments for banking/fintech (IDOR, XXE, SQLi).</li>
                <li>Completed 50+ REST/GraphQL API tests, uncovering business logic flaws.</li>
                <li>Collaborated with 10+ dev teams to integrate security into CI/CD pipelines.</li>
              </ul>
            </div>

            {/* Job 3 */}
            <div className="relative pl-8 border-l border-emerald-500/20">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              <div className="mb-1 text-sm text-slate-500 font-mono">Mar 2022 - Sep 2024</div>
              <h3 className="text-xl font-bold text-white">Security Service Associate</h3>
              <p className="text-slate-500 mb-4">Synopsys Inc · Bengaluru</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-slate-500">
                <li>Orchestrated 160+ web app tests and 70+ mobile audits (e-commerce/healthcare).</li>
                <li>Conducted threat modeling for 30+ cloud-native apps, reducing attack surface by 40%.</li>
                <li>Discovered and reported 3 CVEs (published in MITRE/NVD).</li>
              </ul>
            </div>

            {/* Job 4 */}
            <div className="relative pl-8 border-l border-emerald-500/20">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              <div className="mb-1 text-sm text-slate-500 font-mono">Jul 2021 - Mar 2022</div>
              <h3 className="text-xl font-bold text-white">Cyber Security Analyst</h3>
              <p className="text-slate-500 mb-4">CSCC LABS · Hyderabad</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-slate-500">
                <li>Managed engagements for 40+ web applications.</li>
                <li>Spearheaded forensic analysis for security breaches, reducing resolution time by 50%.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <SectionHeading icon={Terminal}>Initiate Communication</SectionHeading>
          <div className="bg-gradient-to-r from-emerald-900/20 to-slate-900/40 border border-emerald-500/20 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Secure Your Infrastructure?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Currently available for consulting engagements and security leadership roles. 
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="mailto:er.rohitkumar1410@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-emerald-900/20">
                <Mail size={18} />
                Email Me
              </a>
              <a href="https://linkedin.com/in/rohitkumar384" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all border border-slate-700">
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a href="https://github.com/r04i7" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all border border-slate-700">
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

      <footer className="border-t border-slate-800 bg-[#020202] py-12">
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
