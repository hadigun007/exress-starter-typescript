import db from "../database"

export class StatusMigration {

    static table_name = 'statuses'

    static migrate() {

        db.query(`DROP TABLE IF EXISTS statuses;`, (error, result) => {
            if (error) return console.log(error)
        })

        db.query(`
        CREATE TABLE statuses (
            id INT PRIMARY KEY AUTO_INCREMENT,
            status_key VARCHAR(255) NOT NULL,
            status_id MEDIUMINT NOT NULL,
            status_name VARCHAR(255) UNIQUE NOT NULL,
            created_at datetime,
            updated_at datetime
            );`, (error, result) => {
            if (error) return console.log(error)
            console.log(`✅ migrate table ${this.table_name} berhasil`)
        })
        
        db.query(`
        INSERT INTO statuses
        (id, status_key, status_id, status_name, created_at)
        VALUES 
        (1, 'users',0 , 'GENEREATE 2FA', null),
        (2, 'users',1 , 'VERIFY 2FA', null),
        (3, 'users',2 , 'ACTVE', null),
        (4, 'users',3 , 'FREEZED', null);
        `,(error, result)=>{
            if (error) return console.log(error)
            console.log(`✅ seeder table ${this.table_name} berhasil`)
        } )
    }

}