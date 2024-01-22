const express = require("express");
const ProductModel = require("../model/Product");

const router = express.Router();

router.post("/registerProduct", async (req, res) => {
  const { userId, productName } = req.body;

  const products = await ProductModel.find({ userId });

  if (products.length > 0) {
    for (const product of products) {
      if (product.productName.includes(productName)) {
        return res.status(400).json({
          error: true,
          message: "Product with the same name already exists for this user",
        });
      }
    }
  }
  const product = await ProductModel.create(req.body);
  return res.json({
    error: false,
    message: "Registred with sucess",
    data: product,
  });
});
router.get("/getProductsBy/:id", async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      error: true,
      message: "idNotFound",
    });
  }
  const products = await ProductModel.find({ userId });
  return res.json({
    error: false,
    data: products,
  });
});

router.delete("/deleteProduct/:id", async (req, res) => {
  const _id = req.params.id;
  if (!_id) {
    return res.status(400).json({
      error: true,
      message: "idNotFound",
    });
  }
  await ProductModel.deleteOne({ _id });
  return res.json({
    error: false,
    data: 'Product delete with sucess',
  });
});
module.exports = router;
