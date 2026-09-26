import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, Scan, Flag, Recycle, CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react';

const DEMO_STATS = { users: 32840, scans: 187450, reports: 1293, recyclable: 94200, eWaste: 8700, resolved: 1104 };
const DEMO_PIE = [
  { name: 'Plastic', value: 35 }, { name: 'Paper', value: 20 }, { name: 'Organic', value: 25 },
  { name: 'Glass', value: 8 }, { name: 'Metal', value: 5 }, { name: 'E-Waste', value: 7 }
];
const COLORS = ['#3b82f6','#f59e0b','#10b981','#9ca3af','#6b7280','#8b5cf6'];
const DEMO_MONTHLY = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'].map((m, i) => ({ month: m, scans: [8200,9400,10200,11800,12400,15200,18900,20100,22000][i] }));
const DEMO_REPORTS_LIST = [
  { id: 'R-001', issue: 'Overflowing Garbage Bin', location: 'MG Road', by: 'User#4821', date: '26 Sep', status: 'Resolved' },
  { id: 'R-002', issue: 'Illegal Dumping', location: 'Whitefield Lake', by: 'User#3310', date: '24 Sep', status: 'Assigned' },
  { id: 'R-003', issue: 'E-Waste Dumping', location: 'BTM Layout', by: 'User#2901', date: '22 Sep', status: 'Under Review' },
  { id: 'R-004', issue: 'Plastic Accumulation', location: 'Koramangala', by: 'User#5512', date: '20 Sep', status: 'Submitted' },
];

const STATUS_COLORS = { Resolved: '#10b981', Assigned: '#f59e0b', 'Under Review': '#3b82f6', Submitted: '#6b7280' };

function StatBig({ icon: Icon, label, value, color }) {
  return (
    <div className="stat-card">
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f0fdf4', fontFamily: 'Plus Jakarta Sans' }}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div style={{ color: '#6b7280', fontSize: '0.78rem', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function Admin() {
  const [stats, setStats] = useState(DEMO_STATS);
  const [reports, setReports] = useState(DEMO_REPORTS_LIST);
  const [reportStatuses, setReportStatuses] = useState({});

  useEffect(() => {
    axios.get('/api/admin/stats').then(r => setStats(r.data)).catch(() => {});
    axios.get('/api/admin/reports').then(r => { if (r.data.length) setReports(r.data); }).catch(() => {});
  }, []);

  const updateStatus = async (id, newStatus) => {
    setReportStatuses(prev => ({ ...prev, [id]: newStatus }));
    axios.patch(`/api/reports/${id}/status`, { status: newStatus }).catch(() => {});
  };

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>⚙️ Admin Dashboard</h1>
            <p style={{ color: '#f59e0b', fontSize: '0.8rem' }}>Protected — Admin access only · *Demo data shown</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-green"><Zap size={12} /> Live Platform</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <StatBig icon={Users} label="Total Users" value={stats.users} color="#10b981" />
          <StatBig icon={Scan} label="Total Scans" value={stats.scans} color="#3b82f6" />
          <StatBig icon={Flag} label="Total Reports" value={stats.reports} color="#f59e0b" />
          <StatBig icon={Recycle} label="Recyclable" value={stats.recyclable} color="#059669" />
          <StatBig icon={Zap} label="E-Waste Handled" value={stats.eWaste} color="#8b5cf6" />
          <StatBig icon={CheckCircle} label="Resolved Reports" value={stats.resolved} color="#10b981" />
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Monthly Scan Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={DEMO_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.1)" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111814', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, fontSize: '0.8rem' }} />
                <Bar dataKey="scans" fill="#10b981" radius={[4,4,0,0]} name="Scans" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Waste Category Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={DEMO_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {DEMO_PIE.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#111814', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, fontSize: '0.8rem' }} />
                <Legend formatter={v => <span style={{ color: '#a7f3d0', fontSize: '0.7rem' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports management */}
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Community Reports</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(16,185,129,0.15)' }}>
                  {['Report ID', 'Issue', 'Location', 'Reported By', 'Date', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#6b7280', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map(r => {
                  const currentStatus = reportStatuses[r.id] || r.status;
                  return (
                    <tr key={r.id} style={{ borderBottom: '1px solid rgba(16,185,129,0.06)', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '12px' }}><span style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '0.8rem' }}>{r.id}</span></td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{r.issue}</td>
                      <td style={{ padding: '12px', color: '#a7f3d0' }}>{r.location}</td>
                      <td style={{ padding: '12px', color: '#6b7280' }}>{r.by}</td>
                      <td style={{ padding: '12px', color: '#6b7280' }}>{r.date}</td>
                      <td style={{ padding: '12px' }}>
                        <span className="badge" style={{ background: `${STATUS_COLORS[currentStatus]}20`, color: STATUS_COLORS[currentStatus] }}>{currentStatus}</span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <select style={{
                          background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)',
                          borderRadius: 6, padding: '4px 8px', color: '#a7f3d0', fontSize: '0.75rem', cursor: 'pointer'
                        }} value={currentStatus} onChange={e => updateStatus(r.id, e.target.value)}>
                          {['Submitted', 'Under Review', 'Assigned', 'Resolved'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
