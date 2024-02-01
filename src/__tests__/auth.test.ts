import request from "supertest";
import public_routes from "../routes/public_routes";
import { Validate } from "../util/validate";
import { UserModel } from "../model/user_model";
import { OTPUtil } from "../util/otp_util";
import fs from 'fs'




const user = new UserModel()

describe("Auth", () => {
  test("Login", async () => {
    const login = await request(public_routes)
      .post("/auth/login")
      .send({ email: "root@mail.com", password: "adminsku" });

    const hex = Validate.checkHex(login.body.data.verify_token)

    expect(login.status).toEqual(200);
    expect(hex).toEqual(true);


    user.setVToken(login.body.data.verify_token)
    user.setStatusId(login.body.data.status)

    // ==================  Generate 2fa
    
    if (user.getStatusId() == "1" || user.getStatusId() == "2") {
      const generate = await request(public_routes)
      .get("/auth/generate_2fa/" + user.getVToken())
      
      
      expect(generate.status).toEqual(200)
      expect(generate.body.message).toEqual('success')
      
      user.setVToken(generate.body.data.verify_token)
      user.setSecretKey(generate.body.data.secret_key)
      const otp = OTPUtil.generateToken(user.getSecretKey())
      
      
      fs.writeFileSync( __dirname+'/auth.json', JSON.stringify(user))
      
      const verify = await request(public_routes)
      .post("/auth/verify_2fa")
      .send({ verify_token: user.getVToken(), otp_code: otp.toString() });
      
      
      expect(verify.status).toEqual(200)
      expect(verify.body.message).toEqual('success')
      
    } else if(user.getStatusId() == "3"){
      
      // ==================   2fa
      // otp masukkan manual, secret key ada di auth.json

      // const verify = await request(public_routes)
      //   .post("/auth/verify_2fa")
      //   .send({ verify_token: user.getVToken(), otp_code: "812618" });


      // expect(verify.status).toEqual(200)
      // expect(verify.body.message).toEqual('success')
    }


  });
});