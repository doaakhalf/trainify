export interface Coach {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  bio?: string;
  specialization?: string[];
  experience?: number;
  rating?: number;
  reviewCount?: number;
  price?: number;
  status: string;
  createdAt: string;
}

export async function getActiveCoaches(): Promise<Coach[]> {
  try {
    const response = await fetch(
      'https://promax-node-production-7c35.up.railway.app/api/coaches?status=active',
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch coaches');
    }

    const data = await response.json();
    return data.coaches || data || [];
  } catch (error) {
    console.error('Error fetching coaches:', error);
    return [];
  }
}
