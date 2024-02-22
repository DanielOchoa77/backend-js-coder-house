import dotenv from 'dotenv';

dotenv.config();

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
  persistence: process.env.PERSISTENCE || 'memory',
  jwtSecret: process.env.JWT_SECRET_RECOVERY,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  mail: {
    emailService: process.env.EMAIL_SERVICE || 'gmail',
    emailPort: process.env.EMAIL_PORT || 587,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
  }
};
