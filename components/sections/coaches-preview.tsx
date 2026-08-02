'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { CoachCard } from '@/components/ui/coach-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Coach } from '@/lib/api';

interface CoachesPreviewProps {
  selectedGoal?: string | null;
  coaches?: Coach[];
}

export function CoachesPreview({ selectedGoal, coaches: apiCoaches }: CoachesPreviewProps) {
  // Use API coaches if available, otherwise fallback to content
  const initialCoaches = useMemo(() => {
    return apiCoaches && apiCoaches.length > 0 
      ? apiCoaches.map(coach => {
          // Fix image URL - prepend API base URL if relative path
          let imageUrl = '/placeholder-coach.jpg';
          if (coach.profileImage) {
            if (coach.profileImage.startsWith('http')) {
              imageUrl = coach.profileImage;
            } else {
              imageUrl = `https://promax-node-production-7c35.up.railway.app/${coach.profileImage}`;
            }
          }
          
          return {
            id: coach._id,
            name: coach.name,
            image: imageUrl,
            headline: coach.headline || 'مدرب معتمد',
            rating: coach.rating || 4.8,
            experience: coach.experience || 5,
            price: coach.price || 500,
            goals: coach.specialization || [],
            subscribers: coach.reviewCount || 0,
          };
        })
      : content.coaches.items;
  }, [apiCoaches]);

  const [filteredCoaches, setFilteredCoaches] = useState(initialCoaches);

  useEffect(() => {
    if (selectedGoal) {
      const filtered = initialCoaches.filter((coach) =>
        coach.goals.includes(selectedGoal)
      );
      setFilteredCoaches(filtered.length > 0 ? filtered : initialCoaches);
    } else {
      setFilteredCoaches(initialCoaches);
    }
  }, [selectedGoal, initialCoaches]);

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
                headline={coach.headline}
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
            <Button
              size="lg"
              className="group"
              onClick={() => {
                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {content.coaches.cta}
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
