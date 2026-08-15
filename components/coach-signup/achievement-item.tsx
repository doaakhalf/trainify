'use client';

import { Trash2 } from 'lucide-react';
import { ImagePicker } from './image-picker';
import type { Achievement, Certificate } from '@/types/coach-signup';

interface AchievementItemProps {
  value: Achievement;
  onChange: (value: Achievement) => void;
  onRemove: () => void;
  index: number;
}

export function AchievementItem({
  value,
  onChange,
  onRemove,
  index,
}: AchievementItemProps) {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">إنجاز #{index + 1}</h4>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اسم الإنجاز <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="مثال: بطولة مصر للكروس فيت"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الترتيب <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={value.rank}
          onChange={(e) => onChange({ ...value, rank: e.target.value })}
          placeholder="مثال: المركز الأول"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <ImagePicker
        label="صورة الإنجاز"
        value={value.image}
        onChange={(file) => onChange({ ...value, image: file })}
      />
    </div>
  );
}

interface CertificateItemProps {
  value: Certificate;
  onChange: (value: Certificate) => void;
  onRemove: () => void;
  index: number;
}

export function CertificateItem({
  value,
  onChange,
  onRemove,
  index,
}: CertificateItemProps) {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">شهادة #{index + 1}</h4>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اسم الشهادة <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="مثال: شهادة مدرب شخصي معتمد"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          سنة الحصول على الشهادة
        </label>
        <input
          type="number"
          value={value.year || ''}
          onChange={(e) => onChange({ ...value, year: e.target.value ? parseInt(e.target.value) : undefined })}
          placeholder="مثال: 2020"
          min="1950"
          max={new Date().getFullYear()}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <ImagePicker
        label="صورة الشهادة"
        value={value.image}
        onChange={(file) => onChange({ ...value, image: file })}
      />
    </div>
  );
}
