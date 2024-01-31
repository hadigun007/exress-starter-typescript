import { UserModel } from "../../model/user_model"

export interface BaseQuery {
    index():string
    create(data:any):string
    show(data:any):string
    update(data:any):string
    delete(data:any):string
}

export interface AuthQuery {
    login(user:UserModel):string
    logout():string
}