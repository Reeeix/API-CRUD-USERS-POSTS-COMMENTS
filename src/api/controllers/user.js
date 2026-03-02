const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const createUser = async (req, res, next) => {
  try {
      const userDuplicated = await User.findOne({ email: req.body.email });

      if (userDuplicated) {
        return res.status(409).json('Ya existe un usuario con este email')
      }

      const user = new User({
        ...req.body,
        role: "user"
      });

      const userSaved = await user.save();
      const userObject = userSaved.toObject();
      delete userObject.password;

      return res.status(201).json(userObject);
  } catch (error) {
    return res.status(400).json("error");
  }
}

const login = async (req, res, next) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json("Email y contraseña son obligatorios");
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json("Contraseña o usuario incorrectos")
      }

      if (bcrypt.compareSync(password, user.password)) {
        const token = generateSign(user._id);
        const userObject = user.toObject();
        delete userObject.password;
        return res.status(200).json({token, user: userObject});
      }

      return res.status(400).json("Contraseña o usuario incorrectos");
  } catch (error) {
    return res.status(400).json(error);
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json("error");
  }
}

const updateUser = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = bcrypt.hashSync(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {new: true}).select("-password");

    if (!user) {
      return res.status(400).json("Usuario no encontrado")
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(404).json("error")
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
     if (!user) {
      return res.status(400).json("Usuario no encontrado");
    }
    return res.status(200).json(`Usuario:
       ${user}
      eliminado correctamente`);
  } catch (error) {
    return res.status(404).json("error");
  }
}

module.exports = {createUser, login, getUsers, updateUser, deleteUser};