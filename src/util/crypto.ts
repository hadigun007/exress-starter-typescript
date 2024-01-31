import { randomBytes, } from 'crypto'
const bcrypt = require('bcrypt')
import cryptojs from 'crypto-js'
import config from '../../config.json'

export class Crypto {

    static randomHex(bytes: number): string {
        return randomBytes(bytes).toString('hex')
    }

    static hashPassword(plaintext: string) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(plaintext, salt);
        return hash;
    }

    static checkPassword(plaintext: string, hashed: string): boolean {
        return bcrypt.compareSync(plaintext, hashed);
    }

    static encryptString(plaintext:string):string {
        return cryptojs.AES.encrypt(plaintext, config.aes.key).toString();
    }

    static decryptString(ciphertext:string):string {
        var bytes  = cryptojs.AES.decrypt(ciphertext, config.aes.key);
        return bytes.toString(cryptojs.enc.Utf8);
    }
}


