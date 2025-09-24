import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Donate from './pages/Donate';
import News from './pages/News';
import Contact from './pages/Contact';
import Program from './pages/Program';
import Volunteer from './pages/Volunteer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/programs" element={<Program/>} />
        <Route path="/donate" element={<Donate/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/volunteer" element={<Volunteer/>} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;