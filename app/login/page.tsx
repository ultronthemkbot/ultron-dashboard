'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) { router.push('/dashboard'); router.refresh(); } else { setError('Access denied'); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#06060a', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(229,57,53,0.06)', filter: 'blur(100px)' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(168,85,247,0.04)', filter: 'blur(100px)' }} />

      <div style={{ width: '100%', maxWidth: '360px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '56px', height: '56px', margin: '0 auto 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e53935, #ff6f61)' }}>
            <Activity size={24} color="#fff" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 6px', background: 'linear-gradient(135deg, #e53935, #ff6f61)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ULTRON</h1>
          <p style={{ color: '#5a5a78', fontSize: '11px', letterSpacing: '2px', margin: 0 }}>AI SYSTEM DASHBOARD</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(13,13,20,0.9)', border: '1px solid #1a1a2e', borderRadius: '16px', padding: '28px' }}>
          <form onSubmit={handleLogin}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5a5a78', fontSize: '11px', fontWeight: 500, marginBottom: '10px' }}>
              <Lock size={12} /> PASSWORD
            </label>
            <input type="password" placeholder="Enter access code" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus
              style={{ width: '100%', padding: '13px 14px', fontSize: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid #1a1a2e', borderRadius: '10px', color: '#f0f0f5', outline: 'none', marginBottom: '14px', boxSizing: 'border-box' as const }}
              onFocus={e => e.target.style.borderColor = '#e53935'}
              onBlur={e => e.target.style.borderColor = '#1a1a2e'}
            />
            {error && (
              <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(229,57,53,0.06)', border: '1px solid rgba(229,57,53,0.15)', marginBottom: '14px', fontSize: '12px', color: '#e53935' }}>
                {error}
              </div>
            )}
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '13px', color: '#fff', cursor: 'pointer',
              background: 'linear-gradient(135deg, #e53935, #ff6f61)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              opacity: loading ? 0.6 : 1,
            }}>
              {loading ? <><Loader2 size={15} className="animate-spin" /> Verifying...</> : <>Access Dashboard <ArrowRight size={14} /></>}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#3a3a55', fontSize: '10px' }}>Secured • Unauthorized access prohibited</p>
      </div>
    </div>
  );
}
