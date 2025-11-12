const users = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3610,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'user',
    password: 'password123',
  },
  {
    user_id: 1,
    name: 'aleksi',
    username: 'aleksi',
    email: 'aleksi@metropolia.fi',
    role: 'admin',
    password: 'adminpass',
  }
]

const getAllUsers = () => {
  return users;
}

const findUserById = (id) => {
  return users.find((user) => user.user_id === id);
}

const findUserByUsername = (username) => {
  return users.find((user) => user.username === username);
}

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = users[users.length - 1].user_id + 1;
  users.push({user_id: newId, name, username, email, role, password});

  return { user_id: newId };
}

const updateUser = (user) => {
  const { user_id, name, username, email, role, password } = user;
  const userToUpdate = users.find((user) => user.user_id === user_id);

  if (!userToUpdate) return null;

  Object.assign(userToUpdate, { name, username, email, role, password });

  return { user_id: user_id };
}

const removeUser = (id) => {
  const userToDelete = users.find((user) => user.user_id === id);

  if (!userToDelete) return null;

  const index = users.indexOf(userToDelete);
  users.splice(index, 1);

  return { user_id: id };
}

export { getAllUsers, findUserById, findUserByUsername, addUser, updateUser, removeUser };