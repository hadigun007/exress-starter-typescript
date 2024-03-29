import { KeyVal } from '../../model/keyval';
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
    
    show(data:KeyVal): string {
        return `
        SELECT * FROM users WHERE ${data.getKey()} = ${db.escape(data.getVal())};
        `
    }
   
    update(user: UserModel): string {
        return `
        UPDATE users SET 
        name = ${db.escape(user.getName())},
        password = ${db.escape(user.getPassword())},
        status_id = ${db.escape(user.getStatusId())},
        role = ${db.escape(user.getRole())}
        WHERE id = ${db.escape(user.getId())};
        `
    }
    delete(user:UserModel): string {
        return `
        DELETE FROM users WHERE id = ${db.escape(user.getId())};
        `
    }
}
