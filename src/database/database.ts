import mysql from 'mysql'
import dotenv from 'dotenv';

dotenv.config();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'express_starter_db'
});

connection.on('connect', () => {
    console.log('database connected opened')
})
connection.on('end', () => {
    console.log('database connected ended')
})

connection.connect()


export default connection