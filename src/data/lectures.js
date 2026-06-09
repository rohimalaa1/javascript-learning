const lectures = [
  {
    id: 1,
    badge: "Objects I",
    color: "#7c3aed",
    title: { en: "Objects & References", ar: "الكائنات والمراجع" },
    sub: { en: "Copy by value vs reference", ar: "النسخ بالقيمة مقابل المرجع والـ Heap" },
    tags: ["objects", "references", "clone"],
    content: {
      ar: `### 1. المقدمة: ما هو الكائن (Object)؟
في جافاسكربت، تنقسم البيانات إلى أنواع بدائية (Primitive) تخزن قيمة واحدة، وكائنات (Objects) تخزن مجموعات من البيانات المرتبطة على شكل مفتاح وقيمة \`key: value\`.

### 2. النسخ بالقيمة مقابل المرجع (Copy by Value vs Reference)
* **الأنواع البدائية:** تُنسخ قيمتها بالكامل في الـ **Stack**. تغيير النسخة لا يؤثر على الأصل.
* **الكائنات:** لا يُنسخ الكائن نفسه، بل يُنسخ **عنوانه في الذاكرة (Reference)** في الـ **Heap**. لذلك، إذا قمت بتعديل النسخة، يتأثر الكائن الأصلي فوراً لأن المتغيرين يشيران لنفس المكان.`,
    },
  },
  {
    id: 2,
    badge: "Objects II",
    color: "#0891b2",
    title: { en: "Object Methods & this", ar: "توابع الكائنات و this" },
    sub: { en: "Methods, this keyword, chaining", ar: "التوابع وسياق الاستدعاء الديناميكي والتسلسل" },
    tags: ["methods", "this", "prototype"],
    content: {
      ar: `### 1. ما هو التابع (Method)؟
التابع هو عبارة عن دالة (Function) يتم تخزينها كخاصية داخل الكائن لجعله يقوم بأفعال محددة.

### 2. الكلمة المفتاحية \`this\`
تعني الكائن الحالي الذي يقوم بتنفيذ التابع الآن. قيمتها ديناميكية وتتحدد لحظة الاستدعاء (Runtime evaluation). ودوال الأسهم (Arrow Functions) لا تملك \`this\` خاصة بها بل تجلبها من النطاق الخارجي.`,
    },
  },
  {
    id: 3,
    badge: "Arrays",
    color: "#059669",
    title: { en: "Arrays Deep Dive", ar: "الغوص في المصفوفات" },
    sub: { en: "splice, slice, sort, find, filter", ar: "القطع والتعديل وتصفية وتحويل البيانات بالـ Callbacks" },
    tags: ["arrays", "methods", "functional"],
    content: {
      ar: `### 1. ما هي المصفوفة؟
المصفوفة هي قائمة مرتبة من القيم تبدأ من index = 0، ويمكنها تخزين أي نوع من البيانات.
\`\`\`js
let arr = [1, "hello", true, { name: "Ali" }];
console.log(arr[0]); // 1
console.log(arr.length); // 4
\`\`\`

### 2. إضافة وحذف العناصر
\`\`\`js
let arr = [1, 2, 3];
arr.push(4);    // يضيف في الآخر   → [1,2,3,4]
arr.pop();      // يحذف من الآخر   → [1,2,3]
arr.unshift(0); // يضيف في الأول   → [0,1,2,3]
arr.shift();    // يحذف من الأول   → [1,2,3]
\`\`\`

### 3. الفرق بين splice و slice
\`\`\`js
// splice → يعدّل الأصل (Mutable)
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 2);
console.log(arr); // [1, 4, 5]

// slice → يرجع نسخة جديدة (Immutable)
let arr2 = [1, 2, 3, 4, 5];
let part = arr2.slice(1, 3);
console.log(part);  // [2, 3]
console.log(arr2);  // [1, 2, 3, 4, 5] ← لم يتغير
\`\`\`

### 4. البحث في المصفوفة
\`\`\`js
const arr = [10, 20, 30, 40];
arr.indexOf(20);            // 1
arr.includes(20);           // true
arr.find(n => n > 15);      // 20
arr.findIndex(n => n > 15); // 1
\`\`\`

### 5. map و filter و reduce
\`\`\`js
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);    // [2, 4, 6, 8]
const evens   = nums.filter(n => n % 2 === 0); // [2, 4]
const sum     = nums.reduce((acc, n) => acc + n, 0); // 10
\`\`\`

### 6. sort و reverse و join
\`\`\`js
const nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b); // تصاعدي
nums.sort((a, b) => b - a); // تنازلي

// ⚠️ بدون callback بيترتب كـ string!
[10, 9, 2].sort();               // [10, 2, 9] ← غلط!
[10, 9, 2].sort((a, b) => a - b); // [2, 9, 10] ← صح ✅
\`\`\`

### 7. every و some
\`\`\`js
const nums = [2, 4, 6];
nums.every(n => n % 2 === 0); // true ← كلهم even
nums.some(n => n > 5);        // true ← فيه واحد > 5
\`\`\``,
    },
  },
  {
    id: 5,
    badge: "Functions",
    color: "#d97706",
    title: { en: "Functions & Scope", ar: "الدوال والنطاق" },
    sub: { en: "Closures, hoisting, arrow fns", ar: "الإغلاق والرفع ودوال الأسهم" },
    tags: ["functions", "scope", "hoisting"],
    content: {
      ar: `### 1. ما هي الدالة ولماذا نستخدمها؟
الدالة هي كتلة كود قابلة لإعادة الاستخدام تنفّذ مهمة محددة. المبدأ الأساسي هو **DRY = Don't Repeat Yourself**.

### 2. Parameters vs Arguments
\`\`\`js
function calc(x, y) { return x + y; } // x, y = Parameters
calc(10, 5); // 10, 5 = Arguments
\`\`\`

### 3. Pass by Value
\`\`\`js
let x = 10;
function modify(value) { value = 99; }
modify(x);
console.log(x); // 10 ← لم يتغير!
\`\`\`

### 4. Default Parameters
\`\`\`js
function calc(p, r = 0.1) { return p * (1 + r); }
calc(1000);      // r = 0.1 تلقائياً
calc(1000, 0.2); // r = 0.2
\`\`\`

### 5. Hoisting
\`\`\`js
greet(); // ✅ يعمل قبل التعريف!
function greet() { console.log("Hello!"); }

sayHi(); // ❌ Error — Arrow Functions مش بتتعمل لها Hoisting
const sayHi = () => console.log("Hi");
\`\`\`

### 6. Scope و Variable Shadowing
\`\`\`js
let x = 10;
function test() {
  let x = 20; // يخبي الـ x الخارجي
  console.log(x); // 20
}
console.log(x); // 10 ← الخارجي ما اتأثرش
\`\`\`

### 7. Closures
\`\`\`js
function createCounter() {
  let count = 0;
  return () => { count++; return count; };
}
const counter = createCounter();
counter(); // 1
counter(); // 2 ← count لسه موجودة!
\`\`\`

### 8. Arrow Functions
\`\`\`js
() => alert('Hi')           // صفر arguments
n => n * 2                  // argument واحد
(a, b) => a + b             // implicit return
(a, b) => { return a + b; } // multiline
\`\`\``,
    },
  },
  {
    id: 6,
    badge: "JS Engine",
    color: "#dc2626",
    title: { en: "JS Engine & Strict Mode", ar: "محرك JS والوضع الصارم" },
    sub: { en: "How JS executes, strict mode", ar: "كيف ينفّذ JS الكود والوضع الصارم" },
    tags: ["engine", "execution", "strict"],
    content: {
      ar: `### 1. كيف يعمل محرك JavaScript؟
عند تشغيل أي ملف JS يمر بمرحلتين:

**مرحلة الإنشاء (Creation Phase):**
* يقرأ المحرك الكود كاملاً أولاً
* يرفع (Hoist) تعريفات الدوال والمتغيرات
* ينشئ الـ Global Execution Context

**مرحلة التنفيذ (Execution Phase):**
* ينفّذ الكود سطراً بسطر من أعلى لأسفل

### 2. Execution Context
\`\`\`js
// عند تشغيل هذا الكود:
let x = 10;
function greet() {
  let msg = "Hello";
  console.log(msg);
}
greet();

// المحرك ينشئ:
// 1. Global Execution Context (للكود الخارجي)
// 2. Function Execution Context (لكل دالة تُستدعى)
\`\`\`

### 3. Call Stack
الـ Call Stack هو المكان اللي المحرك بيتتبع فيه الدوال المنفّذة حالياً — **LIFO** (آخر داخل أول خارج):
\`\`\`js
function first() { second(); }
function second() { third(); }
function third() { console.log("done"); }

first();
// Call Stack:
// [third]  ← أعلى
// [second]
// [first]
// [global] ← أسفل
\`\`\`

### 4. Hoisting بالتفصيل
\`\`\`js
// var → بيتعمل له hoisting لكن قيمته undefined
console.log(x); // undefined (مش error!)
var x = 5;

// let/const → بيتعمل له hoisting لكن مش ممكن توصله (Temporal Dead Zone)
console.log(y); // ❌ ReferenceError
let y = 5;

// function declaration → hoisting كامل ✅
greet(); // "Hello"
function greet() { console.log("Hello"); }
\`\`\`

### 5. use strict — الوضع الصارم
\`\`\`js
"use strict"; // في أول الملف أو الدالة

// بيمنع:
x = 10;        // ❌ Error — لازم تعرّف المتغير أولاً
delete Object; // ❌ Error — مش ممكن تحذف built-ins

// بيجعل this = undefined في الدوال العادية
function show() {
  console.log(this); // undefined في strict mode
}
\`\`\`

### 6. Single-threaded و Synchronous
جافاسكربت **أحادية الخيط** — بتنفّذ سطر واحد في نفس الوقت بالترتيب:
\`\`\`js
console.log("1");
console.log("2");
console.log("3");
// Output: 1, 2, 3 — دايماً بالترتيب
\`\`\``,
    },
  },
  {
    id: 7,
    badge: "DOM I",
    color: "#6d28d9",
    title: { en: "DOM Fundamentals", ar: "أساسيات الـ DOM" },
    sub: { en: "Tree, nodes, selection", ar: "الشجرة والعقد والاختيار" },
    tags: ["DOM", "nodes", "querySelector"],
    content: {
      ar: `### 1. ما هو الـ DOM؟
DOM = **Document Object Model** — تمثيل المتصفح لصفحة HTML على شكل شجرة من الكائنات. جافاسكربت بتستخدمه عشان تعدّل المحتوى والشكل في الوقت الفعلي.

### 2. أنواع Nodes
\`\`\`
nodeType = 1 → Element Node  (<div>, <p>)
nodeType = 3 → Text Node     ("Hello")
nodeType = 8 → Comment Node  (<!-- -->)
nodeType = 9 → Document Node (document)
\`\`\`

### 3. اختيار العناصر
\`\`\`js
document.getElementById('myId');           // الأسرع ⚡
document.querySelector('.myClass');         // الأمثل ✅
document.querySelectorAll('p.highlight');  // كل المطابقين
document.getElementsByClassName('myClass'); // HTMLCollection (Live)
\`\`\`

| Method | يرجع | السرعة |
|--------|-------|--------|
| getElementById | عنصر واحد | ⚡⚡⚡ |
| querySelector | عنصر واحد | ⚡⚡ |
| querySelectorAll | NodeList | ⚡⚡ |
| getElementsByClassName | HTMLCollection | ⚡ |

### 4. خصائص الـ Node
\`\`\`js
const h1 = document.getElementById("header");
h1.nodeName;   // "H1"
h1.nodeType;   // 1
h1.nodeValue;  // null (للعناصر)

const text = h1.firstChild;
text.nodeName;  // "#text"
text.nodeValue; // النص الفعلي
\`\`\`

### 5. التنقل في الشجرة
\`\`\`js
el.parentNode
el.children                // الأبناء (elements فقط)
el.firstElementChild       // أول ابن element
el.lastElementChild        // آخر ابن element
el.nextElementSibling      // الأخ التالي
el.previousElementSibling  // الأخ السابق
\`\`\`
> ⚠️ استخدم **ElementChild** دايماً عشان تتجنب Text Nodes الفاضية!`,
    },
  },
  {
    id: 8,
    badge: "DOM II",
    color: "#0f766e",
    title: { en: "DOM Manipulation & Events", ar: "التعديل على الـ DOM والأحداث" },
    sub: { en: "Events, delegation, mini-projects", ar: "الأحداث والتفويض والمشاريع الصغيرة" },
    tags: ["events", "manipulation", "projects"],
    content: {
      ar: `### 1. تعديل المحتوى
\`\`\`js
el.innerHTML   // HTML كامل مع Tags — خطر XSS ⚠️
el.textContent // نص فقط — أسرع وأأمن ✅
el.innerText   // النص المرئي فقط (يتجاهل hidden)
\`\`\`

### 2. classList
\`\`\`js
el.classList.add('active')
el.classList.remove('active')
el.classList.toggle('active')
el.classList.contains('active') // true/false
el.classList.replace('old', 'new')
\`\`\`

### 3. Attributes
\`\`\`js
el.getAttribute('href')
el.setAttribute('src', 'img.jpg')
\`\`\`

### 4. إنشاء وحذف العناصر
\`\`\`js
const div = document.createElement('div');
div.textContent = 'Hello';
parent.appendChild(div);
parent.insertBefore(newNode, referenceNode);
parent.replaceChild(newNode, oldNode);
parent.removeChild(div);
const clone = el.cloneNode(true); // نسخة عميقة
\`\`\`

### 5. Events
\`\`\`js
btn.addEventListener('click', function(e) {
  e.preventDefault(); // يمنع السلوك الافتراضي
  console.log(e.target);
});

// إزالة الـ listener — لازم نفس الـ reference!
btn.removeEventListener('click', handlerFn);
\`\`\`

**أهم أنواع الأحداث:**
\`\`\`
click / mousedown / mouseover
keydown / keyup
submit / change / focus / blur
DOMContentLoaded / scroll / resize
\`\`\`

### 6. Event Delegation
بدل ما تحط listener على كل element، حطه على الـ parent:
\`\`\`js
const list = document.getElementById('list');
list.addEventListener('click', function(e) {
  if (e.target.classList.contains('item')) {
    console.log('Clicked:', e.target.textContent);
  }
});
\`\`\`
> ✅ أفضل في الأداء، وبيشتغل مع العناصر اللي بتتضاف ديناميكياً!

### 7. Event Bubbling و stopPropagation
\`\`\`js
// الحدث بيتصاعد من الابن للأب للجد...
child.addEventListener('click', function(e) {
  e.stopPropagation(); // يوقف التصاعد
});
\`\`\``,
    },
  },
];

export default lectures;