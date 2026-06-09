import { useState, useEffect, useRef, useCallback } from "react";
import T from "../data/translations";
import practicalData from "../data/practicalData";

// ── Animated Demos ────────────────────────────────────────────────
function TodoDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn JavaScript", done: true },
    { id: 2, text: "Build a project", done: false },
  ]);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    todos.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), i * 120);
    });
    // Run only on mount; todos intentionally omitted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = () => {
    const text = input.trim();
    if (!text) return;
    const newTodo = { id: Date.now(), text, done: false };
    setTodos(t => [...t, newTodo]);
    setVisible(v => [...v, todos.length]);
    setInput("");
  };

  const toggle = id => setTodos(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const remove = id => setTodos(t => t.filter(x => x.id !== id));

  return (
    <div style={{fontFamily:"inherit"}}>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          placeholder="Add a task..."
          style={{flex:1,padding:"8px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#e2e8f0",fontSize:14,outline:"none",minWidth:0}}
        />
        <button onClick={add} style={{padding:"8px 18px",borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#0891b2)",border:"none",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:14,flexShrink:0}}>+</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {todos.map((todo, i) => (
          <div key={todo.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",opacity:visible.includes(i)?1:0,transform:visible.includes(i)?"translateY(0)":"translateY(10px)",transition:"all 0.3s ease"}}>
            <button onClick={() => toggle(todo.id)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${todo.done?"#22c55e":"rgba(255,255,255,0.2)"}`,background:todo.done?"#22c55e22":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#22c55e",flexShrink:0}}>
              {todo.done ? "✓" : ""}
            </button>
            <span style={{flex:1,fontSize:14,color:todo.done?"#64748b":"#e2e8f0",textDecoration:todo.done?"line-through":"none",transition:"all 0.2s",minWidth:0,wordBreak:"break-word"}}>{todo.text}</span>
            <button onClick={() => remove(todo.id)} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:16,padding:"0 4px",lineHeight:1,flexShrink:0}}>×</button>
          </div>
        ))}
      </div>
      {todos.length === 0 && <p style={{textAlign:"center",color:"#475569",fontSize:13,marginTop:16}}>No tasks yet — add one above!</p>}
    </div>
  );
}

function CounterDemo() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const logRef = useRef(null);

  const log = (label, val) => {
    const entry = { label, val, time: new Date().toLocaleTimeString() };
    setHistory(h => [entry, ...h].slice(0, 6));
  };

  const inc = () => { setCount(c => { log("+1", c + 1); return c + 1; }); };
  const dec = () => { setCount(c => { log("-1", c - 1); return c - 1; }); };
  const reset = () => { setCount(0); log("reset", 0); };

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = 0; }, [history]);

  return (
    <div>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:"clamp(48px,12vw,72px)",fontWeight:900,color:count<0?"#ef4444":count>0?"#a78bfa":"#64748b",transition:"color 0.3s",lineHeight:1,marginBottom:20,fontVariantNumeric:"tabular-nums"}}>
          {count}
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          {[{label:"−",fn:dec,col:"#ef4444"},{label:"Reset",fn:reset,col:"#64748b"},{label:"+",fn:inc,col:"#22c55e"}].map(({label,fn,col}) => (
            <button key={label} onClick={fn} style={{padding:"10px 22px",borderRadius:10,border:`1px solid ${col}44`,background:`${col}11`,color:col,cursor:"pointer",fontWeight:700,fontSize:16,transition:"all 0.15s"}}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div ref={logRef} style={{maxHeight:120,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
        {history.map((h, i) => (
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 10px",borderRadius:6,background:"rgba(255,255,255,0.03)",fontSize:12,color:"#64748b",opacity:1-i*0.12,gap:8}}>
            <span style={{color:"#94a3b8"}}>{h.label}</span>
            <span style={{color:"#a78bfa",fontWeight:700}}>→ {h.val}</span>
            <span style={{flexShrink:0}}>{h.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GradesDemo() {
  const [scores, setScores] = useState([92, 78, 85]);
  const [input, setInput] = useState("");

  const avg = scores.length ? scores.reduce((s, x) => s + x, 0) / scores.length : 0;
  const grade = avg >= 90 ? "A" : avg >= 80 ? "B" : avg >= 70 ? "C" : avg >= 60 ? "D" : "F";
  const gradeColor = { A:"#22c55e", B:"#84cc16", C:"#f59e0b", D:"#f97316", F:"#ef4444" }[grade];

  const addScore = () => {
    const v = parseFloat(input);
    if (isNaN(v) || v < 0 || v > 100) return;
    setScores(s => [...s, v]);
    setInput("");
  };

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <input type="number" min="0" max="100" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addScore()} placeholder="Score (0-100)" style={{flex:1,padding:"8px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#e2e8f0",fontSize:14,outline:"none",minWidth:0}}/>
        <button onClick={addScore} style={{padding:"8px 18px",borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#0891b2)",border:"none",color:"#fff",cursor:"pointer",fontWeight:700,flexShrink:0}}>Add</button>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
        {scores.map((s, i) => (
          <div key={i} style={{padding:"4px 12px",borderRadius:20,background:"rgba(255,255,255,0.06)",fontSize:13,color:"#94a3b8",display:"flex",alignItems:"center",gap:6}}>
            {s}
            <button onClick={() => setScores(sc => sc.filter((_, j) => j !== i))} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",padding:0,fontSize:14}}>×</button>
          </div>
        ))}
      </div>
      {scores.length > 0 && (
        <div style={{padding:"16px 20px",borderRadius:12,background:`${gradeColor}11`,border:`1px solid ${gradeColor}33`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:12,color:"#64748b",marginBottom:2}}>Average</div>
            <div style={{fontSize:28,fontWeight:900,color:gradeColor}}>{avg.toFixed(1)}%</div>
          </div>
          <div style={{fontSize:64,fontWeight:900,color:gradeColor,lineHeight:1}}>{grade}</div>
        </div>
      )}
    </div>
  );
}

function PaletteDemo() {
  const [colors, setColors] = useState([]);
  const [copied, setCopied] = useState(null);

  const randomHex = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  const generate = useCallback(() => setColors(Array.from({length:10}, randomHex)), []);

  useEffect(() => { generate(); }, [generate]);

  const copy = (c) => {
    navigator.clipboard?.writeText(c);
    setCopied(c);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:8,marginBottom:14}}>
        {colors.map((c, i) => (
          <div key={i} onClick={() => copy(c)} title={c} style={{aspectRatio:"1",borderRadius:10,background:c,cursor:"pointer",position:"relative",transition:"transform 0.15s",transform:copied===c?"scale(0.92)":"scale(1)",boxShadow:copied===c?`0 0 16px ${c}88`:"none"}}>
            {copied === c && (
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.45)",borderRadius:10,fontSize:18}}>✓</div>
            )}
          </div>
        ))}
      </div>
      <button onClick={generate} style={{width:"100%",padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",color:"#a78bfa",cursor:"pointer",fontWeight:600,fontSize:14}}>
        🎲 Randomize
      </button>
      {copied && <p style={{textAlign:"center",color:"#64748b",fontSize:12,marginTop:8}}>Copied {copied}!</p>}
    </div>
  );
}

function FetchDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const fetchUsers = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setUsers(data.slice(0, 4));
      setFetched(true);
    } catch (e) {
      setError("Failed to fetch. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!fetched && (
        <button onClick={fetchUsers} disabled={loading} style={{width:"100%",padding:"12px",borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#0891b2)",border:"none",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:15,marginBottom:14,opacity:loading?0.7:1}}>
          {loading ? "Fetching..." : "▶ Fetch Users from API"}
        </button>
      )}
      {error && <div style={{padding:"10px 14px",borderRadius:10,background:"#ef444422",border:"1px solid #ef444444",color:"#fca5a5",fontSize:13}}>{error}</div>}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {users.map((u, i) => (
          <div key={u.id} style={{padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",opacity:0,animation:`fadeIn 0.4s ease ${i*0.1}s forwards`}}>
            <style>{`@keyframes fadeIn{to{opacity:1}}`}</style>
            <div style={{fontWeight:700,fontSize:14,color:"#e2e8f0"}}>{u.name}</div>
            <div style={{fontSize:12,color:"#64748b",wordBreak:"break-all"}}>{u.email} · {u.company.name}</div>
          </div>
        ))}
      </div>
      {fetched && <button onClick={() => {setUsers([]);setFetched(false);}} style={{marginTop:10,width:"100%",padding:"8px",borderRadius:10,background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#64748b",cursor:"pointer",fontSize:13}}>Reset</button>}
    </div>
  );
}

const DEMOS = { todo:TodoDemo, counter:CounterDemo, grades:GradesDemo, palette:PaletteDemo, fetch:FetchDemo };

// ── Card ──────────────────────────────────────────────────────────
function PracticalCard({ q, lang, onOpen }) {
  const l = lang === "ar";
  const Demo = DEMOS[q.demo];

  return (
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"1.25rem 1.5rem",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10,gap:8,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:24}}>{q.icon}</span>
            <h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#e2e8f0",lineHeight:1.3}}>{q.title[lang]}</h3>
          </div>
          <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:q.difficultyColor+"22",color:q.difficultyColor,flexShrink:0}}>
            {q.difficulty[lang]}
          </span>
        </div>
        <p style={{margin:"0 0 12px",fontSize:13,color:"#64748b",lineHeight:1.5}}>{q.description[lang]}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {q.concepts.map(c => (
            <span key={c} style={{fontSize:11,padding:"2px 9px",borderRadius:20,background:"rgba(124,58,237,0.12)",color:"#a78bfa",fontWeight:600}}>{c}</span>
          ))}
        </div>
      </div>

      <div style={{padding:"1.25rem 1.5rem",flex:1}}>
        <div style={{fontSize:11,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12}}>
          {l ? "المطلوب ينتج عنه ↓" : "Expected Output ↓"}
        </div>
        <Demo />
      </div>

      <div style={{padding:"1rem 1.5rem",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <button
          onClick={() => onOpen(q)}
          style={{width:"100%",padding:"10px",borderRadius:12,background:"linear-gradient(135deg,rgba(124,58,237,0.2),rgba(8,145,178,0.2))",border:"1px solid rgba(124,58,237,0.3)",color:"#a78bfa",cursor:"pointer",fontWeight:700,fontSize:14,transition:"all 0.2s"}}
          onMouseOver={e => e.currentTarget.style.background="linear-gradient(135deg,rgba(124,58,237,0.35),rgba(8,145,178,0.35))"}
          onMouseOut={e => e.currentTarget.style.background="linear-gradient(135deg,rgba(124,58,237,0.2),rgba(8,145,178,0.2))"}
        >
          {l ? "← عرض الكود والخطوات" : "View Starter Code & Steps →"}
        </button>
      </div>
    </div>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────
function DetailModal({ q, lang, onClose }) {
  const l = lang === "ar";
  const Demo = DEMOS[q.demo];
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText(q.starterCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}
      onClick={onClose}
    >
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(10px)"}}/>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:"relative",width:"100%",maxWidth:900,maxHeight:"90vh",overflowY:"auto",
          background:"#0f0f1a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:24,
          display:"grid",
          gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",
          gap:0
        }}
      >
        <style>{`
          @media (max-width: 700px) {
            .modal-grid { grid-template-columns: 1fr !important; }
            .modal-left { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
          }
        `}</style>

        {/* left: steps + code */}
        <div className="modal-left" style={{padding:"1.5rem",borderRight:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:"1.5rem",flexWrap:"wrap"}}>
            <span style={{fontSize:28}}>{q.icon}</span>
            <div>
              <h2 style={{margin:0,fontSize:18,fontWeight:900,color:"#e2e8f0"}}>{q.title[lang]}</h2>
              <span style={{fontSize:11,fontWeight:700,color:q.difficultyColor}}>{q.difficulty[lang]}</span>
            </div>
          </div>

          <div style={{marginBottom:"1.5rem"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>{l?"الخطوات":"Steps"}</div>
            {q.steps[lang].map((step, i) => (
              <div key={i} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}>
                <span style={{minWidth:24,height:24,borderRadius:8,background:"rgba(124,58,237,0.2)",color:"#a78bfa",fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</span>
                <span style={{fontSize:13,color:"#94a3b8",lineHeight:1.5}}>{step}</span>
              </div>
            ))}
          </div>

          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontSize:11,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em"}}>{l?"كود البداية":"Starter Code"}</div>
              <button onClick={copyCode} style={{fontSize:12,padding:"3px 10px",borderRadius:6,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:copied?"#22c55e":"#64748b",cursor:"pointer"}}>
                {copied?"✓ Copied":"Copy"}
              </button>
            </div>
            <pre style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"1rem",fontSize:11.5,color:"#94a3b8",overflow:"auto",maxHeight:280,margin:0,lineHeight:1.65,fontFamily:"'Fira Code','Cascadia Code',monospace",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
              {q.starterCode}
            </pre>
          </div>
        </div>

        {/* right: live demo */}
        <div style={{padding:"1.5rem"}}>
          <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.06)",border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",color:"#64748b",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          <div style={{fontSize:11,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:16}}>{l?"النتيجة المطلوبة":"Target Output"}</div>
          <Demo />
          <div style={{marginTop:"1.5rem",padding:"12px 16px",borderRadius:12,background:"rgba(124,58,237,0.08)",border:"1px solid rgba(124,58,237,0.15)"}}>
            <p style={{margin:0,fontSize:12,color:"#7c3aed",lineHeight:1.6}}>
              💡 {l?"اكتب الكود في بيئتك الخاصة وقارن النتيجة بالـ demo أعلاه.":"Write your solution in your own environment and compare the result to the demo above."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function PracticalPage({ lang }) {
  const l = lang === "ar";
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const difficulties = ["all", ...[...new Set(practicalData.map(q => q.difficulty.en))]];
  const filtered = filter === "all" ? practicalData : practicalData.filter(q => q.difficulty.en === filter);

  const filterLabel = { all:l?"الكل":"All", Beginner:l?"مبتدئ":"Beginner", Intermediate:l?"متوسط":"Intermediate", Advanced:l?"متقدم":"Advanced" };
  const filterColor = { all:"#a78bfa", Beginner:"#22c55e", Intermediate:"#f59e0b", Advanced:"#ef4444" };

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem 1rem 5rem"}}>
      <style>{`
        .prac-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .prac-title { font-size: clamp(1.6rem, 5vw, 2.8rem); }
        @media (max-width: 600px) {
          .prac-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .prac-filters { gap: 6px !important; }
          .prac-filters button { font-size: 12px !important; padding: 5px 14px !important; }
        }
      `}</style>

      {/* header */}
      <div style={{textAlign:"center",marginBottom:"3rem"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(124,58,237,0.12)",border:"1px solid rgba(124,58,237,0.2)",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:700,color:"#a78bfa",marginBottom:16}}>
          ⚙️ {l?"أسئلة عملية":"Practical Exercises"}
        </div>
        <h1 className="prac-title" style={{fontWeight:900,margin:"0 0 12px",background:"linear-gradient(135deg,#a78bfa,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
          {l?"تحدّيات البرمجة العملية":"Practical Coding Challenges"}
        </h1>
        <p style={{color:"#64748b",fontSize:15,maxWidth:500,margin:"0 auto"}}>
          {l?"حل التحديات، شاهد النتيجة المطلوبة، وقارن كودك.":"Solve challenges, see the expected output, and compare your code."}
        </p>
      </div>

      {/* filters */}
      <div className="prac-filters" style={{display:"flex",gap:8,justifyContent:"center",marginBottom:"2.5rem",flexWrap:"wrap"}}>
        {difficulties.map(d => (
          <button key={d} onClick={() => setFilter(d)} style={{padding:"6px 18px",borderRadius:20,border:`1px solid ${filter===d?filterColor[d]:"rgba(255,255,255,0.1)"}`,background:filter===d?filterColor[d]+"22":"transparent",color:filter===d?filterColor[d]:"#64748b",cursor:"pointer",fontWeight:600,fontSize:13,transition:"all 0.2s"}}>
            {filterLabel[d]}
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="prac-grid">
        {filtered.map(q => (
          <PracticalCard key={q.id} q={q} lang={lang} onOpen={setSelected}/>
        ))}
      </div>

      {/* modal */}
      {selected && <DetailModal q={selected} lang={lang} onClose={() => setSelected(null)}/>}
    </div>
  );
}