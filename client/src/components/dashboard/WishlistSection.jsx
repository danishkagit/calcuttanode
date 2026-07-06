import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import services from '../../data/services';

export default function WishlistSection() {
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    api.get('/wishlist').then(r => setSavedIds(r.data || [])).catch(() => {});
  }, []);

  const savedServices = services.filter(s => savedIds.includes(s.id));

  const removeFromWishlist = async (id) => {
    try {
      await api.post('/wishlist/toggle', { serviceId: id });
      setSavedIds(savedIds.filter(sid => sid !== id));
    } catch { alert('Failed to remove'); }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-1">Saved Services</h2>
      <p className="text-text-muted mb-6">Services you've bookmarked</p>

      {savedServices.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-text-muted/30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
          <p className="text-text-muted">No saved services yet.</p>
          <Link to="/services" className="mt-4 inline-block text-neon-cyan text-sm hover:underline">Browse services</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {savedServices.map(s => (
            <div key={s.id} className="bg-background/50 rounded-xl p-4 border border-electric-violet/10 flex justify-between items-center">
              <div>
                <p className="text-text-primary font-medium">{s.name}</p>
                <p className="text-neon-cyan font-bold text-sm mt-1">₹{s.price}</p>
              </div>
              <button onClick={() => removeFromWishlist(s.id)}
                className="text-red-400 hover:text-red-300 transition-colors p-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
