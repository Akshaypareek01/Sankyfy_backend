import Shop from "../models/Shop.Model.js";
import { deleteFile } from "../utils/deleteImages.js";



// Create a new shop
const createShop = async (req, res) => {
    try {
        const newShop = new Shop(req.body);
  
    const images = req.files || [];
    newShop.images = images.map(file => ({
        filename: file.filename,
        path: file.path
    }));
        const shop = await newShop.save();
        res.status(201).json({ success: true, data: shop });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get shop by ID
const getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({ success: false, error: 'Shop not found' });
        }
        res.status(200).json({ success: true, data: shop });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all shops
const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate("shopkeeperId").exec();
        res.status(200).json({ success: true, data: shops });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update shop by ID
const updateShopById = async (req, res) => {
    try {
        const existingUser = await Shop.findById(req.params.id);

        if (!existingUser) {
            return res.status(404).json({ success: false, error: 'Shop not found' });
        }
        const images = req.files || [];

        if(images.length > 0){
            for (const oldImage of existingUser.images) {
                const oldImagePath = oldImage.path;
                try {
                    await deleteFile(oldImagePath);
                } catch (error) {
                    console.error(`Error deleting file ${ oldImage.path}:`, error);
                }
            }

            req.body.images = images.map(file => ({
                filename: file.filename,
                path: file.path
            }));
        }

        const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!shop) {
            return res.status(404).json({ success: false, error: 'Shop not found' });
        }
        res.status(200).json({ success: true, data: shop });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateShopStatus = async (req, res) => {
    const { shopId, status } = req.body;
     console.log("Shop ==>",shopId, status )
    try {
        const shopData = await Shop.findById(shopId);
        console.log("ShopData ==>",shopData);
      const shop = await Shop.findByIdAndUpdate(
        shopId,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!shop) {
        return res.status(404).json({ message: 'Shop not found' });
      }
  
      res.status(200).json({ message: 'Shop status updated successfully', shop });
    } catch (error) {
      console.error('Error updating shop status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const deleteShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndDelete(req.params.id);
        if (!shop) {
            return res.status(404).json({ success: false, error: 'Shopnot found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Other CRUD operations can be added similarly

export { createShop, getShopById, getAllShops, updateShopById,deleteShop,updateShopStatus };
