const router = require("express").Router();
const {
  stylesController,
  productController,
  relatedController,
  productListController,
} = require("./controller");

router.get("/products/list", async (req, res) => {
  const { count, page } = req.query;
  try {
    let results = await productListController(count, page);
    res.send(results);
  } catch (err) {
    res.send("error");
  }
});

router.get(`/products/:productId`, async (req, res) => {
  let productId = req.params.productId;
  try {
    let results = await productController(productId);
    res.send(results);
  } catch (err) {
    res.send("error");
  }
});

router.get("/products/:productId/styles", async (req, res) => {
  let productId = req.params.productId;
  try {
    let results = await stylesController(productId);
    res.send(results);
  } catch (err) {
    res.send("error");
  }
});

router.get("/products/:productId/related", async (req, res) => {
  let productId = req.params.productId;
  try {
    let results = await relatedController(productId);
    res.send(results);
  } catch (err) {
    res.send("error");
  }
});

module.exports = router;
