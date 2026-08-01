'use client';

import { X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComparisonItem {
  without: string;
  with: string;
}

interface ComparisonTableProps {
  items: ComparisonItem[];
}

export function ComparisonTable({ items }: ComparisonTableProps) {
  return (
    <div className="grid gap-4 max-w-4xl mx-auto">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* Without Trainify */}
          <div className="relative bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-gray-700 leading-relaxed">{item.without}</p>
            </div>
          </div>

          {/* With Trainify */}
          <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/30 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-gray-900 font-medium leading-relaxed">{item.with}</p>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/5 blur-xl -z-10 rounded-2xl" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
