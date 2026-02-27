import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LOCAL_WORKSPACE = '/home/mktwopointzero/.openclaw/workspace';
const BUNDLED_DATA = path.join(process.cwd(), 'data');
const WORKSPACE = fs.existsSync(LOCAL_WORKSPACE) ? LOCAL_WORKSPACE : BUNDLED_DATA;
const MEMORY_DIR = path.join(WORKSPACE, 'memory');

interface DailyEntry {
  date: string;
  file: string;
  size: number;
  preview: string;
  sections: string[];
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get('ultron_session')?.value;
  if (session !== 'ultron-authenticated') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dateParam = req.nextUrl.searchParams.get('date');

  if (dateParam) {
    const fp = path.join(MEMORY_DIR, `${dateParam}.md`);
    if (!fs.existsSync(fp)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const content = fs.readFileSync(fp, 'utf-8');
    return NextResponse.json({ date: dateParam, content });
  }

  if (!fs.existsSync(MEMORY_DIR)) return NextResponse.json({ entries: [] });

  const entries: DailyEntry[] = [];
  const files = fs.readdirSync(MEMORY_DIR)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse();

  for (const f of files) {
    const fp = path.join(MEMORY_DIR, f);
    const stat = fs.statSync(fp);
    const content = fs.readFileSync(fp, 'utf-8');
    const date = f.replace('.md', '');
    const sections = content.match(/^## .+$/gm)?.map(s => s.replace('## ', '')) || [];
    const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    const preview = lines.slice(0, 2).join(' ').slice(0, 150);
    entries.push({ date, file: f, size: stat.size, preview, sections });
  }

  return NextResponse.json({ entries });
}
