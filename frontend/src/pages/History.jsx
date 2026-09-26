import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scan, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORY_CONFIG = {
  Plastic: { emoji: '🔵', color: '#3b82f6' },
  Paper: { emoji: '🟡', color: '#f59e0b' },
  Organic: { emoji: '🟢', color: '#10b981' },
  Glass: { emoji: '⚪', color: '#9ca3af' },
  Metal: { emoji: '⚫', color: '#6b7280' },
  'E-Waste': { emoji: '🟣', color: '#8b5cf6' },
  Hazardous: { emoji: '🔴', color: '#ef4444' },
  'General Waste': { emoji: '⚙️', color: '#64748b' },
};

const DEMO_HISTORY = [
  { _id: '1', detectedItem: 'Plastic Water Bottle', category: 'Plastic', confidence: 96, recyclable: true, points: 10, createdAt: '2026-09-26T10:12:00Z', disposalMethod: 'Recyclable Bin' },
  { _id: '2', detectedItem: 'Newspaper', category: 'Paper', confidence: 94, recyclable: true, points: 10, createdAt: '2026-09-25T15:30:00Z', disposalMethod: 'Paper Recycling' },
  { _id: '3', detectedItem: 'Banana Peel', category: 'Organic', confidence: 99, recyclable: false, points: 8, createdAt: '2026-09-24T08:45:00Z', disposalMethod: 'Compost Bin' },
  { _id: '4', detectedItem: 'Old Smartphone', category: 'E-Waste', confidence: 88, recyclable: false, points: 20, createdAt: '2026-09-23T14:20:00Z', disposalMethod: 'E-Waste Centre' },
  { _id: '5', detectedItem: 'Glass Bottle', category: 'Glass', confidence: 97, recyclable: true, points: 10, createdAt: '2026-09-22T11:00:00Z', disposalMethod: 'Glass Recycling' },
  { _id: '6', detectedItem: 'Aluminium Can', category: 'Metal', confidence: 95, recyclable: true, points: 10, createdAt: '2026-09-21T09:15:00Z', disposalMethod: 'Metal Recycling Bin' },
];

export default function History() {
  const [scans, setScans] = useState(DEMO_HISTORY);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/waste/history').then(r => {
      if (r.data.scans?.length) setScans(r.data.scans);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Object.keys(CATEGORY_CONFIG)];
  const filtered = filter === 'All' ? scans : scans.filter(s => s.category === filter);

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>My Waste History</h1>
            <p style={{ color: '#6b7280' }}>All your scan records in one place — <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}>*Demo data shown</span></p>
          </div>
          <Link to="/scan" className="btn-primary"><Scan size={16} /> New Scan</Link>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: '0.8rem', fontWeight: 600,
              background: filter === cat ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(16,185,129,0.1)',
              color: filter === cat ? 'white' : '#a7f3d0', transition: 'all 0.2s'
            }}>
              {cat !== 'All' && CATEGORY_CONFIG[cat]?.emoji + ' '}{cat}
            </button>
          ))}
        </div>

        {/* Scan list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(scan => {
            const cfg = CATEGORY_CONFIG[scan.category] || CATEGORY_CONFIG['General Waste'];
            return (
              <div key={scan._id} className="card" style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${cfg.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    {cfg.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>{scan.detectedItem}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span className="badge" style={{ background: `${cfg.color}20`, color: cfg.color, fontSize: '0.7rem' }}>{scan.category}</span>
                      {scan.recyclable ? <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>♻️ Recyclable</span> : <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>Non-Recyclable</span>}
                      <span style={{ fontSize: '0.72rem', color: '#6b7280', alignSelf: 'center' }}>{scan.confidence}% confidence</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {new Date(scan.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {scan.disposalMethod}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>+{scan.points}</div>
                    <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>eco pts</div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
              <Scan size={36} color="rgba(16,185,129,0.3)" style={{ margin: '0 auto 12px' }} />
              No scans found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
