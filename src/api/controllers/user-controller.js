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
  const newUser = await addUser(req.body);

  if (!newUser.user_id) res.sendStatus(400);

  res.status(201).json({message: 'New user added.', user_id: newUser.user_id});
}

const putUser = async (req, res) => {
  const updatedUser = await updateUser(req.body, Number.parseInt(req.params.id));

  if (!updatedUser.user_id) res.sendStatus(404);

  res.status(200).json({message: 'User item updated.'});
}

const deleteUser = async (req, res) => {
  const deletedUser = await removeUser(Number.parseInt(req.params.id));

  if (!deletedUser.user_id) res.sendStatus(404);

  res.status(200).json({message: 'User item deleted.'});
}

export { getUsers, getUserById, getUserByUsername, postUser, putUser, deleteUser };