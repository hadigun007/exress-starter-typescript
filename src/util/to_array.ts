import { UserModel } from "../model/user_model";

export class ToArray {
    static convertUsers(users:any):UserModel[]{
        let temp_users: UserModel[] = []
        for(let i in users){
            const temp_user = new UserModel()
            temp_user.setId(users[i].id)
            temp_user.setName(users[i].name)
            temp_user.setEmail(users[i].email)
            temp_user.setStatusId(users[i].status_id)
            temp_user.setRole(users[i].role)
            temp_users.push(temp_user)
        }
        return temp_users
    }
}