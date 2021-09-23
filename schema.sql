CREATE TABLE "products" (
  "id" int PRIMARY KEY,
  "name" string,
  "price" decimal,
  "description" text,
  "quantity" int
);

CREATE TABLE "cart" (
  "id" int PRIMARY KEY,
  "quantity" int,
  "productId" int,
  "userId" int
);

CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "username" string,
  "pwHash" string
);

ALTER TABLE "cart" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "cart" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");
