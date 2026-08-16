'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, Calendar } from 'lucide-react';
import { buttonVariants } from './button';
import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { cn } from '@/lib/utils';

interface CoachCardProps {
  id: string;
  name: string;
  rating?: number;
  subscribers: number;
  experience: number;
  price: number;
  image: string;
  headline: string;
}

export function CoachCard({
  id,
  name,
  headline,
  rating,
  subscribers,
  experience,
  price,
  image,
}: CoachCardProps) {
  const detailsHref = `/coaches/${id}`;

  return (
    <Link href={detailsHref} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="group relative h-full cursor-pointer bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-gray-100 group-hover:ring-primary/20 transition-all">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{headline}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm">
          {typeof rating === 'number' && (
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold text-gray-900">{rating}</span>
            </div>
          )}
          
          {subscribers > 0 && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{subscribers} مشترك</span>
            </div>
          )}
          
          <div className="flex items-center gap-1.5 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{experience} سنوات خبرة</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-600 mb-0.5">يبدأ من</p>
            <p className="text-2xl font-bold text-primary">
              {price.toLocaleString('ar-EG')}
              <span className="text-sm text-gray-600 font-normal mr-1">ج.م/شهر</span>
            </p>
          </div>
          
          <span className={cn(buttonVariants({ size: 'sm' }), 'shadow-md pointer-events-none')}>
            {content.coaches.seeDetails}
          </span>
        </div>

        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
          محترف
        </div>
      </motion.div>
    </Link>
  );
}
