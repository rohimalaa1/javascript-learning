import CodeBlock from "../components/CodeBlock";
import { DomTreeDiagram, CopyRefDiagram, ScopeDiagram } from "../components/Diagrams";

export default function LectureContent({ id, lang }) {
  const l = lang === "ar";
  const s = (en, ar) => l ? ar : en;

  const contents = {
    1: (
      <div>
        <h3 style={{color:"#7c3aed",marginBottom:8}}>{s("Copying by Reference","النسخ بالمرجع")}</h3>
        <p style={{marginBottom:12,lineHeight:1.8}}>{s("One of the fundamental differences between objects and primitives is how they are stored and copied. Primitives are copied by value — each variable gets its own independent copy. Objects are copied by reference — variables share the same memory address.","أحد الفروق الأساسية بين الكائنات والقيم الأولية هو كيفية تخزينها ونسخها. يتم نسخ القيم الأولية بالقيمة - كل متغير يحصل على نسخته المستقلة. أما الكائنات فيتم نسخها بالمرجع - المتغيرات تشترك في نفس عنوان الذاكرة.")}</p>
        <CopyRefDiagram/>
        <CodeBlock code={`// Primitives — copy by value\nlet a = 5;\nlet b = a; // b gets its own copy\nb = 10;\nconsole.log(a); // 5 — unchanged\n\n// Objects — copy by reference\nlet user = { name: "John" };\nlet admin = user; // same reference!\nadmin.name = "Pete";\nconsole.log(user.name); // "Pete" — changed!`}/>
        <h3 style={{color:"#7c3aed",marginTop:24,marginBottom:8}}>{s("Cloning Objects","استنساخ الكائنات")}</h3>
        <p style={{marginBottom:12,lineHeight:1.8}}>{s("To create a truly independent copy, use Object.assign() or the spread operator for a shallow clone. For a deep clone (nested objects), use structuredClone() or JSON.parse(JSON.stringify()).","لإنشاء نسخة مستقلة حقيقية، استخدم Object.assign() أو عامل الانتشار للنسخ السطحي. للنسخ العميق (الكائنات المتداخلة)، استخدم structuredClone() أو JSON.parse(JSON.stringify()).")}</p>
        <CodeBlock code={`// Shallow clone\nlet clone = Object.assign({}, user);\nlet clone2 = { ...user };\n\n// Deep clone (modern)\nlet deepClone = structuredClone(user);\n\n// Deep clone (classic)\nlet deepClone2 = JSON.parse(JSON.stringify(user));`}/>
      </div>
    ),
    2: (
      <div>
        <h3 style={{color:"#0891b2",marginBottom:8}}>{s("Object Methods","توابع الكائنات")}</h3>
        <p style={{marginBottom:12,lineHeight:1.8}}>{s("Functions stored as object properties are called methods. Inside a method, 'this' refers to the object the method belongs to. Arrow functions don't have their own 'this' — they inherit it from the surrounding scope.","الدوال المخزنة كخصائص للكائن تسمى توابع. داخل التابع، تشير 'this' إلى الكائن الذي ينتمي إليه التابع. دوال الأسهم لا تمتلك 'this' خاصًا بها - فهي ترثه من النطاق المحيط.")}</p>
        <CodeBlock code={`const user = {\n  name: "John",\n  age: 30,\n  greet() {\n    return \`Hi, I am \${this.name}!\`;\n  },\n  // Arrow fn: this = outer scope\n  greetArrow: () => "No this access!"\n};\nconsole.log(user.greet()); // "Hi, I am John!"`}/>
        <h3 style={{color:"#0891b2",marginTop:24,marginBottom:8}}>{s("Object.keys / values / entries","Object.keys / values / entries")}</h3>
        <CodeBlock code={`const obj = { a: 1, b: 2, c: 3 };\nObject.keys(obj);    // ["a","b","c"]\nObject.values(obj);  // [1, 2, 3]\nObject.entries(obj); // [["a",1],["b",2],["c",3]]\n\n// Merge objects\nconst merged = Object.assign({}, obj1, obj2);\nconst merged2 = { ...obj1, ...obj2 }; // spread`}/>
      </div>
    ),
    3: (
      <div>
        <h3 style={{color:"#059669",marginBottom:8}}>{s("Array Methods Deep Dive","غوص عميق في توابع المصفوفات")}</h3>
        <p style={{marginBottom:12,lineHeight:1.8}}>{s("Arrays are ordered collections. JavaScript provides powerful built-in methods for manipulating them. Understanding splice vs slice, find vs filter, and sort behavior is crucial for any JS developer.","المصفوفات مجموعات مرتبة. توفر JavaScript توابع مدمجة قوية لمعالجتها. فهم splice مقابل slice، وfind مقابل filter، وسلوك sort أمر حاسم لأي مطور JS.")}</p>
        <CodeBlock code={`const arr = ["a","b","c","d"];\n\n// splice — mutates original\narr.splice(1, 2, "X", "Y"); // ["a","X","Y","d"]\n\n// slice — returns new array\nconst sub = arr.slice(1, 3); // ["X","Y"]\n\n// find vs filter\nconst users = [{id:1,name:"John"},{id:2,name:"Pete"}];\nusers.find(u => u.id === 1);    // {id:1,name:"John"}\nusers.filter(u => u.id < 3);    // both users\n\n// sort — default is string-based!\n[1,15,2].sort();           // [1,15,2] ← wrong!\n[1,15,2].sort((a,b)=>a-b); // [1,2,15] ← correct`}/>
        <h3 style={{color:"#059669",marginTop:24,marginBottom:8}}>{s("concat, join, split","concat, join, split")}</h3>
        <CodeBlock code={`const a = [1,2], b = [3,4];\na.concat(b);        // [1,2,3,4]\n[...a,...b];        // same with spread\n\n["a","b","c"].join("-");  // "a-b-c"\n"a-b-c".split("-");       // ["a","b","c"]`}/>
      </div>
    ),
    5: (
      <div>
        <h3 style={{color:"#d97706",marginBottom:8}}>{s("Functions & Scope","الدوال والنطاق")}</h3>
        <ScopeDiagram/>
        <CodeBlock code={`// Function Declaration (hoisted)\nfunction greet(name = "World") {\n  return \`Hello, \${name}!\`;\n}\n\n// Function Expression (not hoisted)\nconst add = function(a, b) { return a + b; };\n\n// Arrow Function\nconst multiply = (a, b) => a * b;\n\n// Closure\nfunction counter() {\n  let count = 0;\n  return () => ++count; // remembers count\n}\nconst inc = counter();\ninc(); // 1\ninc(); // 2`}/>
        <h3 style={{color:"#d97706",marginTop:24,marginBottom:8}}>{s("Hoisting","الرفع")}</h3>
        <CodeBlock code={`// var is hoisted (declaration only)\nconsole.log(x); // undefined (not error)\nvar x = 5;\n\n// let/const: Temporal Dead Zone\nconsole.log(y); // ReferenceError!\nlet y = 10;\n\n// Function declarations fully hoisted\nsayHi(); // works!\nfunction sayHi() { console.log("Hi!"); }`}/>
      </div>
    ),
    6: (
      <div>
        <h3 style={{color:"#dc2626",marginBottom:8}}>{s("How the JS Engine Works","كيف يعمل محرك JavaScript")}</h3>
        <p style={{marginBottom:12,lineHeight:1.8}}>{s("JavaScript is single-threaded. The engine first parses your code into an AST (Abstract Syntax Tree), then compiles it to bytecode, and finally executes it. The Call Stack tracks function calls; the Event Loop handles async callbacks.","JavaScript أحادية الخيط. يُحلّل المحرك أولًا كودك إلى شجرة تركيبية (AST)، ثم يُجمّعه إلى رمز ثنائي، وأخيرًا ينفّذه. يتتبع Call Stack استدعاءات الدوال؛ وEvent Loop يتعامل مع callbacks غير المتزامنة.")}</p>
        <CodeBlock code={`// Execution Context\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nconsole.log("3");\n// Output: 1, 3, 2\n// setTimeout goes to callback queue!`}/>
        <h3 style={{color:"#dc2626",marginTop:24,marginBottom:8}}>{s("Strict Mode","الوضع الصارم")}</h3>
        <CodeBlock code={`"use strict";\n\n// ✓ Prevents undeclared variables\nx = 5; // ReferenceError!\n\n// ✓ Prevents deleting variables\ndelete x; // SyntaxError!\n\n// ✓ 'this' in global fn = undefined\nfunction fn() {\n  console.log(this); // undefined (not window)\n}`}/>
      </div>
    ),
    7: (
      <div>
        <h3 style={{color:"#7c3aed",marginBottom:8}}>{s("What is the DOM?","ما هو DOM؟")}</h3>
        <p style={{marginBottom:12,lineHeight:1.8}}>{s("The Document Object Model (DOM) is the browser's tree-like representation of an HTML page. JavaScript can read, create, update, and delete any element through the document object.","نموذج كائن المستند (DOM) هو تمثيل المتصفح الشجري لصفحة HTML. يمكن لـ JavaScript قراءة أي عنصر أو إنشاؤه أو تحديثه أو حذفه من خلال الكائن document.")}</p>
        <DomTreeDiagram/>
        <h3 style={{color:"#7c3aed",marginTop:24,marginBottom:8}}>{s("Selecting Elements","تحديد العناصر")}</h3>
        <CodeBlock code={`// By ID (fastest)\nconst el = document.getElementById("myId");\n\n// By CSS selector\nconst first = document.querySelector(".box"); // first match\nconst all = document.querySelectorAll("p");   // NodeList\n\n// By class / tag\ndocument.getElementsByClassName("item");  // live HTMLCollection\ndocument.getElementsByTagName("div");     // live HTMLCollection`}/>
        <h3 style={{color:"#7c3aed",marginTop:24,marginBottom:8}}>{s("DOM Traversal","التنقل في DOM")}</h3>
        <CodeBlock code={`el.parentNode;           // parent\nel.children;             // element children only\nel.firstElementChild;    // first child element\nel.nextElementSibling;   // next sibling element\nel.previousElementSibling; // previous sibling`}/>
      </div>
    ),
    8: (
      <div>
        <h3 style={{color:"#0891b2",marginBottom:8}}>{s("Modifying Elements","تعديل العناصر")}</h3>
        <CodeBlock code={`// Content\nel.textContent = "Safe text"; // XSS-safe\nel.innerHTML = "<b>Bold</b>"; // allows HTML (careful!)\n\n// Attributes\nel.setAttribute("href", "https://...");  \nel.getAttribute("data-id");\n\n// Classes\nel.classList.add("active");\nel.classList.remove("hidden");\nel.classList.toggle("open");\nel.classList.contains("open"); // boolean\n\n// Styles\nel.style.color = "red";\nel.style.fontSize = "18px";`}/>
        <h3 style={{color:"#0891b2",marginTop:24,marginBottom:8}}>{s("Event Handling","معالجة الأحداث")}</h3>
        <CodeBlock code={`// Add listener\nbtn.addEventListener("click", function(event) {\n  event.preventDefault();   // stop default\n  event.stopPropagation();  // stop bubbling\n  console.log(event.target);\n});\n\n// Remove listener (must be same reference!)\nbtn.removeEventListener("click", handler);\n\n// Event Delegation\nlist.addEventListener("click", (e) => {\n  if (e.target.matches(".item")) {\n    console.log("Item:", e.target.textContent);\n  }\n});`}/>
        <h3 style={{color:"#0891b2",marginTop:24,marginBottom:8}}>{s("Creating & Removing Elements","إنشاء وحذف العناصر")}</h3>
        <CodeBlock code={`// Create\nconst div = document.createElement("div");\ndiv.textContent = "Hello World";\ndocument.getElementById("app").appendChild(div);\n\n// Remove\nparent.removeChild(child);\nchild.remove(); // modern shorthand\n\n// Insert before\nparent.insertBefore(newEl, referenceEl);`}/>
        <h3 style={{color:"#0891b2",marginTop:24,marginBottom:8}}>{s("Quick DOM Reference","مرجع DOM السريع")}</h3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{background:"#0891b222"}}>
                {[s("Method","الطريقة"),s("Returns","يُعيد"),s("Use Case","حالة الاستخدام")].map((h,i)=><th key={i} style={{padding:"8px 12px",textAlign:l?"right":"left",color:"#0891b2",borderBottom:"1px solid #0891b244"}}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[["getElementById(id)","Element",s("Unique ID","معرف فريد")],["querySelector(css)","Element",s("First match","أول تطابق")],["querySelectorAll(css)","NodeList",s("All matches","كل التطابقات")],["createElement(tag)","Element",s("New element","عنصر جديد")],["appendChild(node)","Node",s("Add child","إضافة ابن")],["removeChild(node)","Node",s("Remove child","حذف ابن")]].map((r,i)=>(
                <tr key={i} style={{borderBottom:"1px solid rgba(8,145,178,0.1)",background:i%2===0?"transparent":"rgba(8,145,178,0.03)"}}>
                  {r.map((c,j)=><td key={j} style={{padding:"7px 12px",fontFamily:j<2?"monospace":"inherit",fontSize:j<2?12:13,textAlign:l && j===2?"right":"left",color:j===0?"#0891b2":undefined}}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  };

  return contents[id] || <p>{s("Content for this lecture is coming soon.","محتوى هذه المحاضرة قريبًا.")}</p>;
}