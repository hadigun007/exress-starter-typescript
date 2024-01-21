import db from "../database"

export class UserMigration {

    static table_name = 'users18'

    static migrate(){
        
        db.query(`CREATE TABLE ${this.table_name} (
            id MEDIUMINT NOT NULL AUTO_INCREMENT,
            name CHAR(30) NOT NULL,
            PRIMARY KEY (id)
       );
        `,(error, result)=>{
            if(error) return console.log(error)
            console.log(`✅ migrate table ${this.table_name} berhasil`)
        })
    }
}