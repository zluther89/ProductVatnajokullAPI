CREATE TABLE styles (
 styleId BIGSERIAL,
 product_id INTEGER,
 name VARCHAR,
 original_price INTEGER,
 sale_price INTEGER,
 default_style INTEGER
);


ALTER TABLE styles ADD CONSTRAINT styles_pkey PRIMARY KEY (styleId);

CREATE TABLE skus (
 id BIGSERIAL,
 styleId INTEGER,
 size VARCHAR,
 quanitity INTEGER
);


ALTER TABLE skus ADD CONSTRAINT skus_pkey PRIMARY KEY (id);

CREATE TABLE products (
 id BIGSERIAL,
 name VARCHAR,
 slogan VARCHAR,
 description VARCHAR,
 category VARCHAR,
 default_price VARCHAR
);


ALTER TABLE products ADD CONSTRAINT products_pkey PRIMARY KEY (id);

CREATE TABLE feature (
 feature_id BIGSERIAL,
 product_id INTEGER,
 feature VARCHAR,
 value INTEGER
);


ALTER TABLE feature ADD CONSTRAINT feature_pkey PRIMARY KEY (feature_id);

CREATE TABLE features_join (
 product_id BIGSERIAL,
 feature_id INTEGER
);


ALTER TABLE features_join ADD CONSTRAINT features_join_pkey PRIMARY KEY (product_id);

CREATE TABLE related_products (
 related_id BIGSERIAL,
 product_id INTEGER
);


ALTER TABLE related_products ADD CONSTRAINT related_products_pkey PRIMARY KEY (related_id);

CREATE TABLE photos (
 photo_id BIGSERIAL,
 id VARCHAR,
 styleId INTEGER,
 url VARCHAR,
 thumbnail_url VARCHAR
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (photo_id);

ALTER TABLE styles ADD CONSTRAINT styles_styleId_fkey FOREIGN KEY (styleId) REFERENCES photos(photo_id);
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE skus ADD CONSTRAINT skus_styleId_fkey FOREIGN KEY (styleId) REFERENCES styles(styleId);
ALTER TABLE products ADD CONSTRAINT products_id_fkey FOREIGN KEY (id) REFERENCES features_join(product_id);
ALTER TABLE features_join ADD CONSTRAINT features_join_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES feature(feature_id);
ALTER TABLE related_products ADD CONSTRAINT related_products_related_id_fkey FOREIGN KEY (related_id) REFERENCES products(id);
ALTER TABLE related_products ADD CONSTRAINT related_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);