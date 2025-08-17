
"use client";
import { useState, useRef, useEffect } from "react";

export default function PhysicsInMotion() {
  // -----------------------
  // Config / External Links
  // -----------------------
  const GOOGLE_FORM_URL = "https://forms.gle/F7fsJR2dkqNayom57";
  const WHATSAPP_NUMBER = "18683726899"; // wa.me format (no plus)
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hi Mr. Peterson, I have a question about Physics in Motion (Forms 3–5)."
  );
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  const PROGRESS_URL =
    "https://script.google.com/macros/s/AKfycbxGlaWFD5JBwOyiOnaEGGNPo-lu_6G_1AB7X3mznvtCPEn6l67jit4vW4YyGPD6JwuDrw/exec";

  // -----------------------
  // Media: prefer video first, then fall back to GIF/PNG/JPG (id: ipAGpIZ)
  // -----------------------
  const IMGUR_ID = "ipAGpIZ"; // latest asset id from your link
  const VIDEO_SOURCES = [
    `https://i.imgur.com/${IMGUR_ID}.mp4`,
    `https://i.imgur.com/${IMGUR_ID}.webm`,
  ];
  const IMAGE_CANDIDATES = [
    `https://i.imgur.com/${IMGUR_ID}.gif`,
    `https://i.imgur.com/${IMGUR_ID}.png`,
    `https://i.imgur.com/${IMGUR_ID}.jpg`,
  ];

  // -----------------------
  // Data
  // -----------------------
  const features = [
    { title: "8 Modules, Full CSEC Coverage", desc: "Structured, exam-aligned units from measurement to waves, electricity, and energy." },
    { title: "Videos, Simulations & Live Demos", desc: "Make concepts click with interactive visuals and experiments." },
    { title: "Monthly Exams & Progress Reports", desc: "Track improvement with data-driven feedback for students and parents." },
    { title: "Past Paper Practice (P1 & P2)", desc: "Master exam technique with guided solutions and timed drills." },
    { title: "Study, Motivation & Time Management", desc: "Build habits that boost grades and reduce stress." },
    { title: "Interactive Response System", desc: "Keep lessons fast-paced and engaging in class or online." },
  ];

  const schedule = [
    { form: "Form 3", day: "Thursday", time: "3:20 – 5:00 PM", cost: "$300/mth" },
    { form: "Form 4", day: "Monday", time: "3:20 – 5:15 PM", cost: "$300/mth" },
    { form: "Form 5", day: "Tuesday or Wednesday", time: "3:20 – 5:15 PM", cost: "$300/mth" },
  ];

  // -----------------------
  // State & Helpers
  // -----------------------
  const [mobileOpen, setMobileOpen] = useState(false);
  const [useImageFallback, setUseImageFallback] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  // If video fails to load/play, fall back to image
  const onVideoError = () => setUseImageFallback(true);

  // Cycle through image candidates on error to avoid broken media
  const handleImgError = () => {
    setImgIndex((i) => (i < IMAGE_CANDIDATES.length - 1 ? i + 1 : i));
  };

  // Smooth scroll for in-page anchors
  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false); // close mobile menu after navigation
  };

  // Tooltip visibility for mobile + desktop (Progress Reports)
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef(null);
  const showTip = () => setShowTooltip(true);
  const hideTip = () => setShowTooltip(false);
  const tapTip = () => {
    showTip();
    clearTimeout(tooltipTimer.current);
    tooltipTimer.current = setTimeout(() => setShowTooltip(false), 1800);
  };

  // -----------------------
  // Lazy-load all non-hero images (future-proof)
  // -----------------------
  useEffect(() => {
    const imgs = document.querySelectorAll("img:not(#hero img)");
    imgs.forEach((img) => {
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      // Lower priority for non-critical media
      img.setAttribute("fetchpriority", "low");
    });
  }, []);

  // -----------------------
  // Diagnostics (tests)
  // -----------------------
  const tests = () => [
    { name: "features length is 6", pass: features.length === 6 },
    { name: "schedule has 3 entries", pass: schedule.length === 3 },
    { name: "Form 3 cost is $300/mth", pass: schedule.find((s) => s.form === "Form 3")?.cost === "$300/mth" },
    { name: "Google Form URL set", pass: typeof GOOGLE_FORM_URL === "string" && GOOGLE_FORM_URL.startsWith("http") },
    { name: "WhatsApp link set", pass: typeof WHATSAPP_LINK === "string" && WHATSAPP_LINK.includes("wa.me") },
    { name: "Progress portal set", pass: typeof PROGRESS_URL === "string" && PROGRESS_URL.includes("script.google.com") },
    // Additional tests
    { name: "Video sources configured", pass: Array.isArray(VIDEO_SOURCES) && VIDEO_SOURCES.length >= 2 },
    { name: "Image candidates configured", pass: Array.isArray(IMAGE_CANDIDATES) && IMAGE_CANDIDATES.length >= 3 },
    { name: "Image candidates look like URLs", pass: IMAGE_CANDIDATES.every((u) => typeof u === "string" && u.startsWith("http")) },
    { name: "WhatsApp number numeric", pass: /^\\d+$/.test(WHATSAPP_NUMBER) },
    { name: "Schedule rows have required fields", pass: schedule.every((s) => s.form && s.day && s.time && s.cost) },
  ];

  return (
    <div className="min-h-screen text-slate-800" style={{ backgroundColor: "#C6D6EA" }}>
      {/* Local CSS for animations & media sizing */}
      <style>{`
        @keyframes pimFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pimScaleIn { from { transform: scale(0.96); } to { transform: scale(1); } }
        .pim-fade-in { animation: pimFadeIn 700ms ease-out both; }
        .pim-scale-in { animation: pimScaleIn 600ms ease-out both; }
        .pim-seq { opacity: 0; animation: pimFadeIn 600ms ease-out forwards; }
        .hero-media { width: min(90vw, 40rem); height: auto; object-fit: contain; border-radius: 0.75rem; }
        @media (max-width: 768px) { .hero-media { width: min(92vw, 22rem); } }
      `}</style>

      {/* Header (pinned with hamburger) */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-2 md:py-3 flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-md border border-slate-300"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>

          <div className="font-semibold text-slate-900 text-sm md:text-base">Physics in Motion</div>

          {/* Desktop nav */}
          <nav className="ml-2 md:ml-6 hidden md:flex items-center gap-5 text-sm">
            <a href="#features" onClick={(e) => handleAnchorClick(e, "features")} className="hover:text-slate-900">Features</a>
            <a href="#schedule" onClick={(e) => handleAnchorClick(e, "schedule")} className="hover:text-slate-900">Schedule</a>
            <a href="#about" onClick={(e) => handleAnchorClick(e, "about")} className="hover:text-slate-900">About</a>
            <a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")} className="hover:text-slate-900">Contact</a>
          </nav>

          {/* CTAs (stacked & centered on mobile) */}
          <div className="ml-auto flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto md:gap-2">
            <a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")} className="px-3 md:px-4 py-2 rounded-xl bg-blue-600 text-white text-xs md:text-sm font-medium text-center w-full md:w-auto">Register</a>
            <a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")} className="px-3 md:px-4 py-2 rounded-xl bg-green-600 text-white text-xs md:text-sm font-medium text-center w-full md:w-auto">WhatsApp Us</a>
            <div className="relative w-full md:w-auto">
              <a
                href={PROGRESS_URL}
                target="_blank"
                rel="noopener"
                onMouseEnter={showTip}
                onMouseLeave={hideTip}
                onTouchStart={tapTip}
                className="px-3 md:px-4 py-2 rounded-xl bg-red-600 text-white text-xs md:text-sm font-semibold inline-flex items-center justify-center gap-2 w-full md:w-auto"
                aria-label="View Progress Reports"
              >
                <svg className="h-4 w-4 md:h-4 md:w-4 animate-bounce" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="3" y="11" width="4" height="10" rx="1"></rect>
                  <rect x="10" y="7" width="4" height="14" rx="1"></rect>
                  <rect x="17" y="3" width="4" height="18" rx="1"></rect>
                </svg>
                <span>View Progress Reports</span>
              </a>
              {showTooltip && (
                <div className="absolute right-0 mt-2 whitespace-nowrap rounded-md bg-black/80 text-white text-xs px-2 py-1 shadow">
                  Check your child’s progress here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`md:hidden ${mobileOpen ? "block" : "hidden"}`}>
          <div className="mx-4 mb-3 rounded-xl border bg-white shadow">
            <nav className="flex flex-col divide-y">
              <a className="px-4 py-3" href="#features" onClick={(e) => handleAnchorClick(e, "features")}>Features</a>
              <a className="px-4 py-3" href="#schedule" onClick={(e) => handleAnchorClick(e, "schedule")}>Schedule</a>
              <a className="px-4 py-3" href="#about" onClick={(e) => handleAnchorClick(e, "about")}>About</a>
              <a className="px-4 py-3" href="#contact" onClick={(e) => handleAnchorClick(e, "contact")}>Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero (video-first with image fallback, no deformation) */}
      <section className="pt-28 md:pt-32" id="hero">
        <div className="flex justify-center mb-3 md:mb-6">
          {!useImageFallback ? (
            <video
              className="hero-media pim-fade-in pim-scale-in"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              // Prefer high-res fetching for hero only
              fetchPriority="high"
              onError={onVideoError}
              poster={`https://i.imgur.com/${IMGUR_ID}.jpg`}
            >
              {VIDEO_SOURCES.map((src) => (
                <source key={src} src={src} />
              ))}
            </video>
          ) : (
            <img
              src={IMAGE_CANDIDATES[imgIndex]}
              alt="Physics in Motion Logo"
              className="hero-media pim-fade-in pim-scale-in"
              onError={handleImgError}
              // Hero should not be lazy; ensure priority
              fetchPriority="high"
              decoding="sync"
            />
          )}
        </div>
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
          <p className="text-xs md:text-sm uppercase tracking-widest text-slate-700 text-center pim-seq" style={{ animationDelay: "400ms" }}>CSEC Physics • Forms 3–5</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mt-2 text-center pim-seq" style={{ animationDelay: "650ms" }}>Master CSEC Physics with Engaging, Exam‑Focused Lessons</h1>
          <p className="mt-3 md:mt-4 text-slate-800 text-base md:text-lg text-center pim-seq" style={{ animationDelay: "900ms" }}>In‑person and online classes led by <span className="font-semibold">Mr. K. Peterson</span>, a Physics teacher at Fatima College for over 17 years with a very high success rate. Clear explanations, real‑world demos, and relentless past‑paper practice.</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">Why Students Succeed Here</h2>
          <p className="mt-2 text-slate-700 text-sm md:text-base text-center md:text-left">Everything is built around the CSEC syllabus: learn the idea, see it in action, then practice exam‑style questions.</p>
          <div className="mt-6 md:mt-8 grid md:grid-cols-3 gap-4 md:gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-12 md:py-16 bg-white border-t border-b">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">Class Schedule & Fees</h2>
          <p className="mt-2 text-slate-700 text-sm md:text-base text-center md:text-left">Choose the day that matches your form. All sessions align strictly with the CSEC Physics syllabus.</p>
          <div className="mt-6 md:mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base border-separate border-spacing-y-2">
              <thead>
                <tr className="text-slate-600">
                  <th className="px-4 py-2">Form</th>
                  <th className="px-4 py-2">Day</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((s) => (
                  <tr key={s.form} className="bg-slate-50 hover:bg-slate-100">
                    <td className="px-4 py-3 font-medium">{s.form}</td>
                    <td className="px-4 py-3">{s.day}</td>
                    <td className="px-4 py-3">{s.time}</td>
                    <td className="px-4 py-3">{s.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA row (stacked & centered on mobile) */}
          <div id="enrol" className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 place-items-center text-center">
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener" className="rounded-2xl bg-blue-600 text-white px-5 py-4 font-semibold w-full md:w-auto">Register on Google Form</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="rounded-2xl bg-green-600 text-white px-5 py-4 font-semibold w-full md:w-auto">WhatsApp a Question</a>
            <a href={PROGRESS_URL} target="_blank" rel="noopener" className="rounded-2xl bg-red-600 text-white px-5 py-4 font-semibold inline-flex items-center justify-center gap-2 w-full md:w-auto">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="3" y="11" width="4" height="10" rx="1"></rect>
                <rect x="10" y="7" width="4" height="14" rx="1"></rect>
                <rect x="17" y="3" width="4" height="18" rx="1"></rect>
              </svg>
              <span>View Progress Reports</span>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="rounded-3xl border bg-white p-6 md:p-8 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold">About the Class</h3>
            <p className="mt-3 text-slate-700 text-sm md:text-base">Physics in Motion delivers high‑impact lessons that keep students engaged and exam‑ready. Every topic is taught with demonstrations and real‑life links, followed by targeted practice that mirrors CSEC questions. Students receive monthly feedback and practical strategies for Paper 1 and Paper 2 success.</p>
            <ul className="mt-4 space-y-2 text-slate-700 text-sm md:text-base">
              <li>• Physical classes (small groups) and full online option</li>
              <li>• Strictly CSEC syllabus — nothing extra, nothing missing</li>
              <li>• Parent check‑ins and progress visibility</li>
            </ul>
          </div>
          <div className="rounded-3xl border bg-white p-6 md:p-8 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold">Meet Mr. K. Peterson</h3>
            <p className="mt-3 text-slate-700 text-sm md:text-base">Experienced physics educator at Fatima College for over 17 years, focused on clarity, confidence, and consistent improvement. Lessons are designed to simplify tough concepts and build exam discipline, leading to a very high success rate among students.</p>
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border text-xs md:text-sm">
              <p>📞 372‑6899 • 💬 WhatsApp available • 🇹🇹 Trinidad & Tobago</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">FAQ</h2>
          <div className="mt-6 md:mt-8 grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-2xl border p-5 md:p-6 bg-slate-50">
              <h4 className="font-semibold">Do you only cover CSEC content?</h4>
              <p className="mt-2 text-slate-700 text-sm md:text-base">Yes — all lessons strictly follow the CSEC Physics syllabus.</p>
            </div>
            <div className="rounded-2xl border p-5 md:p-6 bg-slate-50">
              <h4 className="font-semibold">Are classes online or in person?</h4>
              <p className="mt-2 text-slate-700 text-sm md:text-base">Both options are available. Choose what suits your schedule.</p>
            </div>
            <div className="rounded-2xl border p-5 md:p-6 bg-slate-50">
              <h4 className="font-semibold">How do exams and reports work?</h4>
              <p className="mt-2 text-slate-700 text-sm md:text-base">Students complete a monthly exam; parents receive a progress report with targets.</p>
            </div>
            <div className="rounded-2xl border p-5 md:p-6 bg-slate-50">
              <h4 className="font-semibold">How do I enroll?</h4>
              <p className="mt-2 text-slate-700 text-sm md:text-base">Use the Google Form to register or send us a WhatsApp message with your questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Contact & Enrollment</h2>
          <p className="mt-2 text-slate-700 text-sm md:text-base">Choose the option that works best for you.</p>

          {/* Buttons stacked & centered on mobile */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 place-items-center text-center">
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener" className="rounded-2xl bg-blue-600 text-white px-6 py-5 font-semibold w-full md:w-auto">Register via Google Form</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="rounded-2xl bg-green-600 text-white px-6 py-5 font-semibold w-full md:w-auto">Chat on WhatsApp</a>
            <a href={PROGRESS_URL} target="_blank" rel="noopener" className="rounded-2xl bg-red-600 text-white px-6 py-5 font-semibold inline-flex items-center justify-center gap-2 w-full md:w-auto">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="3" y="11" width="4" height="10" rx="1"></rect>
                <rect x="10" y="7" width="4" height="14" rx="1"></rect>
                <rect x="17" y="3" width="4" height="18" rx="1"></rect>
              </svg>
              <span>View Progress Reports</span>
            </a>
          </div>

          {/* Diagnostics / Test results */}
          <details className="mt-8 text-sm text-slate-700">
            <summary className="cursor-pointer">Diagnostics (click to view)</summary>
            <ul className="mt-2 list-disc ml-6 text-left">
              {tests().map((t) => (
                <li key={t.name} className={t.pass ? "text-green-700" : "text-red-700"}>
                  {t.pass ? "✔" : "✖"} {t.name}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <footer className="py-10 border-t bg-white/70">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} Physics in Motion. All rights reserved.</p>
          <div className="text-sm text-slate-700">CSEC Physics • Forms 3–5 • Trinidad & Tobago</div>
        </div>
      </footer>
    </div>
  );
}
