import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SplashProvider, useSplash } from "./context/SplashContext";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { SplashQuote } from "./Components/SplashQuote";

function AppContent() {
  const { showSplash, isVisible, setShowSplash, setIsVisible } = useSplash();

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setShowSplash(false), 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash, setIsVisible, setShowSplash]);

  return (
    <div className="app">
      {showSplash && <SplashQuote isVisible={isVisible} />}
      
      <div className={`transition-opacity duration-300 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SplashProvider>
      <AppContent />
    </SplashProvider>
  );
}