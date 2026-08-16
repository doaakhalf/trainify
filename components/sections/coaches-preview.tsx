'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { CoachCard } from '@/components/ui/coach-card';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Coach } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

interface CoachesPreviewProps {
  selectedGoal?: string | null;
  coaches?: Coach[];
}

export function CoachesPreview({ selectedGoal, coaches: apiCoaches }: CoachesPreviewProps) {
  const initialCoaches = useMemo(() => {
    if (apiCoaches && apiCoaches.length > 0) {
      return apiCoaches.map((coach) => ({
        id: coach._id,
        name: coach.name,
        image: resolveImageUrl(coach.profileImage),
        headline: coach.headline || 'مدرب معتمد',
        rating: coach.rating,
        experience: coach.experience || 0,
        price: coach.price || 0,
        goals: [] as string[],
        subscribers: coach.subscribers || 0,
      }));
    }

    return content.coaches.items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      headline: item.headline,
      rating: item.rating,
      experience: item.experience,
      price: item.price,
      goals: item.goals,
      subscribers: item.subscribers,
    }));
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
          {selectedGoal && filteredCoaches.length < initialCoaches.length && (
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
                id={coach.id}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/coaches"
            className={cn(buttonVariants({ size: 'lg' }), 'group inline-flex')}
          >
            {content.coaches.cta}
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
