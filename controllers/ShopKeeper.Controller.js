import Shopkeeper from "../models/ShopKeeperModel.js";
import bcrypt from 'bcrypt';
import { deleteFile } from "../utils/deleteImages.js";

// Signup shopkeeper
const signupShopkeeper = async (req, res) => {
    try {
       const newShopkeeper = new Shopkeeper(req.body);
        const hashedPassword = await bcrypt.hash(newShopkeeper.password, 10);
        const images = req.files || [];
        newShopkeeper.images = images.map(file => ({
            filename: file.filename,
            path: file.path
        }));
        newShopkeeper.password=hashedPassword;
            const shopkeeper = await newShopkeeper.save();
        
        res.status(201).json({ success: true, data: shopkeeper });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Login shopkeeper
const loginShopkeeper = async (req, res) => {
    try {
        const { email, password } = req.body;
        const shopkeeper = await Shopkeeper.findOne({ email });
        if (!shopkeeper) {
            return res.status(404).json({ success: false, error: 'Shopkeeper not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, shopkeeper.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Invalid password' });
        }
        res.status(200).json({ success: true, data: shopkeeper });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all shopkeepers
const getAllShopkeepers = async (req, res) => {
    try {
        const shopkeepers = await Shopkeeper.find();
        res.status(200).json({ success: true, data: shopkeepers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get shopkeeper by ID
const getShopkeeperById = async (req, res) => {
    try {
        const shopkeeper = await Shopkeeper.findById(req.params.id);
        if (!shopkeeper) {
            return res.status(404).json({ success: false, error: 'Shopkeeper not found' });
        }
        res.status(200).json({ success: true, data: shopkeeper });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update shopkeeper by ID
const updateShopkeeper = async (req, res) => {
    console.log("Update Shop Keeper ==>")
    try {
        const {password} = req.body;
        const existingUser = await Shopkeeper.findById(req.params.id);

        if (!existingUser) {
            return res.status(404).json({ success: false, error: 'Shopkeeper not found' });
        }
        if (password) {
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                req.body.password = await bcrypt.hash(password, 10);
            } else {
                // If passwords match, do not hash the new password (remove it from req.body)
                delete req.body.password;
            }
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
       
        const shopkeeper = await Shopkeeper.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!shopkeeper) {
            return res.status(404).json({ success: false, error: 'Shopkeeper not found' });
        }
        res.status(200).json({ success: true, data: shopkeeper });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete shopkeeper by ID
const deleteShopkeeper = async (req, res) => {
    try {
        const shopkeeper = await Shopkeeper.findByIdAndDelete(req.params.id);
        if (!shopkeeper) {
            return res.status(404).json({ success: false, error: 'Shopkeeper not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export {signupShopkeeper,loginShopkeeper, getAllShopkeepers, getShopkeeperById, updateShopkeeper, deleteShopkeeper };
