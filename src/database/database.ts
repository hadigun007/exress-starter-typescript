import mysql from 'mysql'
import dotenv from 'dotenv';

dotenv.config();

var connection = mysql.createConnection({
    host: process.env["DB_HOST"],
    user: process.env["DB_USER"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_DATABASE"]
});

connection.on('connect', () => {
    console.log('database connected opened')
})
connection.on('end', () => {
    console.log('database connected ended')
})

connection.connect()


export default connection