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

const getAllCats = () => {
  return cats;
}

const findCatById = (id) => {
  return cats.find((cat) => cat.cat_id === id);
}

const addCat = (cat, file) => {
  const { cat_name, weight, owner, birthdate } = cat;
  const newId = cats[cats.length - 1].cat_id + 1;
  const filename = file ? file.filename : null;
  cats.push({cat_id: newId, cat_name, weight, owner, filename, birthdate});

  return { cat_id: newId };
}

const updateCat = (cat) => {
  const { cat_id, cat_name, weight, owner, filename, birthdate } = cat;
  const catToUpdate = cats.find((cat) => cat.cat_id === cat_id);

  if (!catToUpdate) return null;

  Object.assign(catToUpdate, { cat_name, weight, owner, filename, birthdate });

  return { cat_id: cat_id };
}

const removeCat = (id) => {
  const catToDelete = cats.find((cat) => cat.cat_id === id);

  if (!catToDelete) return null;

  const index = cats.indexOf(catToDelete);
  cats.splice(index, 1);

  return { cat_id: id };
}

export { getAllCats, findCatById, addCat, updateCat, removeCat };