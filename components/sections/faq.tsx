'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { content } from '@/content/ar';
import { cn } from '@/lib/utils';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-32 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {content.faq.title}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {content.faq.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white rounded-xl p-6 text-right hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <ChevronDown
                    className={cn(
                      'w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0',
                      openIndex === index && 'rotate-180'
                    )}
                  />
                  <h3 className="text-xl font-bold flex-1">
                    {item.question}
                  </h3>
                </div>
                
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    openIndex === index
                      ? 'grid-rows-[1fr] opacity-100 mt-4'
                      : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
