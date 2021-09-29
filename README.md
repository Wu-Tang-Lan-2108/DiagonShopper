# Diagon Shopper

## Setup

First run: npm install

# Views

## Home
The Home component will load the all the products in the database that have been seeded with the DB Model Product.

* User will see All Products, be able to view single Products in two columns of multiple rows. Each product card will link into the single product view.

* Admin User will see All Products and have the ability Add/Delete Products

## Single Product View
Clicking into any product on the Home page will lead a user to a single Product View. Single Product page will allow the user to view name, price, description of the product and how many are left in stock.

* Admin User will have access to change Product information

## Cart View
Clicking Cart on the Nav Bar will present the Order/Cart. Users will be able to change quantity on current items in cart and also delete items. They will also be able to purchase their order.

* Users logged in will see their Cart. Guest Users will also be able to see their cart and the cart should persist between visits.

