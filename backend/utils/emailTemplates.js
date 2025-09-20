// Email Template Utility for MakeRide
// Provides consistent, professional email templates for all booking types

const generateEmailTemplate = (bookingData) => {
  const { type, route, car, traveller, date, time, serviceType } = bookingData;
  
  // Determine the appropriate icon and title based on booking type
  let icon, title, carLabel;
  switch (type) {
    case 'LOCAL':
      icon = '🚖';
      title = 'Local Ride Booking';
      carLabel = 'Car Selected';
      break;
    case 'AIRPORT':
      icon = '🛫';
      title = serviceType === 'drop' ? 'Airport Drop Booking' : 'Airport Pickup Booking';
      carLabel = 'Car Selected';
      break;
    case 'OUTSTATION':
      icon = '🚗';
      title = 'Intercity Booking';
      carLabel = 'Car Selected';
      break;
    default:
      icon = '🚖';
      title = 'Booking Confirmation';
      carLabel = 'Car Selected';
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .email-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          text-align: center;
        }
        
        .email-header h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        
        .email-header .icon {
          font-size: 28px;
        }
        
        .email-body {
          padding: 32px 24px;
        }
        
        .booking-summary {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          border-left: 4px solid #667eea;
        }
        
        .route-info {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .car-selection {
          font-size: 16px;
          color: #34495e;
          font-weight: 500;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e0e0e0, transparent);
          margin: 24px 0;
        }
        
        .traveller-section {
          margin-bottom: 24px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .traveller-details {
          display: grid;
          gap: 12px;
        }
        
        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 8px 0;
        }
        
        .detail-label {
          font-weight: 600;
          color: #34495e;
          min-width: 80px;
          font-size: 14px;
        }
        
        .detail-value {
          color: #2c3e50;
          flex: 1;
          font-size: 14px;
          word-break: break-word;
        }
        
        .email-footer {
          background-color: #f8f9fa;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        
        .company-name {
          font-weight: 600;
          color: #667eea;
          font-size: 16px;
          margin-bottom: 4px;
        }
        
        .tagline {
          color: #6c757d;
          font-size: 14px;
        }
        
        .contact-info {
          margin-top: 16px;
          font-size: 13px;
          color: #6c757d;
        }
        
        .highlight {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 4px;
          padding: 8px 12px;
          margin: 8px 0;
        }
        
        @media (max-width: 600px) {
          .email-container {
            margin: 0;
            border-radius: 0;
          }
          
          .email-body {
            padding: 24px 16px;
          }
          
          .email-header {
            padding: 20px 16px;
          }
          
          .email-header h1 {
            font-size: 20px;
          }
          
          .detail-row {
            flex-direction: column;
            gap: 4px;
          }
          
          .detail-label {
            min-width: auto;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>
            <span class="icon">${icon}</span>
            ${title}
          </h1>
        </div>
        
        <div class="email-body">
          <div class="booking-summary">
            <div class="route-info">
              <span>📍</span>
              <span>Route: ${route}</span>
            </div>
            <div class="car-selection">
              <span>🚗</span>
              <span>${carLabel}: ${car.type.toUpperCase()} - ₹${car.price}</span>
            </div>
            ${date && time ? `
              <div style="margin-top: 12px; font-size: 14px; color: #6c757d;">
                <span>📅</span>
                <span>${date} at ${time}</span>
              </div>
            ` : ''}
          </div>
          
          <div class="divider"></div>
          
          <div class="traveller-section">
            <h3 class="section-title">
              <span>👤</span>
              <span>Traveller Details</span>
            </h3>
            
            <div class="traveller-details">
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${traveller.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Mobile:</span>
                <span class="detail-value">${traveller.mobile}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">
                  <a href="mailto:${traveller.email}" style="color: #667eea; text-decoration: none;">
                    ${traveller.email}
                  </a>
                </span>
              </div>
              
              ${traveller.pickup || traveller.pickupAddress ? `
                <div class="detail-row">
                  <span class="detail-label">Pickup:</span>
                  <span class="detail-value">${traveller.pickup || traveller.pickupAddress}</span>
                </div>
              ` : ''}
              
              ${traveller.drop || traveller.dropAddress ? `
                <div class="detail-row">
                  <span class="detail-label">Drop:</span>
                  <span class="detail-value">${traveller.drop || traveller.dropAddress}</span>
                </div>
              ` : ''}
              
              ${traveller.remark ? `
                <div class="detail-row">
                  <span class="detail-label">Remark:</span>
                  <span class="detail-value">${traveller.remark}</span>
                </div>
              ` : ''}
              
              ${traveller.gst ? `
                <div class="detail-row">
                  <span class="detail-label">GST:</span>
                  <span class="detail-value">${traveller.gst}</span>
                </div>
              ` : ''}
            </div>
          </div>
          
          ${traveller.gstDetails ? `
            <div class="highlight">
              <strong>📋 GST Details Required:</strong> Please provide your GST details for invoice generation.
            </div>
          ` : ''}
        </div>
        
        <div class="email-footer">
          <div class="company-name">MakeRide Team</div>
          <div class="tagline">Your trusted travel partner</div>
          <div class="contact-info">
            <p>📧 support@makeride.com | 📱 +91-XXXX-XXXXXX</p>
            <p>🌐 www.makeride.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template for booking confirmation emails
const generateBookingConfirmationTemplate = (bookingData) => {
  return generateEmailTemplate({
    ...bookingData,
    type: bookingData.serviceType || 'LOCAL'
  });
};

// Template for driver details emails
const generateDriverDetailsTemplate = (bookingData, driverDetails) => {
  const { route, date, time } = bookingData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Driver Details</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .email-header {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          padding: 24px;
          text-align: center;
        }
        
        .email-header h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        
        .email-body {
          padding: 32px 24px;
        }
        
        .booking-info {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          border-left: 4px solid #28a745;
        }
        
        .driver-info {
          background-color: #e8f5e8;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #c3e6c3;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          font-size: 14px;
        }
        
        .info-label {
          font-weight: 600;
          color: #34495e;
          min-width: 100px;
        }
        
        .info-value {
          color: #2c3e50;
          flex: 1;
        }
        
        .whatsapp-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #25d366;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          margin-top: 8px;
        }
        
        .email-footer {
          background-color: #f8f9fa;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        
        .company-name {
          font-weight: 600;
          color: #28a745;
          font-size: 16px;
          margin-bottom: 4px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>
            <span>🚖</span>
            <span>Your Driver Details</span>
          </h1>
        </div>
        
        <div class="email-body">
          <div class="booking-info">
            <h3 class="section-title">
              <span>📋</span>
              <span>Booking Information</span>
            </h3>
            <div class="info-row">
              <span class="info-label">Route:</span>
              <span class="info-value">${route}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Date:</span>
              <span class="info-value">${date}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Time:</span>
              <span class="info-value">${time}</span>
            </div>
          </div>
          
          <div class="driver-info">
            <h3 class="section-title">
              <span>👨‍💼</span>
              <span>Driver Information</span>
            </h3>
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value">${driverDetails.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">WhatsApp:</span>
              <span class="info-value">${driverDetails.whatsappNumber}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Vehicle:</span>
              <span class="info-value">${driverDetails.vehicleNumber}</span>
            </div>
            
            <a href="https://wa.me/${driverDetails.whatsappNumber.replace(/[^0-9]/g, '')}" class="whatsapp-link">
              <span>💬</span>
              <span>Contact Driver on WhatsApp</span>
            </a>
          </div>
        </div>
        
        <div class="email-footer">
          <div class="company-name">MakeRide Team</div>
          <p style="color: #6c757d; font-size: 14px; margin-top: 8px;">
            Safe travels! 🚗✨
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template for decline emails
const generateDeclineTemplate = (route, reason) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Update</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .email-header {
          background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
          color: white;
          padding: 24px;
          text-align: center;
        }
        
        .email-header h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        
        .email-body {
          padding: 32px 24px;
        }
        
        .decline-info {
          background-color: #fff5f5;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          border-left: 4px solid #dc3545;
        }
        
        .info-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 8px 0;
          font-size: 14px;
        }
        
        .info-label {
          font-weight: 600;
          color: #34495e;
          min-width: 80px;
        }
        
        .info-value {
          color: #2c3e50;
          flex: 1;
        }
        
        .apology-note {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          color: #6c757d;
          font-style: italic;
        }
        
        .email-footer {
          background-color: #f8f9fa;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        
        .company-name {
          font-weight: 600;
          color: #dc3545;
          font-size: 16px;
          margin-bottom: 4px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>
            <span>📝</span>
            <span>Booking Update</span>
          </h1>
        </div>
        
        <div class="email-body">
          <div class="decline-info">
            <p style="margin-bottom: 16px; font-size: 16px; color: #2c3e50;">
              We regret to inform you that we are unable to fulfill your booking request at this time.
            </p>
            
            <div class="info-row">
              <span class="info-label">Route:</span>
              <span class="info-value">${route}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">Reason:</span>
              <span class="info-value">${reason || 'Service temporarily unavailable'}</span>
            </div>
          </div>
          
          <div class="apology-note">
            <p>We sincerely apologize for any inconvenience this may cause.</p>
            <p style="margin-top: 8px;">Please feel free to contact us for alternative arrangements.</p>
          </div>
        </div>
        
        <div class="email-footer">
          <div class="company-name">MakeRide Team</div>
          <p style="color: #6c757d; font-size: 14px; margin-top: 8px;">
            📧 support@makeride.com | 📱 +91-XXXX-XXXXXX
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  generateEmailTemplate,
  generateBookingConfirmationTemplate,
  generateDriverDetailsTemplate,
  generateDeclineTemplate
};
