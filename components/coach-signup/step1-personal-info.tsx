'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ImagePicker } from './image-picker';
import { GalleryPicker } from './gallery-picker';
import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import type { CoachSignupFormData } from '@/types/coach-signup';

interface Step1PersonalInfoProps {
  register: UseFormRegister<CoachSignupFormData>;
  watch: UseFormWatch<CoachSignupFormData>;
  errors: FieldErrors<CoachSignupFormData>;
  profileImage: File | null;
  setProfileImage: (file: File | null) => void;
  galleryImages: File[];
  setGalleryImages: (files: File[]) => void;
}

export function Step1PersonalInfo({
  register,
  watch,
  errors,
  profileImage,
  setProfileImage,
  galleryImages,
  setGalleryImages,
}: Step1PersonalInfoProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const headline = watch('headline') || '';
  const trainingExperience = watch('trainingExperience') || '';
  const introduction = watch('introduction') || '';
  const motivation = watch('motivation') || '';

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          المعلومات الشخصية
        </h2>
        <p className="text-gray-600">
          أدخل معلوماتك الأساسية لإنشاء حسابك
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          البريد الإلكتروني <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="coach@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          كلمة المرور <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'كلمة المرور مطلوبة',
              minLength: {
                value: 8,
                message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
              },
            })}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          يجب أن تكون كلمة المرور 8 أحرف على الأقل
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          تأكيد كلمة المرور <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* First Name & Last Name */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الأول <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('firstName')}
            placeholder="أحمد"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم العائلة <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('lastName')}
            placeholder="محمد"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          رقم الهاتف <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register('phoneNumber', {
            required: 'هذا الحقل مطلوب',
            pattern: {
              value: /^01[0125][0-9]{8}$/,
              message: 'يرجى إدخال رقم هاتف مصري صحيح (010/011/012/015)',
            },
          })}
          placeholder="01012345678"
          maxLength={11}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          dir="ltr"
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">صيغة: 01xxxxxxxxx</p>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الجنس <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center justify-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="radio"
              {...register('gender')}
              value="male"
              className="sr-only"
            />
            <span>ذكر</span>
          </label>
          <label className="flex items-center justify-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="radio"
              {...register('gender')}
              value="female"
              className="sr-only"
            />
            <span>أنثى</span>
          </label>
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          سنوات الخبرة <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register('yearOfExperience', { valueAsNumber: true })}
          placeholder="5"
          min="0"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {errors.yearOfExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.yearOfExperience.message}</p>
        )}
      </div>

      {/* Profile Image */}
      <ImagePicker
        label="صورة الملف الشخصي"
        value={profileImage}
        onChange={setProfileImage}
        error={errors.profileImage?.message}
        required
      />

      {/* Headline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          العنوان التعريفي <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('headline', {
            required: 'العنوان التعريفي مطلوب',
            maxLength: {
              value: 30,
              message: 'العنوان التعريفي يجب ألا يتجاوز 30 حرفاً',
            },
          })}
          placeholder="مدرب كمال أجسام محترف"
          maxLength={30}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {errors.headline && (
          <p className="mt-1 text-sm text-red-600">{errors.headline.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">{headline.length}/30</p>
      </div>

      {/* Training Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          خبرة التدريب <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('trainingExperience', {
            required: 'خبرة التدريب مطلوبة',
            maxLength: {
              value: 350,
              message: 'خبرة التدريب يجب ألا تتجاوز 350 حرفاً',
            },
          })}
          placeholder="متخصص في تدريب القوة وبناء العضلات..."
          rows={3}
          maxLength={350}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        {errors.trainingExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.trainingExperience.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">{trainingExperience.length}/350</p>
      </div>

      {/* Introduction */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          نبذة تعريفية <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('introduction', {
            required: 'النبذة التعريفية مطلوبة',
            maxLength: {
              value: 350,
              message: 'النبذة التعريفية يجب ألا تتجاوز 350 حرفاً',
            },
          })}
          placeholder="مدرب معتمد مع 5 سنوات من الخبرة..."
          rows={4}
          maxLength={350}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        {errors.introduction && (
          <p className="mt-1 text-sm text-red-600">{errors.introduction.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">{introduction.length}/350</p>
      </div>

      {/* Motivation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          أسلوب التدريب <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('motivation', {
            required: 'أسلوب التدريب مطلوب',
            maxLength: {
              value: 350,
              message: 'أسلوب التدريب يجب ألا يتجاوز 350 حرفاً',
            },
          })}
          placeholder="نهج يركز على النتائج مع خطط مخصصة..."
          rows={3}
          maxLength={350}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        {errors.motivation && (
          <p className="mt-1 text-sm text-red-600">{errors.motivation.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">{motivation.length}/350</p>
      </div>

      {/* Gallery Images */}
      <GalleryPicker
        value={galleryImages}
        onChange={setGalleryImages}
        error={errors.galleryImages?.message}
      />
    </div>
  );
}
