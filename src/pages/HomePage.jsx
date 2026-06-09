import { useEffect, useRef } from "react";
import T from "../data/translations";
import lectures from "../data/lectures";

export default function HomePage({ lang, navigate }) {
  const T2 = T[lang];
  const l = lang === "ar";
  const canvasRef = useRef(null);

  /* ── Canvas particle background ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STARS = 180;
    const stars = Array.from({ length: STARS }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.008,
      speed: Math.random() * 0.12 + 0.03,
    }));

    const ORBS = 6;
    const orbHues = [265, 200, 280, 190, 255, 210];
    const orbs = Array.from({ length: ORBS }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 180 + 80,
      hue: orbHues[i],
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // deep gradient bg
      const bg = ctx.createRadialGradient(
        canvas.width / 2, 0, 0,
        canvas.width / 2, canvas.height, canvas.height
      );
      bg.addColorStop(0, "#0d0525");
      bg.addColorStop(1, "#050818");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // nebula orbs
      orbs.forEach((o) => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = canvas.width + o.r;
        if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        if (o.y > canvas.height + o.r) o.y = -o.r;

        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},80%,55%,0.07)`);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // twinkling stars
      stars.forEach((s) => {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da *= -1;
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,180,255,${s.a * 0.85})`;
        ctx.fill();
      });

      // subtle grid dots
      ctx.fillStyle = "rgba(255,255,255,0.018)";
      const gSize = 44;
      for (let gx = 0; gx < canvas.width; gx += gSize)
        for (let gy = 0; gy < canvas.height; gy += gSize) {
          ctx.beginPath(); ctx.arc(gx, gy, 1, 0, Math.PI * 2); ctx.fill();
        }

      // occasional shooting star
      if (Math.random() < 0.004) {
        const sx = Math.random() * canvas.width;
        const sy = Math.random() * canvas.height * 0.4;
        const len = Math.random() * 120 + 60;
        const gs = ctx.createLinearGradient(sx, sy, sx + len, sy + len * 0.3);
        gs.addColorStop(0, "rgba(255,255,255,0)");
        gs.addColorStop(0.5, "rgba(200,180,255,0.7)");
        gs.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(sx, sy); ctx.lineTo(sx + len, sy + len * 0.3);
        ctx.strokeStyle = gs; ctx.lineWidth = 1.5; ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Intersection observer for card reveal ── */
  useEffect(() => {
    const cards = document.querySelectorAll(".lec-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("lec-card--visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  /* ── Counter animation ── */
  useEffect(() => {
    const el = document.getElementById("stat-lec-count");
    if (!el) return;
    const target = lectures.length;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(t * target);
      if (t < 1) requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => requestAnimationFrame(tick), 1400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "transparent" }}>
      <style>{`
        /* ── reset ── */
        * { box-sizing: border-box; }

        /* ── canvas ── */
        .cinema-canvas {
          position: fixed; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
        }

        /* ── root ── */
        .cinema-root {
          position: relative; z-index: 1;
          font-family: 'Segoe UI', system-ui, sans-serif;
          color: white;
        }

        /* ── HERO ── */
        .cinema-hero {
          min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 5rem 1.5rem 4rem;
          position: relative;
        }

        .cinema-badge {
          display: inline-block;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.4);
          border-radius: 30px; padding: 5px 20px;
          font-size: 11px; color: #a78bfa;
          letter-spacing: 3px; text-transform: uppercase;
          margin-bottom: 28px;
          opacity: 0; transform: translateY(20px);
          animation: cu-fadeUp 0.7s 0.2s ease forwards;
        }

        .cinema-title {
          font-size: clamp(2.4rem, 7vw, 4.2rem);
          font-weight: 900; line-height: 1.1; margin-bottom: 18px;
          background: linear-gradient(135deg, #ffffff 0%, #a78bfa 45%, #38bdf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0; transform: translateY(30px);
          animation: cu-fadeUp 0.8s 0.4s ease forwards;
        }

        .cinema-sub {
          font-size: clamp(1rem, 3vw, 1.5rem);
          color: #94a3b8; margin-bottom: 16px; font-weight: 300;
          opacity: 0; transform: translateY(20px);
          animation: cu-fadeUp 0.7s 0.65s ease forwards;
        }

        .cinema-divider {
          width: 60px; height: 2px;
          background: linear-gradient(90deg, #7c3aed, #38bdf8);
          border-radius: 2px; margin: 0 auto 1rem;
          opacity: 0; animation: cu-fadeUp 0.5s 0.8s ease forwards;
        }

        .cinema-desc {
          font-size: 15px; color: #475569;
          max-width: 460px; margin: 0 auto 2.5rem; line-height: 1.9;
          opacity: 0; transform: translateY(20px);
          animation: cu-fadeUp 0.7s 0.85s ease forwards;
        }

        .cinema-btn {
          background: linear-gradient(135deg, #7c3aed, #0891b2);
          border: none; border-radius: 50px;
          padding: 14px 36px; color: white;
          font-size: 15px; font-weight: 700; cursor: pointer;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(20px) scale(0.95);
          animation: cu-fadeUp 0.7s 1.05s ease forwards;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .cinema-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #9f5ffc, #0ea5e9);
          opacity: 0; transition: opacity 0.3s;
        }
        .cinema-btn:hover { transform: scale(1.06); box-shadow: 0 0 50px #7c3aed55, 0 0 80px #0891b222; }
        .cinema-btn:hover::before { opacity: 1; }
        .cinema-btn span { position: relative; z-index: 1; }

        .cinema-btn-glow {
          width: 200px; height: 4px; border-radius: 4px;
          background: radial-gradient(ellipse, #7c3aed66 0%, transparent 70%);
          margin: 12px auto 0;
          opacity: 0; animation: cu-fadeUp 0.6s 1.3s ease forwards;
        }

        .cinema-scroll-hint {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          opacity: 0; animation: cu-fadeUp 0.7s 1.6s ease forwards;
        }
        .cinema-scroll-hint span { font-size: 11px; color: #334155; letter-spacing: 2px; text-transform: uppercase; }
        .cinema-scroll-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #7c3aed;
          animation: cu-scrollBounce 1.8s 2s infinite ease-in-out;
        }

        /* ── STATS ── */
        .cinema-stats {
          display: flex; justify-content: center; gap: 40px;
          padding: 0 1.5rem 3rem; flex-wrap: wrap;
          opacity: 0; transform: translateY(30px);
          animation: cu-fadeUp 0.8s 1.3s ease forwards;
        }
        .cinema-stat { text-align: center; }
        .cinema-stat-num {
          font-size: 2rem; font-weight: 800;
          background: linear-gradient(135deg, #a78bfa, #38bdf8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cinema-stat-label { font-size: 12px; color: #475569; letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }

        /* ── LECTURES ── */
        .cinema-lec-section { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem 5rem; }
        .cinema-section-head { text-align: center; margin-bottom: 3rem; }
        .cinema-section-title {
          font-size: clamp(1.6rem, 4vw, 2.2rem); font-weight: 800; margin-bottom: 10px;
          background: linear-gradient(135deg, #fff 40%, #a78bfa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cinema-section-sub { color: #475569; font-size: 14px; }

        .cinema-lec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }

        .lec-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 1.5rem;
          cursor: pointer; text-align: left;
          position: relative; overflow: hidden;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                      background 0.3s, border-color 0.3s, box-shadow 0.3s;
          opacity: 0; transform: translateY(40px);
        }
        .lec-card--visible { animation: cu-cardReveal 0.6s ease forwards; }
        .lec-card:hover { transform: translateY(-8px) scale(1.01); background: rgba(255,255,255,0.055); }

        .lec-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
          background-size: 200% 100%; background-position: 200% 0;
          transition: background-position 0.5s;
          border-radius: 18px;
        }
        .lec-card:hover::before { background-position: -100% 0; }

        .lec-card-corner {
          position: absolute; top: 0; right: 0;
          width: 80px; height: 80px;
          border-bottom-left-radius: 100%;
          pointer-events: none;
        }
        .lec-card-badge {
          display: inline-block;
          font-size: 11px; font-weight: 700;
          padding: 3px 13px; border-radius: 20px;
          margin-bottom: 12px; letter-spacing: 1px;
        }
        .lec-card-title { font-size: 17px; font-weight: 700; margin-bottom: 7px; color: white; line-height: 1.35; }
        .lec-card-sub { font-size: 13px; color: #94a3b8; margin-bottom: 14px; line-height: 1.6; }
        .lec-card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .lec-card-tag { font-size: 11px; background: rgba(255,255,255,0.06); padding: 2px 9px; border-radius: 10px; color: #64748b; }
        .lec-card-arrow {
          position: absolute; bottom: 1.2rem; right: 1.2rem;
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
          transform: translateX(-6px);
        }
        .lec-card:hover .lec-card-arrow { opacity: 1; transform: translateX(0); }

        /* ── KEYFRAMES ── */
        @keyframes cu-fadeUp {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cu-cardReveal {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cu-scrollBounce {
          0%,100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(8px); opacity: 1; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .cinema-hero { padding: 3rem 1.25rem 2.5rem; min-height: unset; }
          .cinema-lec-grid { grid-template-columns: 1fr !important; }
          .cinema-lec-section { padding: 1.5rem 1rem 3rem; }
          .cinema-stats { gap: 24px; }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .cinema-hero { min-height: 55vh; padding: 4rem 2rem 3rem; }
          .cinema-lec-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Canvas background */}
      <canvas ref={canvasRef} className="cinema-canvas" />

      <div className="cinema-root">
        {/* ── HERO ── */}
        <div className="cinema-hero">
          <div className="cinema-badge">IT204 · Dr. Ahmed Omar</div>
          <h1 className="cinema-title">{T2.heroTitle}</h1>
          <h2 className="cinema-sub">{T2.heroSub}</h2>
          <div className="cinema-divider" />
          <p className="cinema-desc">{T2.heroDesc}</p>

          <button
            className="cinema-btn"
            onClick={() => navigate("lectures")}
          >
            <span>{T2.startJourney} →</span>
          </button>
          <div className="cinema-btn-glow" />

          <div className="cinema-scroll-hint">
            <span>{T2.lecturesTitle}</span>
            <div className="cinema-scroll-dot" />
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="cinema-stats">
          <div className="cinema-stat">
            <div className="cinema-stat-num" id="stat-lec-count">0</div>
            <div className="cinema-stat-label">{T2.lec}</div>
          </div>
          <div className="cinema-stat">
            <div className="cinema-stat-num">4</div>
            <div className="cinema-stat-label">Units</div>
          </div>
          <div className="cinema-stat">
            <div className="cinema-stat-num">∞</div>
            <div className="cinema-stat-label">Learning</div>
          </div>
        </div>

        {/* ── LECTURES GRID ── */}
        <div className="cinema-lec-section">
          <div className="cinema-section-head">
            <h2 className="cinema-section-title">{T2.lecturesTitle}</h2>
            <p className="cinema-section-sub">{T2.lecturesDesc}</p>
          </div>

          <div className="cinema-lec-grid">
            {lectures.map((lec, i) => (
              <button
                key={lec.id}
                className="lec-card"
                style={{
                  textAlign: l ? "right" : "left",
                  animationDelay: `${i * 0.1}s`,
                }}
                onClick={() => navigate("lecture", lec.id)}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = lec.color + "50";
                  e.currentTarget.style.boxShadow = `0 12px 40px ${lec.color}20, 0 0 0 1px ${lec.color}20`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="lec-card-corner"
                  style={{ background: lec.color + "12" }}
                />
                <div
                  className="lec-card-badge"
                  style={{ background: lec.color + "25", color: lec.color }}
                >
                  {T2.lec} {lec.id} · {lec.badge}
                </div>
                <h3 className="lec-card-title">{lec.title[lang]}</h3>
                <p className="lec-card-sub">{lec.sub[lang]}</p>
                <div className="lec-card-tags">
                  {lec.tags.map((t) => (
                    <span key={t} className="lec-card-tag">{t}</span>
                  ))}
                </div>
                <div
                  className="lec-card-arrow"
                  style={{ background: lec.color + "20", color: lec.color }}
                >
                  →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}