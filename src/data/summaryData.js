const summaryData = [
  { key:"vars", title:{en:"Variables & Operators",ar:"المتغيرات والمعاملات"},
    items:[
      {label:"var",desc:{en:"Function-scoped, hoisted",ar:"نطاق دالة، مرفوع"}},
      {label:"let",desc:{en:"Block-scoped, not hoisted",ar:"نطاق كتلة، غير مرفوع"}},
      {label:"const",desc:{en:"Block-scoped, immutable binding",ar:"نطاق كتلة، ربط ثابت"}},
    ],
    code:`let x = 5;\nconst PI = 3.14;\nvar name = "JS";`
  },
  { key:"strings", title:{en:"String Methods",ar:"توابع النصوص"},
    items:[
      {label:".length",desc:{en:"Number of characters",ar:"عدد الأحرف"}},
      {label:".toUpperCase()",desc:{en:"Converts to uppercase",ar:"تحويل لحروف كبيرة"}},
      {label:".includes(str)",desc:{en:"Returns boolean",ar:"يُعيد boolean"}},
      {label:".split(sep)",desc:{en:"Splits to array",ar:"يقسّم إلى مصفوفة"}},
      {label:".trim()",desc:{en:"Removes whitespace",ar:"يزيل المسافات"}},
    ],
    code:`"hello".toUpperCase(); // HELLO\n"hello world".split(" "); // ["hello","world"]\n\`Hi \${name}!\`; // template literal`
  },
  { key:"arrays", title:{en:"Array Methods",ar:"توابع المصفوفات"},
    items:[
      {label:".push() / .pop()",desc:{en:"Add/remove from end",ar:"إضافة/حذف من النهاية"}},
      {label:".shift() / .unshift()",desc:{en:"Remove/add from start",ar:"حذف/إضافة من البداية"}},
      {label:".splice(i,n,...)",desc:{en:"Remove + insert at index",ar:"حذف وإدراج في موضع"}},
      {label:".slice(a,b)",desc:{en:"Returns sub-array (non-mutating)",ar:"يُعيد مصفوفة فرعية"}},
      {label:".filter(fn)",desc:{en:"Returns new array of matches",ar:"مصفوفة جديدة من التطابقات"}},
      {label:".find(fn)",desc:{en:"Returns first match",ar:"يُعيد أول تطابق"}},
      {label:".sort(fn)",desc:{en:"Sorts in place",ar:"يُرتّب في مكانه"}},
      {label:".concat(...)",desc:{en:"Joins arrays",ar:"يدمج المصفوفات"}},
    ],
    code:`arr.sort((a,b) => a - b); // numeric sort\narr.filter(x => x > 0);  // positive nums\narr.find(u => u.id === 1); // find object`
  },
  { key:"objects", title:{en:"Objects & JSON",ar:"الكائنات و JSON"},
    items:[
      {label:"Object.assign()",desc:{en:"Shallow copy / merge",ar:"نسخ سطحي / دمج"}},
      {label:"Object.keys()",desc:{en:"Array of keys",ar:"مصفوفة المفاتيح"}},
      {label:"Object.values()",desc:{en:"Array of values",ar:"مصفوفة القيم"}},
      {label:"JSON.stringify()",desc:{en:"Object → JSON string",ar:"كائن → نص JSON"}},
      {label:"JSON.parse()",desc:{en:"JSON string → Object",ar:"نص JSON → كائن"}},
    ],
    code:`const clone = {...original}; // spread\nconst {a, b} = obj; // destructuring\nJSON.parse(JSON.stringify(obj)); // deep clone`
  },
  { key:"functions", title:{en:"Functions",ar:"الدوال"},
    items:[
      {label:"Declaration",desc:{en:"Hoisted, callable before",ar:"مرفوعة، تُستدعى قبل التعريف"}},
      {label:"Expression",desc:{en:"Not hoisted",ar:"غير مرفوعة"}},
      {label:"Arrow fn",desc:{en:"No own this, concise",ar:"لا this خاص، مختصرة"}},
      {label:"Closure",desc:{en:"Remembers outer scope",ar:"تتذكر النطاق الخارجي"}},
    ],
    code:`const add = (a, b) => a + b;\nfunction greet(name = "World") {\n  return \`Hello \${name}!\`;\n}`
  },
  { key:"dom", title:{en:"DOM Selection",ar:"اختيار عناصر DOM"},
    items:[
      {label:"getElementById(id)",desc:{en:"Single element by ID",ar:"عنصر واحد بالمعرف"}},
      {label:"querySelector(css)",desc:{en:"First match",ar:"أول تطابق"}},
      {label:"querySelectorAll(css)",desc:{en:"NodeList of all matches",ar:"قائمة بجميع التطابقات"}},
      {label:".classList",desc:{en:"add/remove/toggle classes",ar:"إضافة/حذف/تبديل الفئات"}},
      {label:".textContent",desc:{en:"Set/get text safely",ar:"تعيين/قراءة النص بأمان"}},
    ],
    code:`const el = document.querySelector('.btn');\nel.classList.add('active');\nel.textContent = 'Clicked!';\nel.style.color = 'red';`
  },
  { key:"events", title:{en:"Events",ar:"الأحداث"},
    items:[
      {label:"addEventListener",desc:{en:"Attach event listener",ar:"إرفاق مستمع حدث"}},
      {label:"event.target",desc:{en:"Element that triggered event",ar:"العنصر الذي أطلق الحدث"}},
      {label:"event.preventDefault()",desc:{en:"Stop default action",ar:"إيقاف الإجراء الافتراضي"}},
      {label:"Event delegation",desc:{en:"Listen on parent",ar:"الاستماع على العنصر الأب"}},
    ],
    code:`btn.addEventListener('click', (e) => {\n  e.preventDefault();\n  console.log(e.target);\n});\n// Delegation:\nlist.addEventListener('click', e => {\n  if(e.target.matches('li')) handleClick(e);\n});`
  },
  { key:"conditionals", title:{en:"Conditionals & Loops",ar:"الشروط والحلقات"},
    items:[
      {label:"if / else if / else",desc:{en:"Branching logic",ar:"منطق التفرّع"}},
      {label:"switch",desc:{en:"Multi-case branching",ar:"تفرّع متعدد الحالات"}},
      {label:"for / while / do-while",desc:{en:"Iteration patterns",ar:"أنماط التكرار"}},
      {label:"for...of",desc:{en:"Iterate array values",ar:"تكرار قيم المصفوفة"}},
      {label:"for...in",desc:{en:"Iterate object keys",ar:"تكرار مفاتيح الكائن"}},
    ],
    code:`for (let i=0; i<arr.length; i++) { ... }\nfor (const item of arr) { ... }\nfor (const key in obj) { ... }\narr.forEach(item => console.log(item));`
  },
  { key:"misc", title:{en:"Hoisting · Strict Mode · Math",ar:"الرفع · الوضع الصارم · Math"},
    items:[
      {label:"var hoisting",desc:{en:"Declaration hoisted, value undefined",ar:"التعريف مرفوع، القيمة undefined"}},
      {label:"function hoisting",desc:{en:"Whole function hoisted",ar:"الدالة كاملة مرفوعة"}},
      {label:"'use strict'",desc:{en:"Enables strict parsing",ar:"يُفعّل التحليل الصارم"}},
      {label:"Math.round()",desc:{en:"Round to nearest integer",ar:"تقريب لأقرب صحيح"}},
      {label:"Math.random()",desc:{en:"0 to 1 float",ar:"عدد عشري من 0 إلى 1"}},
    ],
    code:`'use strict';\nconsole.log(foo); // undefined (var hoisted)\nvar foo = 5;\nMath.floor(Math.random() * 10);`
  },
];

export default summaryData;
