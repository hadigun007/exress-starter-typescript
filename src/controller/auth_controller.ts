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
import { LoginRequest } from "../model/request/login_request";
import { UserModel } from "../model/user_model";

export class AuthController implements Controller {

    private authUser = new UserModel()

    login(req:Request, res:Response){
        const verify_token = new VerifyTokenModel()
        const user = new LoginRequest()
        const userq = new AuthQuery()
        const verifytokenq = new VerifyTokenQuery()
        const random = Crypto.randomHex(24)
        let data = new LoginResponse()
        
        user.setEmail(req.body["email"])
        user.setPassword(req.body["password"])
        
        if (user.validate(user) == false) return FailedResponse.bodyFailed(res, "")

        db.query(userq.login(user), (error: any, result: any) => {
            
            if (error) return FailedResponse.queryFailed(res, "")
            if (result.length == 0) return FailedResponse.recordNotFound(res, "", "User")
            if (Crypto.checkPassword(user.getPassword(), result[0].password) == false) return FailedResponse.loginFailed(res, "")
            if (result[0].status_id == "4") return FailedResponse.userFreezed(res, '')
            
            verify_token.setVerifyToken(random)
            verify_token.setUserId(result[0].id)

            db.query(verifytokenq.create(verify_token), (error2, result2) => {
                
                
                if (error2) return FailedResponse.queryFailed(res, "")
                if (result.length == 0) return FailedResponse.queryFailed(res, "")
                
                data.setVerifyToken(verify_token.getVerifyToken())
                data.setStatus(result[0].status_id)
                
                AuthController.setAuthUser(result[0])


                SuccessResponse.loginSuccess(res,'', data.getVerifyToken(), data.getStatus())
            })

        })
    }

    
    logout(){}


    public  get authuser(){
        return this.authUser
    }

    static setAuthUser(user:any):void{
        // this.authUser.setId(user.id)
        // this.authUser.setName(user.name)
        // this.authUser.setEmail(user.email)
        // this.authUser.setPassword(user.password)
        // this.authUser.setVToken(user.verify_token)
        // this.authUser.setSecretKey(user.secret_key)
        // this.authUser.setOtpauthUrl(user.setotpauth_url)
        // this.authUser.setStatusId(user.status_id)
        // this.authUser.setRole(user.role)
        // this.authUser.setCreatedAt(user.created_at)
        // this.authUser.setUpdatedAt(user.updated_at)
    }



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