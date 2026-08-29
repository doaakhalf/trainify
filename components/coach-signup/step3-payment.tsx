'use client';

import { AlertCircle } from 'lucide-react';
import { PaymentMethodSelector } from './payment-method-selector';
import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import type { CoachSignupFormData } from '@/types/coach-signup';

interface Step3PaymentProps {
  register: UseFormRegister<CoachSignupFormData>;
  errors: FieldErrors<CoachSignupFormData>;
  watch: UseFormWatch<CoachSignupFormData>;
  paymentMethod: 'instapay' | 'vodafone';
  setPaymentMethod: (method: 'instapay' | 'vodafone') => void;
}

export function Step3Payment({
  register,
  errors,
  watch,
  paymentMethod,
  setPaymentMethod,
}: Step3PaymentProps) {
  const monthlyPrice = watch('monthlyPriceEgp');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          معلومات الدفع
        </h2>
        <p className="text-gray-600">
          حدد سعرك الشهري وطريقة استلام الأموال
        </p>
      </div>

      {/* Monthly Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          السعر الشهري (جنيه مصري) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            {...register('monthlyPriceEgp', {
              valueAsNumber: true,
              required: 'السعر الشهري مطلوب',
              min: {
                value: 1,
                message: 'السعر الشهري يجب أن يكون أكبر من 0',
              },
              validate: (value) =>
                Number.isInteger(value) || 'السعر الشهري يجب أن يكون رقماً صحيحاً بدون كسور',
            })}
            placeholder="1500"
            min="1"
            step="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            ج.م
          </span>
        </div>
        {errors.monthlyPriceEgp && (
          <p className="mt-1 text-sm text-red-600">{errors.monthlyPriceEgp.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">أدخل السعر بالجنيه المصري بدون كسور</p>
      </div>

      {/* Platform Fee Notice */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-orange-900 mb-1">
              رسوم المنصة
            </h4>
            <p className="text-sm text-orange-800">
              سيتم تطبيق نسبة المنصة تلقائياً. السعر النهائي الذي سيراه اللاعبون سيتم حسابه من قبل النظام.
            </p>
            {monthlyPrice > 0 && (
              <p className="text-sm text-orange-800 mt-2">
                <span className="font-semibold">السعر المدخل:</span> {monthlyPrice} ج.م
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <PaymentMethodSelector
        value={paymentMethod}
        onChange={setPaymentMethod}
      />

      {/* Instapay Link */}
      {paymentMethod === 'instapay' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رابط Instapay <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('instapayLink')}
            placeholder="https://ipn.eg/S/yourname/instapay/07UGto"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            dir="ltr"
          />
          {errors.instapayLink && (
            <p className="mt-1 text-sm text-red-600">{errors.instapayLink.message}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            مثال: https://ipn.eg/S/yourname/instapay/07UGto
          </p>
        </div>
      )}

      {/* Vodafone Cash Number */}
      {paymentMethod === 'vodafone' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رقم محفظة فودافون كاش <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register('walletNumber', {
              required: 'رقم محفظة فودافون كاش مطلوب',
              pattern: {
                value: /^01[0125][0-9]{8}$/,
                message: 'أدخل رقم هاتف مصري صحيح يبدأ بـ 010 أو 011 أو 012 أو 015',
              },
            })}
            placeholder="01012345678"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            dir="ltr"
          />
          {errors.walletNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.walletNumber.message}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            صيغة: 01xxxxxxxxx
          </p>
        </div>
      )}

      {/* Payment Schedule Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 mb-1">
              جدول الصرف
            </h4>
            <p className="text-sm text-blue-800">
              يتم صرف مستحقات المدربين كل أسبوعين بعد مراجعة الاشتراكات والتأكد من التزامهم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
