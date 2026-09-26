import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Scan, Recycle, BookOpen, MapPin, Trophy, ArrowRight,
  Leaf, Zap, Shield, Users, TrendingUp, CheckCircle, Star,
  Camera, Upload, ChevronRight
} from 'lucide-react';

const stats = [
  { value: '50K+', label: 'Waste Items Scanned' },
  { value: '32K+', label: 'Active Users' },
  { value: '12T', label: 'Waste Diverted from Landfill' },
  { value: '98%', label: 'AI Accuracy' },
];

const features = [
  { icon: Scan, title: 'AI Waste Scanner', desc: 'Instantly identify and classify any waste item using our advanced computer vision model.', color: '#10b981' },
  { icon: Trophy, title: 'Eco Gamification', desc: 'Earn Eco Points, unlock achievements, and climb the leaderboard for sustainable actions.', color: '#f59e0b' },
  { icon: MapPin, title: 'Recycling Centers', desc: 'Find the nearest recycling facility for any type of waste in your area.', color: '#3b82f6' },
  { icon: BookOpen, title: 'EcoLearn', desc: 'Access curated guides on waste segregation, composting, and sustainable living.', color: '#8b5cf6' },
  { icon: Users, title: 'Community Reports', desc: 'Report illegal dumping and overflowing bins to keep your community clean.', color: '#ef4444' },
  { icon: TrendingUp, title: 'Impact Dashboard', desc: 'Track your personal environmental contribution with beautiful analytics.', color: '#06b6d4' },
];

const steps = [
  { num: '01', icon: Upload, title: 'Scan', desc: 'Upload a photo or capture waste using your camera.' },
  { num: '02', icon: Zap, title: 'Identify', desc: 'Our AI analyzes the image and classifies the waste type.' },
  { num: '03', icon: Recycle, title: 'Sort', desc: 'Get the correct bin recommendation and disposal guide.' },
  { num: '04', icon: Star, title: 'Earn', desc: 'Earn Eco Points and track your environmental impact.' },
];

const categories = [
  { emoji: '🔵', label: 'Plastic', color: '#3b82f6' },
  { emoji: '🟡', label: 'Paper', color: '#f59e0b' },
  { emoji: '🟢', label: 'Organic', color: '#10b981' },
  { emoji: '⚪', label: 'Glass', color: '#9ca3af' },
  { emoji: '⚫', label: 'Metal', color: '#6b7280' },
  { emoji: '🟣', label: 'E-Waste', color: '#8b5cf6' },
  { emoji: '🔴', label: 'Hazardous', color: '#ef4444' },
  { emoji: '⚙️', label: 'General', color: '#64748b' },
];

const testimonials = [
  { name: 'Priya M.', role: 'Student', text: 'GreenBin helped me understand what to do with e-waste. Got 200 eco points in my first week!', rating: 5 },
  { name: 'Arjun K.', role: 'Household', text: 'Finally an app that makes recycling simple. The AI scanner is incredibly accurate.', rating: 5 },
  { name: 'EcoSociety', role: 'Organization', text: 'Our society\'s waste diversion rate went up 40% after using GreenBin collectively.', rating: 5 },
];

function CounterStat({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981', fontFamily: 'Plus Jakarta Sans' }}>{value}</div>
      <div style={{ color: '#a7f3d0', fontSize: '0.9rem', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function Landing() {
  const [scanDemo, setScanDemo] = useState(0);
  const scanSteps = ['📸 Capturing image...', '🔍 Detecting object...', '🧠 Classifying waste...', '✅ Plastic Bottle — Recyclable!'];

  useEffect(() => {
    const interval = setInterval(() => {
      setScanDemo(prev => (prev + 1) % scanSteps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ paddingTop: 64, background: 'var(--bg-dark)' }}>
      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden'
      }}>
        {/* BG orbs */}
        <div style={{
          position: 'absolute', top: '10%', left: '5%', width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%', width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>
          {/* Left */}
          <div className="fade-in-up">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 20, fontSize: '0.8rem', color: '#10b981', marginBottom: '1.5rem'
            }}>
              <Zap size={12} /> AI-Powered Waste Management
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Smart Waste.<br />
              <span className="gradient-text">Cleaner Future.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#a7f3d0', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 520 }}>
              GreenBin uses Artificial Intelligence to identify waste and guide you toward smarter disposal and recycling — earning Eco Points along the way.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/scan" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                🤖 Scan Your Waste <ArrowRight size={16} />
              </Link>
              <Link to="/ecolearn" className="btn-secondary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                ♻️ Explore EcoLearn
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: '2rem', flexWrap: 'wrap' }}>
              {[{ label: '8 Waste Categories', icon: '🗂️' }, { label: 'Real-time AI', icon: '⚡' }, { label: 'Free to Use', icon: '🆓' }].map(({ label, icon }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a7f3d0', fontSize: '0.875rem' }}>
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — AI Demo Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 340, background: 'var(--bg-card)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 24, padding: '1.5rem', boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              position: 'relative'
            }} className="float">
              {/* Mock image */}
              <div style={{
                height: 180, borderRadius: 16, background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
                border: '1px solid rgba(16,185,129,0.15)', position: 'relative', overflow: 'hidden'
              }}>
                <span style={{ fontSize: '5rem' }}>🍶</span>
                {/* Scan line */}
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                  animation: 'scan-line 2s linear infinite'
                }} />
                <div style={{
                  position: 'absolute', top: 8, right: 8, background: 'rgba(16,185,129,0.9)',
                  borderRadius: 6, padding: '3px 8px', fontSize: '0.7rem', fontWeight: 700, color: 'white'
                }}>AI SCANNING</div>
              </div>

              {/* Progress */}
              <div style={{
                background: 'rgba(16,185,129,0.05)', borderRadius: 12, padding: '0.75rem 1rem',
                marginBottom: '0.75rem', border: '1px solid rgba(16,185,129,0.1)'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600, marginBottom: 6 }}>
                  {scanSteps[scanDemo]}
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(scanDemo + 1) * 25}%` }} />
                </div>
              </div>

              {/* Result */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Item', value: 'Plastic Bottle' },
                  { label: 'Category', value: '🔵 Plastic' },
                  { label: 'Confidence', value: '96%' },
                  { label: 'Eco Points', value: '+10 🌱' },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: 'rgba(16,185,129,0.05)', borderRadius: 10, padding: '8px 10px',
                    border: '1px solid rgba(16,185,129,0.1)'
                  }}>
                    <div style={{ fontSize: '0.65rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0fdf4', marginTop: 2 }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 12, padding: '10px 14px', background: 'rgba(16,185,129,0.1)',
                borderRadius: 12, textAlign: 'center', border: '1px solid rgba(16,185,129,0.2)'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>
                  ♻️ Recyclable — Place in Blue Bin
                </span>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* STATS */}
      <section style={{ padding: '3rem 1.5rem', borderTop: '1px solid rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem' }}>
          {stats.map(s => <CounterStat key={s.label} {...s} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, fontSize: '0.8rem', color: '#10b981', marginBottom: '1rem' }}>
              Simple Process
            </div>
            <h2 className="section-title">How GreenBin Works</h2>
            <p className="section-subtitle">Four simple steps toward a cleaner planet</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
            {steps.map(({ num, icon: Icon, title, desc }, i) => (
              <div key={num} className="card" style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(16,185,129,0.4)', letterSpacing: 2, marginBottom: 12 }}>{num}</div>
                <div style={{
                  width: 56, height: 56, margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
                  borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(16,185,129,0.2)'
                }}>
                  <Icon size={24} color="#10b981" />
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</p>
                {i < 3 && (
                  <div style={{ position: 'absolute', right: -12, top: '40%', color: 'rgba(16,185,129,0.3)' }}>
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(16,185,129,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">Platform Features</h2>
            <p className="section-subtitle">Everything you need for smarter waste management</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">8 Waste Categories</h2>
            <p className="section-subtitle">Our AI recognizes all major waste types</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(({ emoji, label, color }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
                background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 20,
                fontSize: '0.9rem', fontWeight: 600, color: '#f0fdf4', transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 4px 20px ${color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {emoji} {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(16,185,129,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">What People Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {testimonials.map(({ name, role, text, rating }) => (
              <div key={name} className="card">
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: rating }).map((_, i) => <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />)}
                </div>
                <p style={{ color: '#d1fae5', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '0.85rem' }}>
                    {name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            width: 72, height: 72, margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(16,185,129,0.4)'
          }}>
            <Leaf size={36} color="white" />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
            Start Scanning Today
          </h2>
          <p style={{ color: '#a7f3d0', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Join 32,000+ users making smarter waste decisions every day. It's free, fast, and impactful.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
              Get Started — Free <ArrowRight size={16} />
            </Link>
            <Link to="/scan" className="btn-secondary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
              Try the Scanner
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(16,185,129,0.1)', padding: '2rem 1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <Leaf size={16} color="#10b981" />
          <span style={{ fontWeight: 700, color: '#10b981' }}>GreenBin</span>
          <span>— Smart Waste. Cleaner Future.</span>
        </div>
        <p>© 2026 GreenBin. Built for a sustainable planet. 🌍</p>
      </footer>
    </div>
  );
}
