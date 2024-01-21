import { UserMigration } from "./user_migrations"
import db from '../database'
import { StatusMigration } from "./status_migrations"

function main(){
    StatusMigration.migrate()
    UserMigration.migrate()
    db.end()

}
main()
