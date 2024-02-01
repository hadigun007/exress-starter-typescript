import request from "supertest";

import public_routes from "../routes/public_routes";
import { Validate } from "../util/validate";
import { UserModel } from "../model/user_model";
import { OTPUtil } from "../util/otp_util";
const twofactor = require("node-2fa");




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

    // ==================    

    if (user.getStatusId() == "1" || user.getStatusId() == "2") {
      const generate = await request(public_routes)
        .get("/auth/generate_2fa/" + user.getVToken())


      expect(generate.status).toEqual(200)
      expect(generate.body.message).toEqual('success')

      user.setVToken(generate.body.data.verify_token)
      user.setSecretKey(generate.body.data.secret_key)
      const otp = OTPUtil.generateToken(user.getSecretKey())

      const verify = await request(public_routes)
        .post("/auth/verify_2fa")
        .send({ verify_token: user.getVToken(), otp_code: otp.toString() });


      expect(verify.status).toEqual(200)
      expect(verify.body.message).toEqual('success')
      
    } else if(user.getStatusId() == "3"){

      // otp masukkan manual
      // B2TBF65KFHTN5OQX5RTFSCF5JTBUYC7W
      // U2FsdGVkX1+ySHM0vKgvH0zNKuK1LucleyXzvq/qX7p5ZIR4ndNSqsQY8qJMJ9pMGDuF7ZTD1H79BV/QaoQEGA==


      const verify = await request(public_routes)
        .post("/auth/verify_2fa")
        .send({ verify_token: user.getVToken(), otp_code: "609304" });


      expect(verify.status).toEqual(200)
      expect(verify.body.message).toEqual('success')
    }


  });
});