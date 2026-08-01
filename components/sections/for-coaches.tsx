'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { content } from '@/content/ar';
import { Users, Zap, Target, DollarSign } from 'lucide-react';

const iconMap = {
  users: Users,
  zap: Zap,
  target: Target,
  'dollar-sign': DollarSign,
};

export function ForCoaches() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <Users className="w-10 h-10" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {content.forCoaches.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {content.forCoaches.benefits.map((benefit, index) => {
                const Icon = iconMap[benefit.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-50 hover:scale-105 shadow-2xl"
            >
              {content.forCoaches.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
