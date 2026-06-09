import { useState } from "react";

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const kw = ["const","let","var","function","return","if","else","for","while","of","in","new","true","false","null","undefined","this","class","import","export","from","=>","async","await","typeof","instanceof","delete"];
  const builtins = ["document","window","console","Math","Object","Array","JSON","String","Number","Boolean","Promise","fetch","setTimeout","clearTimeout","addEventListener","querySelector","querySelectorAll","getElementById","getElementsByClassName","createElement","appendChild","removeChild","classList","textContent","innerHTML","setAttribute","getAttribute","parseInt","parseFloat","isNaN","alert","prompt"];

  let html = code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const placeholders = [];
  let idx = 0;
  const ph = s => { const k=`\x01PH${idx++}PH\x01`; placeholders.push([k,s]); return k; };

  html = html.replace(/(\/\/[^\n]*)/g, m => ph(`<span style="color:#6a9955;font-style:italic">${m}</span>`));
  html = html.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, m => ph(`<span style="color:#ce9178">${m}</span>`));
  html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, m => ph(`<span style="color:#b5cea8">${m}</span>`));
  builtins.forEach(b => { const r=new RegExp(`\\b(${b})\\b`,"g"); html=html.replace(r,m=>ph(`<span style="color:#4ec9b0">${m}</span>`)); });
  kw.forEach(k => { const r=new RegExp(`(?<![\\w])(${k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})(?![\\w])`,"g"); html=html.replace(r,m=>ph(`<span style="color:#569cd6;font-weight:600">${m}</span>`)); });
  placeholders.reverse().forEach(([k,v]) => { html=html.split(k).join(v); });

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css"/>
      <style>{`
        .code-block-wrap { position: relative; margin: 0.75rem 0; }
        .code-copy-btn {
          position: absolute; top: 10px; right: 10px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px; padding: 4px 10px;
          color: #64748b; cursor: pointer; font-size: 12px;
          display: flex; align-items: center; gap: 4px;
          transition: all 0.2s; opacity: 0;
        }
        .code-block-wrap:hover .code-copy-btn { opacity: 1; }
        .code-copy-btn.copied { color: #22c55e; border-color: #22c55e44; }
        @media (max-width: 600px) {
          .code-copy-btn { opacity: 1 !important; }
          .code-block pre { font-size: 12px !important; padding: 0.85rem 1rem !important; }
        }
      `}</style>

      <div className="code-block-wrap code-block">
        <button className={`code-copy-btn${copied?" copied":""}`} onClick={copy} aria-label="Copy code">
          <i className={`ti ${copied ? "ti-check" : "ti-copy"}`} style={{fontSize:13}} aria-hidden="true"/>
          {copied ? "Copied" : "Copy"}
        </button>
        <pre style={{background:"#1e1e2e",borderRadius:10,padding:"1rem 1.25rem",overflowX:"auto",fontSize:13,lineHeight:1.7,margin:0,border:"1px solid rgba(255,255,255,0.08)"}}>
          <code dangerouslySetInnerHTML={{__html:html}}/>
        </pre>
      </div>
    </>
  );
}