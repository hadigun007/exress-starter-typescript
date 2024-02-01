import request from "supertest";

import { UserModel } from "../../model/user_model";
import private_route from "../../routes/private_routes";
import config from '../../../config.json'
import { JwtUtil } from "../../util/jwt_util";
import {faker} from '@faker-js/faker'
import { KeyVal } from "../../model/keyval";



const user = new UserModel()
const keyval = new KeyVal()
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
   
    it("Update User", async () => {
        user.setId("5")
        user.setName(faker.person.fullName())
        user.setEmail(faker.internet.email())
        user.setPassword('adminsku')
        user.setStatusId('3')
        user.setRole('admin')

        const update = await request(private_route)
        .put("/user/update")
        .send(user)
        .set({ 'x-api-key': config["api-key"], Accept: 'application/json', 'Authorization':'Bearer '+token})

        expect(update.status).toEqual(200)
        expect(update.body.message).toEqual('success')

    })
   
   
    it("Show User", async () => {
        keyval.setKey("id")
        keyval.setVal("1")

        const show = await request(private_route)
        .post("/user/show")
        .send(keyval)
        .set({ 'x-api-key': config["api-key"], Accept: 'application/json', 'Authorization':'Bearer '+token})

        expect(show.status).toEqual(200)
        expect(show.body.message).toEqual('success')

    })
    
    
    it("Delete User", async () => {

        const del = await request(private_route)
        .delete("/user/delete/10")
        .set({ 'x-api-key': config["api-key"], Accept: 'application/json', 'Authorization':'Bearer '+token})

        expect(del.status).toEqual(200)
        expect(del.body.message).toEqual('success')

    })

})