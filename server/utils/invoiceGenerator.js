function generateInvoiceHTML(order) {
  const { userId, items, totalAmount, address, paymentInfo, createdAt } = order;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const itemsRows = items
    .map(
      (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>${item.quantity}</td>
          <td>₹${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          background: #f9f9f9;
          color: #333;
        }
        h2 {
          color: #6b46c1;
        }
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          background: #fff;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        table {
          width: 100%;
          line-height: 1.6;
          border-collapse: collapse;
          margin-top: 20px;
        }
        table th {
          background-color: #6b46c1;
          color: #fff;
          padding: 10px;
          text-align: left;
        }
        table td {
          border-bottom: 1px solid #eee;
          padding: 10px;
        }
        .total {
          text-align: right;
          font-weight: bold;
          margin-top: 20px;
        }
        .footer {
          margin-top: 40px;
          font-size: 0.9rem;
          color: #999;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <h2>🧾 ShopZone Invoice</h2>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Customer:</strong> ${userId?.name} (${userId?.email})</p>
        <p><strong>Shipping Address:</strong> ${address || 'Not provided'}</p>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <p class="total">Total Paid: ₹${totalAmount}</p>
        <p class="total">Payment Method: ${paymentInfo?.method}</p>
        <p class="total">Transaction ID: ${paymentInfo?.transactionId}</p>

        <div class="footer">
          Thank you for shopping with ShopZone! ❤️
        </div>
      </div>
    </body>
  </html>`;
}

module.exports = generateInvoiceHTML;
