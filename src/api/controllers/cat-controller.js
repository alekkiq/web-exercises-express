import { getAllCats, findCatById, findCatsByOwnerId, addCat, updateCat, removeCat } from '../models/cat-model.js';

const getCats = async (req, res) => {
  res.json(await getAllCats());
}

const getCat = async (req, res) => {
  const cat = await findCatById(Number.parseInt(req.params.id));

  if (!cat) res.sendStatus(404);

  res.json(cat);
}

const getCatsByOwnerId = async (req, res) => {
  const cats = await findCatsByOwnerId(Number.parseInt(req.params.ownerId));

  if (!cats) res.sendStatus(404);

  res.json(cats);
}

const postCat = async (req, res) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  console.log(`Request file: ${JSON.stringify(req.file)}`);

  const newCat = await addCat(req.body, req.file);

  if (!newCat.cat_id) res.sendStatus(400);

  res.status(201).json({message: 'New cat added.', cat_id: newCat.cat_id});
}

const putCat = async (req, res) => {
  const catId = Number.parseInt(req.params.id);
  const catToUpdate = await findCatById(catId);

  if (!catToUpdate) return res.sendStatus(404);
  if (res.locals.user.user_id !== Number.parseInt(req.body.owner)) return res.sendStatus(403);

  const updatedCat = await updateCat(req.body, catId);

  if (!updatedCat.cat_id) res.sendStatus(404);

  res.status(200).json({message: 'Cat item updated.'});
}

const deleteCat = async (req, res) => {
  const catId = Number.parseInt(req.params.id);
  const catToDelete = await findCatById(catId);

  if (!catToDelete) return res.sendStatus(404);
  if (res.locals.user.user_id !== catToDelete.owner) return res.sendStatus(403);

  const deletedCat = await removeCat(catId);

  if (!deletedCat.cat_id) res.sendStatus(404);

  res.status(200).json({message: 'Cat item deleted.'});
}

export { getCats, getCat, getCatsByOwnerId, postCat, putCat, deleteCat };