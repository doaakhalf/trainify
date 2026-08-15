export interface CoachSignupFormData {
  // Step 1 - Personal Information
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  yearOfExperience: number;
  profileImage: File | null;
  headline: string;
  trainingExperience: string;
  introduction: string;
  motivation: string;
  galleryImages: File[];

  // Step 2 - Achievements & Certificates
  achievements: Achievement[];
  certificates: Certificate[];

  // Step 3 - Payment
  monthlyPriceEgp: number;
  paymentMethod: 'instapay' | 'vodafone';
  instapayLink?: string;
  walletNumber?: string;
}

export interface Achievement {
  name: string;
  rank: string;
  image: File | null;
}

export interface Certificate {
  name: string;
  year?: number;
  image: File | null;
}

export interface CoachSignupResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    user_type: string;
    status: string;
    approved: boolean;
  };
}

export interface CoachSignupError {
  success: false;
  message: string;
  errors?: Record<string, string>;
  error?: string;
}
