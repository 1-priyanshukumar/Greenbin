import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Clock, Phone, Navigation, Search } from 'lucide-react';

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="width:32px;height:32px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.3)"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const CENTERS = [
  { id: 1, name: 'GreenCycle Recycling Hub', address: '24 MG Road, Bangalore 560001', lat: 12.9758, lng: 77.6094, types: ['Plastic','Paper','Glass','Metal'], hours: 'Mon–Sat 8am–6pm', phone: '+91-80-2345-6789', color: '#10b981' },
  { id: 2, name: 'E-Waste Disposal Centre', address: '56 Indiranagar, Bangalore 560038', lat: 12.9784, lng: 77.6408, types: ['E-Waste','Batteries'], hours: 'Mon–Fri 9am–5pm', phone: '+91-80-4567-8901', color: '#8b5cf6' },
  { id: 3, name: 'City Composting Yard', address: 'Whitefield Main Rd, Bangalore 566066', lat: 12.9698, lng: 77.7499, types: ['Organic','Garden Waste'], hours: 'Daily 7am–8pm', phone: '+91-80-2109-3456', color: '#059669' },
  { id: 4, name: 'Hazardous Waste Facility', address: 'KSPCB Campus, Rajajinagar 560010', lat: 13.0068, lng: 77.5562, types: ['Hazardous','Chemicals','Medical'], hours: 'Mon–Fri 10am–4pm', phone: '+91-80-2338-5555', color: '#ef4444' },
  { id: 5, name: 'Paper & Cardboard Recycler', address: '18 Koramangala 4th Block, 560034', lat: 12.9339, lng: 77.6271, types: ['Paper','Cardboard'], hours: 'Mon–Sat 9am–7pm', phone: '+91-80-6789-0123', color: '#f59e0b' },
  { id: 6, name: 'Glass Collection Point', address: 'BTM Layout 2nd Stage, 560076', lat: 12.9166, lng: 77.6101, types: ['Glass'], hours: 'Tue–Sun 10am–6pm', phone: '+91-80-4321-9876', color: '#9ca3af' },
];

const TYPE_FILTERS = ['All', 'Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', 'Organic', 'Hazardous'];

export default function Centers() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = CENTERS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || c.types.some(t => t.toLowerCase().includes(typeFilter.toLowerCase()));
    return matchSearch && matchType;
  });

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="section-title">📍 Find Recycling Centers</h1>
          <p style={{ color: '#6b7280' }}>Locate the nearest facility for any type of waste — map powered by OpenStreetMap</p>
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
            <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search centers..." style={{ paddingLeft: 36 }} />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {TYPE_FILTERS.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} style={{
                padding: '8px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: 600,
                background: typeFilter === t ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(16,185,129,0.1)',
                color: typeFilter === t ? 'white' : '#a7f3d0', transition: 'all 0.2s'
              }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: 600, overflowY: 'auto' }}>
            {filtered.map(c => (
              <div key={c.id} className="card" style={{
                cursor: 'pointer', padding: '1rem',
                borderColor: selected?.id === c.id ? 'rgba(16,185,129,0.5)' : undefined,
                background: selected?.id === c.id ? 'rgba(16,185,129,0.07)' : undefined
              }} onClick={() => setSelected(c)}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{c.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6b7280', fontSize: '0.75rem', marginBottom: 6 }}>
                      <MapPin size={11} /> {c.address}
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                      {c.types.map(t => <span key={t} className="badge badge-green" style={{ fontSize: '0.65rem' }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6b7280', fontSize: '0.72rem' }}>
                      <Clock size={11} /> {c.hours}
                    </div>
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); window.open(`https://www.openstreetmap.org/directions?to=${c.lat},${c.lng}`, '_blank'); }} style={{
                  marginTop: 10, width: '100%', padding: '6px', background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, cursor: 'pointer',
                  color: '#10b981', fontSize: '0.75rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                }}>
                  <Navigation size={12} /> Get Directions
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                <MapPin size={32} color="rgba(16,185,129,0.3)" style={{ margin: '0 auto 8px' }} />
                No centers match your search.
              </div>
            )}
          </div>

          {/* Map */}
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 600, border: '1px solid rgba(16,185,129,0.2)' }}>
            <MapContainer center={[12.9716, 77.5946]} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map(c => (
                <Marker key={c.id} position={[c.lat, c.lng]} icon={createIcon(c.color)}>
                  <Popup>
                    <div style={{ minWidth: 200 }}>
                      <strong>{c.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#666', margin: '4px 0' }}>{c.address}</div>
                      <div style={{ fontSize: '0.75rem' }}>{c.types.join(' · ')}</div>
                      <div style={{ fontSize: '0.75rem', marginTop: 4 }}>⏰ {c.hours}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
