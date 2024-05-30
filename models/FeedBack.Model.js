import mongoose from 'mongoose';

const feedbackSchema =  new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // Reference to the Shop model
    required: true
  },
  feedbackMessage: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
