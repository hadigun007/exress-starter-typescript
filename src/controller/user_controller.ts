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
            
            if (error) return FailedResponse.queryFailed(res, "")
            if (result.length == 0) return FailedResponse.recordNotFound(res, "", "User")

            const data = ToArray.convertUsers(result)

            SuccessResponse.showSuccess(res, token, data)
        })




    }

    update(req: Request, res: Response): any {
        const token = JwtUtil.getJwt()
        const user = new UserModel()
        const userq = new UserQuery()

        user.setId(req.body["id"])
        user.setName(req.body["name"])
        user.setEmail(req.body["email"])
        user.setPassword(req.body["password"])
        user.setStatusId(req.body["status_id"])
        user.setRole(req.body["role"])

        if(user.valaidateUpdate(user) == false) return FailedResponse.bodyFailed(res, "")

        db.query(userq.update(user), (error, result)=>{
            
            if (error) return FailedResponse.queryFailed(res, "")
            if (result.affectedRows == 0) return FailedResponse.recordNotFound(res, "", "User")

            SuccessResponse.updateSuccess(res, token, '')
        })
    }

    destroy(req: Request, res: Response): any {
        const token = JwtUtil.getJwt()
        const user = new UserModel()
        const userq = new UserQuery()

        user.setId(req.params["id"])

        if(user.valaidateDestroy(user) == false) return FailedResponse.bodyFailed(res, "")

        db.query(userq.delete(user), (error: any, result: any) => {
            if (error) return FailedResponse.queryFailed(res, "")
            if (result.affectedRows == 0) return FailedResponse.recordNotFound(res, "", "User")

            SuccessResponse.deleteSuccess(res, token, '')
        })
    }

}
