import express from 'express';
import { AuthController } from '../controller/auth_controller';
import { OTPController } from '../controller/otp_controller';
import {public_middlware} from '../midleware/middleware'

const public_route = express()

public_route.use(public_middlware)

const auth = new AuthController()
const otp = new OTPController()

public_route.post('/auth/login', auth.login)
public_route.get('/auth/generate_2fa/:vtoken', otp.generate)
public_route.post('/auth/verify_2fa', otp.verify)

export default public_route