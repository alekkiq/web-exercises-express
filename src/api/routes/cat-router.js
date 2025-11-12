import express from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

import {
  getCats,
  getCat,
  postCat,
  putCat,
  deleteCat
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/').get(getCats).post(upload.single('catImage'), postCat);

catRouter.route('/:id').get(getCat).put(putCat).delete(deleteCat);

export default catRouter;