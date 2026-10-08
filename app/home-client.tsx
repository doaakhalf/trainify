'use client';

import { SiteHeader } from '@/components/layout/site-header';
import { Hero } from '@/components/sections/hero';
import { CoachesPreview } from '@/components/sections/coaches-preview';
import { WhyTrainify } from '@/components/sections/why-trainify';
import { AppScreenshots } from '@/components/sections/app-screenshots';
import { Trust } from '@/components/sections/trust';
import { WhyTrainifyComparison } from '@/components/sections/why-trainify-comparison';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';
import { Footer } from '@/components/sections/footer';
import type { Coach } from '@/lib/api';

interface HomeClientProps {
  coaches: Coach[];
}

export default function HomeClient({ coaches }: HomeClientProps) {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <CoachesPreview coaches={coaches} />
      <WhyTrainify />
      <AppScreenshots />
      <Trust />
      <WhyTrainifyComparison />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
