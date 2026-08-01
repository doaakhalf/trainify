'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { CoachCard } from '@/components/ui/coach-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CoachesPreviewProps {
  selectedGoal?: string | null;
}

export function CoachesPreview({ selectedGoal }: CoachesPreviewProps) {
  const [filteredCoaches, setFilteredCoaches] = useState(content.coaches.items);

  useEffect(() => {
    if (selectedGoal) {
      const filtered = content.coaches.items.filter((coach) =>
        coach.goals.includes(selectedGoal)
      );
      setFilteredCoaches(filtered.length > 0 ? filtered : content.coaches.items);
    } else {
      setFilteredCoaches(content.coaches.items);
    }
  }, [selectedGoal]);

  return (
    <section id="coaches-preview" className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.coaches.title}
          </h2>
          {selectedGoal && filteredCoaches.length < content.coaches.items.length && (
            <p className="text-lg text-gray-600">
              المدربين المتخصصين في هدفك
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCoaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CoachCard
                name={coach.name}
                specialty={coach.specialty}
                rating={coach.rating}
                subscribers={coach.subscribers}
                experience={coach.experience}
                price={coach.price}
                image={coach.image}
              />
            </motion.div>
          ))}
        </div>

        {filteredCoaches.length < content.coaches.items.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 mb-6">
              هنضيف مدربين أكتر قريبًا، تقدر تشوف باقي المدربين دلوقتي
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setFilteredCoaches(content.coaches.items)}
            >
              شوف كل المدربين
            </Button>
          </motion.div>
        )}

        {filteredCoaches.length === content.coaches.items.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button size="lg" className="group">
              {content.coaches.cta}
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
