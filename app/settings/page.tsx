'use client';
import { useRouter } from 'next/navigation';
import { Server, Cpu, MessageCircle, Key, LogOut, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) });
    router.push('/login');
    router.refresh();
  };

  const sections = [
    { title: 'System', Icon: Server, color: '#3b82f6', items: [
      ['Platform', 'OpenClaw'], ['Host', 'WSL2 / Linux x64'], ['Node', 'v22.22.0'], ['Shell', 'bash'],
    ]},
    { title: 'AI Models', Icon: Cpu, color: '#a855f7', items: [
      ['Primary', 'claude-sonnet-4-6'], ['Models', '24 configured'], ['Fallback', 'Gemini → OpenRouter'], ['Embeddings', 'Gemini'],
    ]},
    { title: 'Messaging', Icon: MessageCircle, color: '#22c55e', items: [
      ['Channel', 'WhatsApp'], ['Gateway', 'Port 18789'], ['Groups', '2 active'], ['Mention', 'Not required'],
    ]},
    { title: 'APIs', Icon: Key, color: '#ff6f61', items: [
      ['YouTube', '✓ Configured'], ['Groq Whisper', '✓ Configured'], ['Edge TTS', '✓ Configured'], ['Brave Search', '✗ Missing'],
    ]},
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>Settings</h2>
          <p style={{ fontSize: '12px', color: '#5a5a78', margin: 0 }}>System configuration</p>
        </div>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px',
          background: 'rgba(229,57,53,0.08)', border: '1px solid rgba(229,57,53,0.15)', color: '#e53935',
          fontSize: '12px', fontWeight: 500, cursor: 'pointer',
        }}>
          <LogOut size={13} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {sections.map(s => (
          <div key={s.title} style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 14px', borderBottom: '1px solid #1a1a2e', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '5px', background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.Icon size={12} color={s.color} />
              </div>
              <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#fff', margin: 0 }}>{s.title}</h3>
            </div>
            <div style={{ padding: '4px 0' }}>
              {s.items.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px' }}>
                  <span style={{ fontSize: '11px', color: '#5a5a78' }}>{k}</span>
                  <span style={{ fontSize: '11px', color: v.startsWith('✗') ? '#e53935' : '#a0a0b8', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
