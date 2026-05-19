import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CalendarCheck2 } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/trustedfinancialofficial/30min';

export default function BookingForm({ onComplete = () => {} }) {
  const [redirecting, setRedirecting] = useState(false);

  const handleContinue = () => {
    setRedirecting(true);
    onComplete();
    window.location.assign(CALENDLY_URL);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border p-6 md:p-8 bg-card"
    >
      <div className="flex items-start gap-3 mb-4">
        <CalendarCheck2 className="w-5 h-5 text-accent mt-0.5" />
        <div>
          <h3 className="font-heading text-xl font-semibold mb-2">Complete Your Booking on Calendly</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You&apos;ll finish selecting your date and time directly on Calendly.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={redirecting}
        className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {redirecting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Redirecting...
          </>
        ) : (
          'Continue to Calendly'
        )}
      </button>
    </motion.div>
  );
}
