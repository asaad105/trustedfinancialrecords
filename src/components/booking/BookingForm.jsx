import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { base44 } from '@/api/base44Client';


const NOTIFICATION_EMAIL = 'trustedfinancialofficial@gmail.com';

const sendConsultationNotification = async (appointmentData) => {
  const lines = [
    'New consultation request received.',
    '',
    `Full name: ${appointmentData.full_name || ''}`,
    `Email: ${appointmentData.email || ''}`,
    `Phone: ${appointmentData.phone || ''}`,
    `Company: ${appointmentData.company_name || ''}`,
    `Service interest: ${appointmentData.service_interest || ''}`,
    `Preferred date: ${appointmentData.preferred_date || ''}`,
    `Preferred time: ${appointmentData.preferred_time || ''}`,
    `Business challenge: ${appointmentData.business_challenge || ''}`,
    `Conversation summary: ${appointmentData.conversation_summary || ''}`,
    `Status: ${appointmentData.status || ''}`,
  ];

  const body = lines.join('\n');

  try {
    await base44.integrations.Core.SendEmail({
      to: NOTIFICATION_EMAIL,
      subject: `New Consultation Booking: ${appointmentData.full_name || 'Client'}`,
      text: body,
    });
  } catch (error) {
    console.error('Email notification failed', error);
  }
};


export default function BookingForm({ conversationData, onComplete = () => {} }) {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    preferred_date: null,
    preferred_time: '',
    business_challenge: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const appointmentData = {
      ...form,
      preferred_date: form.preferred_date ? format(form.preferred_date, 'yyyy-MM-dd') : undefined,
      service_interest: conversationData?.service || 'general',
      conversation_summary: conversationData?.summary || '',
      status: 'pending',
    };

    await base44.entities.Appointment.create(appointmentData);
    await sendConsultationNotification(appointmentData);
    setSubmitted(true);
    setSubmitting(false);
    onComplete();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
        <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
          Consultation Confirmed
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thanks, {form.full_name}! We'll be in touch within one business day to confirm your discovery call. 
          Come as you are — no prep needed, just an open conversation.
        </p>
      </motion.div>
    );
  }

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
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
            placeholder="John Mitchell"
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
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
            Phone Number
          </label>
          <Input
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="bg-transparent border-border focus:border-accent h-12"
            placeholder="(555) 000-0000"
          />
        </div>
        <div>
          <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
            Company Name
          </label>
          <Input
            value={form.company_name}
            onChange={(e) => handleChange('company_name', e.target.value)}
            className="bg-transparent border-border focus:border-accent h-12"
            placeholder="Acme Technologies"
          />
        </div>
      </div>

      {/* Date Picker */}
      <div>
        <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
          Preferred Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center gap-3 h-12 px-4 border border-border text-left text-sm text-muted-foreground hover:border-accent transition-colors">
              <CalendarIcon size={16} />
              {form.preferred_date ? format(form.preferred_date, 'MMMM d, yyyy') : 'Select a date'}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              className=""
              classNames={{}}
              mode="single"
              selected={form.preferred_date}
              onSelect={(d) => handleChange('preferred_date', d)}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Slots */}
      <div>
        <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-3 block">
          Preferred Time
        </label>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleChange('preferred_time', t)}
              className={`px-4 py-2 text-xs font-medium border transition-all duration-200 ${
                form.preferred_time === t
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-muted-foreground hover:border-foreground/30'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge */}
      <div>
        <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2 block">
          What's your biggest financial challenge right now?
        </label>
        <Textarea
          value={form.business_challenge}
          onChange={(e) => handleChange('business_challenge', e.target.value)}
          className="bg-transparent border-border focus:border-accent min-h-[100px]"
          placeholder="Tell us about your current situation..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting || !form.full_name || !form.email}
        className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Confirming...
          </>
        ) : (
          'Confirm Consultation'
        )}
      </button>
    </motion.form>
  );
}
