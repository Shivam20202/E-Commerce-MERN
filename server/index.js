const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);

app.use('/api/auth', require('./routes/auth'));

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
}).catch((err) => console.error(err));