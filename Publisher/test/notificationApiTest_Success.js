let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);



describe("Notification API SUCCESS TESTS", () => {
    describe("All the notification body is provided) '/api/pushNotification'", () => {
      it("It should return : Notification is sent", (done) => {
        chai
          .request(server)
          .post("/api/pushNotification")
          .send({
            message:"A new Notification is here ",
            target:'+555',
            provider:"Push Notification",
            language:"Ar",
        
        })
          .end((err, response) => {
            response.body.message.should.equal("Notification is sent");
            response.should.have.status(200);
            done();
          });
      });
    });

    describe("All the notification body is provided with more than one target) '/api/pushNotification'", () => {
        it("It should return : Notification is sent", (done) => {
          chai
            .request(server)
            .post("/api/pushNotification")
            .send({
              message:"A new Notification is here ",
              target:['+5555','+012552','+4654545'],
              provider:"Push Notification",
              language:"Ar",
          
          })
            .end((err, response) => {
              response.body.message.should.equal("Notification is sent");
              response.should.have.status(200);
              done();
            });
        });
      });
  


    describe("The default values is not provided provider , language , isRead , createdAt) '/api/pushNotification' ", () => {
        it("It should return : Notification is sent", (done) => {
          chai
            .request(server)
            .post("/api/pushNotification")
            .send({
                
              message:"A new Notification is here ",
              target:'+5555',
             
          })
            .end((err, response) => {
              response.body.message.should.equal("Notification is sent");
              response.should.have.status(200);
              done();
            });
        });
      });

      
  
      describe("More than one target is supported '/api/pushNotification'  ", () => {
        it("It should return : Notification is sent", (done) => {
          chai
            .request(server)
            .post("/api/pushNotification")
            .send({
                
              message:"A new Notification is here ",
              target:['+5555','+012552','+4654545'],
             
          })
            .end((err, response) => {
              response.body.message.should.equal("Notification is sent");
              response.should.have.status(200);
              done();
            });
        });
      });

  });



