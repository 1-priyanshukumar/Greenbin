import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Leaf, AlertCircle, CheckCircle } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2 : 3;
  const strengthColors = ['transparent', '#ef4444', '#f59e0b', '#10b981'];
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)', filter: 'blur(60px)' }} />
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}>
              <Leaf size={22} color="white" />
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans' }}>Green<span style={{ color: '#10b981' }}>Bin</span></span>
          </Link>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>Join GreenBin</h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Start earning Eco Points today</p>
        </div>

        <div className="card">
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, marginBottom: '1rem', fontSize: '0.875rem', color: '#ef4444' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0', marginBottom: 6 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input className="input" style={{ paddingLeft: 36 }} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0', marginBottom: 6 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input className="input" type="email" style={{ paddingLeft: 36 }} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input className="input" type="password" style={{ paddingLeft: 36 }} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" required />
              </div>
              {form.password.length > 0 && (
                <div style={{ marginTop: 6, display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColors[strength] : 'rgba(107,114,128,0.3)', transition: 'background 0.2s' }} />)}
                  <span style={{ fontSize: '0.7rem', color: strengthColors[strength], marginLeft: 4 }}>{strengthLabels[strength]}</span>
                </div>
              )}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0', marginBottom: 6 }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input className="input" type="password" style={{ paddingLeft: 36 }} value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} placeholder="••••••••" required />
                {form.confirm && form.password === form.confirm && <CheckCircle size={16} color="#10b981" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }} />}
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '14px', marginTop: 4, opacity: loading ? 0.7 : 1 }}>
              {loading ? '⏳ Creating account...' : '🌱 Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.25rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Already have an account? <Link to="/login" style={{ color: '#10b981', fontWeight: 600 }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
