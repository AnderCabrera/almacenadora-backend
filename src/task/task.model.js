import { model, Schema } from 'mongoose';

const taskSchema = Schema(
  {
    task_name: {
      type: String,
      required: true,
    },
    task_description: {
      type: String,
      required: true,
    },
    date_start: {
      type: Date,
      required: true,
    },
    date_end: {
      type: Date,
      required: true,
    },
    task_status: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('task', taskSchema);
