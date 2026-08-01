'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, Calendar, ShieldCheck } from 'lucide-react';
import { content } from '@/content/ar';

const iconMap = {
  lock: Lock,
  'check-circle': CheckCircle,
  'shield-check': ShieldCheck,
  shield: Shield,
  calendar: Calendar,
};

export function Trust() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
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
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-orange-600 rounded-3xl mb-6 shadow-2xl shadow-primary/30"
            >
              <Shield className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {content.trust.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.trust.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {content.trust.steps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-6 left-6 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8"
          >
            {content.trust.badges.map((badge, index) => {
              const Icon = iconMap[badge.icon as keyof typeof iconMap];
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-semibold text-gray-700 text-sm">{badge.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
