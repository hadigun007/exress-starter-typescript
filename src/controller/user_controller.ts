import { Request, Response } from "express";
import { UserModel } from "../model/user_model";
import { Crypto } from "../util/crypto";
import { FailedResponse } from "../response/failed_response";
import db from '../database/database'
import { UserQuery } from "../database/query/user_query";
import { SuccessResponse } from "../response/success_response";
import { JwtUtil } from "../util/jwt_util";
import { ToArray } from "../util/to_array";
import { BaseController } from '../interface/base_controller'
import { KeyVal } from "../model/keyval";

export class UserController implements BaseController {
    index(req: Request, res: Response): any {
        const userq = new UserQuery()
        const token = JwtUtil.getJwt()

        db.query(userq.index(), (error, result)=>{
            if (error) return FailedResponse.queryFailed(res, "")
            if (result.length == 0) return FailedResponse.queryFailed(res, "")

            const data = ToArray.convertUsers(result)

            SuccessResponse.indexSuccess(res, token, data)
        })
    }

    store(req: Request, res: Response): any {
        const new_user = new UserModel()
        const userq = new UserQuery()
        const token = JwtUtil.getJwt()
        new_user.setName(req.body["name"])
        new_user.setEmail(req.body["email"])
        new_user.setPassword(Crypto.hashPassword(req.body["password"]))
        new_user.setRole(req.body["role"])

        if (new_user.valaidateCreate(new_user) == false) FailedResponse.bodyFailed(res, '')

        db.query(userq.create(new_user), (error, result) => {

            if (error) return FailedResponse.queryFailed(res, "")
            if (result.affectedRows == 0) return FailedResponse.storeFailed(res, "")

            return SuccessResponse.storeSuccess(res, token, null)
        })
    }

    show(req: Request, res: Response): any {

        const token = JwtUtil.getJwt()
        const user = new UserModel()
        const keyval = new KeyVal()
        const userq = new UserQuery()

        keyval.setKey(req.body["key"])
        keyval.setVal(req.body["val"])

        if(keyval.validate(keyval) == false) return FailedResponse.bodyFailed(res, "")
        
        db.query(userq.show(keyval), (error, result)=>{
            console.log(error);
            console.log(result);
            
            if (error) return FailedResponse.queryFailed(res, "")
            if (result.length == 0) return FailedResponse.recordNotFound(res, "", "User")

            const data = ToArray.convertUsers(result)

            SuccessResponse.showSuccess(res, token, data)
        })




    }
    update(req: Request, res: Response): Response {
        throw new Error("Method not implemented.");
    }
    destroy(req: Request, res: Response): Response {
        throw new Error("Method not implemented.");
    }

}
