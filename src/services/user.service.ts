import UserModel from '../models/user.model'
import { User, UserDocument } from '../types/user.type'
import boom from '@hapi/boom'

class UserService {
  async create(user: User): Promise<UserDocument | null> {
    try {
      const newUser = await UserModel.create(user)
      return newUser
    } catch (error) {
      console.log('Could not save user', error)
      return null
    }
  }

  async findAll(): Promise<UserDocument[]> {
    try {
      const users = await UserModel.find()
      if (!users.length) {
        throw boom.notFound('There are no users')
      }
      return users
    } catch (error) {
      console.log('Error while connecting to the DB', error)
      return []
    }
  }

  async findById(id: string): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findById(id)
      if (!user) {
        throw boom.notFound('User not found')
      }
      return user
    } catch (error) {
      console.log('Error while connecting to the DB', error)
      return null
    }
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findOne({ username })
      if (!user) {
        throw boom.notFound('User not found')
      }
      return user
    } catch (error) {
      console.log('Error while connecting to the DB', error)
      return null
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw boom.notFound('User not found');
      }
      return user;
    } catch (error) {
      console.log('Error while connecting to the DB', error);
      return null;
    }
  }
  

  async delete(id: string): Promise<UserDocument | null> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      console.log('Error while deleting user', error);
      return null;
    }
  }

  async update(id: string, updates: Partial<User>): Promise<UserDocument | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
      return updatedUser;
    } catch (error) {
      console.log('Error while updating user', error);
      return null;
    }
  }

}

export default UserService
