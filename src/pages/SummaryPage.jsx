import { useState } from "react";
import T from "../data/translations";
import summaryData from "../data/summaryData";
import CodeBlock from "../components/CodeBlock";

export default function SummaryPage({ lang }) {
  const T2 = T[lang];
  const [open, setOpen] = useState({});
  const toggle = k => setOpen(o => ({...o, [k]: !o[k]}));

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"2rem 1rem 4rem"}}>
      <style>{`
        .summary-title { font-size: clamp(1.8rem, 5vw, 2.5rem); }
        .summary-items-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin-bottom: 16px; }
        @media (max-width: 600px) {
          .summary-items-grid { grid-template-columns: 1fr !important; }
          .summary-title { font-size: 1.6rem !important; }
          .summary-toggle-btn { font-size: 14px !important; }
          .summary-inner { padding: 0 1rem 1rem !important; }
        }
      `}</style>

      <div style={{textAlign:"center",marginBottom:"3rem"}}>
        <h1 className="summary-title" style={{fontWeight:900,marginBottom:8,background:"linear-gradient(135deg,#a78bfa,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
          {T2.summaryTitle}
        </h1>
        <p style={{color:"#64748b"}}>{T2.summaryDesc}</p>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {summaryData.map(sec => (
          <div key={sec.key} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,overflow:"hidden"}}>
            <button
              className="summary-toggle-btn"
              onClick={() => toggle(sec.key)}
              style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1rem 1.25rem",background:"none",border:"none",color:"inherit",cursor:"pointer",fontWeight:700,fontSize:16,textAlign:lang==="ar"?"right":"left",gap:12}}
            >
              <span>{sec.title[lang]}</span>
              <span style={{transition:"transform 0.3s",transform:open[sec.key]?"rotate(180deg)":"rotate(0deg)",fontSize:20,color:"#7c3aed",flexShrink:0}}>⌄</span>
            </button>
            <div style={{display:"grid",gridTemplateRows:open[sec.key]?"1fr":"0fr",transition:"grid-template-rows 0.35s ease"}}>
              <div style={{overflow:"hidden"}}>
                <div className="summary-inner" style={{padding:"0 1.25rem 1.25rem"}}>
                  <div className="summary-items-grid">
                    {sec.items.map((item, i) => (
                      <div key={i} style={{background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"10px 14px"}}>
                        <code style={{fontSize:13,color:"#a78bfa",display:"block",marginBottom:4,wordBreak:"break-all"}}>{item.label}</code>
                        <span style={{fontSize:12,color:"#94a3b8"}}>{item.desc[lang]}</span>
                      </div>
                    ))}
                  </div>
                  <CodeBlock code={sec.code}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}