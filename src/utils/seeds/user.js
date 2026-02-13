const mongoose = require('mongoose');
require("dotenv").config();
const User = require('../../api/models/user');

const users = [
  {
    email: 'alejandro92@gmail.com',
    password: '12345678',
    role: 'user'
  },
  {
    email: 'sirenita@gmail.com',
    password: '23456789',
    role: 'user'
  },
  {
    email: 'pandachuli@gmail.com',
    password: 'panditasalpoder',
    role: 'user'
  }
];

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.create(users); // aquí se ejecuta el pre('save')

    console.log('Usuarios insertados correctamente');

  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

createUsers();
