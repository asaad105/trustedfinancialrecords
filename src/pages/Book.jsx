import { useState } from 'react';
import { motion } from 'framer-motion';
import AIConsultant from '../components/booking/AIConsultant';
import BookingForm from '../components/booking/BookingForm';

export default function Book() {
  const [conversationData, setConversationData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="text-accent text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Free Discovery Call
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6">
            30 minutes.
            <br />
            No pressure. Just us.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tell us a bit about your business below, or chat with our advisor Alexandra first. 
            Either way, the goal is simple — understand what you need and see if we're the right fit.
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 pb-24">
        {/* AI Consultant */}
        <div className="mb-12">
          <AIConsultant onConversationData={(data) => {
            setConversationData(data);
            setShowForm(true);
          }} />
        </div>

        {/* Booking Form */}
        <div>
          {!showForm ? (
            <div className="text-center py-8 border border-dashed border-border">
              <p className="text-sm text-muted-foreground mb-3">
                Prefer to skip the conversation?
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="text-accent text-sm font-medium tracking-wide uppercase hover:underline"
              >
                Go directly to Calendly →
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-2">Complete Your Booking</h2>
                <p className="text-muted-foreground text-sm">
                  Skip the extra form — continue to Calendly to pick your exact time and complete booking.
                </p>
              </div>
              <BookingForm conversationData={conversationData} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
