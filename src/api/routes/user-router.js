import express from 'express';

import {
  getUsers,
  getUserById,
  getUserByUsername,
  postUser,
  putUser,
  deleteUser
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postUser);

userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

userRouter.route('/username').get(getUserByUsername);

export default userRouter;