import express from 'express';
import { deleteUserById, getAllUsers, getUserById, loginUser, signupUser, updateUserById } from '../controllers/User.Controller.js';


const UserRouter = express.Router();

// Route to signup a new user
UserRouter.post('/signup', signupUser);

// Route to login a user
UserRouter.post('/login', loginUser);

// Route to get user by ID
UserRouter.get('/:id', getUserById);

UserRouter.get('/', getAllUsers);

// Route to update user by ID
UserRouter.put('/:id', updateUserById);

// Route to delete user by ID
UserRouter.delete('/:id', deleteUserById);

export default UserRouter;
