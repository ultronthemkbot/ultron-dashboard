'use client';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06060a' }}>
      <Sidebar />
      <main style={{ flex: 1, minHeight: '100vh', marginTop: '56px', overflowY: 'auto' }} className="md:!mt-0">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }} className="md:!p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
