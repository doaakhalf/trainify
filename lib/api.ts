export interface Coach {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  bio?: string;
  headline?: string;
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
        cache: 'no-store', // Always fetch fresh data in development
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch coaches');
    }

    const data = await response.json();
    
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    // The API returns { coaches: [...], pagination: {...} }
    const coaches = data.coaches || [];
    
    console.log('Coaches count:', coaches.length);
    console.log('First coach:', coaches[0]);
    
    // Map the API response to our Coach interface
    return coaches.map((coach: any) => ({
      _id: coach.id || coach._id,
      name: coach.name,
      email: coach.email,
      phone: coach.phone,
      profileImage: coach.profileImage,
      bio: coach.introduction,
      headline: coach.headline, // Add headline from API
      specialization: coach.sport ? [coach.sport] : [],
      experience: coach.yearOfExperience,
      rating: 4.8, // Default rating since API doesn't provide it
      reviewCount: coach.subscriptionNumber || 0,
      price: coach.price,
      status: coach.status,
      createdAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching coaches:', error);
    return [];
  }
}
