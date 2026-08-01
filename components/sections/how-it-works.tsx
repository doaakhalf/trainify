'use client';

import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { Users, UserCheck, ArrowLeft } from 'lucide-react';

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.03),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl mb-6 shadow-xl shadow-primary/20"
          >
            <ArrowLeft className="w-8 h-8 text-white rotate-180" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {content.howItWorks.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            خطوات بسيطة للبدء في رحلتك الرياضية
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {content.howItWorks.athlete.title}
              </h3>
            </div>
            <div className="space-y-5">
              {content.howItWorks.athlete.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 group hover:bg-gray-50 p-4 rounded-2xl transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-orange-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-md group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-lg font-medium text-gray-700 leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <UserCheck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {content.howItWorks.coach.title}
              </h3>
            </div>
            <div className="space-y-5">
              {content.howItWorks.coach.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 group hover:bg-gray-50 p-4 rounded-2xl transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-orange-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-md group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-lg font-medium text-gray-700 leading-relaxed">{step.text}</p>
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
