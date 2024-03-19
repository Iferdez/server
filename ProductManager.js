class ProductManager {
  static #products = [];
  create(data) {
    const product = {
      id:crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.#products.push(product);
    console.log("Producto Creado");
  }
  read() {
    return ProductManager.#products;
  }
}

const products = new ProductManager();
products.create({
  title: "Galaxy s23",
  photo: "galaxy23.jpg",
  category: "celulares",
  price: 800000,
  stock: 72,
});

products.create({
  title: "Lenovo  ThinkPad T490",
  photo: "thinkpad.jpg",
  category: "computadoras",
  price: 56000,
  stock: 12,
});

products.create({
  title: "Vaio  SZ422 Laptop",
  photo: "vaio.jpg",
  category: "computadoras",
  price: 49500,
  stock: 29,
});
products.create({
  title: "Apple Watch",
  photo: "applewatch.jpg",
  category: "accesorios",
  price: 92800,
  stock: 3,
});
products.create({
  title: "Huawei MatePad",
  photo: "matepad.jpg",
  category: "tablets",
  price: 39000,
  stock: 42,
});

console.log(products.read());
