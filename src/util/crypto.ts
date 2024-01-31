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

    // static encryptObject(plaintext:Array<Object>):string {
    //     return cryptojs.AES.encrypt(JSON.stringify(plaintext), config.aes.key).toString();
    // }

    // static decryptObject(ciphertext:string):string {
    //     var bytes  = cryptojs.AES.decrypt(JSON.parse(ciphertext), config.aes.key);
    //     return bytes.toString(cryptojs.enc.Utf8);
    // }
}

// let a = Crypto.encryptString('main')
// console.log(a);
let b = Crypto.decryptString("U2FsdGVkX1/htOnimoTZK+jAw5OI/g1UWqLARnTDFDpmb2lNWZgBtOGppj3OSxPDjAIQJL7/rGI1lChf6SEIAQ==")
console.log(b);

