import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  if (!user) return res.sendStatus(401);

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) return res.sendStatus(401);

  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;

  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, { expiresIn: '24h' });

  res.status(200).json({ user: userWithoutPassword, token });
}

const getMe = async (req, res) => {
  if (!res.locals.user) return res.sendStatus(401);

  res.status(200).json({user: res.locals.user});
}

export { postLogin, getMe };