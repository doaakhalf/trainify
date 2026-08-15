'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Smartphone, UserPlus } from 'lucide-react';
import { content } from '@/content/ar';
import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            {content.finalCta.title}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="group"
              onClick={() => {
                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Smartphone className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              {content.finalCta.ctaPrimary}
            </Button>
            <Link href="/coach-signup" className="inline-block">
              <Button
                size="lg"
                variant="secondary"
                className="group"
              >
                <UserPlus className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                {content.finalCta.ctaSecondary}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
