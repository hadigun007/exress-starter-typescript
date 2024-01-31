import {Response, Request} from 'express'

export interface AuthController {
    login(req:Request, res:Response):Response
    logout(req:Request, res:Response):Response

}