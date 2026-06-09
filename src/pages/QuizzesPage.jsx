import T from "../data/translations";
import lectures from "../data/lectures";
import quizData from "../data/quizData";

export default function QuizzesPage({ lang, navigate }) {
  const T2 = T[lang];
  const l = lang === "ar";

  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"2rem 1rem 4rem"}}>
      <style>{`
        .quiz-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
        .quiz-page-title { font-size: clamp(1.8rem, 5vw, 2.5rem); }
        @media (max-width: 600px) {
          .quiz-grid { grid-template-columns: 1fr !important; }
          .quiz-page-title { font-size: 1.6rem !important; }
        }
        @media (min-width: 601px) and (max-width: 860px) {
          .quiz-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div style={{textAlign:"center",marginBottom:"3rem"}}>
        <h1 className="quiz-page-title" style={{fontWeight:900,marginBottom:8,background:"linear-gradient(135deg,#a78bfa,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
          {T2.quizzesTitle}
        </h1>
        <p style={{color:"#64748b"}}>{T2.quizzesDesc}</p>
      </div>

      <div className="quiz-grid">
        {lectures.map(lec => (
          <div key={lec.id} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"1.5rem"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
              <span style={{background:lec.color+"22",color:lec.color,fontSize:11,fontWeight:700,padding:"3px 12px",borderRadius:20}}>
                {T2.lec} {lec.id}
              </span>
              <span style={{fontSize:12,color:"#64748b"}}>
                {quizData[lec.id]?.length || 0} {l ? "سؤال" : "questions"}
              </span>
            </div>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:16,lineHeight:1.4}}>{lec.title[lang]}</h3>
            <button
              onClick={() => navigate("lecture", lec.id, "quiz")}
              style={{width:"100%",padding:"9px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"#a78bfa",cursor:"pointer",fontWeight:600,fontSize:14,transition:"all 0.2s"}}
              onMouseOver={e=>{e.target.style.background="#7c3aed22"}}
              onMouseOut={e=>{e.target.style.background="transparent"}}
            >
              {T2.openQuiz} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}