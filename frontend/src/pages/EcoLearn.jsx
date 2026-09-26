import React, { useState } from 'react';
import { BookOpen, ChevronRight, X } from 'lucide-react';

const ARTICLES = [
  { id: 1, title: 'How to Segregate Household Waste', category: 'Basics', emoji: '🏠', read: '4 min', points: 5, content: 'Start by separating your waste into dry and wet categories. Wet waste includes food scraps, vegetable peels, and fruit waste — these go into the green compost bin. Dry waste includes plastics, paper, glass, and metals — these are recyclable. Keep hazardous items like batteries and medicines separate.' },
  { id: 2, title: 'How to Recycle Plastic Correctly', category: 'Plastic', emoji: '🔵', read: '5 min', points: 5, content: 'Not all plastics are the same. Check the recycling number (1–7) on the bottom. PET (1) and HDPE (2) are widely accepted. Always rinse containers before recycling. Remove lids (they may be a different plastic type). Flatten bottles to save space. Never bag your recyclables in plastic bags.' },
  { id: 3, title: 'Paper Recycling Guide', category: 'Paper', emoji: '🟡', read: '3 min', points: 5, content: 'Paper and cardboard are among the easiest materials to recycle. Keep paper dry — wet paper cannot be recycled. Break down cardboard boxes. Do not recycle greasy pizza boxes; tear off the clean top and recycle only that. Remove staples and plastic windows from envelopes.' },
  { id: 4, title: 'Safe E-Waste Disposal', category: 'E-Waste', emoji: '🟣', read: '6 min', points: 10, content: 'Electronic waste contains hazardous materials like lead, mercury and cadmium. Never put e-waste in regular bins. Find authorized e-waste collection centers near you using the GreenBin Centers map. Many manufacturers and retailers offer take-back programs. Remove personal data before disposing of devices.' },
  { id: 5, title: 'What is Composting?', category: 'Organic', emoji: '🟢', read: '5 min', points: 5, content: 'Composting converts organic waste into nutrient-rich soil amendment. You can compost fruit and vegetable peels, coffee grounds, eggshells, and garden waste. Do not compost meat, dairy, or oily foods at home. Keep the pile moist and aerated. Ready compost looks like dark, crumbly soil and smells earthy.' },
  { id: 6, title: 'Understanding Hazardous Waste', category: 'Hazardous', emoji: '🔴', read: '7 min', points: 10, content: 'Hazardous waste includes chemicals, paints, pesticides, certain batteries (lead-acid, lithium), and medical waste. These require specialized disposal to prevent soil and water contamination. Never pour chemicals down drains. Check for local household hazardous waste collection events.' },
  { id: 7, title: 'Reducing Single-Use Plastic', category: 'Lifestyle', emoji: '♻️', read: '4 min', points: 5, content: 'Switch to reusable shopping bags, water bottles, and coffee cups. Refuse straws and single-use cutlery. Choose products with minimal or recyclable packaging. Buy in bulk to reduce packaging waste. Support brands committed to sustainable packaging.' },
  { id: 8, title: 'Reuse vs Recycle', category: 'Basics', emoji: '🔄', read: '3 min', points: 5, content: 'Reuse is always better than recycling because it requires no processing energy. Before recycling, ask: Can I use this again? Glass jars become storage containers. Old clothing becomes cleaning rags. Recycling should be the last resort before landfill — give items a second life first.' },
  { id: 9, title: 'Common Waste Mistakes', category: 'Basics', emoji: '⚠️', read: '4 min', points: 5, content: 'Wishful recycling (throwing questionable items in the recycling bin) contaminates entire loads. Never bag recyclables in plastic grocery bags. Pizza boxes with grease belong in general waste. Coffee cups have a plastic lining and often cannot be recycled. Shredded paper is too small for sorting machines — bag it separately.' },
];

const CATEGORIES_FILTER = ['All', 'Basics', 'Plastic', 'Paper', 'Organic', 'E-Waste', 'Hazardous', 'Lifestyle'];

export default function EcoLearn() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [read, setRead] = useState(new Set());

  const filtered = filter === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === filter);

  const markRead = (id) => setRead(prev => new Set([...prev, id]));

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, fontSize: '0.8rem', color: '#10b981', marginBottom: '1rem' }}>
            <BookOpen size={12} /> Educational Hub
          </div>
          <h1 className="section-title">🌱 EcoLearn</h1>
          <p style={{ color: '#6b7280' }}>Expand your knowledge on waste management and sustainability</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {CATEGORIES_FILTER.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.8rem',
              background: filter === cat ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(16,185,129,0.1)',
              color: filter === cat ? 'white' : '#a7f3d0',
              transition: 'all 0.2s'
            }}>{cat}</button>
          ))}
        </div>

        {/* Article grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem' }}>
          {filtered.map(article => (
            <div key={article.id} className="card" style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => { setSelected(article); markRead(article.id); }}>
              {read.has(article.id) && (
                <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
              )}
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{article.emoji}</div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{article.category}</span>
                <span className="badge badge-yellow" style={{ fontSize: '0.7rem' }}>+{article.points} pts</span>
                <span style={{ fontSize: '0.7rem', color: '#6b7280', alignSelf: 'center' }}>📖 {article.read}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, lineHeight: 1.4 }}>{article.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.6 }}>{article.content.slice(0, 80)}...</p>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4, color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>
                Read More <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Article Modal */}
        {selected && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
          }} onClick={() => setSelected(null)}>
            <div style={{
              background: '#111814', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20,
              padding: '2rem', maxWidth: 580, width: '100%', maxHeight: '85vh', overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem' }}>{selected.emoji}</div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="badge badge-green">{selected.category}</span>
                <span className="badge badge-yellow">+{selected.points} Eco Points</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', alignSelf: 'center' }}>📖 {selected.read} read</span>
              </div>
              <h2 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1.3rem', lineHeight: 1.4 }}>{selected.title}</h2>
              <p style={{ color: '#a7f3d0', lineHeight: 1.8, fontSize: '0.95rem' }}>{selected.content}</p>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16,185,129,0.1)', borderRadius: 12, border: '1px solid rgba(16,185,129,0.2)' }}>
                <div style={{ color: '#10b981', fontWeight: 700, marginBottom: 4 }}>🌱 +{selected.points} Eco Points Earned!</div>
                <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>Keep learning to earn more points and unlock achievements.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
