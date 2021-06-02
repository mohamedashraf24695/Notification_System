let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Database reading APIs ", () => {
  describe("Test GET of all users   '/notificationDatabase/readAllNotification/allUsers'  ", () => {
    it("It should return : an Array with data or empty array if there is no data ", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/readAllNotification/allUsers")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("Test GET of getting all notifications for one supported lang   '/notificationDatabase/byLanguage/:language'  ", () => {
    it("It should return : an Array with data of English Notifications or empty array if there is no data ", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/byLanguage/En")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.should.have.status(200);
          done();
        });
    });

    it("It should return : an Array with data of Arabic Notifications or empty array if there is no data ", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/byLanguage/Ar")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.should.have.status(200);
          done();
        });
    });

    it("It should return : an Array with data of French Notifications or empty array if there is no data ", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/byLanguage/Fr")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.should.have.status(200);
          done();
        });
    });

    it("It should return : empty array as language is not supported", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/byLanguage/Sp")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.body.length.should.equal(0);
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("Test GET of getting all notifications for one phonenumber    '/notificationDatabase/byPhoneNumber/:phoneNumber' ", () => {
    it("It should return : an Array with data or empty array if there is no data ", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/byPhoneNumber/22222")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("Test GET of getting all notifications for one provider    '/notificationDatabase/byPhoneNumber/:phoneNumberbyProvider/:provider' ", () => {
    it("It should return : an Array with data in SMS Notifications or empty array if there is no data ", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/byProvider/SMS Notification")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.should.have.status(200);
          done();
        });
    });

    it("It should return : an Array with data in Push Notifications or empty array if there is no data ", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/byProvider/Push Notification")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.should.have.status(200);
          done();
        });
    });

    it("It should return :mpty array as provider is not supported ", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/byProvider/Gmail Notification")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.body.length.should.equal(0);
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("Test GET of greturns all the notifications that contains a certain string    '/notificationDatabase/byPhoneNumber/:phoneNumber' ", () => {
    it("It should return : all the notifications that contains a certain string or empty array if there isn't matching one", (done) => {
      chai
        .request(server)
        .get("/notificationDatabase/notificationContains/:notification")
        .end((err, response) => {
          response.body.should.be.a("Array");
          response.should.have.status(200);
          done();
        });
    });
  });
});
