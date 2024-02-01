import { faker } from '@faker-js/faker';
import { UserModel } from '../../model/user_model';
import { Crypto } from '../../util/crypto';
import db from '../database'
import { UserQuery } from '../query/user_query';


export class userFaker {
    static count = 20
    
    static generateUser(){
        const new_user = new UserModel()
        new_user.setName(faker.person.fullName())
        new_user.setEmail(faker.internet.email())
        new_user.setPassword(Crypto.hashPassword('adminsku'))
        new_user.setRole('admin')
        return new_user
    }
    
    static insertData() {
        const userq = new UserQuery()
        db.query(userq.create(userFaker.generateUser()), (error, result)=>{
            if(error) return console.log(error)
            userFaker.count = userFaker.count - 1;
            if(this.count > 0){
                userFaker.insertData()
            }else{
                process.exit(0)
            }
    
        })
    }
}