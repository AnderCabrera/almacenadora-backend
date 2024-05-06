import { Router } from 'express';
import {
  addTask,
  deleteTask,
  getTask,
  getSingleTask,
  updateTask,
} from './task.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';
const api = Router();

api.post('/addTask', [validateJwt], addTask);
api.get('/getTask', [], getTask);
api.get('/getSingleTask/:id', [], getSingleTask);
api.put('/updateTask/:id', [validateJwt], updateTask);
api.delete('/deleteTask/:id', [validateJwt], deleteTask);
export default api;
