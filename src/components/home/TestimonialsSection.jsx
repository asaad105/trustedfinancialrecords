import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import LetterReveal from '../LetterReveal';

const FALLBACK = [
  {
    quote: "I used to dread looking at my books. Now they're just... done, every month, on time. The discovery call was the most relaxed business conversation I'd had in years — they actually listened.",
    name: 'Layla Al-Rashidi',
    title: 'Owner, Al-Rashidi Consulting (Toronto, ON)',
    metric: 'GST filing stress — completely eliminated',
  },
  {
    quote: "As a SaaS founder, I needed someone who understood MRR, burn rate, and investor reporting — not just debits and credits. Trusted Financial got it immediately. Best hire we've made.",
    name: 'Kenji Nakamura',
    title: 'CEO, Loopstack (Vancouver, BC)',
    metric: '18 months of clean monthly closes',
  },
  {
    quote: "Their reports are the first financial documents I've ever actually read cover to cover. Plain language, no jargon. I finally understand my own business numbers.",
    name: 'Fatima Al-Mansouri',
    title: 'Founder, Brightpath Digital (Ottawa, ON)',
    metric: 'Year-end done in 3 days, not 3 weeks',
  },
  {
    quote: "Switching to Trusted Financial was the best decision I made last year. They understood my e-commerce business right away and made CRA season feel completely manageable.",
    name: 'Wei-Lin Chen',
    title: 'Owner, Horizon Goods (Calgary, AB)',
    metric: 'First clean year-end in 4 years',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState(FALLBACK);

  useEffect(() => {
    base44.entities.Testimonial.filter({ is_published: true }, '-created_date')
      .then(data => { if (data && data.length > 0) setTestimonials(data); })
      .catch(() => {}); // keep fallback on error
  }, []);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

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

        <div className="max-w-4xl mx-auto relative">
          <Quote className="absolute -top-4 -left-4 md:-left-8 w-12 h-12 md:w-16 md:h-16 text-accent/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-heading text-xl sm:text-2xl md:text-3xl leading-relaxed italic text-foreground mb-10">
                "{testimonials[current].quote}"
              </p>

              <div className="mb-3">
                <p className="font-heading text-lg font-semibold">{testimonials[current].name}</p>
                <p className="text-muted-foreground text-sm">{testimonials[current].title}</p>
              </div>
              {testimonials[current].metric && (
                <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-4 py-1.5 tracking-wide uppercase">
                  {testimonials[current].metric}
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground/5 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-accent w-6' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground/5 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
