import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { encrypt } from './utils/validator.js';
import { connect } from '../configs/mongo.js';
import userRoutes from './user/user.routes.js';
import taskRouter from './task/task.routers.js';

// models
import userModel from './user/user.model.js';
import taskModel from './task/task.model.js';

const app = express();
config();
const port = process.env.PORT || 3200;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas controladores
app.use('/users', userRoutes);
app.use('/tasks', taskRouter);

connect()
  .then(async () => {
    const user = await userModel({
      username: 'admin',
      password: await encrypt('admin'),
      name: 'admin',
      lastname: 'admin',
    });

    const users = await userModel.find();

    if (users.length === 0) {
      await user.save();
    }
  })
  .then(async () => {
    const task = new taskModel({
      task_name: 'Tarea 1',
      task_description: 'Descripcion de tarea 1',
      date_start: new Date(),
      date_end: new Date(),
      task_status: false,
      user: await userModel.findOne({ username: 'admin'}),
    });

    const tasks = await taskModel.find();

    if (tasks.length === 0) {
      await task.save();
    }
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });
