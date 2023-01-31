import request from "supertest";
import { router } from "../routes/twitterRoute";
import koa from "koa";
import { hashtagSearch } from "../controllers/twitterController";
import app from "../app";
import expect from "expect"; 

describe("Testing", () => {
  let server;
  beforeAll(() => {
    const app = new koa();
    app.use(router.routes());
    app.use(router.allowedMethods());
    server = app.listen();
  });
  afterAll(() => {
    server.close();
  });

  test("Twitter API Testing", async () => {
    let response = await request(server)
      .get("/hashtag/india")
      .set("Accept", "application/json");
    // .expect('Content-Type', /json/)
    expect(response.status).toBe(200);
  });

  test("Home Controller Testing", async () => {
    let response = await request(server)
      .get("/Home")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("This is Home Page");
  });


   test("Default",async()=>{
    let response = await request(server).get("/scscdc").set("Accept", "application/json");
    expect(response.status).toBe(404)
     expect(response.body).toMatchSnapshot()
    // console.log(response);
   })

   test("Incorrect Hashtag",async()=>{
    let response = await request(server).get("/hashtag/india%123").set("Accept", "application/json")
    expect(response.body).toMatchSnapshot()

   })

});
