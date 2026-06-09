const practicalData = [
  {
    id: 1,
    title: { en: "Build a Todo List", ar: "أنشئ قائمة مهام" },
    difficulty: { en: "Beginner", ar: "مبتدئ" },
    difficultyColor: "#22c55e",
    icon: "✅",
    description: {
      en: "Create a fully functional Todo List using JavaScript. Users should be able to add, complete, and delete tasks.",
      ar: "أنشئ قائمة مهام كاملة باستخدام JavaScript. يجب أن يتمكن المستخدم من إضافة المهام وإتمامها وحذفها."
    },
    concepts: ["DOM Manipulation", "Event Listeners", "Arrays", "localStorage"],
    demo: "todo",
    steps: {
      en: ["Create an input field and Add button", "Listen for click/Enter to add task", "Render tasks as list items", "Add complete toggle and delete button"],
      ar: ["أنشئ حقل إدخال وزر إضافة", "استمع للنقر أو Enter لإضافة مهمة", "اعرض المهام كعناصر قائمة", "أضف زر الإتمام والحذف"]
    },
    starterCode: `// Todo List Starter
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

let todos = [];

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, i) => {
    // TODO: create list item for each todo
    // Each item should have: text, complete button, delete button
  });
}

addBtn.addEventListener('click', () => {
  // TODO: get input value, add to todos array, re-render
});

// TODO: also listen for Enter key on input`
  },
  {
    id: 2,
    title: { en: "Counter with History", ar: "عداد مع سجل" },
    difficulty: { en: "Beginner", ar: "مبتدئ" },
    difficultyColor: "#22c55e",
    icon: "🔢",
    description: {
      en: "Build a counter that tracks increment, decrement, and reset operations, showing a history log of all actions.",
      ar: "أنشئ عداداً يتتبع عمليات الزيادة والنقصان وإعادة الضبط، ويعرض سجلاً بجميع العمليات."
    },
    concepts: ["DOM Manipulation", "Event Listeners", "Arrays", "Template Literals"],
    demo: "counter",
    steps: {
      en: ["Create +, -, Reset buttons and display", "Update counter on each button click", "Log every action with timestamp", "Color the count red if negative"],
      ar: ["أنشئ أزرار + و - وإعادة ضبط وشاشة عرض", "حدّث العداد عند كل نقرة", "سجّل كل عملية مع الوقت", "لوّن العدد باللون الأحمر إذا كان سالباً"]
    },
    starterCode: `// Counter with History Starter
let count = 0;
let history = [];

const display = document.getElementById('count-display');
const historyList = document.getElementById('history-list');

function updateDisplay() {
  display.textContent = count;
  display.style.color = count < 0 ? '#ef4444' : '#a78bfa';
}

function logAction(action) {
  // TODO: add action + timestamp to history array and re-render
}

document.getElementById('increment').addEventListener('click', () => {
  // TODO: increment count, log action, update display
});

// TODO: add decrement and reset listeners`
  },
  {
    id: 3,
    title: { en: "Student Grade Calculator", ar: "حاسبة درجات الطلاب" },
    difficulty: { en: "Intermediate", ar: "متوسط" },
    difficultyColor: "#f59e0b",
    icon: "📊",
    description: {
      en: "Build a grade calculator that accepts student scores, computes the average, and displays a letter grade with color feedback.",
      ar: "أنشئ حاسبة درجات تقبل درجات الطلاب وتحسب المتوسط وتعرض التقدير الحرفي مع ألوان تعبيرية."
    },
    concepts: ["Arrays", "reduce()", "Conditionals", "DOM Manipulation"],
    demo: "grades",
    steps: {
      en: ["Accept multiple scores as input", "Calculate average using reduce()", "Map average to letter grade (A-F)", "Show colored badge based on grade"],
      ar: ["اقبل درجات متعددة كمدخلات", "احسب المتوسط باستخدام reduce()", "حوّل المتوسط إلى تقدير حرفي (A-F)", "اعرض شارة ملونة بناءً على التقدير"]
    },
    starterCode: `// Grade Calculator Starter
let scores = [];

function getLetterGrade(avg) {
  // TODO: return 'A' for 90+, 'B' for 80+, 'C' for 70+, 'D' for 60+, else 'F'
}

function calculateAndDisplay() {
  if (scores.length === 0) return;
  
  const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  // TODO: display average and letter grade with color
}

document.getElementById('add-score').addEventListener('click', () => {
  const val = parseFloat(document.getElementById('score-input').value);
  // TODO: validate (0-100), add to scores array, re-render list
});`
  },
  {
    id: 4,
    title: { en: "DOM Color Palette", ar: "لوحة ألوان DOM" },
    difficulty: { en: "Intermediate", ar: "متوسط" },
    difficultyColor: "#f59e0b",
    icon: "🎨",
    description: {
      en: "Create an interactive color palette generator that dynamically creates and modifies DOM elements with different colors and styles.",
      ar: "أنشئ مولّد لوحة ألوان تفاعلية تنشئ عناصر DOM وتعدّلها ديناميكياً بألوان وأنماط مختلفة."
    },
    concepts: ["createElement", "appendChild", "style", "Event Delegation"],
    demo: "palette",
    steps: {
      en: ["Generate grid of color swatches dynamically", "Use createElement and appendChild", "Click a swatch to copy its hex code", "Add a Randomize button to regenerate"],
      ar: ["أنشئ شبكة من عينات الألوان ديناميكياً", "استخدم createElement و appendChild", "انقر على العينة لنسخ كودها السداسي", "أضف زر تعشيشعي لإعادة التوليد"]
    },
    starterCode: `// Color Palette Starter
const grid = document.getElementById('color-grid');

function randomHex() {
  // TODO: return a random hex color string like '#a3f5c2'
}

function createSwatch(color) {
  const div = document.createElement('div');
  // TODO: set background color, size, border-radius, cursor
  // TODO: on click, copy color to clipboard and show tooltip
  return div;
}

function generatePalette(count = 12) {
  grid.innerHTML = '';
  // TODO: create 'count' swatches and append to grid
}

document.getElementById('randomize').addEventListener('click', () => generatePalette());
generatePalette();`
  },
  {
    id: 5,
    title: { en: "Fetch & Display Users", ar: "جلب وعرض المستخدمين" },
    difficulty: { en: "Advanced", ar: "متقدم" },
    difficultyColor: "#ef4444",
    icon: "🌐",
    description: {
      en: "Fetch user data from a public API and display it in a card grid with loading and error states.",
      ar: "اجلب بيانات المستخدمين من API عام واعرضها في شبكة بطاقات مع حالات التحميل والخطأ."
    },
    concepts: ["fetch()", "async/await", "Promises", "Error Handling", "DOM"],
    demo: "fetch",
    steps: {
      en: ["Show loading spinner while fetching", "fetch from JSONPlaceholder API", "Render each user as a card", "Handle network errors gracefully"],
      ar: ["اعرض مؤشر تحميل أثناء الجلب", "اجلب البيانات من JSONPlaceholder API", "اعرض كل مستخدم كبطاقة", "تعامل مع أخطاء الشبكة بشكل أنيق"]
    },
    starterCode: `// Fetch Users Starter
const container = document.getElementById('users-container');

async function fetchUsers() {
  container.innerHTML = '<p>Loading...</p>';
  
  try {
    // TODO: fetch from 'https://jsonplaceholder.typicode.com/users'
    // TODO: render each user as a card with name, email, company
  } catch (error) {
    // TODO: show error message in container
  }
}

function createUserCard(user) {
  // TODO: return a div with user.name, user.email, user.company.name
}

fetchUsers();`
  }
];

export default practicalData;
