'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { content } from '@/content/ar';
import { Smartphone, Check } from 'lucide-react';

interface HeroProps {
  onGoalSelect?: (goalId: string) => void;
}

export function Hero({ onGoalSelect }: HeroProps = {}) {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(249,115,22,0.04),transparent_60%)]" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right space-y-8"
          >
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                {content.hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {content.hero.subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Button size="lg" className="group shadow-lg shadow-primary/20">
                <Smartphone className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                {content.hero.ctaPrimary}
              </Button>
              <Button size="lg" variant="secondary" className="shadow-md">
                {content.hero.ctaSecondary}
              </Button>
            </div>

            {/* Goal Selection */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center lg:text-right">
                {content.goals.title}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                {content.goals.items.map((goal) => (
                  <motion.button
                    key={goal.id}
                    onClick={() => {
                      if (onGoalSelect) {
                        onGoalSelect(goal.id);
                        // Scroll to coaches section
                        const coachesSection = document.querySelector('#coaches-preview');
                        if (coachesSection) {
                          coachesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-3 rounded-full font-medium text-sm transition-all duration-200 bg-white text-gray-700 border-2 border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                  >
                    <span className="ml-2">{goal.icon}</span>
                    {goal.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 pt-4">
              {content.hero.trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">{indicator}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phone Mockup - 20% smaller */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative" style={{ width: '240px' }}>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-[3rem] blur-3xl scale-110" />
              
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-2 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-3xl z-10" />
                
                {/* Screen */}
                <div className="aspect-[9/19] bg-white rounded-[2rem] overflow-hidden">
                  <div className="h-full bg-gradient-to-br from-primary/10 via-white to-primary/5 flex items-center justify-center p-6">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">Trainify</div>
                      <div className="text-sm text-gray-600">قريباً على المتاجر</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-text-secondary"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
