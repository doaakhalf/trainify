/**
 * Shared client secret required on every backend `/api/*` request.
 * Prefer NEXT_PUBLIC_CLIENT_API_KEY (or CLIENT_API_KEY on the server).
 */
export const CLIENT_API_KEY =
  process.env.NEXT_PUBLIC_CLIENT_API_KEY ||
  process.env.CLIENT_API_KEY ||
  '9c621e8db2e69a8c9417164c6878b4809fa11e0e1a2c866400d33e6954041182';

export function getClientApiHeaders(
  extra: Record<string, string> = {}
): Record<string, string> {
  return {
    'X-Api-Key': CLIENT_API_KEY,
    ...extra,
  };
}
