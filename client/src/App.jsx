import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SEOHead from './components/common/SEOHead';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Tools from './pages/Tools';
import Courses from './pages/Courses';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Work from './pages/Work';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Plans from './pages/Plans';
import AI from './pages/AI';
import MobileApp from './pages/MobileApp';
import SEOTools from './pages/SEOTools';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

function AnimatedPage({ children }) {
  return <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">{children}</motion.div>;
}

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      <SEOHead />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/blogs" element={<AnimatedPage><Blogs /></AnimatedPage>} />
            <Route path="/blogs/:slug" element={<AnimatedPage><BlogDetail /></AnimatedPage>} />
            <Route path="/tools" element={<AnimatedPage><Tools /></AnimatedPage>} />
            <Route path="/courses" element={<AnimatedPage><Courses /></AnimatedPage>} />
            <Route path="/pricing" element={<AnimatedPage><Pricing /></AnimatedPage>} />
            <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
            <Route path="/work" element={<AnimatedPage><Work /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
            <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
            <Route path="/dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
            <Route path="/dashboard/:section" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
            <Route path="/products" element={<AnimatedPage><Products /></AnimatedPage>} />
            <Route path="/plans" element={<AnimatedPage><Plans /></AnimatedPage>} />
            <Route path="/ai" element={<AnimatedPage><AI /></AnimatedPage>} />
            <Route path="/app" element={<AnimatedPage><MobileApp /></AnimatedPage>} />
            <Route path="/seo" element={<AnimatedPage><SEOTools /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}