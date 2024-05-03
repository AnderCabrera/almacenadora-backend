import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { encrypt } from '../src/utils/validator.js';
import userRoutes from '../src/user/user.routes.js';
import taskRouter from '../src/task/task.routers.js';

// models
import userModel from '../src/user/user.model.js';
import taskModel from '../src/task/task.model.js';

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

export const initServer = async () => {
  const users = await userModel.find({});
  const tasks = await taskModel.find({});

  if (users.length === 0) {
    await userModel.create({
      username: 'admin',
      password: await encrypt('admin'),
      name: 'admin',
      lastname: 'admin',
    });
  }

  if (tasks.length === 0) {
    await taskModel.create({
      task_name: 'Tarea 1',
      task_description: 'Descripcion de tarea 1',
      date_start: new Date(),
      date_end: new Date(),
      task_status: false,
      user: users[0]._id,
    });
  }

  app.listen(port);
  console.log(`Server HTTP running in port ${port}`);
};
