import { UserModel } from '../../model/user_model';
import db from '../database'
import * as q from './query';

export class AuthQuery implements q.AuthQuery {
    login(user: UserModel): string {
        return `SELECT * FROM users WHERE email = ${db.escape(user.getEmail())};`
    }
    logout(): string {
        throw new Error('Method not implemented.');
    }
}