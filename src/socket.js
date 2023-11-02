import { Server } from 'socket.io';
import {ProductManagers} from './ProductManager.js';
const prodManager = new ProductManagers("./src/products.json");

let io;

let productList = await prodManager.getProducts();

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection',  (socketClient) =>  {
    console.log("cliente conectado : "+ socketClient.id);
    socketClient.emit('update-product', productList);
    
    socketClient.on('new-product',async (newProduct) => {
      await prodManager.addProduct(newProduct);
      productList = await prodManager.getProducts();
      io.emit('update-product', productList);
    });

    socketClient.on('delete-product',async (productId) => {
      console.log("efewfwef");
      await prodManager.deleteProduct(productId);
      productList = await prodManager.getProducts();
      io.emit('update-product', productList);
    });

  });
};

/*export const  newProductFromAPI = async (newProduct) => {
  await prodManager.addProduct(newProduct);
  productList.push(newProduct);
  io.emit('update-product', productList);
}*/