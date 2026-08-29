'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { validateFile } from '@/lib/utils/form-data-builder';

interface ImagePickerProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function ImagePicker({
  label,
  value,
  onChange,
  error,
  required = false,
  className = '',
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Keep the preview when the parent step unmounts and mounts again.
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    let cancelled = false;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!cancelled) setPreview(reader.result as string);
    };
    reader.readAsDataURL(value);

    return () => {
      cancelled = true;
    };
  }, [value]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setValidationError(validation.error || 'Invalid file');
      return;
    }

    setValidationError(null);
    onChange(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    setValidationError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onClick={!preview ? handleClick : undefined}
        className={`
          relative border-2 border-dashed rounded-lg overflow-hidden
          transition-all cursor-pointer
          ${preview ? 'border-gray-300' : 'border-gray-300 hover:border-primary'}
          ${error || validationError ? 'border-red-500' : ''}
        `}
      >
        {preview ? (
          <div className="relative aspect-video w-full">
            <Image
              src={preview}
              alt={label}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleClick}
              className="absolute bottom-2 right-2 bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors shadow-md"
            >
              تغيير
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-1">
                اضغط لرفع صورة
              </p>
              <p className="text-xs text-gray-500">
                أي صيغة صورة ما عدا GIF (حد أقصى 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {(error || validationError) && (
        <p className="mt-2 text-sm text-red-600">{error || validationError}</p>
      )}

      {value && !error && !validationError && (
        <p className="mt-2 text-sm text-green-600">
          ✓ {value.name} ({(value.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
    </div>
  );
}
