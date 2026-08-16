'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { StepIndicator } from '@/components/coach-signup/step-indicator';
import { Step1PersonalInfo } from '@/components/coach-signup/step1-personal-info';
import { Step2Achievements } from '@/components/coach-signup/step2-achievements';
import { Step3Payment } from '@/components/coach-signup/step3-payment';
import { registerCoach, getErrorMessage } from '@/lib/coach-api';
import { personalInfoSchema, achievementsSchema, paymentInfoSchema } from '@/lib/validations/coach-signup';
import type { CoachSignupFormData, Achievement, Certificate } from '@/types/coach-signup';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/site-header';

const TOTAL_STEPS = 3;

export default function CoachSignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Form state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'vodafone'>('instapay');

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<any>({
    mode: 'onTouched', // Only validate after user touches field
    defaultValues: {
      gender: '',
      yearOfExperience: 0,
      monthlyPriceEgp: 0,
      paymentMethod: 'instapay',
    },
  });

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        'email',
        'password',
        'confirmPassword',
        'firstName',
        'lastName',
        'phoneNumber',
        'gender',
        'yearOfExperience',
        'headline',
        'trainingExperience',
        'introduction',
        'motivation',
      ]);

      // Validate profile image
      if (!profileImage) {
        setApiError('صورة الملف الشخصي مطلوبة');
        return;
      }

      // Validate gallery images count
      if (galleryImages.length > 10) {
        setApiError('الحد الأقصى 10 صور للمعرض');
        return;
      }
    } else if (currentStep === 2) {
      // Validate achievements
      for (const achievement of achievements) {
        if (!achievement.name || !achievement.rank) {
          setApiError('يرجى ملء جميع حقول الإنجازات أو حذفها');
          return;
        }
      }

      // Validate certificates
      for (const certificate of certificates) {
        if (!certificate.name) {
          setApiError('يرجى ملء جميع حقول الشهادات أو حذفها');
          return;
        }
      }

      isValid = true;
    }

    if (isValid) {
      setApiError(null);
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setApiError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: CoachSignupFormData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      // Validate Step 3 fields
      if (!data.monthlyPriceEgp || data.monthlyPriceEgp <= 0) {
        setApiError('السعر الشهري مطلوب ويجب أن يكون أكبر من 0');
        setIsSubmitting(false);
        return;
      }

      if (paymentMethod === 'instapay' && !data.instapayLink) {
        setApiError('رابط Instapay مطلوب');
        setIsSubmitting(false);
        return;
      }

      if (paymentMethod === 'vodafone' && !data.walletNumber) {
        setApiError('رقم محفظة فودافون كاش مطلوب');
        setIsSubmitting(false);
        return;
      }

      // Prepare form data
      const formData: CoachSignupFormData = {
        ...data,
        profileImage,
        galleryImages,
        achievements,
        certificates,
        paymentMethod,
      };

      // Call API
      const result = await registerCoach(formData);

      if (result.success) {
        // Redirect to success page
        router.push('/coach-signup/success');
      } else {
        // Handle errors
        if ('errors' in result && result.errors) {
          const errorMessages = Object.entries(result.errors)
            .map(([field, message]) => getErrorMessage(field, message))
            .join('\n');
          setApiError(errorMessages);
        } else {
          setApiError(result.message || 'حدث خطأ أثناء التسجيل');
        }
      }
    } catch (error) {
      setApiError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 !leading-relaxed">
            انضم كمدرب في Trainify
          </h1>
          <p className="text-gray-600 !leading-relaxed">
            املأ البيانات التالية لإنشاء حسابك كمدرب محترف
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* API Error */}
          {apiError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 whitespace-pre-line">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step Content */}
            {currentStep === 1 && (
              <Step1PersonalInfo
                register={register}
                errors={errors}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
              />
            )}

            {currentStep === 2 && (
              <Step2Achievements
                achievements={achievements}
                setAchievements={setAchievements}
                certificates={certificates}
                setCertificates={setCertificates}
              />
            )}

            {currentStep === 3 && (
              <Step3Payment
                register={register}
                errors={errors}
                watch={watch}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                  السابق
                </Button>
              )}

              {currentStep < TOTAL_STEPS ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  size="lg"
                  className="flex-1"
                >
                  التالي
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      جاري التسجيل...
                    </>
                  ) : (
                    'إنشاء الحساب'
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            بالتسجيل، أنت توافق على{' '}
            <a href="#" className="text-primary hover:underline">
              الشروط والأحكام
            </a>{' '}
            و{' '}
            <a href="#" className="text-primary hover:underline">
              سياسة الخصوصية
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
