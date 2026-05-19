import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';


const NOTIFICATION_EMAIL = 'trustedfinancialofficial@gmail.com';

const sendInquiryNotification = async (inquiryData) => {
  const lines = [
    'New contact inquiry received.',
    '',
    `Full name: ${inquiryData.full_name || ''}`,
    `Email: ${inquiryData.email || ''}`,
    `Phone: ${inquiryData.phone || ''}`,
    `Company: ${inquiryData.company_name || ''}`,
    `Message: ${inquiryData.message || ''}`,
  ];

  const body = lines.join('\n');

  const subject = `New Contact Inquiry: ${inquiryData.full_name || 'Contact'}`;

  const payloads = [
    { to: NOTIFICATION_EMAIL, subject, text: body },
    { to: [NOTIFICATION_EMAIL], subject, text: body },
    { to: NOTIFICATION_EMAIL, subject, body },
    { to: [NOTIFICATION_EMAIL], subject, body },
    { to: NOTIFICATION_EMAIL, subject, message: body },
  ];

  for (const payload of payloads) {
    try {
      await base44.integrations.Core.SendEmail(payload);
      return true;
    } catch (error) {
      if (error?.status !== 422) {
        console.error('Inquiry email notification failed', error);
        return false;
      }
    }
  }

  return false;
};


export default function Contact() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      await base44.entities.Inquiry.create(form);
      const notificationSent = await sendInquiryNotification(form);

      if (!notificationSent) {
        console.warn('Inquiry saved but email notification failed');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Inquiry submission failed', error);
      setSubmitError('We could not submit your message right now. Please try again or email us directly at info@trustedfinr.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-[0.25em] uppercase block mb-4">
            Contact Us
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6">
            We'd love to
            <br />
            hear from you.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you have a question about our services, need a custom quote, 
            or just want to explore how we can help — our team is ready.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
                <h3 className="font-heading text-2xl font-semibold mb-3">Message Received</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thank you for reaching out. A member of our team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={form.full_name}
                      onChange={(e) => handleChange('full_name', e.target.value)}
                      className="bg-transparent border-border focus:border-accent h-12"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="bg-transparent border-border focus:border-accent h-12"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
                      Phone
                    </label>
                    <Input
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-transparent border-border focus:border-accent h-12"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
                      Company
                    </label>
                    <Input
                      value={form.company_name}
                      onChange={(e) => handleChange('company_name', e.target.value)}
                      className="bg-transparent border-border focus:border-accent h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
                    Message *
                  </label>
                  <Textarea
                    required
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="bg-transparent border-border focus:border-accent min-h-[140px]"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                {submitError && (
                  <p className="text-sm text-destructive">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-primary-foreground px-10 py-4 text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-heading text-lg font-semibold mb-6">Direct Contact</h3>
              <div className="space-y-5">
                <a href="tel:+14035128898" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                    <Phone size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                    <p className="text-sm font-medium">+1 (403) 512-8898</p>
                  </div>
                </a>
                <a href="mailto:info@trustedfinr.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                    <Mail size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                    <p className="text-sm font-medium">info@trustedfinr.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Office</p>
                    <p className="text-sm font-medium">166 Sherwood Mount NW<br />Calgary, AB T3R0G5</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center">
                    <Clock size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Business Hours</p>
                    <p className="text-sm font-medium">Mon – Fri: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="font-heading text-lg font-semibold mb-3">Prefer a Call?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Schedule a complimentary consultation and speak directly with a senior financial specialist.
              </p>
              <a
                href="/book"
                className="text-accent text-sm font-medium tracking-wide uppercase hover:underline"
              >
                Book a Consultation →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
