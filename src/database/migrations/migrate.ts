import { UserMigration } from "./user_migrations"
import db from '../database'

function main(){
    UserMigration.migrate()
    db.end()

}
main()