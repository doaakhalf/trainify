import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { success: false, message: 'Coach registration from the website is closed.' },
    { status: 403 }
  );
}
