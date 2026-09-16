import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getCoachByParam, resolveImageUrl } from '@/lib/api';
import { getCoachOgTitle, getCoachSpecialty } from '@/lib/coach-og';

export const alt = 'مدرب على Trainify';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadAsset(relativePath: string) {
  return readFile(join(process.cwd(), relativePath));
}

async function toDataUri(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return null;
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    return `data:${contentType};base64,${buffer.toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ coach }, logoBuffer, fontBuffer, placeholderBuffer] = await Promise.all([
    getCoachByParam(id),
    loadAsset('public/logo.png'),
    loadAsset('assets/fonts/Cairo-Bold.ttf'),
    loadAsset('public/placeholder-coach.jpg'),
  ]);

  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  const placeholderSrc = `data:image/jpeg;base64,${placeholderBuffer.toString('base64')}`;

  const title = coach ? getCoachOgTitle(coach) : 'Trainify';
  const specialty = coach ? getCoachSpecialty(coach) : 'منصة التدريب';
  const name = coach?.name || 'Trainify';

  let photoSrc = placeholderSrc;
  if (coach?.profileImage) {
    const absolute = resolveImageUrl(coach.profileImage);
    const dataUri =
      absolute.startsWith('http://') || absolute.startsWith('https://')
        ? await toDataUri(absolute)
        : absolute.startsWith('/')
          ? `data:image/jpeg;base64,${(await loadAsset(`public${absolute}`)).toString('base64')}`
          : null;
    if (dataUri) photoSrc = dataUri;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'stretch',
          background: 'linear-gradient(135deg, #111827 0%, #1F2937 55%, #0F172A 100%)',
          fontFamily: 'Cairo',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 20%, rgba(249,115,22,0.28), transparent 45%), radial-gradient(circle at 85% 80%, rgba(249,115,22,0.18), transparent 40%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 64px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={logoSrc}
              width={72}
              height={72}
              alt="Trainify"
              style={{
                borderRadius: 14,
                border: '1px solid rgba(0,0,0,0.35)',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#F9FAFB',
              }}
            >
              <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.1 }}>Trainify</span>
              <span style={{ fontSize: 20, color: '#FDBA74', marginTop: 4 }}>مدرب موثق</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              textAlign: 'right',
              direction: 'rtl',
              gap: 14,
              maxWidth: 620,
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.2,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: 30,
                color: '#FED7AA',
                lineHeight: 1.35,
              }}
            >
              {specialty}
            </div>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(249,115,22,0.18)',
                border: '1px solid rgba(249,115,22,0.45)',
                borderRadius: 999,
                padding: '12px 22px',
                color: '#FFEDD5',
                fontSize: 22,
              }}
            >
              اشتراكك محمي من Trainify
            </div>
          </div>
        </div>

        <div
          style={{
            width: 520,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 40px 48px 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 420,
              height: 520,
              borderRadius: 36,
              overflow: 'hidden',
              border: '4px solid rgba(249,115,22,0.55)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
              display: 'flex',
              position: 'relative',
            }}
          >
            <img
              src={photoSrc}
              width={420}
              height={520}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 18,
                bottom: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 12,
                border: '1px solid #111827',
                padding: 6,
              }}
            >
              <img src={logoSrc} width={44} height={44} alt="" style={{ borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Cairo',
          data: fontBuffer,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
