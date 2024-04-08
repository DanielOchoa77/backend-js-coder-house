import { Router } from 'express';
import UserModel from '../../dao/models/user.model.js';
import UsersController from '../../controllers/Users.controller.js';
import { authMiddleware } from '../../utils/utils.js';
import passport from 'passport';

const router = Router();

router.get('/users1', async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/users/:uid', async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(401).json({ message: `User id ${uid} not found 😨.` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/users/', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UserModel.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/users/:uid', async (req, res, next) => {
  try {
    const { body, params: { uid } } = req;
    await UserModel.updateOne({ _id: uid }, { $set: body });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/users/:uid', async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    await UserModel.deleteOne({ _id: uid });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put('/users/premium/:uid', passport.authenticate('jwt', { session: false }), authMiddleware('admin'), async (req, res, next) => {
  try {
    const { uid } = req.params;
    const result = await UsersController.changeRole(uid);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/users/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const user = await UsersController.getAllUser(req.user.id);
    res.status(200).json(user.users);
  } catch (error) {
    next(error);
  }
});

router.delete('/users/', passport.authenticate('jwt', { session: false }), authMiddleware('admin'), async (req, res, next) => {
  try {
    const usersDelete = await UsersController.deleteByInactivity();
    res.status(200).json(usersDelete);
} catch (error) {
    next(error);
}
});


export default router;