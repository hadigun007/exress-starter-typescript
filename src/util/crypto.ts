import crypto, { randomBytes } from 'crypto'

export class Crypto {
    key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    static randomHex(bytes: number): string {
        return randomBytes(bytes).toString('hex')
    }

}