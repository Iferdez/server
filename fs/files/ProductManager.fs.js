import fs from "fs";
import crypto  from "crypto";

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
      console.log("Product created");
    } else {
      console.log("Already exist");
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
      console.log(error);
    }
  }
  async read(category ='') {
    let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    if (category==='') {return  products;}
    else 
 {   products = products.filter(each=>each.category===category)
    return products;}
  }

  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    return products.find((each) => each.id=== id);
    } catch (error) {
      return error
    }
    
  }

  async destroy(id) {
    let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    const filtered = products.filter((each) => each.id !== id);
    await fs.promises.writeFile(filtered);
    return "Product " + id + " deleted";
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
// await products.create({
//   title: "Nokia 1100",
//   photo: "nokia110.jpg",
//   category: "celulares",
//   price: 1000000,
//   stock: 2,
// });
// await products.create({
//   title: "Dell  Inspiron 7590 ",
//   photo: "dellinspiron.jpg",
//   category: "computadoras",
//   price: 585000,
//   stock: 28,
// });

// await products.create({
//   title: "Asus  Zenbook UX433fa",
//   photo: "zenbook.jpg",
//   category: "computadoras",
//   price: 491500,
//   stock: 10,
// });
// await products.create({
//   title: "Xiaomi Mi  Band 4 Pro",
//   photo: "miband4.jpg",
//   category: "accesorios",
//   price: 8000,
//   stock: 33,
// });
// await products.create({
//   title: "OnePlus Pad",
//   photo: "onepluspad.jpg",
//   category: "tablets",
//   price: 82000,
//   stock: 10,
// });

// await products.create({
//   title: "Nothing 2",
//   photo: "nothing2.jpg",
//   category: "celulares",
//   price: 285000,
//   stock: 22,
// });
// await products.create({
//   title: "Moto G 6 Plus",
//   photo: "g6plus.png",
//   category: "celulares",
//   price: 50000,
//   stock: 12,
// });

// await products.create({
//   title: "Vaio  Fit 11",
//   photo: "vaio11.jpg",
//   category: "computadoras",
//   price: 630000,
//   stock: 5,
// });
// await products.create({
//   title: "Xiaomi Redmi Buds 5",
//   photo: "redmibuds5.jpg",
//   category: "auriculares",
//   price: 48080,
//   stock: 11,
// });
// await products.create({
//   title: "Bose Soundlink ",
//   photo: "soundlink.jpg",
//   category: "audio",
//   price: 189000,
//   stock: 4,
// });


  //  console.log(await products.read())
  //  console.log (await products.readOne("064a411621765f1955f0d9d3"))
 }
 
 let isTestExecuted = false;

 async function testOnce() {
   if (!isTestExecuted) {
     await test();
     isTestExecuted = true;
   }
 }
 

 
 const productManager = new ProductManager();
 export default productManager;

 testOnce();