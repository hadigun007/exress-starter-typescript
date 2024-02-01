import request from "supertest";

import { UserModel } from "../../model/user_model";
import private_route from "../../routes/private_routes";
import config from '../../../config.json'
import { JwtUtil } from "../../util/jwt_util";
import {faker} from '@faker-js/faker'



const user = new UserModel()
const token = JwtUtil.getJwt()


describe("User", () => {

    it("Index User", async () => {

        const index = await request(private_route)
        .get("/users")
        .set({ 'x-api-key': config["api-key"], Accept: 'application/json', 'Authorization':'Bearer '+token})

        expect(index.status).toEqual(200)
        expect(index.body.message).toEqual('success')

    })
   
    it("Create User", async () => {
        user.setName(faker.person.fullName())
        user.setEmail(faker.internet.email())
        user.setPassword('adminsku')
        user.setRole('admin')

        const create = await request(private_route)
        .post("/user/create")
        .send(user)
        .set({ 'x-api-key': config["api-key"], Accept: 'application/json', 'Authorization':'Bearer '+token})

        expect(create.status).toEqual(201)
        expect(create.body.message).toEqual('success')

    })

})