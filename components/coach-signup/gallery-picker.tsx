'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { prepareImageForUpload } from '@/lib/utils/image-processing';

interface GalleryPickerProps {
  value: File[];
  onChange: (files: File[]) => void;
  maxImages?: number;
  error?: string;
}

export function GalleryPicker({
  value,
  onChange,
  maxImages = 10,
  error,
}: GalleryPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Rebuild previews when returning to this step; the selected File objects
  // live in the parent while this component is unmounted between steps.
  useEffect(() => {
    if (value.length === 0) {
      setPreviews([]);
      return;
    }

    let cancelled = false;
    const nextPreviews = new Array<string>(value.length).fill('');
    let loadedCount = 0;

    value.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (cancelled) return;
        nextPreviews[index] = reader.result as string;
        loadedCount += 1;
        if (loadedCount === value.length) {
          setPreviews(nextPreviews);
        }
      };
      reader.readAsDataURL(file);
    });

    return () => {
      cancelled = true;
    };
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check max images
    if (value.length + files.length > maxImages) {
      setValidationError(`الحد الأقصى ${maxImages} صور`);
      return;
    }

    setValidationError(null);
    setIsProcessing(true);
    try {
      const preparedFiles: File[] = [];
      // Process sequentially to avoid decoding ten large phone images at once.
      for (const file of files) {
        preparedFiles.push(await prepareImageForUpload(file, 'gallery'));
      }
      onChange([...value, ...preparedFiles]);
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : 'Unable to process the selected images');
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    onChange(newFiles);
    setPreviews(newPreviews);
    setValidationError(null);
  };

  const handleClick = () => {
    if (isProcessing) return;
    inputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        صور المعرض ({value.length}/{maxImages})
      </label>

      <div className="grid grid-cols-3 gap-4">
        {/* Existing images */}
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
          >
            <Image
              src={preview}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Add button */}
        {value.length < maxImages && (
          <button
            type="button"
            onClick={handleClick}
            disabled={isProcessing}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-primary transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-primary"
          >
            <Plus className="w-8 h-8 mb-1" />
            <span className="inline-flex items-center gap-1 text-xs">
              {isProcessing && <Loader2 className="h-3 w-3 animate-spin" />}
              {isProcessing ? 'جار تجهيز الصور...' : 'إضافة صورة'}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic,.heif"
        multiple
        onChange={handleFileSelect}
        disabled={isProcessing}
        className="hidden"
      />

      {(error || validationError) && (
        <p className="mt-2 text-sm text-red-600">{error || validationError}</p>
      )}

      <p className="mt-2 text-xs text-gray-500">
        اختياري - يمكنك إضافة حتى {maxImages} صور لمعرضك
      </p>
    </div>
  );
}
