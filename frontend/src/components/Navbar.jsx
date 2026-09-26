import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Leaf, Scan, LayoutDashboard, BookOpen, MapPin,
  Trophy, Flag, LogIn, LogOut, User, Menu, X, ChevronDown
} from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home', icon: Leaf },
  { to: '/scan', label: 'Scan Waste', icon: Scan },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ecolearn', label: 'EcoLearn', icon: BookOpen },
  { to: '/centers', label: 'Centers', icon: MapPin },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/reports', label: 'Reports', icon: Flag },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(10,15,13,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(16,185,129,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px rgba(16,185,129,0.4)'
          }}>
            <Leaf size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans', color: '#f0fdf4' }}>
            Green<span style={{ color: '#10b981' }}>Bin</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
                borderRadius: 8, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                color: active ? '#10b981' : '#a7f3d0',
                background: active ? 'rgba(16,185,129,0.1)' : 'transparent',
                transition: 'all 0.2s ease'
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(16,185,129,0.07)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button onClick={() => setProfileOpen(!profileOpen)} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 10, cursor: 'pointer', color: '#10b981', fontSize: '0.875rem', fontWeight: 600
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <User size={14} color="white" />
                </div>
                {user.name.split(' ')[0]}
                <ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: '#111814', border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: 12, padding: 8, minWidth: 180,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 100
                }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(16,185,129,0.1)', marginBottom: 4 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f0fdf4' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{user.email}</div>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: 2 }}>🌿 {user.ecoPoints} Eco Points</div>
                  </div>
                  {[
                    { to: '/profile', label: 'Profile', icon: User },
                    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    ...(user.isAdmin ? [{ to: '/admin', label: 'Admin Panel', icon: Flag }] : [])
                  ].map(({ to, label, icon: Icon }) => (
                    <Link key={to} to={to} onClick={() => setProfileOpen(false)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                      borderRadius: 8, textDecoration: 'none', color: '#a7f3d0', fontSize: '0.85rem',
                      transition: 'background 0.2s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Icon size={14} /> {label}
                    </Link>
                  ))}
                  <button onClick={handleLogout} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                    borderRadius: 8, color: '#ef4444', fontSize: '0.85rem', background: 'none',
                    border: 'none', cursor: 'pointer', width: '100%', transition: 'background 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>
                <LogIn size={15} /> Login
              </Link>
              <Link to="/scan" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>
                <Scan size={15} /> Scan Waste
              </Link>
            </>
          )}
          {/* Mobile menu */}
          <button onClick={() => setOpen(!open)} style={{
            background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', padding: 4,
            display: 'none'
          }} className="mobile-menu-btn">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          background: 'rgba(10,15,13,0.98)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(16,185,129,0.1)', padding: '1rem 1.5rem 1.5rem'
        }}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
              borderBottom: '1px solid rgba(16,185,129,0.05)', textDecoration: 'none',
              color: location.pathname === to ? '#10b981' : '#a7f3d0', fontWeight: 500
            }}>
              <Icon size={16} /> {label}
            </Link>
          ))}
          {!user && (
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <Link to="/login" className="btn-secondary" onClick={() => setOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>Login</Link>
              <Link to="/register" className="btn-primary" onClick={() => setOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>Register</Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
