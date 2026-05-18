import { motion } from 'framer-motion';

export default function LetterReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split('').map((char, ci) => (
            <motion.span
              key={`${wi}-${ci}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: delay + wi * 0.08 + ci * 0.03,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
