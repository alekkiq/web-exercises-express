import { getAllCats, findCatById, addCat, updateCat, removeCat } from '../models/cat-model.js';

const getCats = async (req, res) => {
  res.json(await getAllCats());
}

const getCat = async (req, res) => {
  const cat = await findCatById(Number.parseInt(req.params.id));

  if (!cat) res.sendStatus(404);

  res.json(cat);
}

const postCat = async (req, res) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  console.log(`Request file: ${JSON.stringify(req.file)}`);

  const newCat = await addCat(req.body, req.file);

  if (!newCat.cat_id) res.sendStatus(400);

  res.status(201).json({message: 'New cat added.', cat_id: newCat.cat_id});
}

const putCat = async (req, res) => {
  const updatedCat = await updateCat(req.body, Number.parseInt(req.params.id));

  if (!updatedCat.cat_id) res.sendStatus(404);

  res.status(200).json({message: 'Cat item updated.'});
}

const deleteCat = async (req, res) => {
  const deletedCat = await removeCat(Number.parseInt(req.params.id));

  if (!deletedCat.cat_id) res.sendStatus(404);

  res.status(200).json({message: 'Cat item deleted.'});
}

export { getCats, getCat, postCat, putCat, deleteCat };