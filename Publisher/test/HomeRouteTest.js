let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Home Page", () => {
  describe("Test GET of  '/'  ", () => {
    it("/ GET Request ", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, response) => {
          response.body.message.should.equal("Welcome to Notification Service");
          response.should.have.status(200);
          done();
        });
    });
  });


  describe("Test GET of  unsupported link   ", () => {
    it("It should return 404 ", (done) => {
      chai
        .request(server)
        .get("/random")
        .end((err, response) => {
          response.body.message.should.equal("Not found");
          response.should.have.status(404);
          done();
        });
    });
  });




});



