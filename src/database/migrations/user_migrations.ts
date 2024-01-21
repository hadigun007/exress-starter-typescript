import db from "../database"

export class UserMigration {

    static table_name = 'users'

    static migrate() {

        db.query(`DROP TABLE IF EXISTS users;`, (error, result) => {
            if (error) return console.log(error)
        })
        db.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            status MEDIUMINT,
            role MEDIUMINT,
            created_at datetime,
            updated_at datetime
       );`, 
       (error, result) => {
            if (error) return console.log(error)
            console.log(`✅ migrate table ${this.table_name} berhasil`)
        })
    }
}