'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface PhoneMockupProps {
  image: string;
  alt: string;
  delay?: number;
}

export function PhoneMockup({ image, alt, delay = 0 }: PhoneMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative mx-auto"
      style={{ width: '280px', height: '570px' }}
    >
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] shadow-2xl p-3">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 scale-95" />
    </motion.div>
  );
}
