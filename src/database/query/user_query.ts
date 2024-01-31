import { UserModel } from '../../model/user_model';
import { Momment } from '../../util/moment';
import db from '../database'
import { BaseQuery } from './query';

export class UserQuery implements BaseQuery {

    index(): string {
        return `
        SELECT * FROM users;
        `
    }
    create(user: UserModel): string {
        return `
        INSERT INTO 
            users 
            (name, email, password, role, status_id, created_at, updated_at)
        VALUES
            (${db.escape(user.getName())}, 
            ${db.escape(user.getEmail())}, 
            ${db.escape(user.getPassword())},
            ${db.escape(user.getRole())},
            1,
            '${Momment.getCurrent()}',
            '${Momment.getCurrent()}');
        `
    }

    show(): string {
        throw new Error("Method not implemented.");
    }
    delete(): string {
        throw new Error("Method not implemented.");
    }
}
