import { getAllCats, findCatById, addCat, updateCat, removeCat } from '../models/cat-model.js';

const getCats = (req, res) => {
  res.json(getAllCats());
}

const getCat = (req, res) => {
  const cat = findCatById(Number.parseInt(req.params.id));

  if (!cat) res.sendStatus(404);

  res.json(cat);
}

const postCat = (req, res) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  console.log(`Request file: ${JSON.stringify(req.file)}`);

  const newCat = addCat(req.body, req.file);

  if (!newCat.cat_id) res.sendStatus(400);

  res.status(201).json({message: 'New cat added.', cat_id: newCat.cat_id});
}

const putCat = (req, res) => {
  const updatedCat = updateCat(req.body);

  if (!updatedCat.cat_id) res.sendStatus(404);

  res.status(200).json({message: 'Cat item updated.'});
}

const deleteCat = (req, res) => {
  const deletedCat = removeCat(Number.parseInt(req.params.id));

  if (!deletedCat.cat_id) res.sendStatus(404);

  res.status(200).json({message: 'Cat item deleted.'});
}

export { getCats, getCat, postCat, putCat, deleteCat };