const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Creado existosamente");
    } else {
      console.log("Ya existe el archivo");
    }
  }
  async create(data) {
    try {
      if (!data.title || !data.price) {
        throw new Error("Faltan Datos");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo
            ? data.photo
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHtD3u4pTZFR_pYwsb2Ubi77JwxwYAfapSC-WagJjuOQ&s",
          price: data.price,
          stock: data.stock,
          title: data.title,
          category:data.category || "No Categorizado",
        };
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return product;
      }
    } catch (error) {
      console.log(`Error al crear Producto`);
    }
  }
  async read() {
    let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    return products;
  }

  async readOne(id) {
    let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    return products.find((each) => each.id === id);
  }

  async destroy(id) {
    let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    const filtered = products.filter((each) => each.id !== id);
    await fs.promises.writeFile(filtered);
    return "Producto " + id + " Eliminado";
  }
}
async function test () {
    const products = new ProductManager();
// await products.create({
//   title: "Galaxy s23",
//   photo: "galaxy23.jpg",
//   category: "celulares",
//   price: 800000,
//   stock: 72,
// });
// await products.create({
//   title: "Lenovo  ThinkPad T490",
//   photo: "thinkpad.jpg",
//   category: "computadoras",
//   price: 56000,
//   stock: 12,
// });

// await products.create({
//   title: "Vaio  SZ422 Laptop",
//   photo: "vaio.jpg",
//   category: "computadoras",
//   price: 49500,
//   stock: 29,
// });
// await products.create({
//   title: "Apple Watch",
//   photo: "applewatch.jpg",
//   category: "accesorios",
//   price: 92800,
//   stock: 3,
// });
// await products.create({
//   title: "Huawei MatePad",
//   photo: "matepad.jpg",
//   category: "tablets",
//   price: 39000,
//   stock: 42,
// });

// await products.create({
//   title: "Galaxy s24",
//   photo: "galaxy24.jpg",
//   category: "celulares",
//   price: 1000000,
//   stock: 72,
// });
// await products.create({
//   title: "Xiaomi  Redmi Note 8 Pro",
//   photo: "redminote8pro.png",
//   category: "celulares",
//   price: 50000,
//   stock: 12,
// });

// await products.create({
//   title: "MSI GF 63",
//   photo: "msigf.jpg",
//   category: "computadoras",
//   price: 850000,
//   stock: 35,
// });
// await products.create({
//   title: "Nothing Ear",
//   photo: "ear1.jpg",
//   category: "auriculares",
//   price: 52000,
//   stock: 81,
// });
// await products.create({
//   title: "JBL Charge  6",
//   photo: "jblcharge6.jpg",
//   category: "audio",
//   price: 15000,
//   stock: 64,
// });


   console.log(await products.read())
   console.log (await products.readOne("064a411621765f1955f0d9d3"))
 }
 
 test()