import {Response, Request} from 'express'

export interface OTPController {
    generate(req:Request, res:Response):Response
    verify(req:Request, res:Response):Response

}
