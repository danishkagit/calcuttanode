import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SEOHead from './components/common/SEOHead';
import FloatingActions from './components/common/FloatingActions';
import Loader from './components/common/Loader';

const Home = lazy(() => import('./pages/Home'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Tools = lazy(() => import('./pages/Tools'));
const Courses = lazy(() => import('./pages/Courses'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const Plans = lazy(() => import('./pages/Plans'));
const AI = lazy(() => import('./pages/AI'));
const MobileApp = lazy(() => import('./pages/MobileApp'));
const SEOTools = lazy(() => import('./pages/SEOTools'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
        <Suspense fallback={<Loader />}>
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
            <Route path="/work/:slug" element={<AnimatedPage><CaseStudy /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
            <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
            <Route path="/dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
            <Route path="/dashboard/:section" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
            <Route path="/products" element={<AnimatedPage><Products /></AnimatedPage>} />
            <Route path="/plans" element={<AnimatedPage><Plans /></AnimatedPage>} />
            <Route path="/ai" element={<AnimatedPage><AI /></AnimatedPage>} />
            <Route path="/app" element={<AnimatedPage><MobileApp /></AnimatedPage>} />
            <Route path="/seo" element={<AnimatedPage><SEOTools /></AnimatedPage>} />
            <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}