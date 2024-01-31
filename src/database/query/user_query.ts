import { UserModel } from '../../model/user_model';
import { Momment } from '../../util/moment';
import db from '../database'
import { Query } from './query';

export class UserQuery implements Query {
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

// db.query(`
//         INSERT INTO users
//         (id, name, email, password, status_id, role)
//         VALUES 
//         (1, 'ROOT', 'root@mail.com', '$2a$10$3zoB8RuTA1JfVRCPgESWQuEGNdxqCqzX9K0KNbJHsF0iN04fVQp/y', 3, 'root');
//         `,(error, result)=>{
//             if (error) return console.log(error)
//             console.log(`✅ seeder table ${this.table_name} berhasil`)
//         } )