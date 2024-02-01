import express from "express"
import public_route from "./public_routes"
import private_route from "./private_routes"

const routes = express()

routes.use('/v1/public', public_route)
routes.use('/v1/private', private_route)

export default routes
