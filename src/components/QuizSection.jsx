import { useState } from "react";
import T from "../data/translations";
import quizData from "../data/quizData";

export default function QuizSection({ lectureId, lang }) {
  const l = lang === "ar";
  const T2 = T[lang];
  const qs = quizData[lectureId] || [];
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  const check = (i, val) => {
    const q = qs[i];
    if (q.type === "tf")  setResults(r => ({...r, [i]: val === q.ans}));
    if (q.type === "mcq") setResults(r => ({...r, [i]: val === q.correct}));
    setAnswers(a => ({...a, [i]: val}));
  };

  const typeMeta = {
    tf:    { label: "T/F",   icon: "ti-toggle-left",  bg: "#0891b222", color: "#0891b2" },
    mcq:   { label: "MCQ",   icon: "ti-list-check",   bg: "#7c3aed22", color: "#a78bfa" },
    essay: { label: "Essay", icon: "ti-writing",      bg: "#d9770622", color: "#fbbf24" },
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css"/>
      <style>{`
        .quiz-mcq-btn { text-align: ${l ? "right" : "left"}; }
        @media (max-width: 600px) {
          .quiz-card { padding: 1rem !important; }
          .quiz-tf-row { flex-wrap: wrap; gap: 8px !important; }
          .quiz-tf-row button { flex: 1; }
          .quiz-essay textarea { font-size: 13px !important; }
        }
      `}</style>

      <div style={{display:"flex",flexDirection:"column",gap:20}}>
        {qs.map((q, i) => {
          const meta = typeMeta[q.type] || typeMeta.essay;
          return (
            <div
              key={i}
              className="quiz-card"
              style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"1.25rem"}}
            >
              {/* Question header */}
              <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:14,flexWrap:"wrap"}}>
                <span style={{background:meta.bg,color:meta.color,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,textTransform:"uppercase",letterSpacing:1,display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                  <i className={`ti ${meta.icon}`} style={{fontSize:13}} aria-hidden="true"/>
                  {meta.label}
                </span>
                <span style={{fontSize:15,fontWeight:600,lineHeight:1.4}}>{q.q[lang]}</span>
              </div>

              {/* True / False */}
              {q.type === "tf" && (
                <div className="quiz-tf-row" style={{display:"flex",gap:10,alignItems:"center"}}>
                  {[true, false].map(v => (
                    <button
                      key={String(v)}
                      onClick={() => check(i, v)}
                      style={{padding:"7px 22px",borderRadius:8,border:"1px solid rgba(255,255,255,0.2)",background:answers[i]===v?"#7c3aed":"transparent",color:answers[i]===v?"white":"inherit",cursor:"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",gap:6,fontWeight:600,fontSize:14}}
                    >
                      <i className={`ti ${v ? "ti-check" : "ti-x"}`} style={{fontSize:15}} aria-hidden="true"/>
                      {v ? (l ? "صح" : "True") : (l ? "خطأ" : "False")}
                    </button>
                  ))}
                  {i in results && (
                    <span style={{display:"flex",alignItems:"center",gap:4,color:results[i]?"#4ade80":"#f87171",fontWeight:700,fontSize:14}}>
                      <i className={`ti ${results[i] ? "ti-circle-check" : "ti-circle-x"}`} style={{fontSize:16}} aria-hidden="true"/>
                      {results[i] ? T2.correct : T2.wrong}
                    </span>
                  )}
                </div>
              )}

              {/* MCQ */}
              {q.type === "mcq" && (
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {q.opts.map((opt, j) => (
                    <button
                      key={j}
                      className="quiz-mcq-btn"
                      onClick={() => check(i, j)}
                      style={{padding:"9px 16px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:answers[i]===j?"#7c3aed22":"transparent",color:answers[i]===j?"#a78bfa":"inherit",cursor:"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",gap:10,width:"100%",fontSize:14}}
                    >
                      <span style={{width:22,height:22,borderRadius:6,background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#64748b",flexShrink:0}}>
                        {String.fromCharCode(65+j)}
                      </span>
                      {opt[lang]}
                    </button>
                  ))}
                  {i in results && (
                    <span style={{display:"flex",alignItems:"center",gap:4,color:results[i]?"#4ade80":"#f87171",fontWeight:700,fontSize:14,marginTop:4}}>
                      <i className={`ti ${results[i] ? "ti-circle-check" : "ti-circle-x"}`} style={{fontSize:16}} aria-hidden="true"/>
                      {results[i] ? T2.correct : T2.wrong}
                    </span>
                  )}
                </div>
              )}

              {/* Essay */}
              {q.type === "essay" && (
                <div className="quiz-essay">
                  <p style={{fontSize:13,color:"#9ca3af",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
                    <i className="ti ti-info-circle" style={{fontSize:14,color:"#64748b"}} aria-hidden="true"/>
                    {T2.essayNote}
                  </p>
                  <textarea
                    rows={4}
                    style={{width:"100%",background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"10px 14px",color:"inherit",fontSize:14,resize:"vertical",boxSizing:"border-box",lineHeight:1.6}}
                    placeholder={l ? "اكتب إجابتك هنا..." : "Write your answer here..."}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}