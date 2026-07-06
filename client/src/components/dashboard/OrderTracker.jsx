import api from '../../utils/api';

const steps = ['pending', 'in-progress', 'completed'];
const stepLabels = { pending: 'Order Placed', 'in-progress': 'In Progress', completed: 'Completed' };

export default function OrderTracker({ order }) {
  const currentStep = steps.indexOf(order.status);

  return (
    <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-text-primary font-medium">{order.serviceName}</p>
          <p className="text-text-muted text-xs">₹{order.finalPrice || order.priceAtBooking} &bull; {new Date(order.createdAt).toLocaleDateString()}</p>
          {order.couponCode && <p className="text-green-400 text-xs mt-0.5">Coupon: {order.couponCode} (-₹{order.discountApplied})</p>}
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
          order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
          order.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
          order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {order.status}
        </span>
      </div>

      {order.status !== 'cancelled' && (
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= currentStep ? 'bg-neon-cyan text-background' : 'bg-electric-violet/20 text-text-muted'
              }`}>
                {i < currentStep ? '✓' : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 ${i < currentStep ? 'bg-neon-cyan' : 'bg-electric-violet/20'}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {order.remoteAccessNotes && (
        <div className="mt-3 p-2.5 bg-background rounded-lg border border-electric-violet/10">
          <p className="text-xs text-text-muted">Notes: {order.remoteAccessNotes}</p>
        </div>
      )}
    </div>
  );
}
