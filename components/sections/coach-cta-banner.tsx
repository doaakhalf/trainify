'use client';

import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CoachCTABanner() {
  return (
    <section className="bg-white py-6 lg:py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 p-6 lg:p-8 min-h-[120px] lg:min-h-[100px]">
            {/* Icon + Text */}
            <div className="flex items-start gap-3 lg:gap-4 flex-1 text-center lg:text-right w-full">
              {/* Icon - visible on all screens */}
              <div className="flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0">
                <UserPlus className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <h3 className="text-lg lg:text-2xl font-bold text-white mb-1 lg:mb-2 !leading-relaxed">
                  مدرب محترف؟ انضم إلى Trainify
                </h3>
                <p className="text-white/90 text-sm lg:text-base !leading-relaxed">
                  وصل بخدماتك للاعبين المناسبين وابدأ في تنمية عملائك.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/coach-signup" className="w-full lg:w-auto">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all shadow-lg w-full lg:w-auto group"
              >
                انضم كمدرب
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
