let db = require("../postGresConnect");

module.exports = {
  getProductList: async (count = 5, page = 1) => {
    try {
      return await db.query(
        `SELECT * FROM products LIMIT ${count} OFFSET ${(page - 1) * count}`
      );
    } catch (err) {
      console.log(err);
    }
  },

  getProducts: async (productId) => {
    try {
      return await db.query(`SELECT p.id, p.name, p. slogan, p.description, p.category, 
      p.default_price, fs.feature, fs.value 
      FROM products AS p 
      LEFT JOIN features_join AS f 
      ON p.id = f.product_id
      LEFT JOIN feature_set as fs
      ON f.feature_set_id = fs.id
      WHERE p.id = ${productId}`);
    } catch (err) {
      console.log(err);
    }
  },

  getStyles: async (productId) => {
    try {
      return await db.query(`SELECT json_build_object(
        'style_id', s.id,
        'product_id', s.product_id,
        'name', s.name,
        'sale_price', s.sale_price,
        'default?', s.default_style, 
        'original_price', s.original_price,
        'skus',(SELECT json_object_agg("size", "quanitity") FROM skus WHERE skus.styleid = s.id GROUP BY skus.styleid),
        'photos', ARRAY(SELECT json_build_object('url', photos.url, 'thumbnail_url', photos.thumbnail_url)FROM photos WHERE photos.style_id = s.id)
          ) 
        FROM styles AS s
        WHERE s.product_id = ${productId}
        GROUP BY s.id`);
    } catch (err) {
      console.log(err);
    }
  },

  getRelated: async (productId) => {
    try {
      return await db.query(
        `Select related_product_id from related_products where current_product_id = ${productId}`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
