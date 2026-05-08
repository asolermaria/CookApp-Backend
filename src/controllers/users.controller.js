const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación datos de entrada
    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Faltan datos obligatorios: { name, email, password }",
      });
    }

    // Verificar si existe el usuario
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "Email ya registrado" });
    }

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
        message: `Bienvenid@ ${user.name}, te has registrado correctamente con el correo: ${user.email}`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
};
