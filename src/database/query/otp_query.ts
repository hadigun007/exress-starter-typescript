import { UserModel } from '../../model/user_model'
import db from '../database'

export class OTPQuery {
    
    createSecret(user:UserModel){
        
        return `
        UPDATE users SET 
            secret_key = ${db.escape(user.getSecretKey())}, 
            otpauth_url = ${db.escape(user.getOtpauthUrl())}, 
            status_id = 2 
        WHERE id = ${db.escape(user.getId())};`
    }
    updateOtp(user_id:string, status_id:string){
        return `
        UPDATE users SET verify_token = '', status_id = '3' WHERE id = ${user_id};
        `
    }
}