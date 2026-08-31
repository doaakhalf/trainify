import { NextRequest, NextResponse } from 'next/server';

const MAX_REGISTER_FILE_BYTES = 10 * 1024 * 1024;
const MAX_REGISTER_REQUEST_BYTES = 25 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // Get the FormData from the request
    const formData = await request.formData();

    // Keep the per-file ceiling separate from the total request ceiling.
    // Ten processed gallery images can legitimately be sent together.
    let totalFileBytes = 0;
    for (const value of formData.values()) {
      if (value instanceof File) {
        if (value.size > MAX_REGISTER_FILE_BYTES) {
          return NextResponse.json(
            { success: false, message: 'An uploaded image exceeds the 10MB limit' },
            { status: 413 }
          );
        }
        totalFileBytes += value.size;
      }
    }

    if (totalFileBytes > MAX_REGISTER_REQUEST_BYTES) {
      return NextResponse.json(
        { success: false, message: 'The total uploaded images exceed the 25MB request limit' },
        { status: 413 }
      );
    }

    // Forward the request to the backend
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(
      'https://promax-node-production-7c35.up.railway.app/api/register',
      {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    // Get the response data
    const data = await response.json();

    // Return the response with the same status code
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, message: 'Request timeout' },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
