'use client';

import { motion } from 'framer-motion';
import { content } from '@/content/ar';
import { Twitter, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Download Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">
            {content.footer.download.title}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://apps.apple.com/eg/app/trainify/id6786225762"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform hover:scale-105"
            >
              <img 
                src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
                alt="Download on the App Store"
                className="h-12 w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.mrazzak.trainify"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform hover:scale-105"
            >
              <img 
                src="/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play"
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-4">Trainify</h3>
            <p className="text-gray-400">
              منصة تربط الرياضيين بالمدربين المحترفين
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold mb-4">روابط مهمة</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {content.footer.links.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {content.footer.links.terms}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {content.footer.links.support}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {content.footer.links.contact}
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold mb-4">تابعنا</h4>
            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href={content.footer.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label={content.footer.social.instagram.label}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={content.footer.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label={content.footer.social.tiktok.label}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a
                href={content.footer.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label={content.footer.social.facebook.label}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={content.footer.social.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label={content.footer.social.twitter.label}
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${content.footer.contact.email}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors justify-center md:justify-end"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{content.footer.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${content.footer.contact.phone}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors justify-center md:justify-end"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{content.footer.contact.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
