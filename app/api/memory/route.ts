import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LOCAL_WORKSPACE = '/home/mktwopointzero/.openclaw/workspace';
const BUNDLED_DATA = path.join(process.cwd(), 'data');

// Use local workspace if available, otherwise bundled data
const WORKSPACE = fs.existsSync(LOCAL_WORKSPACE) ? LOCAL_WORKSPACE : BUNDLED_DATA;

function getMemoryFiles(): { name: string; path: string; size: number; modified: string }[] {
  const files: { name: string; path: string; size: number; modified: string }[] = [];

  for (const f of ['MEMORY.md', 'AGENTS.md', 'TOOLS.md', 'SOUL.md', 'USER.md']) {
    const fp = path.join(WORKSPACE, f);
    if (fs.existsSync(fp)) {
      const stat = fs.statSync(fp);
      files.push({ name: f, path: f, size: stat.size, modified: stat.mtime.toISOString() });
    }
  }

  const memDir = path.join(WORKSPACE, 'memory');
  if (fs.existsSync(memDir)) {
    for (const f of fs.readdirSync(memDir)) {
      if (f.endsWith('.md') || f.endsWith('.json')) {
        const fp = path.join(memDir, f);
        const stat = fs.statSync(fp);
        files.push({ name: f, path: `memory/${f}`, size: stat.size, modified: stat.mtime.toISOString() });
      }
    }
  }

  return files;
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get('ultron_session')?.value;
  if (session !== 'ultron-authenticated') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const file = req.nextUrl.searchParams.get('file');
  if (file) {
    const fp = path.join(WORKSPACE, file);
    if (!fp.startsWith(WORKSPACE) || !fs.existsSync(fp)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const content = fs.readFileSync(fp, 'utf-8');
    return NextResponse.json({ file, content });
  }

  return NextResponse.json({ files: getMemoryFiles() });
}
