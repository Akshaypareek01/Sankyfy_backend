import Shop from "../models/Shop.Model.js";



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
        const shops = await Shop.find();
        res.status(200).json({ success: true, data: shops });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update shop by ID
const updateShopById = async (req, res) => {
    try {
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

// Other CRUD operations can be added similarly

export { createShop, getShopById, getAllShops, updateShopById };
