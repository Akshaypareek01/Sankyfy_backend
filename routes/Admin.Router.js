import express from 'express';

import { loginAdmin, signupAdmin, updateAdminPassword } from '../controllers/Admin.Controller.js';

const AdminRouter = express.Router();

// Route to update admin password
AdminRouter.post('/signup', signupAdmin);
AdminRouter.put('/update-password', updateAdminPassword);
// Route to login admin
AdminRouter.post('/login', loginAdmin);

export default AdminRouter;
