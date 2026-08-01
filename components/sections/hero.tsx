'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { content } from '@/content/ar';
import { Smartphone, Check, Apple } from 'lucide-react';
import Image from 'next/image';

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

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
              <a 
                href="https://apps.apple.com/eg/app/trainify/id6786225762"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  <Apple className="w-6 h-6" />
                  <div className="text-right">
                    <div className="text-xs opacity-90">حمّل من</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </div>
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.mrazzak.trainify"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-right">
                    <div className="text-xs opacity-70">حمّل من</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </div>
              </a>
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
