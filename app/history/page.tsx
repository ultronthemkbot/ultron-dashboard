'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Calendar, Clock, FileText, ChevronDown, ChevronUp, ArrowLeft, Hash, BookOpen } from 'lucide-react';

interface DailyEntry {
  date: string;
  file: string;
  size: number;
  preview: string;
  sections: string[];
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/history').then(r => r.json()).then(d => {
      setEntries(d.entries || []);
      setLoading(false);
    });
  }, []);

  const openDay = async (date: string) => {
    setSelectedDate(date);
    setContent('Loading...');
    const r = await fetch(`/api/history?date=${date}`);
    const d = await r.json();
    setContent(d.content || 'No content');
  };

  const formatDate = (ds: string) => {
    const d = new Date(ds + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const isToday = (ds: string) => {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' });
    return ds === today;
  };

  const daysAgo = (ds: string) => {
    const now = new Date();
    const then = new Date(ds + 'T00:00:00');
    const diff = Math.floor((now.getTime() - then.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06060a' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '20px', paddingTop: '68px', maxWidth: '900px', margin: '0 auto' }}
        className="md:!pt-5">

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          {selectedDate ? (
            <button onClick={() => setSelectedDate(null)} style={{
              display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none',
              color: '#e53935', cursor: 'pointer', fontSize: '12px', fontWeight: 500, marginBottom: '8px', padding: 0
            }}>
              <ArrowLeft size={14} /> Back to timeline
            </button>
          ) : null}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(229,57,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} color="#e53935" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', margin: 0 }}>
                {selectedDate ? formatDate(selectedDate) : 'History'}
              </h2>
              <p style={{ fontSize: '12px', color: '#5a5a78', margin: 0 }}>
                {selectedDate ? daysAgo(selectedDate) : `${entries.length} daily logs`}
              </p>
            </div>
          </div>
        </div>

        {/* Content view */}
        {selectedDate ? (
          <div style={{
            background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px', padding: '20px',
          }}>
            <pre style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: '13px', lineHeight: 1.7, color: '#d0d0e0',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
            }}>
              {content}
            </pre>
          </div>
        ) : (
          /* Timeline */
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '15px', top: '8px', bottom: '8px',
              width: '2px', background: 'linear-gradient(to bottom, #e53935, #1a1a2e)',
              borderRadius: '1px',
            }} />

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#5a5a78' }}>Loading...</div>
            ) : entries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#5a5a78' }}>
                <Calendar size={40} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
                <p style={{ fontSize: '14px' }}>No daily logs yet</p>
              </div>
            ) : (
              entries.map((entry, i) => (
                <div key={entry.date} style={{ position: 'relative', paddingLeft: '40px', marginBottom: '12px' }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: '9px', top: '18px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: isToday(entry.date) ? '#e53935' : '#1a1a2e',
                    border: `2px solid ${isToday(entry.date) ? '#e53935' : '#2a2a45'}`,
                    boxShadow: isToday(entry.date) ? '0 0 8px rgba(229,57,53,0.5)' : 'none',
                  }} />

                  {/* Card */}
                  <div
                    onClick={() => openDay(entry.date)}
                    style={{
                      background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px',
                      padding: '16px', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#252540';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#1a1a2e';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: isToday(entry.date) ? '#e53935' : '#f0f0f5' }}>
                          {entry.date}
                        </span>
                        {isToday(entry.date) && (
                          <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(229,57,53,0.1)', color: '#e53935', fontWeight: 600 }}>TODAY</span>
                        )}
                      </div>
                      <span style={{ fontSize: '10px', color: '#5a5a78' }}>{(entry.size / 1024).toFixed(1)}K</span>
                    </div>

                    {/* Section tags */}
                    {entry.sections.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        {entry.sections.map(s => (
                          <span key={s} style={{
                            fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
                            background: 'rgba(59,130,246,0.08)', color: '#3b82f6', fontWeight: 500,
                          }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Preview */}
                    {entry.preview && (
                      <p style={{ fontSize: '12px', color: '#5a5a78', margin: 0, lineHeight: 1.5 }}>
                        {entry.preview}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
