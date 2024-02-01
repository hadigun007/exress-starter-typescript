import express from 'express';
import { UserController } from '../controller/user_controller';
import {private_middlware} from '../midleware/middleware';

const private_route = express()
const userc = new UserController()

private_route.use(private_middlware)

private_route.get('/users', userc.index)
private_route.post('/user/create', userc.store)
private_route.post('/user/show', userc.show)
private_route.put('/user/update', userc.update)
private_route.delete('/user/delete/:id', userc.destroy)

export default private_route

// Update T
// SET A = CASE WHEN A IS NOT NULL THEN 'Value' ELSE A END,
//     B = CASE WHEN B IS NOT NULL THEN 'Value' ELSE B END,
//     C = CASE WHEN C IS NOT NULL THEN 'Value' ELSE C END
//     D = CASE WHEN D IS NOT NULL THEN 'Value' ELSE D END
// FROM Table1 T