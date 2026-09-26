import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Medal, Crown, Users, TrendingUp } from 'lucide-react';

const DEMO_LEADERS = [
  { rank: 1, name: 'EcoHero2026', points: 2450, scans: 184, level: '🌍 Planet Protector', badge: '👑' },
  { rank: 2, name: 'GreenWarrior', points: 2180, scans: 162, level: '🌍 Planet Protector', badge: '🥈' },
  { rank: 3, name: 'RecyclePlus', points: 1940, scans: 145, level: '🌳 Eco Champion', badge: '🥉' },
  { rank: 4, name: 'CleanEarth99', points: 1750, scans: 130, level: '🌳 Eco Champion', badge: null },
  { rank: 5, name: 'SustainaUser', points: 1480, scans: 119, level: '🌳 Eco Champion', badge: null },
  { rank: 6, name: 'EcoFriend42', points: 1290, scans: 104, level: '🌿 Green Explorer', badge: null },
  { rank: 7, name: 'GreenBinner', points: 1105, scans: 88, level: '🌿 Green Explorer', badge: null },
  { rank: 8, name: 'WasteWatcher', points: 960, scans: 76, level: '🌿 Green Explorer', badge: null },
  { rank: 9, name: 'EcoRising', points: 780, scans: 62, level: '🌿 Green Explorer', badge: null },
  { rank: 10, name: 'PlanetFirst', points: 620, scans: 49, level: '🌿 Green Explorer', badge: null },
];

const FILTERS = ['Weekly', 'Monthly', 'All Time'];
const SCOPES = ['Global', 'College', 'Society', 'Community'];

const getRankColor = (rank) => {
  if (rank === 1) return '#f59e0b';
  if (rank === 2) return '#9ca3af';
  if (rank === 3) return '#92400e';
  return '#374151';
};

export default function Leaderboard() {
  const [filter, setFilter] = useState('All Time');
  const [scope, setScope] = useState('Global');
  const [leaders, setLeaders] = useState(DEMO_LEADERS);

  useEffect(() => {
    axios.get(`/api/leaderboard?period=${filter.toLowerCase().replace(' ', '_')}`).then(r => {
      if (r.data?.length) setLeaders(r.data);
    }).catch(() => {});
  }, [filter]);

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="section-title">🏆 Leaderboard</h1>
          <p style={{ color: '#6b7280' }}>Top eco-warriors making a real difference — display names only for privacy</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'rgba(16,185,129,0.08)', borderRadius: 12, padding: 4 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.8rem', transition: 'all 0.2s',
                background: filter === f ? 'linear-gradient(135deg,#10b981,#059669)' : 'transparent',
                color: filter === f ? 'white' : '#a7f3d0',
              }}>{f}</button>
            ))}
          </div>
          <div style={{ display: 'flex', background: 'rgba(16,185,129,0.08)', borderRadius: 12, padding: 4 }}>
            {SCOPES.map(s => (
              <button key={s} onClick={() => setScope(s)} style={{
                padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.75rem', transition: 'all 0.2s',
                background: scope === s ? 'rgba(16,185,129,0.3)' : 'transparent',
                color: scope === s ? '#10b981' : '#a7f3d0',
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '2rem', padding: '0 1rem' }}>
          {[top3[1], top3[0], top3[2]].map((user, idx) => {
            if (!user) return null;
            const heights = [160, 200, 140];
            const colors = ['#9ca3af', '#f59e0b', '#92400e'];
            return (
              <div key={user.rank} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: `${colors[idx]}15`, border: `1px solid ${colors[idx]}30`,
                borderRadius: '16px 16px 0 0', padding: '1rem 0.75rem',
                height: heights[idx], justifyContent: 'flex-end'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{user.badge}</div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${colors[idx]}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, color: colors[idx], marginBottom: 6 }}>
                  #{user.rank}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', textAlign: 'center', marginBottom: 2 }}>{user.name}</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: colors[idx] }}>{user.points.toLocaleString()}</div>
                <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>eco points</div>
              </div>
            );
          })}
        </div>

        {/* Rest */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rest.map(user => (
            <div key={user.rank} style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '14px 18px',
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14,
              transition: 'all 0.2s', cursor: 'default'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(107,114,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#6b7280', fontSize: '0.9rem' }}>
                {user.rank}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{user.level} · {user.scans} scans</div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#10b981', fontFamily: 'Plus Jakarta Sans' }}>
                {user.points.toLocaleString()}
                <span style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 400, marginLeft: 4 }}>pts</span>
              </div>
            </div>
          ))}
        </div>

        {/* Your ranking */}
        <div style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14, textAlign: 'center' }}>
          <p style={{ color: '#a7f3d0', fontSize: '0.9rem' }}>
            🌱 Login to see your ranking and compete with the community!
          </p>
        </div>
      </div>
    </div>
  );
}
