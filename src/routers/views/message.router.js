import { Router } from 'express';
import MessageManager from '../../dao/Dao/Message.controller.js';
import { newMessageFromAPI } from '../../socket.js';
import { authMiddleware } from "../../utils/utils.js";

const router = Router();

router.post('/messages', async (req, res) => {
    const { body } = req;
    const result = await MessageManager.saveMessage(body);
    newMessageFromAPI(body);
    res.status(result.statusCode).json(result.message ? result.message : result);
});

router.get('/',authMiddleware('user'), (req, res) => {
    res.render('chat', { title: 'Chat' });
  });

router.get('/messages', async (req, res) => {
    const result = await MessageManager.get();
    res.status(result.statusCode).json(result.message ? result.message : result);
});

export default router;