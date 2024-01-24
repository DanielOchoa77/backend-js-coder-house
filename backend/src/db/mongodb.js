import mongoose from 'mongoose';
import config from '../config/config.js';

//export const URI ='mongodb+srv://developer:TQkVFbfZdesDfCmu@cluster0.1dtp5rb.mongodb.net/ecommerce?retryWrites=true&w=majority';
export const URI = config.mongodbUri;

export const initMongo = async () => {
  try {
    //const URI = 'mongodb://localhost:27017/school';
    await mongoose.connect(URI);
    console.log('Database connected succesfuly 🚀');
  } catch (error) {
    console.error('Error to connect to database', error.message);
  }
};
