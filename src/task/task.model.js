import { model, Schema } from 'mongoose';

const taskSchema = Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  taskStatus: {
    type: String,
    uppercase: true,
    enum: ['COMPLETE', 'INCOMPLETE'],
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    required: true,
  },
});

export default model('task', taskSchema);
