import React, { useState, useEffect, useRef } from "react";

function useTypewriter(text, speed = 50) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return [count, ref];
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/90 backdrop-blur-md shadow-lg shadow-purple-500/5" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-purple-400 font-mono font-bold text-lg">&lt;Sindura /&gt;</span>
        <div className="hidden md:flex gap-6 text-sm">
          {["about", "skills", "experience", "projects", "contact"].map((s) => (
            <a key={s} href={`#${s}`} className="text-gray-400 hover:text-purple-400 transition-colors font-mono">.{s}()</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Terminal({ children }) {
  return (
    <div className="bg-gray-900 border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 border-b border-gray-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-gray-500 font-mono">sindura@dev ~</span>
      </div>
      <div className="p-5 font-mono text-sm">{children}</div>
    </div>
  );
}

function SectionTitle({ tag, label }) {
  return (
    <div className="text-center mb-10">
      <p className="text-purple-500 font-mono text-sm mb-1">&lt;{tag}&gt;</p>
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">{label}</h2>
      <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full mt-3" />
    </div>
  );
}

function FloatingBadge({ text, className }) {
  return (
    <div className={`absolute hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-900/80 border border-gray-700/50 rounded-full text-xs font-mono backdrop-blur-sm ${className}`}>
      <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
      <span className="text-gray-300">{text}</span>
    </div>
  );
}

function StatCard({ value, suffix, label }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
        {count}{suffix}
      </p>
      <p className="text-gray-500 text-sm mt-1 font-mono">{label}</p>
    </div>
  );
}

export default function Portfolio() {
  const heroText = useTypewriter("I build intelligent, scalable web experiences.", 50);

  const skillCategories = [
    { label: "Frontend", icon: "\u2726", color: "from-purple-500 to-pink-500", border: "border-purple-500/30", text: "text-purple-400", items: ["React.js", "JavaScript"] },
    { label: "Backend", icon: "\u2699", color: "from-indigo-500 to-blue-500", border: "border-indigo-500/30", text: "text-indigo-400", items: ["Node.js", "Python", "MySQL"] },
    { label: "Cloud", icon: "\u2601", color: "from-cyan-500 to-teal-500", border: "border-cyan-500/30", text: "text-cyan-400", items: ["AWS - Basics", "Azure - Basics"] },
    { label: "AI / ML", icon: "\uD83E\uDDE0", color: "from-violet-500 to-purple-500", border: "border-violet-500/30", text: "text-violet-400", items: ["Agentic AI", "Lang Graph"] },
  ];

  const experiences = [
    {
      role: "Software Development Engineer I",
      company: "Calibraint",
      period: "MAY 2025 - PRESENT",
      current: true,
      points: [
        "Engineered PriceWizard \u2014 a dynamic pricing optimization platform for Hotels & BTR properties using React.js and Node.js on AWS, enabling automated real-time rate adjustments through demand forecasting.",
        "Designed a scalable React-based admin dashboard integrated with AWS Lambda microservices for pricing configuration, analytics visualization, and cross-region property management.",
        "Architected serverless backend using Amazon ECS, ECR, S3, and SQS with containerized algorithm version control and secure SFTP pipelines via AWS Secrets Manager.",
        "Developed statistical pricing algorithms in R \u2014 reduced manual pricing intervention by 95% and increased average client revenue by $3,000+/month.",
      ],
    },
    {
      role: "Associate Software Developer",
      company: "Calibraint",
      period: "FEB 2025 - MAY 2025",
      current: false,
      points: [
        "Learned React.js, HTML, CSS, and JavaScript through hands-on development and real-world application building.",
        "Built responsive and interactive user interfaces, strengthening frontend development skills.",
      ],
    },
  ];

  const services = [
    { icon: "\uD83D\uDDA5\uFE0F", title: "Web Development", desc: "Full-stack apps with React, Node.js & cloud-native architecture" },
    { icon: "\uD83E\uDD16", title: "AI Integration", desc: "LLM-powered features, RAG systems & intelligent automation" },
    { icon: "\u2601\uFE0F", title: "Cloud Architecture", desc: "Serverless solutions on AWS \u2014 Lambda, ECS, S3, SQS" },
    { icon: "\uD83D\uDCC8", title: "Data & Analytics", desc: "Pricing algorithms, dashboards & data-driven decision making" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-purple-500/30">
      <NavBar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-gray-950 to-indigo-950/50" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Floating tech badges */}
        <FloatingBadge text="React.js" className="top-[20%] left-[8%] animate-bounce" />
        <FloatingBadge text="AWS" className="top-[15%] right-[10%] animate-bounce" style={{ animationDelay: "0.5s" }} />
        <FloatingBadge text="Node.js" className="bottom-[25%] left-[5%] animate-bounce" style={{ animationDelay: "1s" }} />
        <FloatingBadge text="Python" className="bottom-[20%] right-[8%] animate-bounce" style={{ animationDelay: "1.5s" }} />
        <FloatingBadge text="LangChain" className="top-[40%] right-[3%] animate-bounce" style={{ animationDelay: "0.8s" }} />
        <FloatingBadge text="MySQL" className="top-[45%] left-[3%] animate-bounce" style={{ animationDelay: "1.2s" }} />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
          <Terminal>
            <p className="text-green-400">$ whoami</p>
            <p className="text-white mt-2 text-2xl md:text-3xl font-bold">Sindura B</p>
            <p className="text-purple-400 mt-1">Full Stack Developer &amp; AI Enthusiast</p>
            <p className="text-gray-500 mt-1 text-xs">Chennai, India</p>
            <div className="mt-4 border-t border-gray-700/50 pt-4">
              <p className="text-green-400">$ cat mission.txt</p>
              <p className="text-gray-300 mt-2 h-6">
                {heroText}<span className="animate-pulse text-purple-400">|</span>
              </p>
            </div>
            <div className="mt-4 border-t border-gray-700/50 pt-4">
              <p className="text-green-400">$ ls links/</p>
              <div className="mt-2 flex flex-wrap gap-4">
                <a href="mailto:sindhuraboopathy@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors">&#9993; email</a>
                <a href="https://github.com/Sinduraboopathi" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">&#9741; github</a>
                <a href="tel:+919566407428" className="text-purple-400 hover:text-purple-300 transition-colors">&#9742; phone</a>
              </div>
            </div>
          </Terminal>
          <div className="mt-8 flex justify-center">
            <a href="#about" className="animate-bounce text-purple-400 text-2xl">&#8595;</a>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 px-6 border-y border-gray-800/50 bg-gray-900/40">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value={95} suffix="%" label="automation achieved" />
          <StatCard value={3000} suffix="+" label="$/mo revenue boost" />
          <StatCard value={12} suffix="+" label="technologies" />
          <StatCard value={8} suffix=".16" label="CGPA" />
        </div>
      </section>

      {/* What I Do */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle tag="Services" label="What I Do" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="group bg-gray-900/40 border border-gray-800 rounded-2xl p-5 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl block mb-3">{s.icon}</span>
                <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle tag="About" label="Who Am I?" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-gray-300 leading-relaxed text-lg">
                Dynamic <span className="text-purple-400 font-semibold">Full Stack Developer</span> dedicated to architecting
                high-performance, responsive web applications within the React.js, Node.js, AWS and MySQL ecosystem.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                I specialize in bridging the gap between elegant front-end interfaces and robust back-end architectures,
                delivering scalable RESTful APIs and user-centric solutions optimized for speed and reliability.
                Currently exploring <span className="text-indigo-400 font-semibold">Agentic AI</span> and <span className="text-indigo-400 font-semibold">LLM-powered applications</span>.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 font-mono text-sm">
              <p className="text-gray-500">// quick stats</p>
              <p className="mt-2"><span className="text-purple-400">const</span> <span className="text-blue-300">dev</span> = {"{"}</p>
              <p className="ml-4"><span className="text-green-300">focus</span>: <span className="text-yellow-300">"Full Stack + AI"</span>,</p>
              <p className="ml-4"><span className="text-green-300">exp</span>: <span className="text-yellow-300">"2025 - present"</span>,</p>
              <p className="ml-4"><span className="text-green-300">loves</span>: <span className="text-yellow-300">"Building things"</span>,</p>
              <p className="ml-4"><span className="text-green-300">cgpa</span>: <span className="text-orange-300">8.16</span>,</p>
              <p>{"}"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle tag="Skills" label="Tech Stack" />
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 font-mono text-sm mb-8 max-w-md mx-auto">
            <p className="text-gray-500">// loading skill modules...</p>
            <p><span className="text-purple-400">import</span> {"{ "}<span className="text-green-300">skills</span>{" }"} <span className="text-purple-400">from</span> <span className="text-yellow-300">'./sindura'</span>;</p>
            <p className="text-gray-500">// {skillCategories.reduce((a, c) => a + c.items.length, 0)} modules loaded &#10003;</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillCategories.map((cat) => (
              <div key={cat.label} className="group relative">
                <div className={`relative bg-gray-900/80 border ${cat.border} rounded-2xl p-5 hover:border-opacity-60 transition-all duration-300 h-full hover:-translate-y-1`}>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg mb-3 shadow-lg`}>
                    {cat.icon}
                  </div>
                  <h3 className={`font-bold font-mono text-sm ${cat.text} mb-3`}>{cat.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span key={item} className="text-xs px-2.5 py-1 bg-gray-800/80 text-gray-300 rounded-md border border-gray-700/50 hover:border-purple-500/30 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle tag="Experience" label="Where I've Worked" />
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {exp.role}
                        {exp.current && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-normal animate-pulse">CURRENT</span>}
                      </h3>
                      <p className="text-purple-400 font-mono text-sm mt-1">@ {exp.company}</p>
                    </div>
                    <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-mono">{exp.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                        <span className="text-purple-500 mt-1 shrink-0">&#9656;</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle tag="Projects" label="What I've Built" />
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-sm shadow-md shadow-purple-500/20">
                  🤖
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">RAG-Based Document QA System</h3>
                  <p className="text-purple-400 font-mono text-xs">AI / NLP / LLM</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Built a Retrieval-Augmented Generation system that lets users ask questions about uploaded documents (PDF/Text).
                The system converts documents into embeddings, stores them in a vector database, retrieves relevant content,
                and generates accurate answers using a Large Language Model.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "LangChain", "Vector DB", "LLM", "RAG"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Achievement */}
      <section id="education" className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <SectionTitle tag="Education" label="Academics" />
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
              <p className="text-purple-400 font-mono text-xs mb-2">2021 &ndash; 2025</p>
              <h3 className="text-lg font-bold text-white">B.Tech in AI &amp; Data Science</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">8.16</span>
                </div>
                <p className="text-gray-400 text-sm">CGPA out of 10.0</p>
              </div>
            </div>
          </div>
          <div>
            <SectionTitle tag="Achievement" label="Recognition" />
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🏆</span>
                <div>
                  <h3 className="text-lg font-bold text-white">Star Performer of the Month</h3>
                  <p className="text-purple-400 font-mono text-sm mt-1">October 2025</p>
                  <p className="text-gray-500 text-sm mt-1">Recognized for outstanding contributions at Calibraint</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-lg mx-auto">
          <SectionTitle tag="Contact" label="Let's Connect" />
          <Terminal>
            <p className="text-green-400">$ ping sindura</p>
            <p className="text-gray-300 mt-2">&#9993; sindhuraboopathy@gmail.com</p>
            <p className="text-gray-300">&#9742; +91 9566407428</p>
            <p className="text-gray-300">&#9873; Chennai, India</p>
            <div className="mt-4 border-t border-gray-700/50 pt-4">
              <p className="text-green-400">$ open --links</p>
              <div className="mt-2 flex gap-6">
                <a href="mailto:sindhuraboopathy@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors">&#9993; Email</a>
                <a href="https://github.com/Sinduraboopathi" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">&#9741; GitHub</a>
              </div>
            </div>
            <p className="text-green-400 mt-4">$ _<span className="animate-pulse">|</span></p>
          </Terminal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-800">
        <p className="text-gray-600 text-sm font-mono">
          &lt;/&gt; by Sindura B &bull; {new Date().getFullYear()} &bull; Built with 💜 &amp; React
        </p>
      </footer>
    </div>
  );
}
