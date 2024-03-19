const fs = require("fs");
const crypto = require("crypto");

class UsersManager {
  constructor() {
    this.path = "fs/files/users.json";
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
      if (!data.email || !data.password) {
        throw new Error("Faltan Datos");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo
            ? data.photo
            : "https://pbs.twimg.com/media/Bwi-IjVIcAAjoIb?format=jpg&name=small",
          password: data.password,
          role: 0,
          email:data.email,
        };
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        return user;
      }
    } catch (error) {
      console.log(`Error al crear Usuario`);
    }
  }
  async read() {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users;
  }

  async readOne(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users.find((each) => each.id === id);
  }

  async destroy(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    const filtered = users.filter((each) => each.id !== id);
    await fs.promises.writeFile(filtered);
    return "Usuario " + id + " Eliminado";
  }
}

async function test () {
   const users = new UsersManager();
// await users.create({
//   email: "usuario@hormail.com",
//   password: "incorrecta",
// });

// await users.create({
//   email: "ignacio@gmail.com",
//   password: "748596",
// });

// await users.create({
//     email: "franco@gmail.com",
//     password: "125489619",
//   });


//   await users.create({
//     email: "elantiguo@yahoo.com",
//     password: "margarita",
//     photo:"https://media.tenor.com/Qyr0DdIkY64AAAAe/enrique-el-antiguo.png"
//   });
  console.log(await users.read())
  console.log (await users.readOne("9249521474602a9ff0733406"))
}

test()
