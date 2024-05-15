import express from 'express';
import {signupShopkeeper,loginShopkeeper, deleteShopkeeper, getAllShopkeepers, getShopkeeperById, updateShopkeeper } from '../controllers/ShopKeeper.Controller.js';


const ShopKeeperRouter = express.Router();

// Route to create a new shopkeeper
ShopKeeperRouter.post('/', signupShopkeeper);

ShopKeeperRouter.post('/login', loginShopkeeper);

// Route to get all shopkeepers
ShopKeeperRouter.get('/', getAllShopkeepers);

// Route to get shopkeeper by ID
ShopKeeperRouter.get('/:id', getShopkeeperById);

// Route to update shopkeeper by ID
ShopKeeperRouter.put('/:id', updateShopkeeper);

// Route to delete shopkeeper by ID
ShopKeeperRouter.delete('/:id', deleteShopkeeper);

export default ShopKeeperRouter;
