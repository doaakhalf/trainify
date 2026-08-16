'use client';

import { motion } from 'framer-motion';
import { content } from '@/content/ar';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {content.howItWorks.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-right">
              <h3 className="text-3xl font-bold text-primary">
                {content.howItWorks.athlete.title}
              </h3>
            </div>
            <div className="space-y-6">
              {content.howItWorks.athlete.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-orange-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-xl font-semibold text-gray-700">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-right">
              <h3 className="text-3xl font-bold text-primary">
                {content.howItWorks.coach.title}
              </h3>
            </div>
            <div className="space-y-6">
              {content.howItWorks.coach.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-orange-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-xl font-semibold text-gray-700">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
