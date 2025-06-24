const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cartRoutes = require('./routes/cartroute');
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/productroute');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
const upload = require('./middleware/upload');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));


app.use('/api/cart', cartRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/products',upload.single('image'), productRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
