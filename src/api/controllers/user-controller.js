import { getAllUsers, findUserById, findUserByUsername, addUser, updateUser, removeUser } from '../models/user-model.js';

const getUsers = (req, res) => {
  res.json(getAllUsers());
}

const getUserById = (req, res) => {
  const user = findUserById(Number.parseInt(req.params.id));

  if (!user) res.sendStatus(404);

  res.json(user);
}

const getUserByUsername = (req, res) => {
  const user = findUserByUsername(req.params.username);

  if (!user) res.sendStatus(404);

  res.json(user);
}

const postUser = (req, res) => {
  const newUser = addUser(req.body);

  if (!newUser.user_id) res.sendStatus(400);

  res.status(201).json({message: 'New user added.', user_id: newUser.user_id});
}

const putUser = (req, res) => {
  const updatedUser = updateUser(req.body);

  if (!updatedUser.user_id) res.sendStatus(404);

  res.status(200).json({message: 'User item updated.'});
}

const deleteUser = (req, res) => {
  const deletedUser = removeUser(Number.parseInt(req.params.id));

  if (!deletedUser.user_id) res.sendStatus(404);

  res.status(200).json({message: 'User item deleted.'});
}

export { getUsers, getUserById, getUserByUsername, postUser, putUser, deleteUser };