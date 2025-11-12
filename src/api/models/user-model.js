import promisePool from '../../utils/database.js';

const getAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
}

const findUserById = async (id) => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users WHERE user_id = ?', [id]);

  if (rows.length === 0) return false;

  return rows[0];
}

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users WHERE username = ?', [username]);

  if (rows.length === 0) return false;

  return rows[0];
}

const addUser = async (user) => {
  const { name, username, email, password, role } = user;

  const sql = 'INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)';
  const values = [name, username, email, password, role];
  const rows = await promisePool.execute(sql, values);

  if (rows[0].affectedRows === 0) return false;

  return { user_id: rows[0].insertId };
}

const updateUser = async (user, id) => {
  const sql = promisePool.format('UPDATE wsk_users SET ? WHERE user_id = ?', [user, id]);
  const rows = await promisePool.execute(sql);

  if (rows[0].affectedRows === 0) return false;

  return { user_id: id };
}

const removeUser = async (id) => {
  const deleteUserSql = 'DELETE FROM wsk_users WHERE user_id = ?';
  const deleteRelatedCatsSql = 'DELETE FROM wsk_cats WHERE owner = ?';

  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(deleteRelatedCatsSql, [id]);
    const [rows] = await connection.execute(deleteUserSql, [id]);

    if (rows.affectedRows === 0) return false;

    await connection.commit();

    return { user_id: id };
  } catch (error) {
    await connection.rollback();
    console.error(error);
    return false;
  } finally {
    connection.release();
  }
}

export { getAllUsers, findUserById, findUserByUsername, addUser, updateUser, removeUser };