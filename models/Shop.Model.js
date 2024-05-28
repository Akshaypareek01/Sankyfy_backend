import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
    shopkeeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopkeeper', required: true },
    shopName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    alternativeNumber: { type: String },
    emailId: { type: String },
    shopCategory: { type: String },
    pincode: { type: String },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    howYouHearAboutUs: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    images: [{
        filename: String, // Store the filename of the image
        path: String,     // Store the path to the image in the media folder
    }],
});

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
