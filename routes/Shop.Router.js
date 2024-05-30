import express from 'express';
import { createShop, getAllShops, getShopById, updateShopById,deleteShop, updateShopStatus, getNearbyShops } from '../controllers/Shop.Controller.js';


const ShopRouter = express.Router();

// Route to create a new shop
// ShopRouter.post('/', createShop);

// Route to get shop by ID
ShopRouter.get('/:id', getShopById);
ShopRouter.post('/nearby', getNearbyShops);
// Route to get all shops
ShopRouter.get('/', getAllShops);

// Route to update shop by ID
ShopRouter.post('/update-status', updateShopStatus);

ShopRouter.delete('/:id', deleteShop);

export default ShopRouter;
