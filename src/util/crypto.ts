import crypto, { randomBytes } from 'crypto'
const bcrypt = require('bcrypt')

export class Crypto {
    key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    static randomHex(bytes: number): string {
        return randomBytes(bytes).toString('hex')
    }

    static hashPassword(plaintext:string){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(plaintext, salt);
            return hash;
    }

    static checkPassword(plaintext:string, hashed:string):boolean{
        return bcrypt.compareSync(plaintext, hashed); 
    }
}

// if (error) return FailedResponse.queryFailed(res, "")
//         if (result[0] == null) return FailedResponse.queryFailed(res, "")
//         if (result[0].secret_key != "") {
//             const is_valid = o.verifyOtp(result[0].secret_key, user.otp)
//             if (is_valid == true) {
//                 db.query(UtilQuery.emptyVerifyToken(result[0].id, "3"), (error2, result2) => {
//                     if (error2) return FailedResponse.queryFailed(res, "")
//                     if (result2.affectedRows == 0) return FailedResponse.queryFailed(res, "")
//                     let data = { valid: is_valid}
                    
                    
//                     SuccessReponse.verifyOtpSuccess(res, JwtUtil.getJwt(result[0].email), data)


//                 })
//             }
//             else{
//                 FailedResponse._2faFailed(res, "")
//             }
            
//         } else {
//             return FailedResponse._2faFailed(res, "")
//         }
//      })