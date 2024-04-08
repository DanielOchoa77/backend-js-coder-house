import { Router } from 'express';
const router = Router();
import passport from 'passport';
import UsersController from '../../controllers/Users.controller.js';
import { authMiddleware } from '../../utils/utils.js';


router.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const users = await UsersController.getAllUser();
    res.render('users', { ...users, userSession: req.user });
});

router.get('/users/delete/:uid', passport.authenticate('jwt', { session: false }),authMiddleware('admin'), async (req, res, next) => {
    try {
      const { params: { uid } } = req;
      await UsersController.delete({ _id: uid });
      res.status(200)
      .render ('usersInfo', { messageInfo: 'Se elimino el usuario correctamente.' });
    } catch (error) {
        res.render('error', { title: 'error 🖐️', messageError: error });
    }
});

router.get('/users/premium/:uid', passport.authenticate('jwt', { session: false }), authMiddleware('admin'), async (req, res, next) => {
    try {
      const { uid } = req.params;
      const result = await UsersController.changeRole(uid);
      res.status(200)
      .render ('usersInfo', { messageInfo: 'Se cambio el rol del usuario correctamente.' });
    } catch (error) {
      res.render('error', { title: 'error 🖐️', messageError: error });
    }
  });


export default router;