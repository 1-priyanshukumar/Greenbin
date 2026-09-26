import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Award, Scan, Recycle, Leaf, Star } from 'lucide-react';

const ACHIEVEMENTS = [
  { id: 'first_scan', icon: '🏅', title: 'First Scan', desc: 'Completed your first waste scan', earned: true },
  { id: 'recycle_10', icon: '♻️', title: '10 Recyclable', desc: 'Correctly segregated 10 recyclable items', earned: true },
  { id: 'eco_learner', icon: '🌱', title: 'Eco Learner', desc: 'Completed 5 EcoLearn articles', earned: false },
  { id: 'community_reporter', icon: '🚨', title: 'Community Reporter', desc: 'Submitted a waste problem report', earned: false },
  { id: 'planet_protector', icon: '🌍', title: 'Planet Protector', desc: 'Reached 1500+ Eco Points', earned: false },
  { id: 'streak_7', icon: '🔥', title: '7-Day Streak', desc: 'Scanned waste 7 days in a row', earned: false },
];

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  const joined = new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container" style={{ maxWidth: 800 }}>
        {/* Profile header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.05))',
          border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, padding: '2rem',
          display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem'
        }}>
          <div style={{
            width: 90, height: 90, borderRadius: 20,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', fontWeight: 800, color: 'white', flexShrink: 0,
            boxShadow: '0 0 30px rgba(16,185,129,0.4)'
          }}>
            {user.name[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>{user.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280', fontSize: '0.875rem', marginBottom: 8 }}>
              <Mail size={14} /> {user.email}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="badge badge-green">🌿 {user.level || 'Green Explorer'}</span>
              {user.isAdmin && <span className="badge badge-blue">⚙️ Admin</span>}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981' }}>{user.ecoPoints || 840}</div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Eco Points</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: Scan, label: 'Total Scans', value: user.totalScans || 128, color: '#10b981' },
            { icon: Recycle, label: 'Recyclable', value: user.recyclable || 76, color: '#3b82f6' },
            { icon: Leaf, label: 'Organic', value: user.organic || 31, color: '#059669' },
            { icon: Award, label: 'Eco Points', value: user.ecoPoints || 840, color: '#f59e0b' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="stat-card">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <Icon size={18} color={color} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f0fdf4', fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
              <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Info card */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Account Info</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { label: 'Full Name', value: user.name, icon: User },
              { label: 'Email', value: user.email, icon: Mail },
              { label: 'Member Since', value: joined, icon: Calendar },
              { label: 'Current Level', value: user.level || '🌿 Green Explorer', icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} style={{ padding: '12px', background: 'rgba(16,185,129,0.05)', borderRadius: 10, border: '1px solid rgba(16,185,129,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280', fontSize: '0.75rem', marginBottom: 4 }}>
                  <Icon size={12} /> {label}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0fdf4' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>🏆 Achievements</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.id} style={{
                padding: '1rem', borderRadius: 12, textAlign: 'center',
                background: a.earned ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.05)',
                border: `1px solid ${a.earned ? 'rgba(16,185,129,0.3)' : 'rgba(107,114,128,0.2)'}`,
                opacity: a.earned ? 1 : 0.5, transition: 'all 0.2s'
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{a.earned ? a.icon : '🔒'}</div>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: 4, color: a.earned ? '#f0fdf4' : '#6b7280' }}>{a.title}</div>
                <div style={{ fontSize: '0.7rem', color: '#6b7280', lineHeight: 1.4 }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
