import { Router } from 'express';
import MessageManager from '../../dao/Dao/Message.manager.js';
import { newMessageFromAPI } from '../../socket.js';
const router = Router();

router.post('/messages', async (req, res) => {
    const { body } = req;
    const result = await MessageManager.saveMessage(body);
    newMessageFromAPI(body);
    res.status(result.statusCode).json(result.message ? result.message : result);
});

router.get('/', (req, res) => {
    res.render('chat', { title: 'Chat' });
  });

router.get('/messages', async (req, res) => {
    const result = await MessageManager.get();
    res.status(result.statusCode).json(result.message ? result.message : result);
});

export default router;