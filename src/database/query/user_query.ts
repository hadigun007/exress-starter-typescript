import db from '../database'
import { Query } from './query';

export class UserQuery implements Query {
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
}