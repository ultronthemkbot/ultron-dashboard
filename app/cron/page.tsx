'use client';
import { Clock, Play, Pause, AlertTriangle, Calendar, Target, Hash } from 'lucide-react';

const jobs = [
  { name: 'Nikhil Kamath YouTube', schedule: 'Every hour', status: 'disabled', desc: 'Check for new podcast videos', lastRun: 'Feb 25', target: 'Both groups' },
  { name: 'Daily AI Podcast', schedule: '12:00 PM PKT', status: 'active', desc: 'Find and share AI podcast episodes', lastRun: 'Feb 27', target: 'Both groups' },
  { name: 'Nightly Self-Improvement', schedule: '9:00 PM PKT', status: 'active', desc: 'Memory maintenance and review', lastRun: 'Feb 26', target: 'Internal' },
];

const statusMap: Record<string, {color: string; bg: string; label: string; Icon: any}> = {
  active: { color: '#22c55e', bg: 'rgba(34,197,94,0.08)', label: 'ACTIVE', Icon: Play },
  disabled: { color: '#eab308', bg: 'rgba(234,179,8,0.08)', label: 'PAUSED', Icon: Pause },
  error: { color: '#e53935', bg: 'rgba(229,57,53,0.08)', label: 'ERROR', Icon: AlertTriangle },
};

export default function CronPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>Cron Jobs</h2>
          <p style={{ fontSize: '12px', color: '#5a5a78', margin: 0 }}>Scheduled tasks and automation</p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(34,197,94,0.08)', color: '#22c55e', fontWeight: 500 }}>2 Active</span>
          <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(234,179,8,0.08)', color: '#eab308', fontWeight: 500 }}>1 Paused</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {jobs.map(job => {
          const s = statusMap[job.status];
          return (
            <div key={job.name} style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px', padding: '16px', borderLeft: `2px solid ${s.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.Icon size={13} color={s.color} />
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#fff', margin: 0 }}>{job.name}</h3>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: s.bg, color: s.color, letterSpacing: '0.5px' }}>{s.label}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#5a5a78', margin: '0 0 10px' }}>{job.desc}</p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { Icon: Clock, label: job.schedule },
                  { Icon: Target, label: job.target },
                  { Icon: Calendar, label: `Last: ${job.lastRun}` },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <m.Icon size={11} color="#5a5a78" />
                    <span style={{ fontSize: '11px', color: '#6b6b88' }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
