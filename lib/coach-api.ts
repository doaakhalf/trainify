import type { CoachSignupFormData, CoachSignupResponse, CoachSignupError } from '@/types/coach-signup';
import { buildCoachSignupFormData } from './utils/form-data-builder';

// Use Next.js API route as proxy to avoid CORS issues
const API_BASE_URL = '/api';
const TIMEOUT_MS = 60000; // 60 seconds for file uploads

/**
 * Register a new coach
 * CRITICAL Web Implementation Notes:
 * - Do NOT set Content-Type header (browser handles it)
 * - Use AbortController for timeout
 * - Do NOT store token (coach uses mobile app)
 */
export async function registerCoach(
  data: CoachSignupFormData
): Promise<CoachSignupResponse | CoachSignupError> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    // Build FormData (Web-specific, not React Native)
    const formData = buildCoachSignupFormData(data);

    // Send request (NO Content-Type header!)
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    // Log the response for debugging
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', result);

    if (response.ok) {
      return {
        success: true,
        message: result.message || 'Coach registered successfully',
        token: result.token,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
        user: result.user,
      };
    } else {
      // Log detailed error
      console.error('API Error:', {
        status: response.status,
        message: result.message,
        errors: result.errors,
        error: result.error,
      });
      
      return {
        success: false,
        message: result.message || 'Registration failed',
        errors: result.errors,
        error: result.error,
      };
    }
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          message: 'Request timeout. Please try again.',
        };
      }

      return {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      };
    }

    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

/**
 * Map backend field names to user-friendly labels
 */
export const fieldLabels: Record<string, string> = {
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  confirmPassword: 'تأكيد كلمة المرور',
  firstName: 'الاسم الأول',
  lastName: 'اسم العائلة',
  phoneNumber: 'رقم الهاتف',
  gender: 'الجنس',
  yearOfExperience: 'سنوات الخبرة',
  profileImage: 'صورة الملف الشخصي',
  headline: 'العنوان',
  trainingExperience: 'خبرة التدريب',
  introduction: 'نبذة تعريفية',
  motivation: 'أسلوب التدريب',
  monthlyPriceEgp: 'السعر الشهري',
  instapayLink: 'رابط Instapay',
  walletNumber: 'رقم محفظة فودافون كاش',
};

/**
 * Get user-friendly error message
 */
export function getErrorMessage(field: string, message: string): string {
  const label = fieldLabels[field] || field;
  return `${label}: ${message}`;
}
