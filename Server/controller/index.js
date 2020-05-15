const {
  getStyles,
  getProducts,
  getRelated,
  getProductList,
} = require("../model");

module.exports = {
  stylesController: async (productId) => {
    let response = await getStyles(productId);
    let results = response.rows.map((resObj) => {
      let styleObj = { ...resObj.json_build_object };
      if (styleObj.photos.length === 0) {
        styleObj.photos = [
          {
            url: null,
            thumbnail_url: null,
          },
        ];
      }
      if (styleObj.skus === null) {
        styleObj.skus = {};
      }
      return styleObj;
    });
    let product_id = "" + response.rows[0].json_build_object.product_id;
    return { product_id, results };
  },

  productController: async (productId) => {
    let response = await getProducts(productId);
    let results = response.rows.reduce((acc, item) => {
      let feature = item.feature;
      let value = item.value;
      item.features = acc.features
        ? [...acc.features, { feature, value }]
        : [{ feature, value }];
      delete item.feature, item.value;
      return item;
    }, {});

    return results;
  },

  relatedController: async (productId) => {
    let response = await getRelated(productId);
    return response.rows.map((item) => {
      return item.related_product_id;
    });
  },

  productListController: async (count, page) => {
    let response = await getProductList(count, page);
    return response.rows;
  },
};
