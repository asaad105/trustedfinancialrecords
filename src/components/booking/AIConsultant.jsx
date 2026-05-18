import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, User, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const SYSTEM_CONTEXT = `You are a bookkeeper and client advisor at Trusted Financial Records Company. Your name is Alexandra. You specialize in working with tech startups and Canadian small businesses.

Your personality: Warm, down-to-earth, genuinely curious. You speak like a knowledgeable friend who happens to be great with numbers — not like a salesperson or a chatbot. Use natural language, contractions, and a conversational tone. You care about getting the right fit, not closing a deal.

Your goal: Have a real, relaxed discovery conversation. Understand where the client is in their business, what's frustrating them about their finances, and what they actually need. Then gently guide them to book a discovery call using the form below.

Rules:
- Never mention you are AI. You are Alexandra, a real advisor.
- Keep responses concise (2-4 sentences max). Never lecture.
- Ask one question at a time. Be curious, not interrogative.
- Show genuine empathy — running a business is hard, and financial admin is often the last thing founders want to deal with.
- Reference relevant pain points naturally: messy books, GST/HST filing, CRA deadlines, MRR tracking, cash flow visibility, year-end scrambles, investor-ready reports.
- After 3-4 exchanges, warmly suggest booking the discovery call using the form below — framing it as a no-pressure 30-minute chat.
- For Canadian small business clients: mention GST/HST, T2 returns, payroll, CRA compliance.
- For tech startups: mention burn rate, revenue recognition, R&D/SR&ED credits, investor reporting.

Start with a warm, human opening — reference that you work with both startups and small Canadian businesses, and ask what brings them in today.`;

export default function AIConsultant({ onConversationData }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = async () => {
    setStarted(true);
    setLoading(true);

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: SYSTEM_CONTEXT + '\n\nThe client just opened the consultation page. Send your opening greeting.',
      response_json_schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          detected_service: { type: 'string' },
        },
      },
    });

    setMessages([{ role: 'assistant', content: response.message }]);
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const updatedMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(updatedMessages);
    setLoading(true);

    const conversationHistory = updatedMessages
      .map((m) => `${m.role === 'user' ? 'Client' : 'Alexandra'}: ${m.content}`)
      .join('\n');

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${SYSTEM_CONTEXT}\n\nConversation so far:\n${conversationHistory}\n\nRespond as Alexandra. If this is the 3rd or 4th client message, gently suggest they fill out the booking form below while expressing genuine interest in helping them further.`,
      response_json_schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          detected_service: {
            type: 'string',
            enum: ['bookkeeping', 'tax_preparation', 'financial_reporting', 'advisory', 'general'],
          },
          ready_to_book: { type: 'boolean' },
          conversation_summary: { type: 'string' },
        },
      },
    });

    setMessages((prev) => [...prev, { role: 'assistant', content: response.message }]);
    setLoading(false);

    if (response.ready_to_book && onConversationData) {
      onConversationData({
        service: response.detected_service,
        summary: response.conversation_summary,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-7 h-7 text-accent" />
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">
          Meet Your Financial Consultant
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed text-sm">
          Have a brief conversation with Alexandra, one of our senior consultants, to help us 
          understand your needs before scheduling your appointment.
        </p>
        <button
          onClick={startConversation}
          className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
        >
          Start Conversation
        </button>
      </motion.div>
    );
  }

  return (
    <div className="border border-border bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
          <span className="text-accent font-heading text-xs font-semibold">A</span>
        </div>
        <div>
          <p className="text-sm font-medium">Alexandra Chen</p>
          <p className="text-xs text-muted-foreground">Senior Financial Consultant</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-80 overflow-y-auto px-6 py-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-accent text-[10px] font-bold">A</span>
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={14} className="text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-accent text-[10px] font-bold">A</span>
            </div>
            <div className="bg-secondary px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
