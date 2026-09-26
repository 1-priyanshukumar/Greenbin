import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import { Leaf, Scan, Recycle, Zap, Award, TrendingUp, Target } from 'lucide-react';

const LEVEL_CONFIG = [
  { name: '🌱 Eco Beginner', min: 0, max: 100, color: '#6b7280' },
  { name: '🌿 Green Explorer', min: 101, max: 500, color: '#10b981' },
  { name: '🌳 Eco Champion', min: 501, max: 1500, color: '#059669' },
  { name: '🌍 Planet Protector', min: 1501, max: Infinity, color: '#f59e0b' },
];

const CATEGORY_COLORS = ['#10b981','#3b82f6','#f59e0b','#9ca3af','#6b7280','#8b5cf6','#64748b'];
const CATEGORIES = ['Plastic','Paper','Organic','Glass','Metal','E-Waste','Other'];

const DEMO_STATS = { totalScans: 128, recyclable: 76, organic: 31, eWaste: 8, ecoPoints: 840 };
const DEMO_PIE = CATEGORIES.map((name, i) => ({ name, value: [35, 20, 31, 12, 8, 8, 14][i] }));
const DEMO_MONTHLY = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'].map((m, i) => ({ month: m, scans: [12,18,15,22,19,25,30,28,35][i], recycled: [8,12,10,16,14,18,22,20,26][i] }));

function getLevelInfo(points) {
  return LEVEL_CONFIG.find(l => points >= l.min && points <= l.max) || LEVEL_CONFIG[0];
}

function StatCard({ icon: Icon, label, value, color = '#10b981', sub }) {
  return (
    <div className="stat-card">
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f0fdf4', fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
      <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ color, fontSize: '0.75rem', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#111814', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: '0.8rem' }}>
      <div style={{ color: '#10b981', fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: '#a7f3d0' }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(DEMO_STATS);
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    axios.get('/api/dashboard/stats').then(r => setStats(r.data)).catch(() => {});
    axios.get('/api/waste/history?limit=5').then(r => setRecentScans(r.data.scans || [])).catch(() => {});
  }, []);

  const level = getLevelInfo(stats.ecoPoints);
  const nextLevel = LEVEL_CONFIG[LEVEL_CONFIG.findIndex(l => l.name === level.name) + 1];
  const progress = nextLevel
    ? ((stats.ecoPoints - level.min) / (nextLevel.min - level.min)) * 100
    : 100;

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>
              Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p style={{ color: '#6b7280' }}>Your environmental impact dashboard — <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}>*Demo values shown</span></p>
          </div>
          <Link to="/scan" className="btn-primary">
            <Scan size={16} /> Scan Waste
          </Link>
        </div>

        {/* Level Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.05))',
          border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16, padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1 }}>Current Level</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: level.color }}>{level.name}</div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.8rem', color: '#a7f3d0' }}>
              <span>{stats.ecoPoints} pts</span>
              {nextLevel && <span>Next: {nextLevel.name} at {nextLevel.min} pts</span>}
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>{stats.ecoPoints}</div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Eco Points</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <StatCard icon={Scan} label="Total Scans" value={stats.totalScans} color="#10b981" />
          <StatCard icon={Recycle} label="Recyclable" value={stats.recyclable} color="#3b82f6" />
          <StatCard icon={Leaf} label="Organic Waste" value={stats.organic} color="#059669" />
          <StatCard icon={Zap} label="E-Waste" value={stats.eWaste} color="#8b5cf6" />
          <StatCard icon={Award} label="Eco Points" value={stats.ecoPoints} color="#f59e0b" />
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Donut */}
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Waste Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={DEMO_PIE} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {DEMO_PIE.map((_, i) => <Cell key={i} fill={CATEGORY_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#111814', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, fontSize: '0.8rem' }} />
                <Legend formatter={v => <span style={{ color: '#a7f3d0', fontSize: '0.75rem' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly */}
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Monthly Activity</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={DEMO_MONTHLY} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.1)" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={v => <span style={{ color: '#a7f3d0', fontSize: '0.75rem' }}>{v}</span>} />
                <Bar dataKey="scans" fill="#10b981" name="Scans" radius={[4,4,0,0]} />
                <Bar dataKey="recycled" fill="#059669" name="Recycled" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 700 }}>Recent Scans</h3>
            <Link to="/history" style={{ color: '#10b981', fontSize: '0.85rem', textDecoration: 'none' }}>View All →</Link>
          </div>
          {recentScans.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentScans.map(scan => (
                <div key={scan._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(16,185,129,0.05)', borderRadius: 10, border: '1px solid rgba(16,185,129,0.1)' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{scan.detectedItem}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{scan.category} · {new Date(scan.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>+{scan.points} pts</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{scan.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
              <Scan size={30} color="rgba(16,185,129,0.3)" style={{ margin: '0 auto 8px' }} />
              <p>No scans yet. <Link to="/scan" style={{ color: '#10b981' }}>Scan your first item!</Link></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
