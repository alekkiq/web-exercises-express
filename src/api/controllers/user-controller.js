import bcrypt from 'bcrypt';
import { getAllUsers, findUserById, findUserByUsername, addUser, updateUser, removeUser } from '../models/user-model.js';

const getUsers = async (req, res) => {
  res.json(await getAllUsers());
}

const getUserById = async (req, res) => {
  const user = await findUserById(Number.parseInt(req.params.id));

  if (!user) res.sendStatus(404);

  res.json(user);
}

const getUserByUsername = async (req, res) => {
  const user = await findUserByUsername(req.params.username);

  if (!user) res.sendStatus(404);

  res.json(user);
}

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const newUser = await addUser(req.body);

  if (!newUser.user_id) res.sendStatus(400);

  res.status(201).json({message: 'New user added.', user_id: newUser.user_id});
}

const putUser = async (req, res) => {
  const userId = Number.parseInt(req.params.id);
  const userToUpdate = await findUserById(userId);

  if (!userToUpdate) return res.sendStatus(404);
  if (res.locals.user.role !== 'admin' || res.locals.user.user_id !== userId) return res.sendStatus(403);

  const updatedUser = await updateUser(req.body, userId);

  if (!updatedUser.user_id) res.sendStatus(404);

  res.status(200).json({message: 'User item updated.'});
}

const deleteUser = async (req, res) => {
  const userId = Number.parseInt(req.params.id);
  const userToDelete = await findUserById(userId);

  if (!userToDelete) return res.sendStatus(404);
  if (res.locals.user.role !== 'admin' || res.locals.user.user_id !== userId) return res.sendStatus(403);

  const deletedUser = await removeUser(userId);

  if (!deletedUser.user_id) res.sendStatus(404);

  res.status(200).json({message: 'User item deleted.'});
}

export { getUsers, getUserById, getUserByUsername, postUser, putUser, deleteUser };