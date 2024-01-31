export class VerifyTokenModel {
    verify_token!:string 
    user_id!:string 

    setVerifyToken(verify_token:string){
        this.verify_token = verify_token
    }

    setUserId(user_id:string){
        this.user_id = user_id
    }

    getVerifyToken():string{
        return this.verify_token
    }

    getUserId():string{
        return this.user_id
    }

    getPayload():VerifyTokenModel{
        return this
    }
}