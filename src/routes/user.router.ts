import express, { Request, Response, NextFunction } from 'express'
import UserService from '../services/user.service'
import { User } from '../types/user.type'

const router = express.Router()
const userService = new UserService()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await userService.create(req.body as User)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
});

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAll()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findByUsername(req.params.username)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

export default router
