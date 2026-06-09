import { useState, useEffect, useRef } from "react";
import T from "../data/translations";

export default function Navbar({ lang, setLang, dark, setDark, navigate, currentPage }) {
  const T2 = T[lang];
  const l = lang === "ar";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const indicatorRef = useRef(null);
  const linksRef = useRef({});

  const navLinks = [
    { key: "home",      label: T2.home,       icon: "ti-home" },
    { key: "quizzes",   label: T2.quizzes,    icon: "ti-help-circle" },
    { key: "summary",   label: T2.cheatsheet, icon: "ti-file-text" },
    { key: "practical", label: T2.practical,  icon: "ti-terminal-2" },
  ];

  const handleNav = (key) => {
    navigate(key);
    setMenuOpen(false);
  };

  // mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close menu outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { if (!e.target.closest("nav")) setMenuOpen(false); };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  // close on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 860) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // sliding active indicator
  useEffect(() => {
    const activeEl = linksRef.current[currentPage];
    const indicator = indicatorRef.current;
    if (!activeEl || !indicator) return;
    const rect = activeEl.getBoundingClientRect();
    const parentRect = activeEl.parentElement.getBoundingClientRect();
    indicator.style.width = rect.width + "px";
    indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    indicator.style.opacity = "1";
  }, [currentPage]);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css"/>
      <style>{`
        /* ── entrance ── */
        .nb-root {
          position: sticky; top: 0; z-index: 100;
          transform: translateY(${mounted ? "0" : "-100%"});
          opacity: ${mounted ? 1 : 0};
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.5s ease,
                      background 0.3s, box-shadow 0.3s, border-color 0.3s;
          background: rgba(5,8,24,${scrolled ? "0.97" : "0.85"});
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(255,255,255,${scrolled ? "0.1" : "0.05"});
          box-shadow: ${scrolled ? "0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(124,58,237,0.1)" : "none"};
        }

        /* top glow line */
        .nb-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, #7c3aed88 30%, #38bdf888 70%, transparent 100%);
          opacity: ${scrolled ? 0.6 : 0.3};
          transition: opacity 0.3s;
        }

        .nb-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center;
          height: 62px; padding: 0 1.25rem; gap: 8px;
        }

        /* ── logo ── */
        .nb-logo {
          background: none; border: none; cursor: pointer;
          font-weight: 900; font-size: 17px; color: white;
          padding: 0; display: flex; align-items: center; gap: 10px;
          flex-shrink: 0; white-space: nowrap;
          transition: opacity 0.2s;
        }
        .nb-logo:hover { opacity: 0.85; }
        .nb-logo-icon {
          background: linear-gradient(135deg,#7c3aed,#0891b2);
          border-radius: 9px; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 16px #7c3aed55;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .nb-logo:hover .nb-logo-icon {
          box-shadow: 0 0 28px #7c3aed88;
          transform: rotate(-8deg) scale(1.08);
        }

        .nb-spacer { flex: 1; }

        /* ── desktop links container (relative for indicator) ── */
        .nb-links-wrap {
          position: relative; display: flex; gap: 2px; align-items: center;
        }

        /* sliding indicator */
        .nb-indicator {
          position: absolute; bottom: -2px; height: 2px;
          background: linear-gradient(90deg,#7c3aed,#38bdf8);
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      width 0.35s cubic-bezier(0.34,1.56,0.64,1);
          opacity: 0;
          pointer-events: none;
        }

        .nb-link {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 13px; border-radius: 9px;
          border: none; cursor: pointer; font-size: 14px;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          white-space: nowrap; position: relative;
        }
        .nb-link.active {
          background: rgba(124,58,237,0.16); color: #a78bfa; font-weight: 700;
        }
        .nb-link:not(.active) { background: none; color: #94a3b8; }
        .nb-link:not(.active):hover {
          background: rgba(255,255,255,0.06); color: #cbd5e1;
          transform: translateY(-1px);
        }
        .nb-link:active { transform: scale(0.96); }

        /* icon glow on active */
        .nb-link.active i { filter: drop-shadow(0 0 6px #a78bfa88); }

        /* ── controls ── */
        .nb-controls { display: flex; align-items: center; gap: 6px; }

        .nb-ctrl {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px; padding: 5px 13px;
          color: #94a3b8; cursor: pointer; font-size: 13px; font-weight: 600;
          display: flex; align-items: center; gap: 5px;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .nb-ctrl:hover {
          background: rgba(124,58,237,0.14);
          border-color: rgba(124,58,237,0.35);
          color: #a78bfa; transform: translateY(-1px);
        }
        .nb-ctrl:active { transform: scale(0.96); }

        /* dark toggle morphs icon */
        .nb-dark-icon {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s;
        }
        .nb-ctrl:hover .nb-dark-icon { transform: rotate(20deg); }

        /* hamburger */
        .nb-hamburger {
          display: none; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 9px; width: 38px; height: 38px;
          cursor: pointer; color: #94a3b8; flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .nb-hamburger:hover {
          background: rgba(124,58,237,0.14);
          border-color: rgba(124,58,237,0.35);
          color: #a78bfa;
        }
        .nb-hamburger i {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nb-hamburger.open i { transform: rotate(90deg); }

        /* ── mobile drawer ── */
        .nb-drawer {
          overflow: hidden; max-height: 0; opacity: 0;
          transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease;
          background: rgba(5,8,24,0.98);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .nb-drawer.open { max-height: 340px; opacity: 1; }
        .nb-drawer-inner { padding: 10px 1rem 16px; display: flex; flex-direction: column; gap: 4px; }

        .nb-mob-link {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 14px; border-radius: 11px;
          border: none; background: transparent;
          color: #94a3b8; font-size: 15px; cursor: pointer; width: 100%;
          transition: background 0.18s, color 0.18s, transform 0.18s;
          flex-direction: ${l ? "row-reverse" : "row"};
          text-align: ${l ? "right" : "left"};
        }
        .nb-mob-link:hover {
          background: rgba(255,255,255,0.05);
          transform: ${l ? "translateX(-4px)" : "translateX(4px)"};
        }
        .nb-mob-link.active {
          background: rgba(124,58,237,0.15); color: #a78bfa; font-weight: 700;
        }
        .nb-mob-link.active i { filter: drop-shadow(0 0 5px #a78bfa88); }

        /* drawer divider */
        .nb-drawer-divider {
          height: 1px; background: rgba(255,255,255,0.06);
          margin: 8px 0;
        }
        .nb-drawer-ctrls {
          display: flex; gap: 8px; padding: 0 2px;
        }
        .nb-drawer-ctrl {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 9px; border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: #94a3b8; font-size: 13px; font-weight: 600; cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .nb-drawer-ctrl:hover { background: rgba(124,58,237,0.14); color: #a78bfa; }

        /* ── responsive ── */
        @media (max-width: 1024px) and (min-width: 861px) {
          .nb-link { padding: 6px 9px; }
          .nb-label { display: none; }
          .ctrl-label { display: none; }
          .nb-ctrl { padding: 5px 9px; border-radius: 9px; }
        }

        @media (max-width: 860px) {
          .nb-links-wrap { display: none !important; }
          .nb-hamburger { display: flex !important; }
          .logo-text { display: none; }
          .ctrl-label { display: none; }
          .nb-ctrl { padding: 5px 9px; border-radius: 9px; }
        }

        @media (max-width: 380px) {
          .nb-inner { padding: 0 0.6rem; gap: 4px; }
          .nb-ctrl { padding: 5px 7px; }
          .nb-hamburger { width: 34px; height: 34px; }
        }
      `}</style>

      <nav className="nb-root">
        <div className="nb-inner">

          {/* Logo */}
          <button className="nb-logo" onClick={() => handleNav("home")} aria-label="Go home">
            <span className="nb-logo-icon">
              <i className="ti ti-bolt" style={{ fontSize: 17, color: "white" }} aria-hidden="true"/>
            </span>
            <span className="logo-text">{T2.site}</span>
          </button>

          <div className="nb-spacer"/>

          {/* Desktop links */}
          <div className="nb-links-wrap" role="navigation" aria-label="Main navigation">
            <div ref={indicatorRef} className="nb-indicator"/>
            {navLinks.map(({ key, label, icon }) => (
              <button
                key={key}
                ref={(el) => { linksRef.current[key] = el; }}
                onClick={() => handleNav(key)}
                className={`nb-link${currentPage === key ? " active" : ""}`}
                aria-current={currentPage === key ? "page" : undefined}
              >
                <i className={`ti ${icon}`} style={{ fontSize: 16, flexShrink: 0 }} aria-hidden="true"/>
                <span className="nb-label">{label}</span>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="nb-controls">
            <button className="nb-ctrl" onClick={() => setLang(l ? "en" : "ar")}>
              <i className="ti ti-world" style={{ fontSize: 15 }} aria-hidden="true"/>
              <span className="ctrl-label">{T2.lang}</span>
            </button>
            <button
              className="nb-ctrl"
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i
                className={`ti ${dark ? "ti-sun" : "ti-moon"} nb-dark-icon`}
                style={{ fontSize: 15 }}
                aria-hidden="true"
              />
            </button>
            <button
              className={`nb-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <i className={`ti ${menuOpen ? "ti-x" : "ti-menu-2"}`} style={{ fontSize: 20 }} aria-hidden="true"/>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`nb-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
          <div className="nb-drawer-inner">
            {navLinks.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className={`nb-mob-link${currentPage === key ? " active" : ""}`}
                tabIndex={menuOpen ? 0 : -1}
              >
                <i className={`ti ${icon}`} style={{ fontSize: 20 }} aria-hidden="true"/>
                {label}
              </button>
            ))}
            <div className="nb-drawer-divider"/>
            <div className="nb-drawer-ctrls">
              <button className="nb-drawer-ctrl" onClick={() => { setLang(l ? "en" : "ar"); setMenuOpen(false); }}>
                <i className="ti ti-world" style={{ fontSize: 16 }} aria-hidden="true"/>
                {T2.lang}
              </button>
              <button className="nb-drawer-ctrl" onClick={() => { setDark(!dark); setMenuOpen(false); }}>
                <i className={`ti ${dark ? "ti-sun" : "ti-moon"}`} style={{ fontSize: 16 }} aria-hidden="true"/>
                {dark ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}