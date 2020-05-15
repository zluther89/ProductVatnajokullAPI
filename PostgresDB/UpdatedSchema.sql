CREATE DATABASE sdc
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

    CREATE TABLE public.products
(
    id bigint NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default",
    slogan character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    category character varying COLLATE pg_catalog."default",
    default_price character varying COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.products
    OWNER to postgres;

    CREATE TABLE public.styles
(
    id integer NOT NULL DEFAULT nextval('styles_styleid_seq'::regclass),
    product_id integer,
    name character varying COLLATE pg_catalog."default",
    sale_price integer,
    default_style integer,
    original_price character varying COLLATE pg_catalog."default",
    skus json,
    CONSTRAINT styles_pkey PRIMARY KEY (id),
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.styles
    OWNER to postgres;
-- Index: product_id

-- DROP INDEX public.product_id;

CREATE INDEX product_id
    ON public.styles USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;


    CREATE TABLE public.feature_set
(
    id integer NOT NULL,
    feature character varying COLLATE pg_catalog."default",
    value character varying COLLATE pg_catalog."default",
    CONSTRAINT feature_set_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.feature_set
    OWNER to postgres;


CREATE TABLE public.features_join
(
    feature_set_id integer,
    product_id integer,
    CONSTRAINT feature_set_id FOREIGN KEY (feature_set_id)
        REFERENCES public.feature_set (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.features_join
    OWNER to postgres;
-- Index: product_id_index

-- DROP INDEX public.product_id_index;

CREATE INDEX product_id_index
    ON public.features_join USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

ALTER TABLE public.features_join
    CLUSTER ON product_id_index;


CREATE TABLE public.photos
(
    id bigint NOT NULL DEFAULT nextval('photos_id_seq'::regclass),
    style_id integer,
    url character varying COLLATE pg_catalog."default",
    thumbnail_url character varying COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT style_id FOREIGN KEY (style_id)
        REFERENCES public.styles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.photos
    OWNER to postgres;
-- Index: style_id

-- DROP INDEX public.style_id;

CREATE INDEX style_id
    ON public.photos USING btree
    (style_id ASC NULLS LAST)
    INCLUDE(style_id)
    TABLESPACE pg_default;

ALTER TABLE public.photos
    CLUSTER ON style_id;



CREATE TABLE public.related_products
(
    current_product_id integer,
    related_product_id integer,
    CONSTRAINT product_id_current_fkey FOREIGN KEY (current_product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.related_products
    OWNER to postgres;
-- Index: current_product_id_index

-- DROP INDEX public.current_product_id_index;

CREATE INDEX current_product_id_index
    ON public.related_products USING btree
    (current_product_id ASC NULLS LAST)
    INCLUDE(current_product_id)
    TABLESPACE pg_default;

ALTER TABLE public.related_products
    CLUSTER ON current_product_id_index;

    CREATE TABLE public.skus
(
    id bigint NOT NULL DEFAULT nextval('skus_id_seq'::regclass),
    styleid integer,
    size character varying COLLATE pg_catalog."default",
    quanitity integer,
    CONSTRAINT skus_pkey PRIMARY KEY (id),
    CONSTRAINT styleid FOREIGN KEY (styleid)
        REFERENCES public.styles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.skus
    OWNER to postgres;
-- Index: styleid

-- DROP INDEX public.styleid;

CREATE INDEX styleid
    ON public.skus USING btree
    (styleid ASC NULLS LAST)
    TABLESPACE pg_default;
