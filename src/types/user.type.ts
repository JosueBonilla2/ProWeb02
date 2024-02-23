
import { Document, Model } from 'mongoose';

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {}

interface UserDocument extends User, Document {}

export { User, UserModel, UserDocument };
