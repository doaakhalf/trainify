import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getCoachByParam, resolveImageUrl } from '@/lib/api';
import { getCoachOgTitle } from '@/lib/coach-og';

export const alt = 'مدرب على Trainify';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadAsset(relativePath: string) {
  return readFile(join(process.cwd(), relativePath));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [coachResult, logoBuffer, placeholderBuffer] = await Promise.all([
    getCoachByParam(id).catch(() => ({ coach: null })),
    loadAsset('public/icon-192.png'),
    loadAsset('public/placeholder-coach.jpg'),
  ]);

  const coach = coachResult.coach;
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  const placeholderSrc = `data:image/jpeg;base64,${placeholderBuffer.toString('base64')}`;
  const title = coach ? getCoachOgTitle(coach) : 'Trainify';

  let photoSrc = placeholderSrc;
  if (coach?.profileImage) {
    const absolute = resolveImageUrl(coach.profileImage);
    if (absolute.startsWith('http://') || absolute.startsWith('https://')) {
      photoSrc = absolute;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#111827',
          overflow: 'hidden',
        }}
      >
        <img
          src={photoSrc}
          width={1200}
          height={630}
          alt={title}
          style={{
            width: 1200,
            height: 630,
            objectFit: 'contain',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 28,
            bottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 12,
            border: '1px solid #111827',
            padding: 8,
          }}
        >
          <img
            src={logoSrc}
            width={52}
            height={52}
            alt="Trainify"
            style={{ borderRadius: 8 }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
