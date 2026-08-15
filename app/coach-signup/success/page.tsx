'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Download, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CoachSignupSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            تم التسجيل بنجاح! 🎉
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            شكراً لانضمامك إلى Trainify كمدرب محترف
          </motion.p>

          {/* Pending Approval Notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-semibold text-orange-900 mb-2">
                  حسابك قيد المراجعة
                </h3>
                <p className="text-sm text-orange-800 leading-relaxed">
                  سيقوم فريق Trainify بمراجعة طلبك والتحقق من بياناتك. ستتلقى إشعاراً عبر البريد الإلكتروني بمجرد الموافقة على حسابك.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">
                  الخطوة التالية
                </h3>
                <p className="text-sm text-blue-800 leading-relaxed mb-4">
                  حمّل تطبيق Trainify على هاتفك الآن. بعد الموافقة على حسابك، ستتمكن من تسجيل الدخول وإدارة متدربيك من خلال التطبيق.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <a
              href="https://apps.apple.com/eg/app/trainify/id6786225762"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform hover:scale-105"
            >
              <Image
                src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                alt="Download on the App Store"
                width={156}
                height={52}
                className="h-14 w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.mrazzak.trainify"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform hover:scale-105"
            >
              <Image
                src="/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={156}
                height={52}
                className="h-14 w-auto"
              />
            </a>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/"
              className="inline-block text-primary hover:text-primary/80 font-medium transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-8 text-sm text-gray-600"
        >
          <p>
            هل لديك أسئلة؟{' '}
            <a href="mailto:support@trainify.app" className="text-primary hover:underline">
              تواصل مع الدعم
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
