export function DomTreeDiagram() {
  return (
    <div style={{overflowX:"auto",margin:"1rem 0"}}>
      <svg width="100%" viewBox="0 0 600 280" style={{minWidth:320,maxWidth:600,display:"block"}}>
        <defs>
          <marker id="arr-dom" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
          </marker>
        </defs>

        {[
          {x:250,y:20, w:100,h:36, label:"document", c:"#7c3aed"},
          {x:170,y:100,w:90, h:36, label:"<html>",   c:"#0891b2"},
          {x:90, y:180,w:80, h:36, label:"<head>",   c:"#059669"},
          {x:200,y:180,w:80, h:36, label:"<body>",   c:"#059669"},
          {x:40, y:250,w:70, h:30, label:"<title>",  c:"#d97706"},
          {x:130,y:250,w:70, h:30, label:"<meta>",   c:"#d97706"},
          {x:240,y:250,w:60, h:30, label:"<div>",    c:"#d97706"},
          {x:330,y:250,w:60, h:30, label:"<p>",      c:"#d97706"},
        ].map((n,i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={8} fill={n.c+"22"} stroke={n.c} strokeWidth={1}/>
            <text x={n.x+n.w/2} y={n.y+n.h/2} textAnchor="middle" dominantBaseline="central" style={{fontSize:12,fill:n.c,fontWeight:600,fontFamily:"monospace"}}>
              {n.label}
            </text>
          </g>
        ))}

        {[
          [300,56,215,100],
          [215,136,130,180],
          [215,136,240,180],
          [130,216,75,250],
          [130,216,165,250],
          [240,216,270,250],
          [240,216,360,250],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7c3aed" strokeWidth={1} strokeDasharray="4 2" opacity={0.6}/>
        ))}
      </svg>
    </div>
  );
}

export function CopyRefDiagram() {
  return (
    <div style={{overflowX:"auto",margin:"1rem 0"}}>
      <svg width="100%" viewBox="0 0 580 200" style={{minWidth:300,maxWidth:580,display:"block"}}>
        {/* Primitives */}
        <g>
          <rect x={20} y={20} width={240} height={80} rx={10} fill="#0891b2" fillOpacity={0.1} stroke="#0891b2" strokeWidth={1}/>
          <text x={140} y={38} textAnchor="middle" style={{fontSize:12,fill:"#0891b2",fontWeight:700}}>Primitives (copy by value)</text>
          {[{x:40,y:55,label:"a = 5"},{x:140,y:55,label:"b = 5"}].map((b,i) => (
            <g key={i}>
              <rect x={b.x} y={b.y} width={70} height={30} rx={6} fill="#0891b2" fillOpacity={0.2} stroke="#0891b2" strokeWidth={1}/>
              <text x={b.x+35} y={b.y+15} textAnchor="middle" dominantBaseline="central" style={{fontSize:11,fill:"#0891b2",fontFamily:"monospace"}}>
                {b.label}
              </text>
            </g>
          ))}
          <text x={140} y={95} textAnchor="middle" style={{fontSize:10,fill:"#6b7280"}}>Independent copies</text>
        </g>

        {/* Objects */}
        <g>
          <rect x={300} y={20} width={260} height={160} rx={10} fill="#dc2626" fillOpacity={0.08} stroke="#dc2626" strokeWidth={1}/>
          <text x={430} y={38} textAnchor="middle" style={{fontSize:12,fill:"#dc2626",fontWeight:700}}>Objects (copy by reference)</text>
          {[{x:310,y:55,label:"user"},{x:400,y:55,label:"admin"}].map((b,i) => (
            <g key={i}>
              <rect x={b.x} y={b.y} width={70} height={30} rx={6} fill="#dc2626" fillOpacity={0.15} stroke="#dc2626" strokeWidth={1}/>
              <text x={b.x+35} y={b.y+15} textAnchor="middle" dominantBaseline="central" style={{fontSize:11,fill:"#dc2626",fontFamily:"monospace"}}>
                {b.label}
              </text>
            </g>
          ))}
          <rect x={390} y={120} width={100} height={50} rx={8} fill="#7c3aed" fillOpacity={0.15} stroke="#7c3aed" strokeWidth={1}/>
          <text x={440} y={140} textAnchor="middle" style={{fontSize:11,fill:"#7c3aed"}}>{"{ name:'John' }"}</text>
          <text x={440} y={158} textAnchor="middle" style={{fontSize:10,fill:"#7c3aed",opacity:0.7}}>same object</text>
          <line x1={345} y1={85} x2={420} y2={120} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="3 2"/>
          <line x1={435} y1={85} x2={440} y2={120} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="3 2"/>
        </g>
      </svg>
    </div>
  );
}

export function ScopeDiagram() {
  return (
    <div style={{overflowX:"auto",margin:"1rem 0"}}>
      <svg width="100%" viewBox="0 0 560 220" style={{minWidth:300,maxWidth:560,display:"block"}}>
        {/* Global */}
        <rect x={10} y={10} width={540} height={200} rx={14} fill="#7c3aed" fillOpacity={0.06} stroke="#7c3aed" strokeWidth={1.5}/>
        <text x={30} y={35} style={{fontSize:11,fill:"#7c3aed",fontWeight:700}}>Global Scope</text>

        {/* Function */}
        <rect x={30} y={45} width={220} height={150} rx={10} fill="#0891b2" fillOpacity={0.1} stroke="#0891b2" strokeWidth={1}/>
        <text x={50} y={65} style={{fontSize:11,fill:"#0891b2",fontWeight:700}}>Function Scope</text>

        {/* Block */}
        <rect x={50} y={75} width={180} height={100} rx={8} fill="#059669" fillOpacity={0.1} stroke="#059669" strokeWidth={1}/>
        <text x={70} y={95} style={{fontSize:11,fill:"#059669",fontWeight:700}}>Block Scope {"{}"}</text>
        <text x={70} y={118} style={{fontSize:10,fill:"#059669",fontFamily:"monospace"}}>let / const</text>
        <text x={50} y={165} style={{fontSize:10,fill:"#0891b2",fontFamily:"monospace"}}>var (fn-scoped)</text>
        <text x={30} y={185} style={{fontSize:10,fill:"#7c3aed",fontFamily:"monospace"}}>global variables</text>

        {/* Closure */}
        <rect x={300} y={45} width={220} height={150} rx={10} fill="#d97706" fillOpacity={0.1} stroke="#d97706" strokeWidth={1}/>
        <text x={320} y={65} style={{fontSize:11,fill:"#d97706",fontWeight:700}}>Closure</text>
        <text x={320} y={90} style={{fontSize:10,fill:"#d97706"}}>Inner fn retains</text>
        <text x={320} y={107} style={{fontSize:10,fill:"#d97706"}}>reference to outer</text>
        <text x={320} y={124} style={{fontSize:10,fill:"#d97706"}}>scope variables</text>
        <path d="M 300 120 Q 260 120 260 90" fill="none" stroke="#d97706" strokeWidth={1} strokeDasharray="4 2"/>
      </svg>
    </div>
  );
}