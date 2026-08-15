'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/sections/hero';
import { CoachCTABanner } from '@/components/sections/coach-cta-banner';
import { CoachesPreview } from '@/components/sections/coaches-preview';
import { WhyTrainify } from '@/components/sections/why-trainify';
import { AppScreenshots } from '@/components/sections/app-screenshots';
import { Trust } from '@/components/sections/trust';
import { WhyTrainifyComparison } from '@/components/sections/why-trainify-comparison';
import { HowItWorks } from '@/components/sections/how-it-works';
import { ForCoaches } from '@/components/sections/for-coaches';
import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';
import { Footer } from '@/components/sections/footer';
import type { Coach } from '@/lib/api';

interface HomeClientProps {
  coaches: Coach[];
}

export default function HomeClient({ coaches }: HomeClientProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <main>
      <Hero onGoalSelect={setSelectedGoal} />
      <CoachCTABanner />
      <CoachesPreview selectedGoal={selectedGoal} coaches={coaches} />
      <WhyTrainify />
      <AppScreenshots />
      <Trust />
      <WhyTrainifyComparison />
      <HowItWorks />
      <ForCoaches />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
