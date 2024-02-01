import { Request, Response } from "express";
import { GenerateOTPRequest } from "../model/request/generateotp_request";
import { FailedResponse } from "../response/failed_response";
import { Crypto } from "../util/crypto";
import db from '../database/database'
import { VerifyTokenQuery } from "../database/query/verifytoken_query";
import { OTPQuery } from "../database/query/otp_query";
import { GenerateOTPResponse } from "../model/response/generate_response";
import { SuccessResponse } from "../response/success_response";
import { VerifyOTPRequest } from "../model/request/verifyotp_request";
import { VerifyTokenModel } from "../model/verify_token_model";
const twofactor = require("node-2fa");
import * as otp from '../interface/otp_controller'
import { JwtUtil } from "../util/jwt_util";
import { UserModel } from "../model/user_model";
import config from '../../config.json'

export class OTPController implements otp.OTPController {

    generate(req: Request, res: Response): any {
        const otp = new GenerateOTPRequest()
        const vtokenq = new VerifyTokenQuery()
        const vtoken = new VerifyTokenModel()
        const otpq = new OTPQuery()
        const data = new GenerateOTPResponse()
        const random = Crypto.randomHex(24)
        const user = new UserModel()
        const newSecret = twofactor.generateSecret({ name: config.app_name, account: "root" });


        user.setSecretKey(Crypto.encryptString(newSecret.secret))
        user.setOtpauthUrl(Crypto.encryptString(newSecret.uri))

        otp.setVerifyToken(req.params["vtoken"])

        if (otp.validate(otp) == false) return FailedResponse.bodyFailed(res, "")

        db.query(vtokenq.getByVtoken(otp.getVerifyToken()), (error, result) => {
            
            if (error) return FailedResponse.queryFailed(res, "")
            if (result.length == 0) return FailedResponse.queryFailed(res, "")
            
            user.setId(result[0].id)
            vtoken.setVerifyToken(random)
            vtoken.setUserId(result[0].id)
            
            
            if (error) return FailedResponse.queryFailed(res, "")
            if (result[0] == null) return FailedResponse.recordNotFound(res, "", "User")
            if (result[0].secret_key == null || result[0].otpauth_url == null) {
                db.query(otpq.createSecret(user), (error2, result2) => {
                    
                    console.log("generate");
                    if (error2) return FailedResponse.queryFailed(res, "")
                    if (result2.affectedRows == 0) return FailedResponse.queryFailed(res, "")
                    
                    data.setSecretKey(Crypto.decryptString(user.getSecretKey()))
                    data.setVerifyToken(random)
                    data.setOtpauthUrl(Crypto.decryptString(user.getOtpauthUrl()))
                    
                    console.log("tetep");
                    console.log("data");
                    console.log(newSecret.secret);
                    console.log(Crypto.encryptString(newSecret.secret));
                    console.log("data");
                })


            }
            db.query(vtokenq.create(vtoken), (error3, result3) => {
                if (error3) return FailedResponse.queryFailed(res, "")
                if (result3.affectedRows == 0) return FailedResponse.queryFailed(res, "")
            })
            data.setSecretKey(Crypto.decryptString(result[0].secret_key))
            data.setOtpauthUrl(Crypto.decryptString(result[0].otpauth_url))
            data.setVerifyToken(random)
            
            SuccessResponse.generateOTPResponse(res, '', data)
        })
    }

    verify(req: Request, res: Response): any {
        const otpr = new VerifyOTPRequest()
        const vtokenq = new VerifyTokenQuery()
        const otpq = new OTPQuery()
        const token = JwtUtil.getJwt()


        otpr.setOTPCode(req.body["otp_code"])
        otpr.setVerifyToken(req.body["verify_token"])

        if (otpr.validate(otpr) == false) return FailedResponse.bodyFailed(res, "")

        db.query(vtokenq.getByVtoken(otpr.getVerifyToken()), (error, result) => {

            if (error) return FailedResponse.queryFailed(res, "")
            if (result[0] == null) return FailedResponse.recordNotFound(res, "", "User")
            
            const verify = twofactor.verifyToken(Crypto.decryptString(result[0].secret_key), otpr.getOTPCode().toString());
            
            if (verify != null) {
                
                if (verify.delta == 0) {
                    db.query(otpq.updateOtp(result[0].id, "3"), (error2, result2) => {

                        if (error2) return FailedResponse.queryFailed(res, "")
                        if (result2.affectedRows == 0) return FailedResponse.queryFailed(res, "")

                        SuccessResponse.verifyOTPSuccess(res, token)
                    })
                } else {
                    console.log("1");
                    FailedResponse.verifyOTPFailed(res, '')
                }
            } else {
                console.log("2");
                FailedResponse.verifyOTPFailed(res, '')
            }
        })
    }

}
