import express from 'express';
import { createShop, getAllShops, getShopById, updateShopById } from '../controllers/Shop.Controller.js';


const ShopRouter = express.Router();

// Route to create a new shop
ShopRouter.post('/', createShop);

// Route to get shop by ID
ShopRouter.get('/:id', getShopById);

// Route to get all shops
ShopRouter.get('/', getAllShops);

// Route to update shop by ID
ShopRouter.put('/:id', updateShopById);

export default ShopRouter;
