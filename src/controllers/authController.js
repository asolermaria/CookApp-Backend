const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// POST
// /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación datos de entrada
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Faltan datos obligatorios: { name, email, password }",
      });
    }

    // REGEX EMAIL (válido estándar)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // REGEX PASSWORD
    // Mínimo 8 caracteres
    // 1 mayúscula
    // 1 minúscula
    // 1 número
    // 1 carácter especial
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Por favor, introduce un email válido" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe contener mínimo: 8 caracteres, mayúscula, minúscula, número y símbolo",
      });
    }

    // Verificar si existe el usuario
    const userExists = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (userExists) {
      return res.status(409).json({
        message: "Email ya registrado",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: passwordHash,
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// POST
// /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Faltan datos obligatorios: { email, password }",
    });
  }

  try {
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const accessToken = jwt.sign(
      { id: user._id, name: user.name },
      accessTokenSecret,
      { expiresIn: "20m" },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none", // Cambiar a "lax" si se requieren pruebas en localhost
      secure: true, // Necesario para viajar al frontend en producción (HTTPS), cambiar a false si se requieren pruebas en localhost
      maxAge: 20 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken, // REVIEW: Borrar una vez esté en producción, solo para pruebas en Postman
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// POST
// /api/auth/logout
const logout = (_req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({
    message: "Sesión cerrada",
  });
};

module.exports = {
  register,
  login,
  logout
};
