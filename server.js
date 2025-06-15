const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cartRoutes = require('./routes/cartroute');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log("MongoDB connected"));

app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
