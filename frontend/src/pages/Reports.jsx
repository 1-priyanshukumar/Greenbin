import React, { useState } from 'react';
import axios from 'axios';
import { Flag, Upload, MapPin, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';

const ISSUE_TYPES = ['Overflowing Garbage Bin', 'Illegal Dumping', 'Uncollected Waste', 'Plastic Accumulation', 'E-Waste Dumping', 'Other'];

const DEMO_REPORTS = [
  { id: 'R-001', issue: 'Overflowing Garbage Bin', location: 'MG Road, near bus stop', date: '26 Sep 2026', status: 'Resolved', color: '#10b981' },
  { id: 'R-002', issue: 'Illegal Dumping', location: 'Whitefield Lake area', date: '24 Sep 2026', status: 'Assigned', color: '#f59e0b' },
  { id: 'R-003', issue: 'E-Waste Dumping', location: 'BTM Layout 2nd Stage', date: '22 Sep 2026', status: 'Under Review', color: '#3b82f6' },
];

const STATUS_STEPS = ['Submitted', 'Under Review', 'Assigned', 'Resolved'];

function StatusBadge({ status }) {
  const colors = { Submitted: '#6b7280', 'Under Review': '#3b82f6', Assigned: '#f59e0b', Resolved: '#10b981' };
  return <span className="badge" style={{ background: `${colors[status]}20`, color: colors[status] }}>{status}</span>;
}

export default function Reports() {
  const [form, setForm] = useState({ issueType: '', location: '', description: '' });
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setImage(e.target.result);
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);
      await axios.post('/api/reports', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="section-title">🚨 Report Waste Problem</h1>
          <p style={{ color: '#6b7280' }}>Help keep your community clean by reporting waste issues</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: 'rgba(16,185,129,0.08)', borderRadius: 12, padding: 4, marginBottom: '2rem' }}>
          {[['submit', '📝 Submit Report'], ['track', '📊 My Reports']].map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '10px', borders: 'none', border: 'none', cursor: 'pointer',
              borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
              background: activeTab === tab ? 'linear-gradient(135deg,#10b981,#059669)' : 'transparent',
              color: activeTab === tab ? 'white' : '#a7f3d0'
            }}>{label}</button>
          ))}
        </div>

        {activeTab === 'submit' && (
          !submitted ? (
            <form onSubmit={handleSubmit} className="card">
              <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Issue Details</h3>

              {/* Issue type */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0', marginBottom: 6 }}>Issue Type *</label>
                <select className="input" value={form.issueType} onChange={e => setForm({ ...form, issueType: e.target.value })} required style={{ background: 'rgba(16,185,129,0.05)' }}>
                  <option value="">Select an issue type</option>
                  {ISSUE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Location */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0', marginBottom: 6 }}>Location *</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                  <input className="input" style={{ paddingLeft: 36 }} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Address or landmark" required />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0', marginBottom: 6 }}>Description</label>
                <textarea className="input" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue in detail..." style={{ resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              {/* Photo upload */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0', marginBottom: 6 }}>Photo (Optional)</label>
                <div onClick={() => document.getElementById('report-photo').click()} style={{
                  border: '2px dashed rgba(16,185,129,0.3)', borderRadius: 12, padding: '1.5rem',
                  textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s'
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#10b981'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'}
                >
                  {image ? (
                    <img src={image} alt="report" style={{ maxHeight: 150, maxWidth: '100%', borderRadius: 8 }} />
                  ) : (
                    <>
                      <Upload size={24} color="#10b981" style={{ margin: '0 auto 8px' }} />
                      <div style={{ color: '#a7f3d0', fontSize: '0.875rem' }}>Click to upload a photo</div>
                    </>
                  )}
                </div>
                <input id="report-photo" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                {loading ? '⏳ Submitting...' : '🚨 Submit Report'}
              </button>
            </form>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Report Submitted!</h2>
              <p style={{ color: '#a7f3d0', marginBottom: '2rem' }}>Your report has been received and will be reviewed by our team.</p>
              {/* Status tracker */}
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '2rem' }}>
                <div style={{ position: 'absolute', top: 16, left: '15%', right: '15%', height: 2, background: 'rgba(16,185,129,0.2)' }} />
                <div style={{ position: 'absolute', top: 16, left: '15%', width: '15%', height: 2, background: '#10b981' }} />
                {STATUS_STEPS.map((step, i) => (
                  <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '25%' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', zIndex: 1,
                      background: i === 0 ? '#10b981' : 'rgba(16,185,129,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {i === 0 ? <CheckCircle size={16} color="white" /> : <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{i + 1}</span>}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: i === 0 ? '#10b981' : '#6b7280', textAlign: 'center' }}>{step}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setSubmitted(false); setForm({ issueType: '', location: '', description: '' }); setImage(null); }} className="btn-primary">
                Submit Another Report
              </button>
            </div>
          )
        )}

        {activeTab === 'track' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ color: '#f59e0b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>*Demo reports shown — login to see your actual reports</p>
            {DEMO_REPORTS.map(r => (
              <div key={r.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ color: '#6b7280', fontSize: '0.8rem', fontFamily: 'monospace' }}>{r.id}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.issue}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6b7280', fontSize: '0.8rem' }}>
                      <MapPin size={12} /> {r.location}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{r.date}</div>
                  </div>
                </div>
                {/* Mini status bar */}
                <div style={{ display: 'flex', gap: 6, marginTop: '1rem' }}>
                  {STATUS_STEPS.map((step, i) => {
                    const currentIdx = STATUS_STEPS.indexOf(r.status);
                    return (
                      <div key={step} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= currentIdx ? r.color : 'rgba(107,114,128,0.2)', transition: 'background 0.3s' }} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
