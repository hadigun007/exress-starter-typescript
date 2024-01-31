export class GenerateOTPResponse {
    verify_token!:string 
    secret_key!:string 
    otpauth_url!:string 

    setVerifyToken(verify_token:string){
        this.verify_token = verify_token
    }

    setSecretKey(secret_key:string){
        this.secret_key = secret_key
    }
    setOtpauthUrl(otpauth_url:string){
        this.otpauth_url = otpauth_url
    }

    getVerifyToken():string{
        return this.verify_token
    }

    getSecretKey():string{
        return this.secret_key
    }
    getOtpauthUrl():string{
        return this.otpauth_url
    }

    getPayload(){
        return this
    }
}