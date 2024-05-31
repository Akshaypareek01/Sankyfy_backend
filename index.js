import express from 'express';
import axios from 'axios';
import qs from 'qs';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from 'cors';
import KJUR from 'jsrsasign';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { createReadStream, promises as fsPromises } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import connection from './configs/db.js';
import ShopKeeperRouter from './routes/ShopKeeper.Router.js';
import UserRouter from './routes/User.Router.js';
import ShopRouter from './routes/Shop.Router.js';
import AdminRouter from './routes/Admin.Router.js';
import { createShop, updateShopById } from './controllers/Shop.Controller.js';
import { signupShopkeeper, updateShopkeeper } from './controllers/ShopKeeper.Controller.js';
import FeedBackRouter from './routes/Feedback.Router.js';
import categoryRouter from './routes/Categories.Router.js';
import {Unified_PinCode_Data} from "./configs/data.js"
const app = express()
const port = 5000

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.get('/api/', (req, res) => {
    res.json({
      message: "Sankyfy Server is running ...."
    })
  })

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'media/'); // Set the destination folder for image storage
    },
    filename: function (req, file, cb) {
      cb(null, +new Date() + Math.random(0,1000) + file.originalname); // Use the original filename for the stored image
    },
  });
  const upload = multer({ storage: storage });
  const requireToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }
  
    try {
      // Verify the token using your secret key
      const decoded = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key'); // Adjust the secret key
  
      // Attach user information to the request object
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  };
  
  const mediaPath = 'media/';
  const fileExists = async (path) => {
    try {
      await fsPromises.access(path);
      return true;
    } catch {
      return false;
    }
  };
  
  app.get('/api/media/:imageName', async (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = join(mediaPath, imageName);
   console.log("File exixst",await fileExists(imagePath))
    // Check if the requested image exists
    if (await fileExists(imagePath)) {
      const readStream = createReadStream(imagePath);
      readStream.pipe(res);
    } else {
      // If the image doesn't exist, serve a default image
      const currentModulePath = fileURLToPath(import.meta.url);
      const currentModuleDir = dirname(currentModulePath);
      const defaultImagePath = resolve(currentModuleDir, 'media', 'default-image.png');
      const defaultImageStream = createReadStream(defaultImagePath);
  
      defaultImageStream.on('error', (err) => {
        res.status(404).send('Default image not found');
      });
  
      defaultImageStream.pipe(res);
    }
  });

  // async function fileExists(filePath) {
  //   try {
  //     await fsPromises.access(filePath);
  //     console.log("File exists");
  //     return true;
  //   } catch (err) {
  //     console.log("File does not exist");
  //     return false;
  //   }
  // }
  app.get("/api/unifiedPinCode",async(req,res)=>{
    try{
      res.status(200).send({
        message:"data get success",
        data:Unified_PinCode_Data,
        status:"success"
       });
    }
     catch(err){
      res.status(400).send({
        message:"fail",
        error:err
       });
     }
  })

  app.use('/admin', AdminRouter);
  app.post('/api/shop',upload.array('images', 4),createShop)
  app.put('/api/shop/:id',upload.array('images', 4),updateShopById)
  app.post('/api/shopkeeper',upload.array('images', 4),signupShopkeeper)
  app.put('/api/shopkeeper/:id',upload.array('images', 4),updateShopkeeper)

  app.use('/api/user', UserRouter);
  app.use('/api/shopkeepers', ShopKeeperRouter);
  app.use('/api/shop', ShopRouter);
  app.use('/api/feedback', FeedBackRouter);
  app.use("/api/category",categoryRouter)
  app.listen(port,() =>{
    connection();
    console.log(`Sankyfy Server listening on port ${port}!`)
}
  )