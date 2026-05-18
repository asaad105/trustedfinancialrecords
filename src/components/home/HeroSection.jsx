import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LetterReveal from '../LetterReveal';

function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = target / 80;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Precision craftsmanship in financial stewardship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40" />
      </div>

      {/* Vertical grid lines */}
      <div className="absolute inset-0 hidden md:flex justify-between px-12 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-px bg-border/30 h-full" />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 md:py-0 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-accent text-sm font-medium tracking-[0.25em] uppercase">
              Bookkeeping for Tech Startups &amp; Canadian Small Businesses
            </span>
          </motion.div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-8">
            <LetterReveal text="Clean books." delay={0.4} />
            <br />
            <LetterReveal text="Clear answers." delay={1.0} />
            <br />
            <LetterReveal text="Real partnership." delay={1.6} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
          >
            Monthly bookkeeping and clear financial reporting for tech startups and 
            Canadian small businesses — delivered with warmth, precision, and a 
            discovery call that actually listens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Link
              to="/book"
              className="group bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase inline-flex items-center justify-center gap-3 hover:bg-primary/90 transition-all duration-300"
            >
              Book a Free Discovery Call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-foreground/20 text-foreground px-8 py-4 text-sm font-medium tracking-wide uppercase inline-flex items-center justify-center hover:bg-foreground/5 transition-all duration-300"
            >
              Explore Our Services
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="flex gap-12 md:gap-16"
          >
            <div>
              <div className="font-heading text-3xl md:text-4xl font-semibold text-accent">
                <AnimatedCounter target={150} suffix="+" />
              </div>
              <p className="text-sm text-muted-foreground mt-1 tracking-wide">Businesses Served</p>
            </div>
            <div className="w-px bg-border/50" />
            <div>
              <div className="font-heading text-3xl md:text-4xl font-semibold text-accent">
                <AnimatedCounter target={98} suffix="%" />
              </div>
              <p className="text-sm text-muted-foreground mt-1 tracking-wide">Client Retention</p>
            </div>
            <div className="w-px bg-border/50 hidden sm:block" />
            <div className="hidden sm:block">
              <div className="font-heading text-3xl md:text-4xl font-semibold text-accent">
                <AnimatedCounter target={100} suffix="%" />
              </div>
              <p className="text-sm text-muted-foreground mt-1 tracking-wide">Remote-Friendly</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
