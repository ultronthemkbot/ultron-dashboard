'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, Brain, GitBranch, Clock, Settings, Activity, Menu, X, BookOpen, Cpu } from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/memory', label: 'Memory', Icon: Brain },
  { href: '/neural-memory', label: 'Neural Memory', Icon: Cpu },
  { href: '/history', label: 'History', Icon: BookOpen },
  { href: '/flow', label: 'Architecture', Icon: GitBranch },
  { href: '/cron', label: 'Cron Jobs', Icon: Clock },
  { href: '/settings', label: 'Settings', Icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      <div style={{ padding: '20px 16px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #e53935, #ff6f61)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #e53935, #ff6f61)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ULTRON</p>
            <p style={{ fontSize: '9px', color: '#5a5a78', letterSpacing: '2px', margin: 0 }}>DASHBOARD</p>
          </div>
        </div>
      </div>
      <div style={{ margin: '0 12px 8px', height: '1px', background: '#1a1a2e' }} />
      <nav style={{ padding: '4px 8px', flex: 1 }}>
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '8px', marginBottom: '2px',
              fontSize: '13px', fontWeight: active ? 500 : 400, textDecoration: 'none',
              color: active ? '#fff' : '#6b6b88',
              background: active ? 'rgba(229,57,53,0.08)' : 'transparent',
              borderLeft: active ? '2px solid #e53935' : '2px solid transparent',
            }}>
              <Icon size={16} strokeWidth={active ? 2 : 1.5} style={{ opacity: active ? 1 : 0.5 }} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div style={{ margin: '8px 10px 12px', padding: '12px', borderRadius: '10px', background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#22c55e' }}>Online</span>
          <span style={{ fontSize: '10px', color: '#5a5a78', marginLeft: 'auto' }}>v2.0</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile bar */}
      <div className="md:!hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '52px', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: 'rgba(6,6,10,0.97)', borderBottom: '1px solid #1a1a2e' }}>
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
          {open ? <X size={20} color="#f0f0f5" /> : <Menu size={20} color="#f0f0f5" />}
        </button>
        <span style={{ fontSize: '14px', fontWeight: 700, background: 'linear-gradient(135deg, #e53935, #ff6f61)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ULTRON</span>
        <div style={{ width: '28px' }} />
      </div>

      {open && <div className="md:!hidden" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} onClick={() => setOpen(false)} />}

      {/* Mobile sidebar */}
      {open && (
        <aside className="md:!hidden" style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '240px', zIndex: 45, display: 'flex', flexDirection: 'column', background: '#0a0a10', borderRight: '1px solid #1a1a2e' }}>
          {nav}
        </aside>
      )}

      {/* Desktop sidebar */}
      <aside className="!hidden md:!flex" style={{ position: 'sticky', top: 0, height: '100vh', width: '220px', flexShrink: 0, flexDirection: 'column', background: '#0a0a10', borderRight: '1px solid #1a1a2e' }}>
        {nav}
      </aside>
    </>
  );
}
