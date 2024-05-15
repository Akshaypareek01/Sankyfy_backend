
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.Model.js';
const signupAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, error: 'Admin with this email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new admin
        const admin = await Admin.create({ name, email, password: hashedPassword });
        res.status(201).json({ success: true, data: admin });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
// Update admin password
const updateAdminPassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, error: 'Admin not found' });
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Invalid old password' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedNewPassword;
        await admin.save();
        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, error: 'Admin not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Invalid password' });
        }
        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export {signupAdmin, updateAdminPassword, loginAdmin };
