import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import LetterReveal from '../LetterReveal';

const services = [
  {
    title: 'Clean Monthly Bookkeeping',
    description: 'Your books, done right — every month without fail. We categorize transactions, reconcile accounts, and hand you tidy, accurate financials so you can focus on running your business.',
    features: ['Monthly transaction categorization', 'Bank & credit card reconciliation', 'Accounts payable & receivable', 'Month-end close & financial statements'],
  },
  {
    title: 'Clear Financial Reporting',
    description: 'Numbers only matter when you can read them. We deliver simple, plain-English reports that tell you exactly where your money is going and what it means for your growth.',
    features: ['Profit & loss statements', 'Cash flow summaries', 'Budget vs. actual analysis', 'Custom reports for investors or CRA'],
  },
  {
    title: 'Canadian Compliance & Tax Prep',
    description: 'GST/HST, T2 corporate returns, payroll remittances — we handle the uniquely Canadian side of your books so you\'re always CRA-ready and never caught off guard.',
    features: ['GST/HST filing & remittances', 'Payroll & T4 preparation', 'Corporate year-end support', 'SR&ED / R&D tax credit guidance'],
  },
];

export default function ServicesSection({ serviceImages }) {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-accent text-sm font-medium tracking-[0.25em] uppercase block mb-4"
            >
              Our Expertise
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              <LetterReveal text="Everything You Need," />
              <br />
              <LetterReveal text="Nothing You Don't." delay={0.6} />
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll(-1)}
              className="w-12 h-12 border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-12 h-12 border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 lg:px-12 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="min-w-[340px] md:min-w-[420px] snap-start flex-shrink-0 group"
          >
            <div className="relative h-72 overflow-hidden mb-6">
              <img
                src={serviceImages[i]}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-accent font-heading text-sm tracking-[0.2em] uppercase">
                0{i + 1}
              </span>
            </div>
            <h3 className="font-heading text-2xl font-semibold mb-3">{service.title}</h3>
            <p className="text-primary-foreground/70 text-base leading-relaxed mb-5">
              {service.description}
            </p>
            <ul className="space-y-2 mb-6">
              {service.features.map((f) => (
                <li key={f} className="text-sm text-primary-foreground/60 flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase group-hover:gap-3 transition-all duration-300"
            >
              Learn More <ArrowRight size={14} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
