import UserModel from '../models/user.model'
import { User, UserDocument } from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {

  /*async create(user: User): Promise<UserDocument | null> {
    try {
      const newUser = await UserModel.create(user)
      return newUser
    } catch (error) {
      console.log('Could not save user', error)
      return null
    }
  }*/

  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await UserModel.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log('Usuario no creado', error)
    })

    if (!newUser) {
      throw boom.badRequest('Usuario no creado')
    }

    return newUser
  }

  async findAll(): Promise<UserDocument[]> {
    try {
      const users = await UserModel.find()
      if (!users.length) {
        throw boom.notFound('No existe ningun usuario')
      }
      return users
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error)
      return []
    }
  }

  async findById(id: string): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findById(id)
      if (!user) {
        throw boom.notFound('Usuario no encontrado')
      }
      return user
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error)
      return null
    }
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findOne({ username })
      if (!user) {
        throw boom.notFound('Usuario no encontrado')
      }
      return user
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error)
      return null
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findOne({ email })
      if (!user) {
        throw boom.notFound('Usuario no encontrado')
      }
      return user
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error)
      return null;
    }
  }
  

  async delete(id: string): Promise<UserDocument | null> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id)
      return deletedUser
    } catch (error) {
      console.log('Error al eliminar al usuario', error)
      return null;
    }
  }

  async update(id: string, updates: Partial<User>): Promise<UserDocument | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true })
      return updatedUser
    } catch (error) {
      console.log('Error al actualizar al usuario', error)
      return null
    }
  }

}

export default UserService
