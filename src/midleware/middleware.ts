import { jwtCheck } from './jwt_middleware';
import log from './log'
var cors = require('cors')
import express, { urlencoded } from 'express';
import limiter from './rate_limiter';
var bodyParser = require('body-parser')
var publicDir = require('path').join(__dirname, '../public');

const public_middlware = 
    [
        log,
        limiter,
        cors(),
        express.json({ limit: '5mb' }),
        bodyParser.urlencoded({ limit: '5mb', extended: true }),
        express.static(publicDir)


    ]

const private_middlware = 
    [
        log,
        limiter,
        jwtCheck,
        cors(),
        express.json({ limit: '5mb' }),
        bodyParser.urlencoded({ limit: '5mb', extended: true }),
        express.static(publicDir)


    ]

export {
    public_middlware, private_middlware
}

// export default [
//     log,
//     limiter,
//     jwtCheck,
//     cors(),
//     express.json({ limit: '5mb' }),
//     bodyParser.urlencoded({limit: '5mb', extended: true}),
//     express.static(publicDir)


// ]