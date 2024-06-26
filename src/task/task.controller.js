import { populate } from 'dotenv';
import taskModel from './task.model.js';

export const addTask = async (req, res) => {
  try {
    let data = req.body;
    data.user = req.user.id;
    let task = new taskModel(data);
    await task.save();
    return res.send({ message: 'task add succesfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'error adding task' });
  }
};
export const getTask = async (req, res) => {
  try {
    let task = await taskModel.find({}).populate({
      path: 'user',
      select: '-_id',
    });

    return res.send(task);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'error when listing tasks' });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    let { id } = req.params;
    let task = await taskModel.findOne({ _id: id }).populate({
      path: 'user',
      select: '-_id',
    });
    if (!task) return res.status(404).send({ message: 'Task not founded' });
    return res.send(task);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error listing task' });
  }
}

export const updateTask = async (req, res) => {
  try {
    let data = req.body;
    let { id } = req.params;

    let taskUpdate = await taskModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!taskUpdate)
      return res
        .status(404)
        .send({ message: 'Task not founded and not updated' });
    return res.send({ message: 'Update', taskUpdate });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    let { id } = req.params;
    let deleteStack = await taskModel.findOneAndDelete({ _id: id });
    if (!deleteStack)
      return res
        .status(404)
        .send({ message: 'Task nor founded and not deleted' });
    return res.send({ message: `Task ${deleteStack.taskName} deleted ` });
  } catch (err) {
    console.error(err);
  }
};
