'use client';

import type { Heic2AnyOptions } from 'heic2any';

export type ImageUploadKind = 'profile' | 'gallery';

const MAX_SOURCE_BYTES = 20 * 1024 * 1024;
export const MAX_FINAL_IMAGE_BYTES = 10 * 1024 * 1024;

const TARGET_BYTES: Record<ImageUploadKind, number> = {
  profile: 1 * 1024 * 1024,
  gallery: 1.5 * 1024 * 1024,
};

const MAX_DIMENSION = 1800;
const HEIC_EXTENSIONS = new Set(['heic', 'heif']);
const GIF_EXTENSIONS = new Set(['gif']);
const IMAGE_EXTENSIONS = new Set([
  'avif',
  'bmp',
  'jpeg',
  'jpg',
  'png',
  'tif',
  'tiff',
  'webp',
]);

function getExtension(file: File): string {
  return file.name.split('.').pop()?.toLowerCase() || '';
}

export function isGifFile(file: File): boolean {
  return file.type.toLowerCase() === 'image/gif' || GIF_EXTENSIONS.has(getExtension(file));
}

export function isSupportedImage(file: File): boolean {
  const type = file.type.toLowerCase();
  const extension = getExtension(file);

  return (
    !isGifFile(file) &&
    (type.startsWith('image/') ||
      HEIC_EXTENSIONS.has(extension) ||
      IMAGE_EXTENSIONS.has(extension))
  );
}

function isHeicFile(file: File): boolean {
  const type = file.type.toLowerCase();
  return type === 'image/heic' || type === 'image/heif' || HEIC_EXTENSIONS.has(getExtension(file));
}

function getJpegName(name: string): string {
  return `${name.replace(/\.[^/.]+$/, '') || 'image'}.jpg`;
}

async function convertHeicToJpeg(file: File): Promise<Blob> {
  const heic2anyModule = await import('heic2any');
  const converter = heic2anyModule.default;
  const options: Heic2AnyOptions = {
    blob: file,
    toType: 'image/jpeg',
    quality: 0.9,
  };
  const converted = await converter(options);
  if (Array.isArray(converted) && converted.length === 0) {
    throw new Error('Unable to convert the selected HEIC image');
  }
  return Array.isArray(converted) ? converted[0] : converted;
}

function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unable to read the selected image'));
    };
    image.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Unable to compress the selected image'));
      }
    }, type, quality);
  });
}

async function resizeAndCompress(
  source: Blob,
  outputType: string,
  targetBytes: number,
  maxDimension: number
): Promise<Blob> {
  const image = await loadImage(source);
  const sourceScale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  let width = Math.max(1, Math.round(image.width * sourceScale));
  let height = Math.max(1, Math.round(image.height * sourceScale));
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: true });

  if (!context) throw new Error('Unable to prepare the selected image');

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  let blob = await canvasToBlob(
    canvas,
    outputType,
    outputType === 'image/jpeg' ? 0.82 : undefined
  );

  for (let attempt = 0; attempt < 6 && blob.size > targetBytes; attempt += 1) {
    const scale = attempt < 3 ? 0.9 : 0.78;
    width = Math.max(1, Math.round(width * scale));
    height = Math.max(1, Math.round(height * scale));
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    blob = await canvasToBlob(
      canvas,
      outputType,
      outputType === 'image/jpeg' ? Math.max(0.45, 0.82 - attempt * 0.08) : undefined
    );
  }

  return blob;
}

export async function prepareImageForUpload(
  file: File,
  kind: ImageUploadKind
): Promise<File> {
  if (isGifFile(file)) {
    throw new Error('GIF images are not supported');
  }
  if (!isSupportedImage(file)) {
    throw new Error('Please select a valid image');
  }
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error('Image file is too large to process. Maximum source size is 20MB');
  }

  const source = isHeicFile(file) ? await convertHeicToJpeg(file) : file;
  const outputType = isHeicFile(file)
    ? 'image/jpeg'
    : file.type.toLowerCase() === 'image/png' || getExtension(file) === 'png'
      ? 'image/png'
      : 'image/jpeg';
  const compressed = await resizeAndCompress(
    source,
    outputType,
    TARGET_BYTES[kind],
    MAX_DIMENSION
  );

  if (compressed.size > MAX_FINAL_IMAGE_BYTES) {
    throw new Error('Image file is too large after compression. Maximum size is 10MB');
  }

  const outputName = outputType === 'image/jpeg' ? getJpegName(file.name) : file.name;
  return new File([compressed], outputName, {
    type: outputType,
    lastModified: file.lastModified,
  });
}
