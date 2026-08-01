'use client';

import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { PhoneMockup } from '@/components/ui/phone-mockup';

export function AppScreenshots() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.screenshots.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف كل مميزات التطبيق
          </p>
        </motion.div>

        <div className="space-y-32">
          {content.screenshots.items.map((screenshot, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Screenshot */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <PhoneMockup
                  image={screenshot.image}
                  alt={screenshot.title}
                  delay={0.2}
                />
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`space-y-6 ${
                  index % 2 === 1 ? 'lg:order-1 lg:text-left' : 'lg:text-right'
                } text-center`}
              >
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  {index + 1} / {content.screenshots.items.length}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {screenshot.title}
                </h3>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {screenshot.description}
                </p>

                {/* Decorative Element */}
                <div className="flex items-center gap-2 justify-center lg:justify-end">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <div className="w-8 h-1 bg-primary/50 rounded-full" />
                  <div className="w-4 h-1 bg-primary/30 rounded-full" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
