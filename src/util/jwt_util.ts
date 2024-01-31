import jwt from 'jsonwebtoken'
import config from '../../config.json'
import { FailedResponse } from '../response/failed_response';
import { AuthController } from '../controller/auth_controller';
export class JwtUtil {
    static getJwt():string{
        const email = AuthController.auth_user.getEmail()
        return jwt.sign({
            email: email
        }, config.jwt.key, { expiresIn: config.jwt.age });
    }

    static verify(jwt_token:string, ){
       
    }
}

