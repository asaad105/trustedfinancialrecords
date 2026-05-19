import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/tfr-logo.svg';

const navLinks = [
{ label: 'Home', path: '/' },
{ label: 'Services', path: '/#services' },
{ label: 'About', path: '/#about' },
{ label: 'Testimonials', path: '/#testimonials' },
{ label: 'Contact', path: '/contact' }];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (path) => {
    if (path.includes('#')) {
      const id = path.split('#')[1];
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ?
      'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' :
      'bg-transparent'}`
      }>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Trusted Financial Records logo" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="font-heading text-lg font-semibold tracking-tight text-foreground">Trusted Financial Records</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase">
              
                {link.label}
              </Link>
            )}
            <Link
              to="/book"
              className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300">
              
              Book Consultation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground">
            
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
              
                  {link.label}
                </Link>
            )}
              <Link
              to="/book"
              className="block bg-primary text-primary-foreground px-6 py-3 text-center text-sm font-medium tracking-wide uppercase">
              
                Book Consultation
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}
