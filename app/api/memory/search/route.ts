import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const WORKSPACE = '/home/mktwopointzero/.openclaw/workspace';

export async function GET(req: NextRequest) {
  const session = req.cookies.get('ultron_session')?.value;
  if (session !== 'ultron-authenticated') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const q = req.nextUrl.searchParams.get('q')?.toLowerCase();
  if (!q) return NextResponse.json({ results: [] });

  const results: { file: string; line: number; text: string }[] = [];
  
  function searchFile(filePath: string, name: string) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      content.split('\n').forEach((line, i) => {
        if (line.toLowerCase().includes(q!)) {
          results.push({ file: name, line: i + 1, text: line.trim().slice(0, 200) });
        }
      });
    } catch {}
  }

  for (const f of ['MEMORY.md', 'AGENTS.md', 'TOOLS.md', 'SOUL.md', 'USER.md']) {
    const fp = path.join(WORKSPACE, f);
    if (fs.existsSync(fp)) searchFile(fp, f);
  }

  const memDir = path.join(WORKSPACE, 'memory');
  if (fs.existsSync(memDir)) {
    for (const f of fs.readdirSync(memDir)) {
      if (f.endsWith('.md') || f.endsWith('.json')) {
        searchFile(path.join(memDir, f), `memory/${f}`);
      }
    }
  }

  return NextResponse.json({ results: results.slice(0, 100) });
}
