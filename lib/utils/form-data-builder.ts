import type { CoachSignupFormData } from '@/types/coach-signup';

/**
 * Build FormData for coach registration API
 * CRITICAL: This is for Web/Browser, NOT React Native
 * - Use File objects directly (not {uri, type, name})
 * - Do NOT set Content-Type header manually
 * - Skip null/undefined files (don't send null)
 */
export function buildCoachSignupFormData(data: CoachSignupFormData): FormData {
  const form = new FormData();

  // Step 1 - Personal Information (text fields)
  form.append('email', data.email || '');
  form.append('password', data.password || '');
  form.append('confirmPassword', data.confirmPassword || '');
  form.append('user_type', 'coach');
  form.append('firstName', data.firstName || '');
  form.append('lastName', data.lastName || '');
  form.append('phoneNumber', data.phoneNumber || '');
  form.append('gender', data.gender || '');
  form.append('sport', 'gym'); // Required by API - default to "gym"
  form.append('type', 'gym'); // Required by API - default to "gym"
  form.append('yearOfExperience', (data.yearOfExperience || 0).toString());
  form.append('headline', data.headline || '');
  form.append('trainingExperience', data.trainingExperience || '');
  form.append('introduction', data.introduction || '');
  form.append('motivation', data.motivation || '');

  // Profile image (required)
  if (data.profileImage) {
    form.append('profileImage', data.profileImage);
  }

  // Gallery images (optional, max 10)
  if (data.galleryImages && data.galleryImages.length > 0) {
    data.galleryImages.forEach((file) => {
      if (file) {
        form.append('galleryImages', file);
      }
    });
  }

  // Step 2 - Achievements (optional)
  if (data.achievements && data.achievements.length > 0) {
    // Metadata first (JSON string)
    const achievementsMetadata = data.achievements.map(a => ({
      name: a.name,
      rank: a.rank,
    }));
    form.append('achievements', JSON.stringify(achievementsMetadata));

    // Then files (only for achievements with images)
    // CRITICAL: Backend maps files to metadata by index
    // So we only send files for achievements that have images
    data.achievements.forEach((achievement) => {
      if (achievement.image) {
        form.append('achievements', achievement.image);
      }
    });
  }

  // Step 2 - Certificates (optional)
  if (data.certificates && data.certificates.length > 0) {
    // Metadata first (JSON string)
    const certificatesMetadata = data.certificates.map(c => ({
      name: c.name,
      year: c.year,
    }));
    form.append('certificates', JSON.stringify(certificatesMetadata));

    // Then files (only for certificates with images)
    data.certificates.forEach((certificate) => {
      if (certificate.image) {
        form.append('certificates', certificate.image);
      }
    });
  }

  // Step 3 - Payment Information
  form.append('monthlyPriceEgp', data.monthlyPriceEgp.toString());
  form.append('paymentMethod', data.paymentMethod);

  if (data.paymentMethod === 'instapay' && data.instapayLink) {
    form.append('instapayLink', data.instapayLink);
  } else if (data.paymentMethod === 'vodafone' && data.walletNumber) {
    form.append('walletNumber', data.walletNumber);
  }

  return form;
}

export const MAX_IMAGE_SIZE_MB = 10;

/**
 * Validate file size (max 10MB by default)
 */
export function validateFileSize(
  file: File,
  maxSizeMB: number = MAX_IMAGE_SIZE_MB
): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Validate file type (images only)
 */
export function validateFileType(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  return allowedTypes.includes(file.type);
}

/**
 * Validate file (size + type)
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!validateFileType(file)) {
    return {
      valid: false,
      error: 'Only JPEG, PNG, WebP, and GIF images are allowed',
    };
  }

  if (!validateFileSize(file)) {
    return {
      valid: false,
      error: `Image file is too large. Maximum size is ${MAX_IMAGE_SIZE_MB}MB`,
    };
  }

  return { valid: true };
}
