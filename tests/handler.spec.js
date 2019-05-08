const { expect } = require("chai");
const handler = require("../src/handler");

describe("handler", () => {

  it("works", async () => {
    const event = { headers: {} };
    const context = {};
    const result = await handler(event, context);
    expect(result.body).to.eql("Apollo Server supports only GET/POST requests.");
    expect(result.statusCode).to.eql(405);
  });

  it("has a default query", async () => {
    const event = {
      headers: {},
      httpMethod: "POST",
      body: JSON.stringify({
        query: `query {
          serverTime
        }`,
      }),
    };
    const context = {};
    const result = await handler(event, context);
    expect(result.statusCode).to.eql(200);
    const body = JSON.parse(result.body);
    expect(body.serverTime).to.match(/d+/);
  });

  it("has a default mutation", async () => {
    const event = {
      headers: {},
      httpMethod: "POST",
      body: JSON.stringify({
        query: `mutation($x: String!) {
          test(x: $x)
        }`,
        variables: {
          x: "This is a test",
        },
      }),
    };
    const context = {};
    const result = await handler(event, context);
    expect(result.statusCode).to.eql(200);
    const body = JSON.parse(result.body);
    expect(body.data.test).to.eql("This is a test");
  });
});
