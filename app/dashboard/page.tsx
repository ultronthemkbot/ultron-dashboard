'use client';
import { useEffect, useState } from 'react';
import { Activity, Cpu, Database, Server, Layers, Users, Clock, TrendingUp, FileText, ChevronRight } from 'lucide-react';

interface MemFile { name: string; path: string; size: number; modified: string; }

export default function DashboardPage() {
  const [files, setFiles] = useState<MemFile[]>([]);
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch('/api/memory').then(r => r.json()).then(d => setFiles(d.files || []));
    setTime(new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: true, month: 'short', day: 'numeric' }));
  }, []);

  const totalSize = files.reduce((a, f) => a + f.size, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', margin: 0 }}>Dashboard</h2>
          <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontWeight: 500 }}>LIVE</span>
        </div>
        <p style={{ fontSize: '12px', color: '#5a5a78', margin: 0 }}>{time}</p>
      </div>

      {/* Stat Cards 2x2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'Status', value: 'Online', Icon: Activity, color: '#22c55e' },
          { label: 'Model', value: 'Sonnet 4', Icon: Cpu, color: '#3b82f6' },
          { label: 'Models', value: '24', Icon: Layers, color: '#a855f7' },
          { label: 'Files', value: String(files.length), Icon: Database, color: '#e53935' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px', padding: '16px',
            borderTop: `2px solid ${s.color}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '10px', fontWeight: 500, color: '#5a5a78', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</span>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.Icon size={14} color={s.color} strokeWidth={2} />
              </div>
            </div>
            <p style={{ fontSize: '20px', fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Metrics bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', marginBottom: '20px', background: '#1a1a2e', borderRadius: '10px', overflow: 'hidden' }}>
        {[
          { l: 'Memory', v: `${(totalSize/1024).toFixed(0)}K`, Icon: Database },
          { l: 'Groups', v: '2', Icon: Users },
          { l: 'Cron', v: '3', Icon: Clock },
          { l: 'Uptime', v: '99%', Icon: TrendingUp },
        ].map(q => (
          <div key={q.l} style={{ background: '#0d0d14', textAlign: 'center', padding: '12px 4px' }}>
            <q.Icon size={14} color="#5a5a78" style={{ margin: '0 auto 6px', display: 'block' }} />
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#f0f0f5', margin: 0 }}>{q.v}</p>
            <p style={{ fontSize: '9px', color: '#5a5a78', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{q.l}</p>
          </div>
        ))}
      </div>

      {/* File list */}
      <div style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #1a1a2e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={14} color="#5a5a78" />
            <h3 style={{ fontSize: '13px', fontWeight: 500, color: '#fff', margin: 0 }}>Memory Files</h3>
          </div>
          <a href="/memory" style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px', color: '#e53935', textDecoration: 'none', fontWeight: 500 }}>
            View all <ChevronRight size={12} />
          </a>
        </div>
        {files.slice(0, 8).map((f, i) => (
          <div key={f.path} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 16px', borderBottom: i < 7 ? '1px solid rgba(26,26,46,0.5)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: f.name.endsWith('.json') ? '#a855f7' : '#3b82f6', flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#d0d0e0', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.path}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: '8px' }}>
              <span style={{ fontSize: '10px', color: '#5a5a78' }}>{(f.size / 1024).toFixed(1)}K</span>
              <span style={{ fontSize: '10px', color: '#3a3a55' }}>
                {new Date(f.modified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
