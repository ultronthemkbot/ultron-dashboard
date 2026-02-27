'use client';
import { Zap, FileText, Calendar, Search, FolderOpen, Save, MessageCircle, Globe, Brain, Bot, Send, CheckCircle } from 'lucide-react';

const sessionFlow = [
  { title: 'Wake Up', desc: 'Fresh session starts with no prior memory', Icon: Zap, color: '#e53935' },
  { title: 'Load Memory Index', desc: 'Read MEMORY.md (~1KB lightweight index)', Icon: FileText, color: '#ff6f61' },
  { title: 'Load Daily Log', desc: 'Read memory/YYYY-MM-DD.md for recent context', Icon: Calendar, color: '#eab308' },
  { title: 'Semantic Search', desc: 'On-demand search across all memory files', Icon: Search, color: '#3b82f6' },
  { title: 'Load Topic File', desc: 'Load specific topic when needed', Icon: FolderOpen, color: '#a855f7' },
  { title: 'Write Back', desc: 'Save new learnings to files', Icon: Save, color: '#22c55e' },
];

const messageFlow = [
  { title: 'WhatsApp Message', desc: 'User sends message', Icon: MessageCircle, color: '#22c55e' },
  { title: 'Gateway', desc: 'Port 18789 receives & routes', Icon: Globe, color: '#3b82f6' },
  { title: 'Main Agent', desc: 'Claude processes message', Icon: Brain, color: '#a855f7' },
  { title: 'Sub-Agent', desc: 'Spawned for heavy tasks', Icon: Bot, color: '#ff6f61' },
  { title: 'Announce', desc: 'Native delivery system', Icon: Send, color: '#e53935' },
  { title: 'Response', desc: 'Delivered to user', Icon: CheckCircle, color: '#22c55e' },
];

function FlowCard({ title, icon: HeaderIcon, items, headerColor }: { title: string; icon: any; items: typeof sessionFlow; headerColor: string }) {
  return (
    <div style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #1a1a2e', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `${headerColor}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HeaderIcon size={14} color={headerColor} />
        </div>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>{title}</h3>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {items.map((step, i) => (
          <div key={step.title} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
            {/* Connector */}
            {i < items.length - 1 && (
              <div style={{ position: 'absolute', left: '15px', top: '36px', bottom: '-4px', width: '1px', background: `linear-gradient(180deg, ${step.color}40, transparent)` }} />
            )}
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${step.color}10`, border: `1px solid ${step.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
              <step.Icon size={14} color={step.color} strokeWidth={1.8} />
            </div>
            <div style={{ paddingBottom: i < items.length - 1 ? '16px' : '4px', flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#e0e0e8', margin: 0 }}>{step.title}</p>
              <p style={{ fontSize: '11px', color: '#5a5a78', margin: '2px 0 0' }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FlowPage() {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>Architecture</h2>
        <p style={{ fontSize: '12px', color: '#5a5a78', margin: 0 }}>System flow and message pipeline</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }} className="md:!grid-cols-2">
        <FlowCard title="Session Flow" icon={Zap} items={sessionFlow} headerColor="#e53935" />
        <FlowCard title="Message Pipeline" icon={MessageCircle} items={messageFlow} headerColor="#3b82f6" />
      </div>

      {/* Tech Stack */}
      <div style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px', overflow: 'hidden', marginTop: '12px' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #1a1a2e' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>Tech Stack</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: '#1a1a2e' }}>
          {[
            { name: 'OpenClaw', desc: 'Core Platform', color: '#e53935' },
            { name: 'Claude Sonnet', desc: 'Primary Model', color: '#3b82f6' },
            { name: 'WhatsApp', desc: 'Messaging', color: '#22c55e' },
            { name: 'Groq Whisper', desc: 'Voice → Text', color: '#a855f7' },
            { name: 'YouTube API', desc: 'Video Tracking', color: '#ff6f61' },
            { name: 'Next.js', desc: 'Dashboard', color: '#f0f0f5' },
          ].map(t => (
            <div key={t.name} style={{ background: '#0d0d14', padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: t.color, margin: 0 }}>{t.name}</p>
              <p style={{ fontSize: '10px', color: '#5a5a78', margin: '2px 0 0' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
