import express from 'express';
import { createFeedback, deleteFeedback, getAllFeedbacks, getFeedbackById, getFeedbacksByShopId, getFeedbacksByUserId, updateFeedback } from '../controllers/Feedback.Controller.js';


const FeedBackRouter = express.Router();

// CRUD operations
FeedBackRouter.post('/', createFeedback);
FeedBackRouter.get('/', getAllFeedbacks);
FeedBackRouter.get('/:id', getFeedbackById);
FeedBackRouter.get('/user/:userId', getFeedbacksByUserId);
FeedBackRouter.get('/shop/:shopId', getFeedbacksByShopId);
FeedBackRouter.put('/:id', updateFeedback);
FeedBackRouter.delete('/:id', deleteFeedback);

export default FeedBackRouter;
