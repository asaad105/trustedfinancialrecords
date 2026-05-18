import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection({ liaisonImage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={liaisonImage}
          alt="Clarity and intelligence through financial expertise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-accent text-sm font-medium tracking-[0.25em] uppercase block mb-6"
        >
          No Pressure. Just a Conversation.
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-tight mb-8"
        >
          Let's start with
          <br />
          a real conversation.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-primary-foreground/70 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Book a free discovery call with our team. No sales pressure, no commitment — 
          just 30 minutes to understand your business and see if we're the right fit for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            to="/book"
            className="group inline-flex items-center gap-3 bg-accent text-primary px-10 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-accent/90 transition-all duration-300"
          >
            Book Your Free Discovery Call
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
