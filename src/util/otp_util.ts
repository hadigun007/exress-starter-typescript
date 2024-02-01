const twofactor = require("node-2fa");


export class OTPUtil {
    static generateToken(secret_key:string){
        const new_token = twofactor.generateToken(secret_key);
        console.log(new_token.token);
        console.log(secret_key);
        
        // => { token: '630618' }
        return new_token.token
    }
}