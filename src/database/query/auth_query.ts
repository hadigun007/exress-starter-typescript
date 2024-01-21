import db from '../database'

export class AuthQuery implements Query {
    index(): string {
        throw new Error("Method not implemented.");
    }
    create(): string {
        throw new Error("Method not implemented.");
    }
    show(): string {
        throw new Error("Method not implemented.");
    }
    delete(): string {
        throw new Error("Method not implemented.");
    }

    login(user:LoginRequest):string{
        return `SELECT * FROM users WHERE email = ${db.escape(user.getEmail())} AND password = ${db.escape(user.getPassword())};`
    }
}