'use client';
import { useEffect, useState } from 'react';
import { Search, FileText, ChevronRight, Database, Loader2 } from 'lucide-react';

interface MemFile { name: string; path: string; size: number; modified: string; }

export default function MemoryPage() {
  const [files, setFiles] = useState<MemFile[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<{file:string; line:number; text:string}[]>([]);
  const [allContents, setAllContents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/memory').then(r => r.json()).then(d => {
      setFiles(d.files || []);
      (d.files || []).forEach((f: MemFile) => {
        fetch(`/api/memory?file=${encodeURIComponent(f.path)}`).then(r => r.json()).then(d => {
          setAllContents(prev => ({...prev, [f.path]: d.content || ''}));
        });
      });
    });
  }, []);

  const loadFile = async (path: string) => {
    setLoading(true); setSelected(path);
    const res = await fetch(`/api/memory?file=${encodeURIComponent(path)}`);
    const data = await res.json();
    setContent(data.content || 'Empty');
    setLoading(false);
  };

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); return; }
    const q = search.toLowerCase();
    const results: {file:string; line:number; text:string}[] = [];
    Object.entries(allContents).forEach(([file, content]) => {
      content.split('\n').forEach((line, i) => {
        if (line.toLowerCase().includes(q)) results.push({ file, line: i + 1, text: line });
      });
    });
    setSearchResults(results.slice(0, 30));
  }, [search, allContents]);

  const totalSize = files.reduce((a, f) => a + f.size, 0);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>Memory</h2>
        <p style={{ fontSize: '12px', color: '#5a5a78', margin: 0 }}>{files.length} files • {(totalSize / 1024).toFixed(1)} KB</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search size={15} color="#5a5a78" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input type="text" placeholder="Search across all files..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '11px 14px 11px 40px', background: 'rgba(255,255,255,0.03)', border: '1px solid #1a1a2e', borderRadius: '10px', color: '#f0f0f5', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {/* Search results */}
      {searchResults.length > 0 && (
        <div style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '10px', marginBottom: '16px', maxHeight: '250px', overflow: 'auto' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #1a1a2e', fontSize: '11px', color: '#5a5a78' }}>{searchResults.length} results</div>
          {searchResults.map((r, i) => (
            <div key={i} onClick={() => loadFile(r.file)} style={{ padding: '8px 14px', borderBottom: '1px solid rgba(26,26,46,0.5)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '3px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>{r.file}</span>
                <span style={{ fontSize: '10px', color: '#5a5a78' }}>:{r.line}</span>
              </div>
              <p style={{ fontSize: '11px', color: '#a0a0b8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* File list */}
      <div style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '10px', marginBottom: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #1a1a2e', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Database size={13} color="#5a5a78" />
          <span style={{ fontSize: '12px', fontWeight: 500, color: '#fff' }}>Files</span>
        </div>
        {files.map(f => (
          <button key={f.path} onClick={() => loadFile(f.path)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            padding: '10px 14px', background: selected === f.path ? 'rgba(229,57,53,0.06)' : 'transparent',
            border: 'none', borderBottom: '1px solid rgba(26,26,46,0.4)', cursor: 'pointer', textAlign: 'left',
            borderLeft: selected === f.path ? '2px solid #e53935' : '2px solid transparent',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '2px', background: f.name.endsWith('.json') ? '#a855f7' : '#3b82f6', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: selected === f.path ? '#fff' : '#a0a0b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.path}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', color: '#5a5a78' }}>{(f.size/1024).toFixed(1)}K</span>
              <ChevronRight size={12} color="#3a3a55" />
            </div>
          </button>
        ))}
      </div>

      {/* Content viewer */}
      <div style={{ background: '#08080e', border: '1px solid #1a1a2e', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #1a1a2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: selected ? '#ff6f61' : '#5a5a78', fontFamily: 'monospace' }}>{selected || 'No file selected'}</span>
          {selected && <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '3px', background: 'rgba(34,197,94,0.08)', color: '#22c55e' }}>LOADED</span>}
        </div>
        <div style={{ padding: '14px', minHeight: '200px', maxHeight: '400px', overflow: 'auto' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <Loader2 size={20} color="#e53935" className="animate-spin" />
            </div>
          ) : (
            <pre style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '12px', lineHeight: 1.7, color: '#a0a0b8', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {content || 'Select a file to view contents'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
