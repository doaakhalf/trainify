'use client';

import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { ComparisonTable } from '@/components/ui/comparison-table';

export function WhyTrainifyComparison() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 !leading-tight max-w-4xl mx-auto">
            {content.comparison.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.comparison.subtitle}
          </p>
        </motion.div>

        <ComparisonTable items={content.comparison.items} />

        {/* Visual Separator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-8 py-4 rounded-full">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <p className="text-lg font-semibold text-gray-900">
              منصة تحميك وتحمي المدرب
            </p>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
