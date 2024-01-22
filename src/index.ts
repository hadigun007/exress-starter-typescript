import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import middleware from './midleware/middleware';
import {public_route} from './routes/routes'
var bodyParser = require('body-parser')
var cors = require('cors')
dotenv.config();

function main(){

  var publicDir = require('path').join(__dirname,'../public'); 
  
  const app = express()
  app.use(cors())
  app.use(express.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
  app.use(express.static(publicDir)); 
  app.use('/v1/public', middleware, public_route);
  // app.use('/v1/private', middleware, );
    
    app.listen(process.env.PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
    });
}

main()