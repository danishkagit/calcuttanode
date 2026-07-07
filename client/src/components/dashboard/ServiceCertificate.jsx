const ServiceCertificate = ({ order }) => {
  if (order.status !== 'completed') return null;

  const handlePrint = () => {
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
      <head><title>Service Certificate - ${order.serviceName}</title>
      <style>
        body { font-family: Georgia, serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
        .cert { width: 700px; padding: 50px; background: white; border: 3px double #222; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        h1 { font-size: 28px; color: #1a1a2e; margin-bottom: 5px; }
        .subtitle { color: #666; font-size: 14px; margin-bottom: 30px; }
        .content { font-size: 16px; line-height: 2; color: #333; }
        .service-name { font-size: 22px; font-weight: bold; color: #1a1a2e; margin: 15px 0; }
        .date { color: #666; font-size: 14px; margin-top: 30px; }
        .footer { margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 15px; }
      </style>
      </head>
      <body>
        <div class="cert">
          <h1>Certificate of Service Completion</h1>
          <p class="subtitle">Calcutta Node IT Services</p>
          <div class="content">
            <p>This is to certify that the service</p>
            <p class="service-name">${order.serviceName}</p>
            <p>has been successfully completed on ${new Date(order.updatedAt || order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
            <p>Service ID: ${order._id.slice(-8).toUpperCase()}</p>
          </div>
          <p class="date">Kolkata, India</p>
          <div class="footer">Calcutta Node &mdash; calcuttanode.com</div>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <button onClick={handlePrint}
      className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1.5 rounded-lg hover:bg-yellow-500/30 transition-colors"
      title="Download Service Certificate"
    >
      🏆 Certificate
    </button>
  );
};

export default ServiceCertificate;
