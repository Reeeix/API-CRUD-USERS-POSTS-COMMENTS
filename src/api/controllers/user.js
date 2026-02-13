const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const createUser = async (req, res, next) => {
  try {
      const user = new User(req.body);

      const userDuplicated = await User.findOne({ email: req.body.email });

      if (userDuplicated) {
        res.status(409).json('Ya existe un usuario con este email')
      } else {
        const userSaved = await user.save();
        return res.status(201).json(userSaved);
      }
  } catch (error) {
    return res.status(400).json("error");
  }
}

const login = async (req, res, next) => {
  try {

      const user = await User.findOne({email: req.body.email})

      if (!user) {
        return res.status(400).json("Contraseña o usuario incorrectos")
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id);
        return res.status(200).json({token, user});
      } else {
       res.status(400).json("Contraseña o usuario incorrectos");
      }
  } catch (error) {
    return res.status(400).json(error);
  }
}

const getUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    return res.status(200).json(Users);
  } catch (error) {
    return res.status(500).json("error");
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!user) {
      return res.status(400).json("Usuario no encontrado")
    }
    await user.save();
    return res.status(200).json(user);

  } catch (error) {
    res.status(404).json("error")
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
     if (!user) {
      return res.status(400).json("Usuario no encontrado");
    }
    res.status(200).json(`Usuario:
       ${user}
      eliminado correctamente`);
  } catch (error) {
    res.status(404).json("error");
  }
}

module.exports = {createUser, login, getUsers, updateUser, deleteUser};