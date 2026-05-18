import { motion } from 'framer-motion';

export default function ConversationStep({ question, answer, index, isActive, onAnswer, options }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8"
    >
      {/* Question */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-accent text-xs font-semibold">{index + 1}</span>
        </div>
        <p className="font-heading text-lg md:text-xl text-foreground leading-relaxed">{question}</p>
      </div>

      {/* Answer / Input */}
      {isActive && options && (
        <div className="ml-9 space-y-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onAnswer(opt.value)}
              className="block w-full text-left px-5 py-3 border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300 text-sm text-muted-foreground hover:text-foreground"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {answer && (
        <div className="ml-9">
          <span className="inline-block bg-accent/10 text-accent px-4 py-2 text-sm font-medium">
            {answer}
          </span>
        </div>
      )}
    </motion.div>
  );
}
