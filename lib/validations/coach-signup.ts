import { z } from 'zod';

// Egyptian phone number regex
const egyptianPhoneRegex = /^01[0-9]{9}$/;

// Instapay link regex
const instapayLinkRegex = /^https?:\/\/(www\.)?ipn\.eg\/S\/[A-Za-z0-9._-]+\/instapay\/[A-Za-z0-9_-]+\/?$/i;

// File validation helper
const fileSchema = z.instanceof(File).nullable();

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().regex(egyptianPhoneRegex, 'Please enter a valid Egyptian phone number (01xxxxxxxxx)'),
  gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
  yearOfExperience: z.number().min(0, 'Years of experience must be 0 or greater'),
  profileImage: fileSchema.refine((file) => file !== null, 'Profile image is required'),
  headline: z.string().min(1, 'Headline is required'),
  trainingExperience: z.string().min(1, 'Training experience is required'),
  introduction: z.string().min(1, 'Introduction is required'),
  motivation: z.string().min(1, 'Training style is required'),
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
  monthlyPriceEgp: z.number().min(1, 'السعر الشهري يجب أن يكون أكبر من 0'),
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
    if (!data.walletNumber) {
      return false;
    }
    return egyptianPhoneRegex.test(data.walletNumber);
  }
  return true;
}, {
  message: 'رقم محفظة فودافون كاش غير صحيح (01xxxxxxxxx)',
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
