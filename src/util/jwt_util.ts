import jwt from 'jsonwebtoken'

export class JwtUtil {
    static getJwt(email:string):string{
        return jwt.sign({
            email: email
        }, '*89po0=-uFR*^5)', { expiresIn: '1h' });
    }
}