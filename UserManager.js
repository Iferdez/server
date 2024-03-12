class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      photo: data.photo,
      email: data.email,
      pasword: data.pasword,
      role: 0,
    };
    UserManager.#users.push(user);
    console.log("Usuario Creado");
  }
  read() {
    return UserManager.#users;
  }
}

const users = new UserManager();
users.create({
  photo: "fotocarnet.jpg",
  email: "usuario@hormail.com",
  pasword: "incorrecta",
});

users.create({
  photo: "fotoignacio.jpg",
  email: "ignacio@gmail.com",
  pasword: "748596",
});

console.log(users.read());
