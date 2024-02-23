import { Schema, model } from 'mongoose'
import { User, UserModel } from '../types/user.type'

const Users = new Schema<User, UserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  
});

export default model('User', Users);