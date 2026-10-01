const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductByPid,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// CREATE
router.post("/", createProduct);

// READ ALL
router.get("/", getProducts);

// READ ONE
router.get("/:pid", getProductByPid);

// UPDATE
router.put("/:pid", updateProduct);

// DELETE
router.delete("/:pid", deleteProduct);

module.exports = router;