import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LetterReveal from '../LetterReveal';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm font-medium tracking-[0.25em] uppercase block mb-4"
          >
            Client Voices
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
            <LetterReveal text="Words That Carry Weight" />
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-heading text-xl sm:text-2xl md:text-3xl leading-relaxed text-muted-foreground">
            Coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
