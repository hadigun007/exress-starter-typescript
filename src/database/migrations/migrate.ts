import { UserMigration } from "./user_migrations"
import db from '../database'
import { StatusMigration } from "./status_migrations"

function main(){
    StatusMigration.migrate() // 1
    UserMigration.migrate() // 2
    db.end()

}
main()
