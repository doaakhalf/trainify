import { z } from 'zod';

// Egyptian phone number regex
const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;

// Instapay link regex
const instapayLinkRegex = /^https?:\/\/(www\.)?ipn\.eg\/S\/[A-Za-z0-9._-]+\/instapay\/[A-Za-z0-9_-]+\/?$/i;

// File validation helper
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const fileSchema = z
  .instanceof(File)
  .nullable()
  .refine(
    (file) => file === null || file.size <= MAX_IMAGE_SIZE_BYTES,
    'Image file is too large. Maximum size is 10MB'
  );

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z
    .string()
    .regex(egyptianPhoneRegex, 'يرجى إدخال رقم هاتف مصري صحيح (010/011/012/015)'),
  gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
  yearOfExperience: z
    .number()
    .int('Years of experience must be a whole number')
    .min(0, 'Years of experience must be 0 or greater'),
  profileImage: fileSchema.refine((file) => file !== null, 'Profile image is required'),
  headline: z
    .string()
    .min(1, 'Headline is required')
    .max(30, 'Headline must be 30 characters or less'),
  trainingExperience: z
    .string()
    .min(1, 'Training experience is required')
    .max(350, 'Training experience must be 350 characters or less'),
  introduction: z
    .string()
    .min(1, 'Introduction is required')
    .max(350, 'Introduction must be 350 characters or less'),
  motivation: z
    .string()
    .min(1, 'Training style is required')
    .max(350, 'Training style must be 350 characters or less'),
  galleryImages: z.array(fileSchema).max(10, 'Maximum 10 gallery images allowed'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Step 2: Achievements & Certificates Schema
export const achievementsSchema = z.object({
  achievements: z.array(z.object({
    name: z.string().min(1, 'Achievement name is required'),
    rank: z.string().min(1, 'Achievement rank is required'),
    image: fileSchema,
  })),
  certificates: z.array(z.object({
    name: z.string().min(1, 'Certificate name is required'),
    image: fileSchema,
  })),
});

// Step 3: Payment Information Schema
export const paymentInfoSchema = z.object({
  monthlyPriceEgp: z
    .number()
    .int('أدخل سعراً صحيحاً بدون كسور')
    .min(1, 'السعر الشهري مطلوب'),
  paymentMethod: z.enum(['instapay', 'vodafone'], { message: 'طريقة الدفع مطلوبة' }),
  instapayLink: z.string().optional(),
  walletNumber: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === 'instapay') {
    if (!data.instapayLink) {
      return false;
    }
    return instapayLinkRegex.test(data.instapayLink);
  }
  return true;
}, {
  message: 'رابط Instapay غير صحيح. مثال: https://ipn.eg/S/yourname/instapay/07UGto',
  path: ['instapayLink'],
}).refine((data) => {
  if (data.paymentMethod === 'vodafone') {
    return !data.walletNumber || egyptianPhoneRegex.test(data.walletNumber);
  }
  return true;
}, {
  message: 'يرجى إدخال رقم هاتف مصري صحيح (010/011/012/015)',
  path: ['walletNumber'],
}).refine((data) => {
  return data.paymentMethod !== 'vodafone' || Boolean(data.walletNumber);
}, {
  message: 'هذا الحقل مطلوب',
  path: ['walletNumber'],
});

// Full form schema (for final validation)
export const fullCoachSignupSchema = personalInfoSchema
  .merge(achievementsSchema)
  .merge(paymentInfoSchema);

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type AchievementsFormData = z.infer<typeof achievementsSchema>;
export type PaymentInfoFormData = z.infer<typeof paymentInfoSchema>;
export type FullCoachSignupFormData = z.infer<typeof fullCoachSignupSchema>;
