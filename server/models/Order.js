// ✅ models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1
      },
      image: String
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentInfo: {
    method: { type: String, default: 'Cash on Delivery' },
    status: { type: String, default: 'Pending' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
