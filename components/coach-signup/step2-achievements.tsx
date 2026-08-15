'use client';

import { Plus } from 'lucide-react';
import { AchievementItem, CertificateItem } from './achievement-item';
import type { Achievement, Certificate } from '@/types/coach-signup';

interface Step2AchievementsProps {
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
  certificates: Certificate[];
  setCertificates: (certificates: Certificate[]) => void;
}

export function Step2Achievements({
  achievements,
  setAchievements,
  certificates,
  setCertificates,
}: Step2AchievementsProps) {
  const addAchievement = () => {
    setAchievements([...achievements, { name: '', rank: '', image: null }]);
  };

  const updateAchievement = (index: number, value: Achievement) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const addCertificate = () => {
    setCertificates([...certificates, { name: '', image: null }]);
  };

  const updateCertificate = (index: number, value: Certificate) => {
    const newCertificates = [...certificates];
    newCertificates[index] = value;
    setCertificates(newCertificates);
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          الإنجازات والشهادات
        </h2>
        <p className="text-gray-600">
          أضف إنجازاتك وشهاداتك (اختياري)
        </p>
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            الإنجازات الرياضية
          </h3>
          <span className="text-sm text-gray-500">(اختياري)</span>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <AchievementItem
              key={index}
              value={achievement}
              onChange={(value) => updateAchievement(index, value)}
              onRemove={() => removeAchievement(index)}
              index={index}
            />
          ))}

          <button
            type="button"
            onClick={addAchievement}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة إنجاز</span>
          </button>
        </div>
      </div>

      {/* Certificates Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            الشهادات المهنية
          </h3>
          <span className="text-sm text-gray-500">(اختياري)</span>
        </div>

        <div className="space-y-4">
          {certificates.map((certificate, index) => (
            <CertificateItem
              key={index}
              value={certificate}
              onChange={(value) => updateCertificate(index, value)}
              onRemove={() => removeCertificate(index)}
              index={index}
            />
          ))}

          <button
            type="button"
            onClick={addCertificate}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة شهادة</span>
          </button>
        </div>
      </div>

      {achievements.length === 0 && certificates.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">
            لم تضف أي إنجازات أو شهادات بعد
          </p>
          <p className="text-sm text-gray-500">
            يمكنك تخطي هذه الخطوة والمتابعة، أو إضافة إنجازاتك وشهاداتك لتعزيز ملفك الشخصي
          </p>
        </div>
      )}
    </div>
  );
}
