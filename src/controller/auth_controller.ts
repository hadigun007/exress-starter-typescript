import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Controller from "./controller";
import { FailedResponse } from "../response/failed_response";
import db from '../database/database'
import { Crypto } from "../util/crypto";
import { AuthQuery } from "../database/query/auth_query";
import { VerifyTokenModel, VerifyTokenQuery } from "../database/query/verifytoken_query";
import { SuccessResponse } from "../response/success_response";
import { LoginResponse } from "../model/response/login_response";

export class AuthController implements Controller {
    static login(req:Request, res:Response){
        const verify_token = new VerifyTokenModel()
        const user = new LoginRequest()
        let data = new LoginResponse()
        const userq = new AuthQuery()
        const verifytokenq = new VerifyTokenQuery()
        const random = Crypto.randomHex(24)

        
        user.setEmail(req.body["email"])
        user.setPassword(req.body["password"])
        
        if (user.validate(user)) return FailedResponse.bodyFailed(res, "")
        
        db.query(userq.login(user), (error: any, result: any) => {
            
            if (error) return FailedResponse.queryFailed(res, "")
            if (result[0].status == "4") return FailedResponse.userFreezed(res, '')
            
            verify_token.setVerifyToken(random)
            verify_token.setUserId(result[0].verify_token)
            
            db.query(verifytokenq.create(verify_token.getPayload()), (error2, result2) => {
                if (error2) return FailedResponse.queryFailed(res, "")
                if (result.length == 0) return FailedResponse.queryFailed(res, "")
               
                data.setVerifyToken(verify_token.getVerifyToken())
                data.setStatus(result[0].status)

                SuccessResponse.loginSuccess(res,'', data.getPayload())
            })

        })
    }






    
    static logout(){}

    index(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        throw new Error("Method not implemented.");
    }
    store(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        throw new Error("Method not implemented.");
    }
    show(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        throw new Error("Method not implemented.");
    }
    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        throw new Error("Method not implemented.");
    }
    destroy(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        throw new Error("Method not implemented.");
    }
}