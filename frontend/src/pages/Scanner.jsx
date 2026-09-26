import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Upload, Camera, X, CheckCircle, AlertCircle, RefreshCw, Leaf, Zap, Info } from 'lucide-react';

const CATEGORY_CONFIG = {
  Plastic:        { color: '#3b82f6', emoji: '🔵', bin: 'Blue Recyclable Bin' },
  Paper:          { color: '#f59e0b', emoji: '🟡', bin: 'Yellow Paper Recycling' },
  Organic:        { color: '#10b981', emoji: '🟢', bin: 'Green Compost Bin' },
  Glass:          { color: '#9ca3af', emoji: '⚪', bin: 'Glass Recycling Container' },
  Metal:          { color: '#6b7280', emoji: '⚫', bin: 'Metal Recycling Bin' },
  'E-Waste':      { color: '#8b5cf6', emoji: '🟣', bin: 'Authorized E-Waste Centre' },
  Hazardous:      { color: '#ef4444', emoji: '🔴', bin: 'Specialized Waste Collection' },
  'General Waste':{ color: '#64748b', emoji: '⚙️', bin: 'General Waste Bin' },
};

const SCAN_STEPS = [
  'Detecting object...',
  'Identifying material...',
  'Checking recyclability...',
  'Preparing recommendation...',
];

export default function Scanner() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const fileRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('File must be under 5MB'); return; }
    const reader = new FileReader();
    reader.onload = e => { setImage(e.target.result); setImageFile(file); setResult(null); setError(null); };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraMode(true);
    } catch {
      setError('Camera access denied. Please allow camera permissions.');
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      handleFile(file);
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraMode(false);
  };

  const analyzeWaste = async () => {
    if (!imageFile) return;
    setScanning(true);
    setScanStep(0);
    setResult(null);
    setError(null);

    // Animate steps
    for (let i = 0; i < SCAN_STEPS.length - 1; i++) {
      await new Promise(r => setTimeout(r, 700));
      setScanStep(i + 1);
    }

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const res = await axios.post('/api/waste/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const reset = () => { setImage(null); setImageFile(null); setResult(null); setError(null); setScanStep(0); };

  const cfg = result ? CATEGORY_CONFIG[result.category] || CATEGORY_CONFIG['General Waste'] : null;

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="page-container" style={{ maxWidth: 900 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, fontSize: '0.8rem', color: '#10b981', marginBottom: '1rem' }}>
            <Zap size={12} /> AI-Powered Waste Scanner
          </div>
          <h1 className="section-title">Scan Your Waste</h1>
          <p style={{ color: '#6b7280' }}>Upload or capture a photo — our AI will classify it instantly</p>
        </div>

        {/* Camera Mode */}
        {cameraMode && (
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: '1.5rem', background: '#000' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: 400, objectFit: 'cover', display: 'block' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(16,185,129,0.6)', borderRadius: 16, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', display: 'flex', gap: 12, justifyContent: 'center', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
              <button onClick={capturePhoto} className="btn-primary" style={{ padding: '10px 24px' }}>📸 Capture</button>
              <button onClick={stopCamera} className="btn-secondary" style={{ padding: '10px 24px' }}><X size={16} /> Cancel</button>
            </div>
          </div>
        )}

        {!cameraMode && !result && (
          <>
            {/* Upload zone */}
            <div
              className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !image && fileRef.current?.click()}
              style={{ cursor: image ? 'default' : 'pointer', marginBottom: '1.5rem', position: 'relative' }}
            >
              {image ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={image} alt="waste" style={{ maxHeight: 300, maxWidth: '100%', borderRadius: 12, display: 'block', margin: '0 auto' }} />
                  <button onClick={e => { e.stopPropagation(); reset(); }} style={{
                    position: 'absolute', top: -8, right: -8, background: '#ef4444', border: 'none',
                    borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}><X size={14} /></button>
                </div>
              ) : (
                <>
                  <div style={{ width: 64, height: 64, margin: '0 auto 1rem', background: 'rgba(16,185,129,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={30} color="#10b981" />
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Drag & Drop your image here</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>or click to browse files</p>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['JPG', 'PNG', 'WebP'].map(f => <span key={f} className="badge badge-green">{f}</span>)}
                    <span className="badge badge-yellow">Max 5MB</span>
                  </div>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button onClick={() => fileRef.current?.click()} className="btn-secondary">
                <Upload size={16} /> Upload Image
              </button>
              <button onClick={startCamera} className="btn-secondary">
                <Camera size={16} /> Use Camera
              </button>
              {image && (
                <button onClick={analyzeWaste} disabled={scanning} className="btn-primary" style={{ opacity: scanning ? 0.7 : 1 }}>
                  {scanning ? '🔍 Analyzing...' : '🤖 Analyze Waste'}
                </button>
              )}
            </div>
          </>
        )}

        {/* Scanning animation */}
        {scanning && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: 80, height: 80, margin: '0 auto 1.5rem',
              border: '3px solid rgba(16,185,129,0.2)',
              borderTopColor: '#10b981', borderRadius: '50%',
              animation: 'spin-slow 1s linear infinite'
            }} />
            <h3 style={{ color: '#10b981', marginBottom: '1.5rem', fontWeight: 700 }}>🔍 Analyzing your waste...</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300, margin: '0 auto' }}>
              {SCAN_STEPS.map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: i <= scanStep ? '#10b981' : 'rgba(16,185,129,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.3s'
                  }}>
                    {i <= scanStep && <CheckCircle size={12} color="white" />}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: i <= scanStep ? '#f0fdf4' : '#6b7280', transition: 'color 0.3s' }}>{step}</span>
                </div>
              ))}
            </div>
            <div className="progress-bar" style={{ marginTop: '1.5rem', maxWidth: 300, margin: '1.5rem auto 0' }}>
              <div className="progress-fill" style={{ width: `${((scanStep + 1) / SCAN_STEPS.length) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: 12, alignItems: 'center' }}>
            <AlertCircle size={20} color="#ef4444" />
            <div>
              <div style={{ fontWeight: 600, color: '#ef4444' }}>{error}</div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: 4 }}>Tips: Good lighting · Centered object · Clear photo</div>
            </div>
            <button onClick={reset} className="btn-secondary" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}>
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}

        {/* Result */}
        {result && cfg && (
          <div className="fade-in-up">
            {/* Header card */}
            <div style={{
              background: `linear-gradient(135deg, ${cfg.color}18, rgba(10,15,13,1))`,
              border: `1px solid ${cfg.color}40`, borderRadius: 20, padding: '1.5rem', marginBottom: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 16,
                  background: `${cfg.color}20`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '3rem', border: `1px solid ${cfg.color}30`
                }}>{cfg.emoji}</div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1 }}>Detected Item</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f0fdf4' }}>{result.detectedItem}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: `${cfg.color}20`, color: cfg.color }}>{cfg.emoji} {result.category}</span>
                    {result.recyclable ? <span className="badge badge-green">✓ Recyclable</span> : <span className="badge badge-red">✗ Non-Recyclable</span>}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: cfg.color, fontFamily: 'Plus Jakarta Sans' }}>{result.confidence}%</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>AI Confidence</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {/* Bin + Points */}
              <div className="card">
                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Recommended Bin</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f0fdf4', marginBottom: '1rem' }}>♻️ {cfg.bin}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.1)', borderRadius: 10, padding: '10px 14px' }}>
                  <Leaf size={18} color="#10b981" />
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>+{result.ecoPoints}</div>
                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Eco Points Earned</div>
                  </div>
                </div>
              </div>

              {/* Uploaded image */}
              {image && (
                <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={image} alt="scanned" style={{ maxHeight: 140, maxWidth: '100%', borderRadius: 10, objectFit: 'contain' }} />
                </div>
              )}
            </div>

            {/* Disposal instructions */}
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Info size={16} color="#10b981" /> Disposal Instructions
              </h3>
              <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.disposalInstructions.map((step, i) => (
                  <li key={i} style={{ color: '#a7f3d0', fontSize: '0.9rem', lineHeight: 1.6 }}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Sustainability tip */}
            <div style={{
              background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 14, padding: '1rem 1.25rem', marginBottom: '1.5rem',
              display: 'flex', gap: 10
            }}>
              <Leaf size={18} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginBottom: 4 }}>SUSTAINABILITY TIP</div>
                <p style={{ color: '#a7f3d0', fontSize: '0.875rem', lineHeight: 1.6 }}>{result.sustainabilityTip}</p>
              </div>
            </div>

            {/* Low confidence warning */}
            {result.confidence < 70 && (
              <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, color: '#f59e0b', marginBottom: 4 }}>⚠️ Low Confidence Result</div>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>We couldn't confidently identify this item. Try better lighting, center the object, and ensure a clear photo.</p>
              </div>
            )}

            {/* Scan again */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={reset} className="btn-primary">
                <RefreshCw size={16} /> Scan Another Item
              </button>
              <button onClick={analyzeWaste} className="btn-secondary">
                <Zap size={16} /> Re-analyze
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
