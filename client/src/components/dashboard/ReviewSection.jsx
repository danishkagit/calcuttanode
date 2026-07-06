import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/reviews/my').then(r => setReviews(r.data)).catch(() => {});
    api.get('/dashboard/orders').then(r => {
      setCompletedOrders(r.data.filter(o => o.status === 'completed'));
    }).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!selectedOrder) return;
    setSubmitting(true);
    try {
      await api.post('/reviews', {
        serviceId: selectedOrder.serviceId,
        serviceName: selectedOrder.serviceName,
        orderId: selectedOrder._id,
        rating,
        comment,
      });
      alert('Review submitted! Awaiting approval.');
      setSelectedOrder(null);
      setComment('');
      setRating(5);
      const res = await api.get('/reviews/my');
      setReviews(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-1">My Reviews</h2>
      <p className="text-text-muted mb-6">Rate and review completed services</p>

      {completedOrders.length > 0 && (
        <div className="mb-6">
          <h3 className="text-text-primary font-semibold mb-3">Review a Completed Service</h3>
          <select onChange={e => setSelectedOrder(completedOrders.find(o => o._id === e.target.value))} value={selectedOrder?._id || ''}
            className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-neon-cyan mb-3">
            <option value="">Select a service to review</option>
            {completedOrders.map(o => (
              <option key={o._id} value={o._id}>{o.serviceName}</option>
            ))}
          </select>
          {selectedOrder && (
            <div className="bg-background/50 rounded-xl p-5 border border-neon-cyan/30">
              <p className="text-text-primary font-medium mb-3">{selectedOrder.serviceName}</p>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setRating(n)} className={`text-2xl transition-colors ${n <= rating ? 'text-yellow-400' : 'text-text-muted/30'}`}>★</button>
                ))}
              </div>
              <textarea placeholder="Write your review (optional)" value={comment} onChange={e => setComment(e.target.value)} rows={3}
                className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan resize-none mb-3" />
              <button onClick={handleSubmit} disabled={submitting}
                className="bg-brand-gradient text-white px-6 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-neon-cyan/20 disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          )}
        </div>
      )}

      <h3 className="text-text-primary font-semibold mb-3">Your Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-text-muted text-sm">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r._id} className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
              <div className="flex justify-between items-start">
                <p className="text-text-primary font-medium">{r.serviceName}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${r.isApproved ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {r.isApproved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <div className="flex gap-0.5 my-1">{Array.from({ length: 5 }, (_, i) => <span key={i} className={`text-sm ${i < r.rating ? 'text-yellow-400' : 'text-text-muted/30'}`}>★</span>)}</div>
              {r.comment && <p className="text-text-muted text-sm mt-1">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
