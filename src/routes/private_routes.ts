import express from 'express';
import { UserController } from '../controller/user_controller';
import middleware from '../midleware/middleware';

const private_route = express.Router()
const userc = new UserController()

private_route.use(middleware)

private_route.get('/users', userc.index)
private_route.post('/user/create', userc.store)
private_route.put('/user/update', userc.update)
private_route.delete('/user/delete/:user_id', userc.destroy)

export default private_route