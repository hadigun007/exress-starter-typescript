import {Response} from 'express'

export class FailedResponse {
    static indexFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2000,
            status: "failed",
            message: "Index data failed",
            token: token
        })
    }
    static storeFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2001,
            status: "failed",
            message: "Store data failed",
            token: token
        })
    }
    static showFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2002,
            status: "failed",
            message: "Show data failed",
            token: token
        })
    }
    static updateFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2003,
            status: "failed",
            message: "Update data failed",
            token: token
        })
    }
    static deleteFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2004,
            status: "failed",
            message: "Delete data failed",
            token: token
        })
    }
    
    static bodyFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2005,
            status: "failed",
            message: "Request data is incomplete",
            token: token
        })
    }
    
    static queryFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2006,
            status: "failed",
            message: "Failed when processing data (quey error)",
            token: token
        })
    }
    
    static userFreezed(res: Response, token:string){
        return res.status(500).json({
            code: 2007,
            status: "failed",
            message: "User is freezed",
            token: token
        })
    }
    
    static loginFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2008,
            status: "failed",
            message: "User credentials failed",
            token: token
        })
    }
    static verifyOTPFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2008,
            status: "failed",
            message: "Verify OTP failed",
            token: token
        })
    }
    static jwtFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2009,
            status: "failed",
            message: "JWT failed",
            token: token
        })
    }
    static apiKeyFailed(res: Response, token:string){
        return res.status(500).json({
            code: 2010,
            status: "failed",
            message: "Api Key failed",
            token: token
        })
    }

    static recordNotFound(res: Response, token:string, data:string){
        return res.status(500).json({
            code: 2006,
            status: "failed",
            message: `${data} not found`,
            token: token
        })
    }
}