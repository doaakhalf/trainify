'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { CoachCard } from '@/components/ui/coach-card';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Coach } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';
import { getCoachPath } from '@/lib/coach-slug';
import { cn } from '@/lib/utils';

interface CoachesPreviewProps {
  coaches?: Coach[];
}

export function CoachesPreview({ coaches: apiCoaches }: CoachesPreviewProps) {
  const coaches = useMemo(() => {
    if (!apiCoaches || apiCoaches.length === 0) return [];

    return apiCoaches.map((coach) => ({
      id: coach._id,
      name: coach.name,
      slug: coach.slug,
      shareProfileUrl: coach.shareProfileUrl,
      image: resolveImageUrl(coach.profileImage),
      headline: coach.headline || 'مدرب معتمد',
      rating: coach.rating,
      experience: coach.experience || 0,
      price: coach.price || 0,
      subscribers: coach.subscribers || 0,
    }));
  }, [apiCoaches]);

  if (coaches.length === 0) {
    return null;
  }

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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {coaches.map((coach, index) => (
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
                href={getCoachPath(
                  {
                    _id: coach.id,
                    name: coach.name,
                    slug: coach.slug,
                    shareProfileUrl: coach.shareProfileUrl,
                  },
                  apiCoaches
                )}
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
