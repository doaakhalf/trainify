const API_BASE = 'https://promax-node-production-7c35.up.railway.app';

export interface CoachAchievement {
  _id?: string;
  name: string;
  rank?: string;
  image?: string;
}

export interface CoachCertificate {
  _id?: string;
  name: string;
  year?: number;
  image?: string;
}

/** Public coach shape for the landing site — no email/phone. */
export interface Coach {
  _id: string;
  name: string;
  profileImage?: string;
  headline?: string;
  price?: number;
  gender?: 'male' | 'female' | string;
  status: string;
  sport?: string;
  introduction?: string;
  motivation?: string;
  trainingExperience?: string;
  experience?: number;
  subscribers?: number;
  /** Only set when the API provides a real rating — never invent one. */
  rating?: number;
  achievements: CoachAchievement[];
  certificates: CoachCertificate[];
  galleryImages: string[];
}

export function resolveImageUrl(path?: string | null): string {
  if (!path) return '/placeholder-coach.jpg';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path;
  }
  return `${API_BASE}/${path}`;
}

function extractImagePath(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj.imageUrl === 'string') return obj.imageUrl;
    if (typeof obj.image === 'string') return obj.image;
    if (typeof obj.url === 'string') return obj.url;
  }
  return undefined;
}

function mapCoach(coach: Record<string, unknown>): Coach {
  const achievementsRaw = Array.isArray(coach.achievements) ? coach.achievements : [];
  const certificatesRaw = Array.isArray(coach.certificates) ? coach.certificates : [];
  const galleryRaw = Array.isArray(coach.galleryImages) ? coach.galleryImages : [];

  const ratingValue =
    typeof coach.rating === 'number'
      ? coach.rating
      : typeof coach.averageRating === 'number'
        ? coach.averageRating
        : undefined;

  return {
    _id: String(coach.id || coach._id || ''),
    name: String(coach.name || ''),
    profileImage: coach.profileImage ? String(coach.profileImage) : undefined,
    headline: coach.headline ? String(coach.headline) : undefined,
    price: typeof coach.price === 'number' ? coach.price : undefined,
    gender: coach.gender ? String(coach.gender) : undefined,
    status: String(coach.status || 'active'),
    sport: coach.sport ? String(coach.sport) : undefined,
    introduction: coach.introduction ? String(coach.introduction) : undefined,
    motivation: coach.motivation ? String(coach.motivation) : undefined,
    trainingExperience: coach.trainingExperience
      ? String(coach.trainingExperience)
      : undefined,
    experience:
      typeof coach.yearOfExperience === 'number' ? coach.yearOfExperience : undefined,
    subscribers:
      typeof coach.subscriptionNumber === 'number' ? coach.subscriptionNumber : 0,
    rating: ratingValue,
    achievements: achievementsRaw.map((item) => {
      const a = item as Record<string, unknown>;
      return {
        _id: a._id ? String(a._id) : undefined,
        name: String(a.name || ''),
        rank: a.rank != null ? String(a.rank) : undefined,
        image: extractImagePath(a.image ?? a.imageUrl),
      };
    }),
    certificates: certificatesRaw.map((item) => {
      const c = item as Record<string, unknown>;
      return {
        _id: c._id ? String(c._id) : undefined,
        name: String(c.name || ''),
        year: typeof c.year === 'number' ? c.year : undefined,
        image: extractImagePath(c.image ?? c.imageUrl),
      };
    }),
    galleryImages: galleryRaw
      .map((img) => extractImagePath(img))
      .filter((path): path is string => Boolean(path)),
  };
}

export async function getActiveCoaches(): Promise<Coach[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_BASE}/api/coaches?status=active`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Failed to fetch coaches');
    }

    const data = await response.json();
    const coaches = data.coaches || [];

    return coaches.map((coach: Record<string, unknown>) => mapCoach(coach));
  } catch (error) {
    console.error('Error fetching coaches:', error);
    return [];
  }
}

export async function getCoachById(id: string): Promise<Coach | null> {
  const coaches = await getActiveCoaches();
  return coaches.find((coach) => coach._id === id) ?? null;
}
