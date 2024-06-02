import Chat from "../models/Chat.Model.js";


// Create a new chat message
export const createChat = async (req, res) => {
    try {
        const { shopkeeperId, userId, message } = req.body;
        const chat = new Chat({ shopkeeperId, userId, message });
        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all chat messages for a specific shopkeeper
export const getChatsByShopkeeperId = async (req, res) => {
    try {
        const { shopkeeperId } = req.params;
        const chats = await Chat.find({ shopkeeperId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all chat messages for a specific user
export const getChatsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const chats = await Chat.find({ userId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a chat message by ID
export const updateChat = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const chat = await Chat.findByIdAndUpdate(id, { message }, { new: true });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a chat message by ID
export const deleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        await Chat.findByIdAndDelete(id);
        res.status(200).json({ message: 'Chat deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
