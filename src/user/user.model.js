'use strict';

import { Schema, model, version } from 'mongoose';

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('user', userSchema);
