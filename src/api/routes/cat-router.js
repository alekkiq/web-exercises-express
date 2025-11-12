import express from 'express';
import multer from 'multer';

import { createThumbnail } from '../../middlewares/upload.js';
import {
  getCats,
  getCat,
  postCat,
  putCat,
  deleteCat
} from '../controllers/cat-controller.js';

const upload = multer({ dest: 'uploads/' });

const catRouter = express.Router();

catRouter.route('/').get(getCats).post(upload.single('catImage'), createThumbnail, postCat);

catRouter.route('/:id').get(getCat).put(putCat).delete(deleteCat);

export default catRouter;