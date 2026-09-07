import type { Metadata } from 'next';
import { content } from '@/content/ar';
import { SiteHeader } from '@/components/layout/site-header';
import { Footer } from '@/components/sections/footer';

const { termsPage } = content;

export const metadata: Metadata = {
  title: termsPage.title,
  description: termsPage.description,
  openGraph: {
    title: termsPage.title,
    description: termsPage.description,
    url: 'https://trainifypro.com/terms',
    siteName: 'Trainify',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <main>
      <SiteHeader />
      <article className="bg-background-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {termsPage.title}
          </h1>
          <p className="text-sm text-text-secondary mb-8">
            {termsPage.lastUpdatedLabel}: {termsPage.lastUpdated}
          </p>
          <p className="text-gray-600 leading-relaxed mb-10 whitespace-pre-line">
            {termsPage.intro}
          </p>
          <div className="space-y-10">
            {termsPage.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-text-primary mb-3">
                  {section.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
