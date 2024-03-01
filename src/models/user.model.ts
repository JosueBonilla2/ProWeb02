import { Schema, model } from 'mongoose'
import { User, UserModel } from '../types/user.type'
import { EMAIL_REGEX } from '../utils/constants'

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
    trim: true,
    match: [EMAIL_REGEX, 'Su direccion de correo electronico no es valida']
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  
});

export default model('User', Users);