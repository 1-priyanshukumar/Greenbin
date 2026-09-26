import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Leaf, AlertCircle } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(form.email, form.password);
      navigate(user.isAdmin ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)', filter: 'blur(40px)' }} />
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}>
              <Leaf size={22} color="white" />
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans' }}>Green<span style={{ color: '#10b981' }}>Bin</span></span>
          </Link>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>Welcome Back</h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Sign in to your GreenBin account</p>
        </div>

        <div className="card">
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, marginBottom: '1rem', fontSize: '0.875rem', color: '#ef4444' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                <input className="input" type="password" style={{ paddingLeft: 36 }} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '14px', marginTop: 4, opacity: loading ? 0.7 : 1 }}>
              {loading ? '⏳ Signing in...' : <><LogIn size={16} /> Sign In</>}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.25rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Don't have an account? <Link to="/register" style={{ color: '#10b981', fontWeight: 600 }}>Create one →</Link>
          </p>
          <div style={{ marginTop: '1rem', padding: '10px', background: 'rgba(245,158,11,0.1)', borderRadius: 10, border: '1px solid rgba(245,158,11,0.2)' }}>
            <p style={{ fontSize: '0.75rem', color: '#f59e0b', textAlign: 'center' }}>
              🔑 Demo: admin@greenbin.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
