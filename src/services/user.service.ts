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
}

export default UserService
