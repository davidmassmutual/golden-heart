// client/src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Donate from './pages/Donate';
import News from './pages/News';
import Contact from './pages/Contact';
import Program from './pages/Program';
import Volunteer from './pages/Volunteer';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    // Load Smartsupp script
    const smartsuppScript = document.createElement('script');
    smartsuppScript.type = 'text/javascript';
    smartsuppScript.charset = 'utf-8';
    smartsuppScript.async = true;
    smartsuppScript.src = 'https://www.smartsuppchat.com/loader.js?';
    smartsuppScript.text = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = 'f12cab583210e0d1fc0834f9f53f193da2a47587';
    `;
    document.head.appendChild(smartsuppScript);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = 'Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a>';
    document.body.appendChild(noscript);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(smartsuppScript);
      document.body.removeChild(noscript);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Program />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;