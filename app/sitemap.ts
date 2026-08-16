import { MetadataRoute } from 'next';
import { getActiveCoaches } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const coaches = await getActiveCoaches();

  const coachEntries: MetadataRoute.Sitemap = coaches.map((coach) => ({
    url: `https://trainifypro.com/coaches/${coach._id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: 'https://trainifypro.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://trainifypro.com/coaches',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...coachEntries,
  ];
}
