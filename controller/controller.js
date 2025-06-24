const express = require('express');
const CartItem = require('../models/cartitem');
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();
const Product = require("../models/product");

const CartDelete = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedItem = await CartItem.findOneAndDelete({ id: id });

    if (deletedItem) {
      res.status(200).json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error while removing item' });
  }
}

const CartGet = async (req, res) => {
  const items = await CartItem.find();
  res.json(items);
}

const CartAdd = async (req, res) => {
  const item = req.body;
  const existingItem = await CartItem.findOne({ id: item.id });

  if (existingItem) {
    existingItem.quantity += 1;
    await existingItem.save();
    return res.json(existingItem);
  }

  const newItem = new CartItem(item);
  await newItem.save();
  res.json(newItem);
}

const RegisterUser = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();
  res.send("User Registered");
}
const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).send("Invalid credentials");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
}

const GetProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const AddProduct = async (req, res) => {
  try {
    const { name, quantity, price, category, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      quantity,
      price,
      category,
      description,
      image
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error adding product' });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { name, quantity, price, category, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {
      name,
      quantity,
      price,
      category,
      description
    };

    if (image) updateData.image = image;

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

const DeleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

module.exports = { CartDelete, CartGet, CartAdd , RegisterUser , LoginUser , GetProducts , AddProduct , UpdateProduct , DeleteProduct };
