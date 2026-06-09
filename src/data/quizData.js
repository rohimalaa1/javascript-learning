const quizData = {
  1: [
    { type:"tf", q:{en:"Primitive values are copied by reference in JavaScript.",ar:"يتم نسخ القيم الأولية بالمرجع في JavaScript."}, ans:false },
    { type:"mcq", q:{en:"What does Object.assign({}, user) do?",ar:"ماذا يفعل Object.assign({}, user)؟"}, opts:[{en:"Deep clones user",ar:"نسخة عميقة"},{en:"Shallow clones user",ar:"نسخة سطحية"},{en:"Freezes user",ar:"تجميد user"},{en:"Deletes user",ar:"حذف user"}], correct:1 },
    { type:"tf", q:{en:"When objects are copied, the reference is copied, not the object itself.",ar:"عند نسخ الكائنات، يُنسخ المرجع وليس الكائن نفسه."}, ans:true },
    { type:"essay", q:{en:"Explain the difference between shallow and deep clone with an example.",ar:"اشرح الفرق بين النسخ السطحي والعميق مع مثال."} },
  ],
  2: [
    { type:"tf", q:{en:"The 'this' keyword inside a regular function refers to the global object in strict mode.",ar:"تشير كلمة 'this' داخل دالة عادية إلى الكائن العام في الوضع الصارم."}, ans:false },
    { type:"mcq", q:{en:"Which method merges multiple objects into one?",ar:"أي طريقة تدمج كائنات متعددة في كائن واحد؟"}, opts:[{en:"Object.merge()",ar:"Object.merge()"},{en:"Object.assign()",ar:"Object.assign()"},{en:"Object.combine()",ar:"Object.combine()"},{en:"Object.join()",ar:"Object.join()"}], correct:1 },
    { type:"tf", q:{en:"Object methods can access the object's own properties using 'this'.",ar:"يمكن لتوابع الكائن الوصول إلى خصائصه الخاصة باستخدام 'this'."}, ans:true },
    { type:"mcq", q:{en:"What does Object.entries(obj) return?",ar:"ماذا يُعيد Object.entries(obj)؟"}, opts:[{en:"Array of keys only",ar:"مصفوفة من المفاتيح فقط"},{en:"Array of values only",ar:"مصفوفة من القيم فقط"},{en:"Array of [key, value] pairs",ar:"مصفوفة من أزواج [مفتاح، قيمة]"},{en:"A new object",ar:"كائن جديد"}], correct:2 },
    { type:"essay", q:{en:"What is method chaining and why is it useful?",ar:"ما هو تسلسل الأساليب ولماذا هو مفيد؟"} },
  ],
  3: [
    { type:"mcq", q:{en:"Which array method removes elements and inserts new ones at a specific index?",ar:"أي طريقة مصفوفة تزيل العناصر وتُدرج عناصر جديدة في موضع معين؟"}, opts:[{en:"slice()",ar:"slice()"},{en:"splice()",ar:"splice()"},{en:"pop()",ar:"pop()"},{en:"shift()",ar:"shift()"}], correct:1 },
    { type:"tf", q:{en:"arr.sort() sorts numbers correctly by default.",ar:"يُرتّب arr.sort() الأرقام بشكل صحيح افتراضيًا."}, ans:false },
    { type:"mcq", q:{en:"What does arr.filter(fn) return?",ar:"ماذا يُعيد arr.filter(fn)؟"}, opts:[{en:"First matching element",ar:"العنصر الأول المطابق"},{en:"Index of match",ar:"فهرس التطابق"},{en:"New array of matching elements",ar:"مصفوفة جديدة من العناصر المطابقة"},{en:"Boolean",ar:"قيمة منطقية"}], correct:2 },
    { type:"tf", q:{en:"arr.map() modifies the original array.",ar:"arr.map() تعدّل المصفوفة الأصلية."}, ans:false },
    { type:"mcq", q:{en:"What is the result of [1,15,2].sort() without a callback?",ar:"ما ناتج [1,15,2].sort() بدون callback؟"}, opts:[{en:"[1,2,15]",ar:"[1,2,15]"},{en:"[1,15,2]",ar:"[1,15,2]"},{en:"[15,2,1]",ar:"[15,2,1]"},{en:"[2,15,1]",ar:"[2,15,1]"}], correct:1 },
    { type:"essay", q:{en:"What is the difference between arr.find() and arr.filter()?",ar:"ما الفرق بين arr.find() وarr.filter()؟"} },
  ],
  5: [
    { type:"tf", q:{en:"Function declarations are hoisted in JavaScript.",ar:"تعريفات الدوال يتم رفعها (hoisting) في JavaScript."}, ans:true },
    { type:"mcq", q:{en:"What is a closure?",ar:"ما هو الإغلاق (closure)؟"}, opts:[{en:"A function that closes the browser",ar:"دالة تغلق المتصفح"},{en:"A function that remembers its outer scope variables",ar:"دالة تتذكر متغيرات النطاق الخارجي"},{en:"A class method",ar:"طريقة كلاس"},{en:"A block of code",ar:"كتلة كود"}], correct:1 },
    { type:"tf", q:{en:"Arrow functions have their own 'this' binding.",ar:"لدوال الأسهم ربط 'this' خاص بها."}, ans:false },
    { type:"mcq", q:{en:"What happens when you access a 'let' variable before its declaration?",ar:"ماذا يحدث عند الوصول لمتغير let قبل تعريفه؟"}, opts:[{en:"Returns undefined",ar:"يُعيد undefined"},{en:"Returns null",ar:"يُعيد null"},{en:"ReferenceError",ar:"ReferenceError"},{en:"Returns 0",ar:"يُعيد 0"}], correct:2 },
    { type:"tf", q:{en:"var variables are function-scoped.",ar:"متغيرات var ذات نطاق دالة."}, ans:true },
    { type:"mcq", q:{en:"Which function syntax is hoisted completely?",ar:"أي صيغة دالة يتم رفعها بالكامل؟"}, opts:[{en:"Arrow function",ar:"دالة سهم"},{en:"Function expression",ar:"تعبير دالة"},{en:"Function declaration",ar:"تعريف دالة"},{en:"All of the above",ar:"كل ما سبق"}], correct:2 },
    { type:"essay", q:{en:"Describe hoisting with an example for var and let.",ar:"اشرح الرفع (hoisting) مع مثال لـ var وlet."} },
  ],
  6: [
    { type:"tf", q:{en:"JavaScript is a single-threaded language.",ar:"JavaScript لغة أحادية الخيط."}, ans:true },
    { type:"mcq", q:{en:"What phase comes before execution in the JS engine?",ar:"ما المرحلة التي تسبق التنفيذ في محرك JS؟"}, opts:[{en:"Parsing",ar:"التحليل"},{en:"Rendering",ar:"العرض"},{en:"Painting",ar:"الرسم"},{en:"Fetching",ar:"الجلب"}], correct:0 },
    { type:"tf", q:{en:"'use strict' prevents the use of undeclared variables.",ar:"'use strict' يمنع استخدام المتغيرات غير المُعلَنة."}, ans:true },
    { type:"mcq", q:{en:"What is the output of this code?\nconsole.log('1');\nsetTimeout(()=>console.log('2'),0);\nconsole.log('3');",ar:"ما ناتج هذا الكود؟\nconsole.log('1');\nsetTimeout(()=>console.log('2'),0);\nconsole.log('3');"}, opts:[{en:"1, 2, 3",ar:"1, 2, 3"},{en:"1, 3, 2",ar:"1, 3, 2"},{en:"2, 1, 3",ar:"2, 1, 3"},{en:"3, 1, 2",ar:"3, 1, 2"}], correct:1 },
    { type:"tf", q:{en:"The Call Stack follows LIFO order (Last In, First Out).",ar:"الـ Call Stack يتبع نظام LIFO (آخر داخل أول خارج)."}, ans:true },
    { type:"mcq", q:{en:"What is 'this' inside a regular function in strict mode?",ar:"ما قيمة 'this' داخل دالة عادية في الوضع الصارم؟"}, opts:[{en:"window",ar:"window"},{en:"document",ar:"document"},{en:"undefined",ar:"undefined"},{en:"null",ar:"null"}], correct:2 },
    { type:"essay", q:{en:"Explain what happens step-by-step when JavaScript runs a script file.",ar:"اشرح ما يحدث خطوة بخطوة عند تشغيل JavaScript لملف نصي."} },
  ],
  7: [
    { type:"tf", q:{en:"The document object is the entry point to the DOM.",ar:"الكائن document هو نقطة الدخول إلى DOM."}, ans:true },
    { type:"mcq", q:{en:"Which method returns ALL matching elements?",ar:"أي طريقة تُعيد جميع العناصر المطابقة؟"}, opts:[{en:"getElementById",ar:"getElementById"},{en:"querySelector",ar:"querySelector"},{en:"querySelectorAll",ar:"querySelectorAll"},{en:"getElement",ar:"getElement"}], correct:2 },
    { type:"tf", q:{en:"childNodes includes only element nodes, not text nodes.",ar:"childNodes تشمل عقد العناصر فقط، وليس عقد النص."}, ans:false },
    { type:"mcq", q:{en:"What is the nodeType of an Element node?",ar:"ما هو nodeType لعقدة العنصر؟"}, opts:[{en:"0",ar:"0"},{en:"1",ar:"1"},{en:"3",ar:"3"},{en:"9",ar:"9"}], correct:1 },
    { type:"tf", q:{en:"firstElementChild skips text nodes and returns only element nodes.",ar:"firstElementChild تتجاوز عقد النص وتُعيد عقد العناصر فقط."}, ans:true },
    { type:"mcq", q:{en:"Which property returns only element children (no text nodes)?",ar:"أي خاصية تُعيد الأبناء من نوع element فقط (بدون text nodes)؟"}, opts:[{en:"childNodes",ar:"childNodes"},{en:"children",ar:"children"},{en:"firstChild",ar:"firstChild"},{en:"nodeList",ar:"nodeList"}], correct:1 },
    { type:"essay", q:{en:"What is the difference between querySelector and getElementById?",ar:"ما الفرق بين querySelector وgetElementById؟"} },
  ],
  8: [
    { type:"tf", q:{en:"Event delegation uses a single listener on a parent to handle child events.",ar:"تفويض الأحداث يستخدم مستمعًا واحدًا على العنصر الأب للتعامل مع أحداث الأبناء."}, ans:true },
    { type:"mcq", q:{en:"Which property safely sets text without risking XSS?",ar:"أي خاصية تُعيّن النص بأمان دون تعريض النظام لـ XSS؟"}, opts:[{en:"innerHTML",ar:"innerHTML"},{en:"outerHTML",ar:"outerHTML"},{en:"textContent",ar:"textContent"},{en:"nodeValue",ar:"nodeValue"}], correct:2 },
    { type:"tf", q:{en:"removeEventListener requires the same function reference that was used in addEventListener.",ar:"removeEventListener يتطلب نفس مرجع الدالة المستخدم في addEventListener."}, ans:true },
    { type:"mcq", q:{en:"Which method is the modern shorthand to remove an element?",ar:"أي طريقة هي الاختصار الحديث لحذف عنصر؟"}, opts:[{en:"removeChild()",ar:"removeChild()"},{en:"deleteElement()",ar:"deleteElement()"},{en:"remove()",ar:"remove()"},{en:"destroy()",ar:"destroy()"}], correct:2 },
    { type:"tf", q:{en:"event.stopPropagation() prevents the event from bubbling up to parent elements.",ar:"event.stopPropagation() يمنع الحدث من الانتشار للعناصر الأب."}, ans:true },
    { type:"mcq", q:{en:"What does event.target refer to?",ar:"إلى ماذا يشير event.target؟"}, opts:[{en:"The element the listener is attached to",ar:"العنصر الذي يحمل الـ listener"},{en:"The element that triggered the event",ar:"العنصر الذي أطلق الحدث"},{en:"The parent element",ar:"العنصر الأب"},{en:"The document",ar:"الـ document"}], correct:1 },
    { type:"essay", q:{en:"Build a mental model of event bubbling. How does event.stopPropagation() work?",ar:"ابنِ نموذجًا ذهنيًا لفقاعات الأحداث. كيف يعمل event.stopPropagation()؟"} },
  ],
};

export default quizData;



