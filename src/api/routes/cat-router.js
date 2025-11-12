import express from 'express';

import {
  getCats,
  getCat,
  postCat,
  putCat,
  deleteCat
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/').get(getCats).post(postCat);

catRouter.route('/:id').get(getCat).put(putCat).delete(deleteCat);

export default catRouter;