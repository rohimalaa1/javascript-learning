import { useEffect, useRef } from "react";
import T from "../data/translations";

export default function Footer({ lang, dark }) {
  const T2 = T[lang];
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.querySelectorAll(".ft-child").forEach((child, i) => {
        setTimeout(() => {
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
        }, i * 100);
      });
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  const isLight = dark === false;

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css"/>
      <style>{`
        .ft-root {
          position: relative; overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.5);
        }
        .ft-root.ft-light {
          background: #f5f3ff;
          border-top: 1px solid rgba(124,58,237,0.15);
        }
        .ft-root::before {
          content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #7c3aed66, #38bdf855, transparent);
          pointer-events: none;
        }
        .ft-glow-l, .ft-glow-r {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(60px);
        }
        .ft-glow-l {
          width: 300px; height: 200px; bottom: -40px; left: -60px;
          background: radial-gradient(ellipse, #7c3aed18, transparent 70%);
        }
        .ft-glow-r {
          width: 260px; height: 180px; bottom: -30px; right: -50px;
          background: radial-gradient(ellipse, #0891b214, transparent 70%);
        }
        .ft-root::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .ft-root.ft-light::after {
          background-image: radial-gradient(circle, rgba(124,58,237,0.09) 1px, transparent 1px);
        }

        .ft-inner {
          position: relative; z-index: 1;
          max-width: 800px; margin: 0 auto;
          padding: 3rem 1.5rem; text-align: center;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }

        .ft-child {
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }

        .ft-logo {
          display: flex; align-items: center;
          justify-content: center; gap: 8px; margin-bottom: 20px;
        }
        .ft-logo-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg, #7c3aed, #0891b2);
          display: flex; align-items: center; justify-content: center;
          animation: ft-pulse 3s ease-in-out infinite;
        }
        .ft-logo-label {
          font-size: 13px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: #475569;
        }
        .ft-root.ft-light .ft-logo-label { color: #6d28d9; }

        .ft-divider {
          width: 48px; height: 2px; border-radius: 2px;
          margin: 0 auto 20px;
          background: linear-gradient(90deg, #7c3aed, #38bdf8); opacity: 0.6;
        }

        .ft-ar {
          font-size: 14px; line-height: 2;
          max-width: 680px; margin: 0 auto 24px;
          font-family: Georgia, serif; transition: color 0.3s;
          color: #64748b;
        }
        .ft-ar:hover { color: #94a3b8; }
        .ft-root.ft-light .ft-ar { color: #374151; }
        .ft-root.ft-light .ft-ar:hover { color: #1e1b4b; }

        .ft-by-wrap {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.22);
          border-radius: 30px; padding: 6px 18px; cursor: default;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .ft-by-wrap:hover {
          background: rgba(124,58,237,0.16);
          border-color: rgba(124,58,237,0.45);
          box-shadow: 0 0 20px #7c3aed22;
        }
        .ft-root.ft-light .ft-by-wrap {
          background: rgba(124,58,237,0.09);
          border-color: rgba(124,58,237,0.3);
        }
        .ft-root.ft-light .ft-by-wrap:hover {
          background: rgba(124,58,237,0.18);
          border-color: rgba(124,58,237,0.55);
        }
        .ft-by {
          font-size: 12px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: #a78bfa;
        }
        .ft-root.ft-light .ft-by { color: #7c3aed; }

        .ft-copy { margin-top: 20px; font-size: 11px; letter-spacing: 1px; color: #334155; }
        .ft-root.ft-light .ft-copy { color: #9ca3af; }

        @keyframes ft-pulse {
          0%,100% { box-shadow: 0 0 16px #7c3aed44; }
          50%      { box-shadow: 0 0 32px #7c3aed77; }
        }

        @media (max-width: 600px) {
          .ft-inner { padding: 2rem 1rem; }
          .ft-ar { font-size: 13px; line-height: 1.9; }
          .ft-by { font-size: 11px; }
        }
      `}</style>

      <footer className={`ft-root${isLight ? " ft-light" : ""}`}>
        <div className="ft-glow-l" aria-hidden="true"/>
        <div className="ft-glow-r" aria-hidden="true"/>

        <div className="ft-inner" ref={innerRef}>
          <div className="ft-child ft-logo">
            <span className="ft-logo-icon">
              <i className="ti ti-bolt" style={{ fontSize: 17, color: "white" }} aria-hidden="true"/>
            </span>
            <span className="ft-logo-label">IT204 · JavaScript</span>
          </div>

          <div className="ft-child ft-divider"/>

          <p className="ft-child ft-ar" dir="rtl">
            {T2.footerAr}
          </p>

          <div className="ft-child ft-by-wrap">
            <i className="ti ti-code" style={{ fontSize: 14, color: "#a78bfa" }} aria-hidden="true"/>
            <span className="ft-by">{T2.footerBy}</span>
          </div>

          <p className="ft-child ft-copy">IT204 · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}