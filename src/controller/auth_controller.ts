import { Request, Response } from "express";
import { FailedResponse } from "../response/failed_response";
import db from '../database/database'
import { Crypto } from "../util/crypto";
import { AuthQuery } from "../database/query/auth_query";
import { VerifyTokenQuery } from "../database/query/verifytoken_query";
import { SuccessResponse } from "../response/success_response";
import { LoginResponse } from "../model/response/login_response";
import { UserModel } from "../model/user_model";
import { VerifyTokenModel } from "../model/verify_token_model";
import * as auth  from '../interface/auth_controller'


export class AuthController implements  auth.AuthController {
    
    static auth_user = new UserModel()

    login(req:Request, res:Response):any{
        const verify_token = new VerifyTokenModel()
        const user = new UserModel()
        const userq = new AuthQuery()
        const verifytokenq = new VerifyTokenQuery()
        const random = Crypto.randomHex(24)
        const data = new LoginResponse()
        
        user.setEmail(req.body["email"])
        user.setPassword(req.body["password"])
        
        if (!user.validateLogin(user)) return FailedResponse.bodyFailed(res, "")

        db.query(userq.login(user), (error: any, result: any) => {

            if (error) return FailedResponse.queryFailed(res, "")
            if (result.length == 0) return FailedResponse.recordNotFound(res, "", "User")
            if (Crypto.checkPassword(user.getPassword(), result[0].password) == false) return FailedResponse.loginFailed(res, "")
            if (result[0].status_id == "4") return FailedResponse.userFreezed(res, '')
            
            verify_token.setVerifyToken(random)
            verify_token.setUserId(result[0].id)

            db.query(verifytokenq.create(verify_token), (error2, result2) => {
                
                
                if (error2) return FailedResponse.queryFailed(res, "")
                if (result2.affectedRows == 0) return FailedResponse.queryFailed(res, "")
                
                data.setVerifyToken(verify_token.getVerifyToken())
                data.setStatus(result[0].status_id)
                

                SuccessResponse.loginSuccess(res,'', data.getVerifyToken(), data.getStatus())
            })

        })
    }
    logout(req: Request, res: Response): any {
        throw new Error("Method not implemented.");
    }

}