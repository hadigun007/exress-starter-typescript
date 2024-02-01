import dotenv from 'dotenv';
import config from '../config.json'
import app from './routes/routes'
dotenv.config();

function main() {

  app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at ${config.host}:${config.port}`);
  });

}

main()