const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Baby" },
    { name: "Toddler" },
    { name: "Kids" },
    { name: "Footwear" },
    { name: "Accessories" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Solid Hooded 3D Rabbit Ear Decor Coat",
      description: "Soft and comfy. Button Design. Material: 100% Polyster",
      size: "0-3 Months",
      condition: "New",
      color: "pink",
      image: "baby.jpg",
      category: categories[0]._id,
      price: 20.93,
      quantity: 500,
    },
    {
      name: "Baby Blue Long-sleeve Romper",
      description: "Soft and comfy. Material: 95% Cotton, 5% Spandex ",
      size: "3-6 Months",
      condition: "New",
      color: "blue",
      image: "baby-blue.JPG",
      category: categories[0]._id,
      price: 5.4,
      quantity: 500,
    },
    {
      name: "Toddler Girl Rainbow Print Top and Unicorn Pants Set",
      category: categories[1]._id,
      description: "Round collar. Soft and cozy. Include: 1 top, 1 pant",
      size: "1 Year",
      condition: "Used (like-new)",
      color: "pink",
      image: "toddler-pink.JPG",
      price: 20.22,
      quantity: 20,
    },
    {
      name: "Toddler Boy Dinosaur Print Long-sleeve Tee",
      category: categories[1]._id,
      description: "Round collar. Soft and cozy. Material: 100% Cotton.",
      size: "18-24 Months",
      condition: "Used (like-new)",
      color: "yellow",
      image: "toddler-tee.JPG",
      price: 10.5,
      quantity: 50,
    },
    {
      name: "Toddler Boy Adorable Dino Decor Warm Knitwear",
      category: categories[1]._id,
      description: "Round collar. Soft and cozy. Material: 100% Acrylic.",
      size: "1 Year",
      condition: "Used (good)",
      color: "grey",
      image: "toddler-sweater.JPG",
      price: 20,
      quantity: 100,
    },
    {
      name: "Toddler Yellow Dress",
      category: categories[1]._id,
      description: "Soft and cozy. Material: 100% Cotton",
      image: "toddler-yellow.JPG",
      size: "18-24 Months",
      condition: "Used (like-new)",
      color: "yellow",
      price: 22,
      quantity: 30,
    },
    {
      name: "Pretty Kid Girl Denim Bowknot Stars and Stripes Sleeveless Dress",
      category: categories[2]._id,
      description: "Bowknot Decor, Stars Print, Sleeveless Design",
      size: "1 Year",
      condition: "Used (good)",
      color: "blue and pink",
      image: "kid-denim.JPG",
      price: 19.99,
      quantity: 30,
    },
    {
      name: "Pretty Kid Girl Floral Print Mesh Sleeveless Dress",
      category: categories[2]._id,
      description: "Floral Print & Mesh Design",
      size: "2 Years",
      condition: "Used (good)",
      color: "yellow",
      image: "kid-yellow.JPG",
      price: 9.99,
      quantity: 100,
    },
    {
      name: "Trendy Kid Boy Colorblock Zipper Hooded Polar Fleece Jacke",
      category: categories[2]._id,
      description: "Colorblock & Hooded & Polar Fleece. Soft and comfy",
      size: "2 Years",
      condition: "Used (fair)",
      color: "multi-color",
      image: "kid-jacket.JPG",
      price: 20,
      quantity: 1000,
    },
    {
      name: "Casual Colorblock Plaid Shirts for Kids",
      category: categories[2]._id,
      description: "Front pocket. Button design. Material: 100% Cotton",
      size: "2 Years",
      condition: "Used (fair)",
      color: "red",
      image: "kid-shirt.JPG",
      price: 12.99,
      quantity: 1000,
    },
    {
      name: "Toddler Elegant Sequined Velcro Big Bowknot Decor Flats Shoes",
      category: categories[3]._id,
      description: "Breathable and comfy. Soft sole. Material: PU, Beef Tendon",
      size: "2 Years",
      condition: "Used (fair)",
      color: "pink",
      image: "shoe-pink.JPG",
      price: 17.99,
      quantity: 100,
    },
    {
      name: "Toddler Elegant Sequined Velcro Big Bowknot Decor Flats Shoes",
      category: categories[3]._id,
      description: "Breathable and comfy. Soft sole. Material: PU, Beef Tendon",
      size: "2 Years",
      condition: "Used (fair)",
      color: "pink",
      image: "shoe-pink.JPG",
      price: 17.99,
      quantity: 100,
    },
    {
      name: "Kid Solid Bow Decor Shoes",
      category: categories[3]._id,
      description:
        "Cozy and comfy. Antiskid and durable. Upper: Synthetic leather",
      size: "3 Years",
      condition: "Used (fair)",
      color: "black",
      image: "shoe-black.JPG",
      price: 19.99,
      quantity: 600,
    },
    {
      name: "Toddler Lightning Print LED Sport Shoes",
      category: categories[3]._id,
      description:
        "Cozy and comfy. Antiskid and durable. Upper: Synthetic leather",
      size: "2 Years",
      condition: "Used (fair)",
      color: "black",
      image: "shoe-black.JPG",
      price: 19.99,
      quantity: 600,
    },
    {
      name: "Toddler Girl's Bowknot Solid Headband",
      category: categories[4]._id,
      description:
        "Cozy and comfy. Antiskid and durable. Upper: Synthetic leather",
      size: "2 Years",
      condition: "Used (fair)",
      color: "peach",
      image: "girl-bow.JPG",
      price: 19.99,
      quantity: 600,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
