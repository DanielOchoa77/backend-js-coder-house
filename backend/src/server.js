import http from 'http';

import app from './app.js';
import { init } from './socket.js';
import { initMongo } from './db/mongodb.js';
import config from './config/config.js';

if(config.persistence === 'mongodb'){
    await initMongo();
}

const server = http.createServer(app);
const PORT = config.port;
//const PORT = 8080;

init(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});