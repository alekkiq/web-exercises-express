const cats = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
]

import promisePool from '../../utils/database.js';

const getAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  return rows;
}

const findCatById = async (id) => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);

  if (rows.length === 0) return false;

  return rows[0];
}

const addCat = async (cat, file) => {
  const { cat_name, weight, owner, birthdate } = cat;
  const filename = file ? file.filename : null;

  const sql = 'INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)';
  const values = [cat_name, weight, owner, filename, birthdate];
  const rows = await promisePool.execute(sql, values);

  if (rows[0].affectedRows === 0) return false;

  return { cat_id: rows[0].insertId };
}

const updateCat = async (cat, id) => {
  const sql = promisePool.format('UPDATE wsk_cats SET ? WHERE cat_id = ?', [cat, id])
  const rows = await promisePool.execute(sql);

  if (rows[0].affectedRows === 0) return false;

  return { cat_id: id };
}

const removeCat = async (id) => {
  const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);

  if (rows.affectedRows === 0) return false;

  return { cat_id: id };
}

export { getAllCats, findCatById, addCat, updateCat, removeCat };