import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
import SmartHubChat from './pages/SmartHubChat';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
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
         <Route path="/smarthub-chat" element={<SmartHubChat/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;