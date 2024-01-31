import db from '../database'

export class OTPQuery {
    createSecret(secret:any, user_id:any){
        return `UPDATE users SET secret_key = ${db.escape(secret.secret)}, otpauth_url = ${db.escape(secret.uri)} WHERE id = ${user_id};`
    }
    updateOtp(user_id:string, status_id:string){
        return `
        UPDATE users SET verify_token = '', status_id = '3' WHERE id = ${user_id};
        `
    }
}