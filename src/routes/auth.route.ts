import express from 'express';
import passport from 'passport';
import UserService from '../services/user.service';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { UserDocument } from '../types/user.type';

const router = express.Router();
const service = new UserService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req: Request, res, next) => {
    try {
      const user = req.body as UserDocument;
      const payload = { sub: user._id }; // Usamos user._id para el payload
      const dbUser = await service.findByEmail(user.email);
      const token = jwt.sign(payload, config.jwtSecret);
      res.status(200).json({ user: dbUser, token }); // No usamos toClient() ya que no está definido en UserDocument
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default router;
