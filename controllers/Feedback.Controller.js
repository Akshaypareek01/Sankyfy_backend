import Feedback from "../models/FeedBack.Model.js";


// Create feedback
export const createFeedback = async (req, res) => {
  const { userId, shopId, feedbackMessage,experience } = req.body;

  try {
    const feedback = new Feedback({
      userId,
      shopId,
      feedbackMessage,
      experience
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('userId shopId');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findById(id).populate('userId shopId');
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedbacks by User ID
export const getFeedbacksByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const feedbacks = await Feedback.find({ userId }).populate('userId shopId');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedbacks by Shop ID
export const getFeedbacksByShopId = async (req, res) => {
  const { shopId } = req.params;
  console.log("Data ==>",shopId)
  try {
    const feedbacks = await Feedback.find({ shopId }).populate('userId shopId');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update feedback
export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { feedbackMessage } = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { feedbackMessage },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
