import { cookies } from 'next/headers';

const TOKEN = 'ultron-authenticated';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get('ultron_session')?.value === TOKEN;
}

export function getToken() { return TOKEN; }
