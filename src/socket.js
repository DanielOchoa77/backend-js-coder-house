import { Server } from 'socket.io';

let io;

const conversation = [
  {
    username: 'Daniel Ochoa',
    body: 'Hola a la comunidad de Developers 🖐️.',
  },
];

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection', (socketClient) => {
    
    socketClient.emit('update-conversation', conversation);
    
    socketClient.on('new-message', (newMessage) => {
      conversation.push(newMessage);
      io.emit('update-conversation', conversation);
    });

  });
};

export const newMessageFromAPI = (newMessage) => {
  conversation.push(newMessage);
  io.emit('update-conversation', conversation);
}