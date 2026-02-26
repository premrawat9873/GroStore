// src/data/productStore.js
// Central mutable store shared across Products, Categories, Dashboard
// Uses a simple pub/sub so all pages react to changes without Redux.

const INITIAL = [
  { id: 1,  name: "Audi Sheesham Wood Dining Chair",       brand: "Bird Wings",  categories: ["Chair","Sofa","Bed"],                        price: 19975, published: true,  featured: false, themes: ["Furniture","Organic"],  img: null },
  { id: 2,  name: "Melina Teakwood Dining Chair",          brand: "Bird Wings",  categories: ["Chair","Sofa","Bed"],                        price: 3740,  published: true,  featured: false, themes: ["Furniture"],            img: null },
  { id: 3,  name: "Rigo Wooden Dining Chair",              brand: "Bird Wings",  categories: ["Chair","Table","Dining Chair"],              price: 7225,  published: true,  featured: false, themes: ["Furniture"],            img: null },
  { id: 4,  name: "Lexus Marble Dining Chair",             brand: "Bird Wings",  categories: ["Chair","Sofa","Bed"],                        price: 8415,  published: true,  featured: false, themes: ["Furniture"],            img: null },
  { id: 5,  name: "New York American Wooden Dining Chair", brand: "Bird Wings",  categories: ["Chair","Table","Dining Chair"],              price: 5950,  published: true,  featured: false, themes: ["Furniture"],            img: null },
  { id: 6,  name: "Royaloak Terence Wooden Dining Chair",  brand: "Bird Wings",  categories: ["Chair","Sofa","Bed"],                        price: 4675,  published: true,  featured: false, themes: ["Furniture"],            img: null },
  { id: 7,  name: "Wooden Showpiece Chair",                brand: "Bird Wings",  categories: ["Chair","Table","Dining Chair"],              price: 12750, published: true,  featured: false, themes: ["Furniture"],            img: null },
  { id: 8,  name: "Lamb & Mutton Back Bacon",              brand: "Bird Wings",  categories: ["Fresh Chicken","Duck Meat"],                 price: 0,     published: true,  featured: true,  themes: ["Grocery","Halal Food"], img: null },
  { id: 9,  name: "Aged Beef Steak Beef",                  brand: "Bird Wings",  categories: ["Fresh Chicken","Duck Meat","Fresh Beef"],    price: 17000, published: true,  featured: false, themes: ["Halal Food"],           img: null },
  { id: 10, name: "Steak Cattle Meat",                     brand: "Bird Wings",  categories: ["Fresh Chicken","Duck Meat","Fresh Beef"],    price: 8415,  published: true,  featured: true,  themes: ["Halal Food","Organic"], img: null },
  { id: 11, name: "Aged Beef Steak Beef (Biofuel)",        brand: "Biofuel",     categories: ["Fresh Chicken","Fresh Beef"],                price: 7480,  published: true,  featured: true,  themes: ["Halal Food","Organic"], img: null },
  { id: 12, name: "Aged Beef Steak Beef (Nexover)",        brand: "Nexover",     categories: ["Fresh Chicken","Fresh Mutton","Duck Meat"],  price: 8500,  published: true,  featured: true,  themes: ["Halal Food","Organic"], img: null },
  { id: 13, name: "Ribs Lamb & Mutton Meat",               brand: "Bird Wings",  categories: ["Fresh Chicken"],                             price: 5100,  published: true,  featured: true,  themes: ["Halal Food","Organic"], img: null },
  { id: 14, name: "Chicken Meat Buffalo Wing",             brand: "Bird Wings",  categories: ["Fresh Beef","Duck Meat","Fresh Chicken"],    price: 1445,  published: true,  featured: true,  themes: ["Halal Food","Organic"], img: null },
  { id: 15, name: "Aged Beef Steak Beef (Plain)",          brand: "Nexover",     categories: ["Fresh Chicken"],                             price: 3740,  published: true,  featured: false, themes: ["Halal Food"],           img: null },
  { id: 16, name: "Fresh Mutton Leg",                      brand: "Bird Wings",  categories: ["Fresh Mutton","Fresh Chicken"],              price: 4200,  published: false, featured: false, themes: ["Halal Food"],           img: null },
  { id: 17, name: "Organic Honey Premium",                 brand: "NatureFarm",  categories: ["Honey","Organic"],                           price: 1200,  published: true,  featured: true,  themes: ["Grocery","Organic"],    img: null },
  { id: 18, name: "Cold Pressed Olive Oil",                brand: "OliveGold",   categories: ["Cooking Oil"],                               price: 980,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 19, name: "Basmati Rice Premium",                  brand: "RicePlus",    categories: ["Rice","Grocery"],                            price: 560,   published: false, featured: false, themes: ["Grocery"],              img: null },
  { id: 20, name: "Whole Wheat Bread",                     brand: "BreadCo",     categories: ["Bakery"],                                    price: 120,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 21, name: "Farm Fresh Eggs (12 pcs)",              brand: "FarmDirect",  categories: ["Dairy","Fresh"],                             price: 180,   published: true,  featured: false, themes: ["Grocery","Organic"],    img: null },
  { id: 22, name: "Cheddar Cheese Block",                  brand: "DairyBest",   categories: ["Dairy","Cheese"],                            price: 450,   published: true,  featured: true,  themes: ["Grocery"],              img: null },
  { id: 23, name: "Organic Cow Milk 1L",                   brand: "FarmDirect",  categories: ["Dairy"],                                     price: 95,    published: true,  featured: false, themes: ["Grocery","Organic"],    img: null },
  { id: 24, name: "Fresh Red Apples (1kg)",                brand: "FruitFarm",   categories: ["Fruits","Fresh"],                            price: 220,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 25, name: "Organic Bananas (6 pcs)",               brand: "FruitFarm",   categories: ["Fruits","Fresh"],                            price: 80,    published: false, featured: false, themes: ["Grocery","Organic"],    img: null },
  { id: 26, name: "Fresh Tomatoes (500g)",                 brand: "VeggieFresh", categories: ["Vegetables"],                                price: 60,    published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 27, name: "Organic Potatoes (1kg)",                brand: "VeggieFresh", categories: ["Vegetables"],                                price: 75,    published: true,  featured: false, themes: ["Grocery","Organic"],    img: null },
  { id: 28, name: "Black Grapes (500g)",                   brand: "FruitFarm",   categories: ["Fruits"],                                    price: 310,   published: true,  featured: true,  themes: ["Grocery"],              img: null },
  { id: 29, name: "Fresh Dairy Butter 200g",               brand: "DairyBest",   categories: ["Dairy","Butter"],                            price: 260,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 30, name: "Jam & Jelly Mixed Pack",                brand: "SweetSpread", categories: ["Jam","Breakfast"],                           price: 350,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 31, name: "Cleaning Multi-Surface Spray",          brand: "CleanPro",    categories: ["Cleaning"],                                  price: 199,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 32, name: "Baby Care Lotion 200ml",                brand: "BabySoft",    categories: ["Baby Care"],                                 price: 420,   published: true,  featured: false, themes: ["Grocery","Organic"],    img: null },
  { id: 33, name: "Pet Care Shampoo",                      brand: "PetPlus",     categories: ["Pet Care"],                                  price: 380,   published: false, featured: false, themes: ["Grocery"],              img: null },
  { id: 34, name: "Coffee Arabica Blend 250g",             brand: "BrewMaster",  categories: ["Coffee Drinks"],                             price: 640,   published: true,  featured: true,  themes: ["Grocery"],              img: null },
  { id: 35, name: "Assorted Cold Drinks Pack",             brand: "RefreshCo",   categories: ["Cold Drinks"],                               price: 480,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 36, name: "Fresh Organic Vegetables Box",          brand: "VeggieFresh", categories: ["Vegetables","Organic"],                      price: 599,   published: true,  featured: true,  themes: ["Grocery","Organic"],    img: null },
  { id: 37, name: "Breakfast Cereal Mix",                  brand: "MorningFresh",categories: ["Breakfast"],                                 price: 290,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 38, name: "Snack Variety Pack",                    brand: "SnackWorld",  categories: ["Snacks"],                                    price: 340,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 39, name: "Frozen Pizza Margherita",               brand: "FrozenFoods", categories: ["Frozen Foods"],                              price: 520,   published: false, featured: false, themes: ["Grocery"],              img: null },
  { id: 40, name: "Grilled Sea Bass Fillet",               brand: "SeaCatch",    categories: ["Sea Food"],                                  price: 1100,  published: true,  featured: true,  themes: ["Grocery","Organic"],    img: null },
  { id: 41, name: "Mixed Spice Combo",                     brand: "SpiceLane",   categories: ["Spices"],                                    price: 175,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 42, name: "Mango Juice 1L",                        brand: "RefreshCo",   categories: ["Beverages"],                                 price: 145,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 43, name: "Sourdough Bread Loaf",                  brand: "BreadCo",     categories: ["Bakery"],                                    price: 160,   published: true,  featured: false, themes: ["Grocery"],              img: null },
  { id: 44, name: "Duck Meat Premium Pack",                brand: "Bird Wings",  categories: ["Duck Meat"],                                 price: 2800,  published: true,  featured: true,  themes: ["Halal Food","Organic"], img: null },
];

let _products = INITIAL.map((p) => ({ ...p }));
let _nextId = 45;
const _listeners = new Set();

export const productStore = {
  getAll:  ()    => [..._products],
  getById: (id)  => _products.find((p) => p.id === id) || null,

  add(data) {
    const p = { ...data, id: _nextId++, img: data.img || null };
    _products = [p, ..._products];
    _notify();
    return p;
  },

  update(id, patch) {
    _products = _products.map((p) => p.id === id ? { ...p, ...patch } : p);
    _notify();
  },

  delete(id) {
    _products = _products.filter((p) => p.id !== id);
    _notify();
  },

  subscribe(fn)   { _listeners.add(fn); return () => _listeners.delete(fn); },
};

function _notify() { _listeners.forEach((fn) => fn([..._products])); }