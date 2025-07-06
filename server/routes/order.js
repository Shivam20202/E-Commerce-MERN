const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');
const generateInvoiceHTML = require('../utils/invoiceGenerator');

// ✅ Create new order with dummy payment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user;
    const { items, totalAmount, address } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      address,
      paymentInfo: {
        method: 'Credit Card',
        status: 'Paid',
        transactionId: `TXN${Date.now()}`
      }
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Order creation failed' });
  }
});

// ✅ Get all orders of logged-in user
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// ✅ Delete a single order
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user });
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

// ✅ Clear all orders of logged-in user
router.delete('/my', authMiddleware, async (req, res) => {
  try {
    await Order.deleteMany({ userId: req.user });
    res.json({ message: 'All orders cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear orders' });
  }
});

router.get('/invoice/:orderId', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('userId', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const html = generateInvoiceHTML(order);

    res.set({
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename=invoice-${order._id}.html`,
    });

    res.send(html);
  } catch (err) {
    console.error('Invoice download error:', err);
    res.status(500).json({ message: 'Failed to generate invoice' });
  }
});


module.exports = router;
