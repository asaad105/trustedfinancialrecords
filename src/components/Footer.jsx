import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/tfr-logo.svg';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Trusted Financial Records logo" className="h-14 w-auto rounded-md bg-white/10 p-1" />
            </div>
            <p className="text-primary-foreground/60 leading-relaxed mb-6 text-sm">
              Clean monthly books and clear reporting for tech startups and Canadian 
              small businesses. Every client relationship starts with a real discovery call — not a sales pitch.
            </p>
            <div className="w-16 h-px bg-accent/30" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.2em] uppercase mb-6 text-accent">
              Navigation
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services', path: '/#services' },
                { label: 'About Us', path: '/#about' },
                { label: 'Testimonials', path: '/#testimonials' },
                { label: 'Contact', path: '/contact' },
                { label: 'CEO Message', path: '/ceo-message' },
                { label: 'Book Consultation', path: '/book' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.2em] uppercase mb-6 text-accent">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+14035128898"
                className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <Phone size={16} className="text-accent" />
                +1 (403) 512-8898
              </a>
              <a
                href="mailto:info@trustedfinr.com"
                className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <Mail size={16} className="text-accent" />
                info@trustedfinr.com
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin size={16} className="text-accent mt-0.5" />
                <span>
                  166 Sherwood Mount NW
                  <br />
                  Calgary, AB T3R0G5
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Trusted Financial Records Company. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
