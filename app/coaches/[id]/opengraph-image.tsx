import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getCoachByParam, resolveImageUrl } from '@/lib/api';
import {
  getCoachOgDescription,
  getCoachOgTitle,
  getCoachSpecialty,
} from '@/lib/coach-og';

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

  const [coachResult, logoBuffer, arabicFont, latinFont, placeholderBuffer] =
    await Promise.all([
      getCoachByParam(id).catch(() => ({ coach: null })),
      loadAsset('public/icon-192.png'),
      loadAsset('assets/fonts/Cairo-Arabic-Bold.woff'),
      loadAsset('assets/fonts/Cairo-Latin-Bold.woff'),
      loadAsset('public/placeholder-coach.jpg'),
    ]);

  const coach = coachResult.coach;
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  const placeholderSrc = `data:image/jpeg;base64,${placeholderBuffer.toString('base64')}`;

  const title = coach ? getCoachOgTitle(coach) : 'Trainify';
  const name = coach?.name || 'Trainify';
  const specialty = coach ? getCoachSpecialty(coach) : 'منصة التدريب';
  const details = coach
    ? getCoachOgDescription(coach)
    : 'اشتراكك محمي من Trainify';

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
          background: '#111827',
          fontFamily: 'Cairo',
          color: '#FFFFFF',
        }}
      >
        {/* Coach photo — dominant */}
        <div
          style={{
            display: 'flex',
            width: 560,
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={photoSrc}
            width={560}
            height={630}
            alt={title}
            style={{ objectFit: 'cover', width: 560, height: 630 }}
          />
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 20,
              display: 'flex',
              background: '#FFFFFF',
              borderRadius: 10,
              border: '1px solid #111827',
              padding: 6,
            }}
          >
            <img src={logoSrc} width={44} height={44} alt="" style={{ borderRadius: 6 }} />
          </div>
        </div>

        {/* Details */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 640,
            height: '100%',
            padding: '48px 52px',
            background: '#111827',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
            <img
              src={logoSrc}
              width={56}
              height={56}
              alt="Trainify"
              style={{ borderRadius: 10, border: '1px solid #000000' }}
            />
            <div style={{ fontSize: 30, fontWeight: 700, marginLeft: 14 }}>Trainify</div>
          </div>

          <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            {name}
          </div>
          <div style={{ fontSize: 28, color: '#FED7AA', lineHeight: 1.35, marginBottom: 28 }}>
            {specialty}
          </div>
          <div
            style={{
              display: 'flex',
              background: '#EA580C',
              borderRadius: 14,
              padding: '16px 22px',
              fontSize: 22,
              color: '#FFF7ED',
              lineHeight: 1.4,
            }}
          >
            {details}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cairo', data: arabicFont, style: 'normal', weight: 700 },
        { name: 'Cairo', data: latinFont, style: 'normal', weight: 700 },
      ],
    }
  );
}
