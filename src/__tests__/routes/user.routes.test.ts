import request from "supertest";

import { UserModel } from "../../model/user_model";
import private_route from "../../routes/private_routes";
import config from '../../../config.json'
import { JwtUtil } from "../../util/jwt_util";



const user = new UserModel()
const token = JwtUtil.getJwt()


describe("User", () => {

    it("Create User", async () => {
        user.setName('hadi4')
        user.setEmail('hadi4@mail.com')
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