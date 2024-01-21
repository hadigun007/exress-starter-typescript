import {Response} from 'express'
import { LoginResponse } from '../model/response/login_response'

export class SuccessResponse {
    static indexSuccess(res: Response, token:string, data:any){
        return res.status(200).json({
            code: 1000,
            message: "success",
            status: "Index data success",
            token: token,
            data: data
        })
    }
    static storeSuccess(res: Response, token:string, data:any){
        return res.status(201).json({
            code: 1001,
            message: "success",
            status: "Store data success",
            token: token,
            data: data
        })
    }
    static showSuccess(res: Response, token:string, data:any){
        return res.status(200).json({
            code: 1002,
            message: "success",
            status: "Show data success",
            token: token,
            data: data
        })
    }
    static updateSuccess(res: Response, token:string, data:any){
        return res.status(200).json({
            code: 1003,
            message: "success",
            status: "Update data success",
            token: token,
            data: data
        })
    }
    static deleteSuccess(res: Response, token:string, data:any){
        return res.status(200).json({
            code: 1004,
            message: "success",
            status: "Delete data success",
            token: token,
            data: data
        })
    }
    static loginSuccess(res: Response, token:string, data:LoginResponse){
        return res.status(200).json({
            code: 1005,
            message: "success",
            status: "Login success",
            token: token,
            data: data
        })
    }
}