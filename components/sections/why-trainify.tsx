'use client';

import { motion } from 'framer-motion';
import { Trophy, MessageCircle, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { content } from '@/content/ar';

const iconMap = {
  trophy: Trophy,
  'message-circle': MessageCircle,
  'shield-check': ShieldCheck,
  zap: Zap,
};

export function WhyTrainify() {
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
            {content.whyTrainify.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.whyTrainify.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            const isFeatured = feature.icon === 'shield-check';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className={`
                  h-full hover:shadow-xl transition-all duration-300
                  ${
                    isFeatured
                      ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 scale-105'
                      : ''
                  }
                `}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`
                      inline-flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform
                      ${
                        isFeatured
                          ? 'w-20 h-20 bg-primary/20'
                          : 'w-16 h-16 bg-primary/10'
                      }
                    `}>
                      <Icon className={`text-primary ${
                        isFeatured ? 'w-10 h-10' : 'w-8 h-8'
                      }`} />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    {isFeatured && (
                      <div className="pt-2">
                        <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                          الأهم
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
