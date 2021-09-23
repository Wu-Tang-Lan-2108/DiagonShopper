CREATE TABLE "products" (
  "id" int PRIMARY KEY,
  "name" string,
  "price" int,
  "description" text,
  "quantity" int
);

CREATE TABLE "cartItem" (
  "id" int PRIMARY KEY,
  "quantity" int,
  "productId" int,
  "orderId" int
);

CREATE TABLE "orders" (
  "id" int PRIMARY KEY,
  "userId" int
);

CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "type" enum,
  "username" string,
  "pwHash" string
);

ALTER TABLE "cartItem" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "cartItem" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");
