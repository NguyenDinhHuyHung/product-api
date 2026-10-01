const Product = require("../models/Product");

// CREATE - Thêm sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;

    const product = await Product.create({
      pid,
      pname,
      price,
      quantity
    });

    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "pid already exists"
      });
    }

    res.status(400).json({
      message: error.message
    });
  }
};

// READ - Lấy tất cả sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// READ - Lấy một sản phẩm theo pid
exports.getProductByPid = async (req, res) => {
  try {
    const product = await Product.findOne({
      pid: req.params.pid
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE - Cập nhật sản phẩm theo pid
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// DELETE - Xóa sản phẩm theo pid
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      pid: req.params.pid
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};