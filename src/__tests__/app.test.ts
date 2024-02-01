import request from "supertest";

import routes from "../routes/routes";

describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(routes).get("/");
    expect(res.body).toEqual({ message: "Allo! Catch-all route." });
  });
});