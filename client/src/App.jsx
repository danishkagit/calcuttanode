import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Loader from './components/common/Loader'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Tools from './pages/Tools'
import Courses from './pages/Courses'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

/* ============================================================
   APP — Top-level layout + routing
   Shows Navbar + Footer on every page except Dashboard
   ============================================================ */

export default function App() {
  const { loading } = useAuth()

  // Show a full-screen loader while checking auth status
  if (loading) return <Loader fullScreen />

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global navigation — visible on all public pages */}
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard — has its own layout, no Navbar/Footer */}
          <Route path="/dashboard/*" element={<Dashboard />} />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer on all public pages (hidden when on dashboard) */}
      <Footer />
    </div>
  )
}
