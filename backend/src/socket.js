import { Server } from 'socket.io';
import MessageManager from './dao/Dao/Message.controller.js';
import {ProductManagers} from './dao/Dao/ProductManager.js';
const prodManager = new ProductManagers("./src/products.json");


let io;

let productList = await prodManager.getProducts();

const conversation = [
  {
    user: 'Daniel Ochoa',
    message: 'Hola a la comunidad de Developers 🖐️.',
  },
];

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection', (socketClient) => {
    console.log("cliente conectado : "+ socketClient.id);
    socketClient.emit('update-product', productList);
    
    socketClient.emit('update-conversation', conversation);
    
    socketClient.on('new-message',async (newMessage) => {
      await MessageManager.saveMessage(newMessage);
      conversation.push(newMessage);
      io.emit('update-conversation', conversation);
    });

    socketClient.on('new-product',async (newProduct) => {
      await prodManager.addProduct(newProduct);
      productList = await prodManager.getProducts();
      io.emit('update-product', productList);
    });

    socketClient.on('delete-product',async (productId) => {
      await prodManager.deleteProduct(productId);
      productList = await prodManager.getProducts();
      io.emit('update-product', productList);
    });

  });
};

export const newMessageFromAPI = (newMessage) => {
  
  conversation.push(newMessage);
  io.emit('update-conversation', conversation);
}