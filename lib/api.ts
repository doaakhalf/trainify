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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(
      'https://promax-node-production-7c35.up.railway.app/api/coaches?status=active',
      {
        next: { revalidate: 3600 }, // Revalidate every hour
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

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
    // Return empty array to allow page to load with fallback content
    return [];
  }
}
