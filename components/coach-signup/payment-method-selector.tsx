'use client';

import { Building2, Smartphone } from 'lucide-react';

interface PaymentMethodSelectorProps {
  value: 'instapay' | 'vodafone';
  onChange: (value: 'instapay' | 'vodafone') => void;
}

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        طريقة الدفع <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange('instapay')}
          className={`
            relative p-6 rounded-xl border-2 transition-all
            ${
              value === 'instapay'
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${value === 'instapay' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
            `}
            >
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Instapay</div>
              <div className="text-xs text-gray-500 mt-1">التحويل البنكي</div>
            </div>
          </div>
          {value === 'instapay' && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => onChange('vodafone')}
          className={`
            relative p-6 rounded-xl border-2 transition-all
            ${
              value === 'vodafone'
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${value === 'vodafone' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
            `}
            >
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Vodafone Cash</div>
              <div className="text-xs text-gray-500 mt-1">المحفظة الإلكترونية</div>
            </div>
          </div>
          {value === 'vodafone' && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
