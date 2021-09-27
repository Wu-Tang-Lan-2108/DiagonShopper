'use strict';

require('dotenv').config();
const faker = require('faker');
const {
  db,
  models: { User, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  let users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
  }

  await User.create({
    username: 'Master',
    password: 'master',
    type: 'admin'
  });
  
  await User.bulkCreate(users);

  // const products = await Promise.all([
  //   Product.create({
  //     name: 'Shield',
  //     quantity: 2,
  //     price: 2.99,
  //     description: 'description',
  //   }),
  //   Product.create({
  //     name: 'Wand',
  //     quantity: 1,
  //     price: 9,
  //     description: 'a wand',
  //   }),
  // ]);

  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push({
      name: `${faker.animal.type()} ${faker.lorem.words()}`,
      quantity: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100000),
      description: faker.lorem.paragraph(),
    });
  }

  await Product.bulkCreate(products);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    products: {
      shield: products[0],
      Spear: products[1],
      Sword: products[2],
      wand: products[3],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
