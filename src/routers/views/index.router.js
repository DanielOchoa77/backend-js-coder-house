import { Router } from 'express';

import { newMessageFromAPI } from '../../socket.js';

const router = Router();

router.get('/', (req, res) => {
  res.render('chat', { title: 'Chat' });
});

router.post('/api/messages', (req, res) => {
  const { body } = req;
  newMessageFromAPI(body);
  res.status(201).json({ message: 'Mensaje creado correctamente.'});
});

export default router;
