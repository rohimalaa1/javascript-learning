import { useState } from "react";
import T from "../data/translations";
import lectures from "../data/lectures";
import LectureContent from "./LectureContent";
import QuizSection from "../components/QuizSection";

export default function LecturePage({ id, lang, navigate }) {
  const T2 = T[lang];
  const lec = lectures.find(x => x.id === id);
  const [tab, setTab] = useState("content");

  if (!lec) return <div style={{padding:"4rem",textAlign:"center"}}>Lecture not found</div>;

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"1.5rem 1rem 4rem"}}>
      <style>{`
        .lec-header { padding: 1.5rem !important; }
        .lec-h1 { font-size: clamp(1.4rem, 4vw, 2rem); }
        @media (max-width: 600px) {
          .lec-header { padding: 1.25rem !important; }
          .tab-bar { width: 100% !important; }
          .tab-bar button { flex: 1; padding: 8px 12px !important; font-size: 13px !important; }
        }
      `}</style>

      <button
        onClick={() => navigate("home")}
        style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:14,marginBottom:20,padding:0,display:"flex",alignItems:"center",gap:4}}
      >
        ← {T2.backToHome}
      </button>

      {/* Header card */}
      <div className="lec-header" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:"2rem",marginBottom:24,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,width:160,height:160,background:lec.color+"0a",borderBottomLeftRadius:"100%"}}/>
        <div style={{display:"inline-block",background:lec.color+"22",color:lec.color,fontSize:12,fontWeight:700,padding:"4px 14px",borderRadius:20,marginBottom:12,letterSpacing:1}}>{T2.lec} {lec.id} · {lec.badge}</div>
        <h1 className="lec-h1" style={{fontWeight:800,marginBottom:8}}>{lec.title[lang]}</h1>
        <p style={{color:"#94a3b8",margin:0,fontSize:14}}>{lec.sub[lang]}</p>
      </div>

      {/* Tab bar */}
      <div className="tab-bar" style={{display:"flex",gap:4,marginBottom:24,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,width:"fit-content"}}>
        {[["content", T2.contentTab], ["quiz", T2.quizTab]].map(([v, label]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            style={{padding:"8px 24px",borderRadius:8,border:"none",background:tab===v?"#7c3aed":"transparent",color:tab===v?"white":"#94a3b8",cursor:"pointer",fontWeight:600,transition:"all 0.2s",fontSize:14}}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "content" ? <LectureContent id={id} lang={lang}/> : <QuizSection lectureId={id} lang={lang}/>}
    </div>
  );
}