import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    shopkeeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopkeeper', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    from:{type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
