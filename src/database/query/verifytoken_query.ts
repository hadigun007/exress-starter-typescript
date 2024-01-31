import { VerifyTokenModel } from '../../model/verify_token_model';
import db from '../database'
import { BaseQuery } from './query';

export class VerifyTokenQuery implements BaseQuery {
    update(data: any): string {
        throw new Error('Method not implemented.');
    }
    index(): string {
        throw new Error("Method not implemented.");
    }
    create(data:VerifyTokenModel): string {
        return `UPDATE users SET verify_token = ${db.escape(data.getVerifyToken())} WHERE id = ${db.escape(data.getUserId())};`
    }
    getByVtoken(vtoken:string){
        return `SELECT * FROM users where verify_token = ${db.escape(vtoken)};`
    }
    show(): string {
        throw new Error("Method not implemented.");
    }
    delete(): string {
        throw new Error("Method not implemented.");
    }
}

