import express from 'express';
import { AuthController } from '../controller/auth_controller';

const public_route = express.Router()

public_route.post('/auth/login', AuthController.login)

export {public_route}