import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LetterReveal from '../LetterReveal';

const tools = ['Xero', 'QuickBooks', 'Sage'];

const whyChooseUs = [
  'Xero Certified Specialist (Level 3)',
  'Migration Specialist',
  'Cloud accounting expertise',
  'AR & revenue cycle management',
  'GST/HST compliance',
];

const values = [
  {
    title: 'Clean Books Every Month',
    description: 'No backlogs, no scrambling at year-end. Your books are closed, reconciled, and ready for you by the same time each month — guaranteed.',
  },
  {
    title: 'Plain-English Reporting',
    description: 'We translate your financials into language you can actually act on. If a report needs a decoder ring, we haven\'t done our job.',
  },
  {
    title: 'Canadian-Specific Expertise',
    description: 'GST/HST, CRA compliance, SR&ED credits — we know the Canadian business landscape inside out, so you\'re never caught off guard at filing time.',
  },
  {
    title: 'A Discovery Call, Not a Sales Pitch',
    description: 'Every engagement starts with a genuine conversation. We listen first, ask the right questions, and only move forward when we know we\'re the right fit.',
  },
];

export default function AboutSection({ valuesImage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Vision */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-accent text-sm font-medium tracking-[0.25em] uppercase block mb-4"
            >
              Our Vision
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-8">
              <LetterReveal text="We treat your books" />
              <br />
              <LetterReveal text="like they're our own." delay={0.7} />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              We built Trusted Financial to serve two communities we believe in deeply — 
              ambitious tech startups moving fast, and Canadian small business owners who 
              deserve the same quality of financial support as any enterprise. No jargon, 
              no surprises, no chasing your bookkeeper for answers.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Every new client starts with a warm discovery call — not a sales pitch. 
              We want to understand your business before we touch a single number. 
              That's the foundation every great financial relationship is built on.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 border border-border bg-secondary/40 p-5"
            >
              <p className="text-sm font-medium text-foreground mb-3">
                Certified in Xero (L1–L3 + Migration Specialist)
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Full-cycle accounting and structured financial reporting for growing businesses.
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className="border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <img
              src={valuesImage}
              alt="The visionary outlook of Trusted Financial"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 border border-accent/20" />
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-16 border border-border bg-secondary/30 p-6 md:p-8"
        >
          <span className="text-accent text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Why Choose Us
          </span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {whyChooseUs.map((reason) => (
              <div key={reason} className="border-t border-border pt-4">
                <p className="text-sm font-medium leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="border-t border-border pt-8"
            >
              <div className="flex items-start gap-4">
                <span className="text-accent font-heading text-sm tracking-wide mt-1">0{i + 1}</span>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
