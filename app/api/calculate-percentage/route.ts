import { NextRequest, NextResponse } from 'next/server';

const CALCULATE_PERCENTAGE_URL =
  'https://promax-node-production-7c35.up.railway.app/api/calculate-percentage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const price = Number(body?.price);

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid price' },
        { status: 400 }
      );
    }

    const response = await fetch(CALCULATE_PERCENTAGE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price }),
      cache: 'no-store',
    });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to calculate price' },
      { status: 502 }
    );
  }
}
