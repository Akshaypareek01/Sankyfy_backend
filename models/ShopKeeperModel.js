import mongoose from 'mongoose';

const shopkeeperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    aadharOrPAN: { type: String, required: true },
    fssaiLicense: { type: String },
    aadharOrPANImage: { type: String },
    gstinNumber: { type: String, required: true },
    businessPanCardNumber: { type: String, required: true },
    companyName: { type: String, required: true },
    gstCertificateImage: { type: String },
    gstPanImage: { type: String },
    status: { type: Boolean, default: false },
    images: [{
        filename: String, // Store the filename of the image
        path: String,     // Store the path to the image in the media folder
    }],
    createdAt: { type: Date, default: Date.now }
});

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);

export default Shopkeeper;
