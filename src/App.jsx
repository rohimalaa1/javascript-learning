import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LecturePage from "./pages/LecturePage";
import QuizzesPage from "./pages/QuizzesPage";
import SummaryPage from "./pages/SummaryPage";
import PracticalPage from "./pages/PracticalPage";

export default function App() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState({ name:"home", id:null, tab:null });

  const navigate = (name, id=null, tab=null) => setPage({name,id,tab});

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const bgStyle = {
    minHeight:"100vh",
    background:dark?"#09090f":"#f8fafc",
    color:dark?"#e2e8f0":"#1e293b",
    fontFamily:"'Inter','Segoe UI',sans-serif",
  };

  return (
    <div style={bgStyle}>
      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} navigate={navigate} currentPage={page.name}/>
      <main>
        {page.name === "home"      && <HomePage lang={lang} navigate={navigate}/>}
        {page.name === "lectures"  && <HomePage lang={lang} navigate={navigate}/>}
        {page.name === "lecture"   && <LecturePage id={page.id} lang={lang} navigate={navigate}/>}
        {page.name === "quizzes"   && <QuizzesPage lang={lang} navigate={navigate}/>}
        {page.name === "summary"   && <SummaryPage lang={lang}/>}
        {page.name === "practical" && <PracticalPage lang={lang}/>}
      </main>
     <Footer lang={lang} dark={dark}/>
    </div>
  );
}