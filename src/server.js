import http from 'http';

import app from './app.js';
import { init } from './socket.js';
import { initMongo } from './db/mongodb.js';
import config from './config/config.js';
import { logger } from './config/logger.js'

if(config.persistence === 'mongodb'){
    await initMongo();
}

const server = http.createServer(app);
const PORT = config.port;
//const PORT = 8080;

init(server);

server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT} 🚀`);
});