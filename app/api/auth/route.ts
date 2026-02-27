import { NextRequest, NextResponse } from 'next/server';

const TOKEN = 'ultron-authenticated';

export async function POST(req: NextRequest) {
  const { password, action } = await req.json();
  
  if (action === 'logout') {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete('ultron_session');
    return res;
  }

  if (password === process.env.DASHBOARD_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('ultron_session', TOKEN, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get('ultron_session')?.value;
  return NextResponse.json({ authenticated: session === TOKEN });
}
