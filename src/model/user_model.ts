class UserModel {
    name!:string 
    role!:string 

    setName(name:string){
        this.name = name
    }
    setRole(role:string){
        this.role = role
    }

    getName(){
        return this.name
    }
    getRole(){
        return this.role
    }

    getPayload():UserModel{
        return this
    }
}