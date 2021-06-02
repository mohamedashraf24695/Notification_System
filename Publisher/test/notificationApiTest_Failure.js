let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);



describe("Notification API FAILURE TESTS", () => {
    describe("Message is not provided ) '/api/pushNotification'", () => {
      it("It should return : No message is Supported", (done) => {
        chai
          .request(server)
          .post("/api/pushNotification")
          .send({
            target:'+555',
            provider:"Push Notification",
            language:"Ar",
        
        })
          .end((err, response) => {
            response.body.message.should.equal("No message is Supported");
            response.should.have.status(400);
            done();
          });
      });
    });

    describe("Message is not provided with more than one target) '/api/pushNotification'", () => {
        it("It should return : No message is Supported", (done) => {
          chai
            .request(server)
            .post("/api/pushNotification")
            .send({
              
              target:['+5555','+012552','+4654545'],
              provider:"Push Notification",
              language:"Ar",
          
          })
            .end((err, response) => {
              response.body.message.should.equal("No message is Supported");
              response.should.have.status(400);
              done();
            });
        });
      });
  


    describe("No target/s is/are provided '/api/pushNotification' ", () => {
        it("It should return : No targets are Supported", (done) => {
          chai
            .request(server)
            .post("/api/pushNotification")
            .send({
                
              message:"A new Notification is here ",
             
             
          })
            .end((err, response) => {
              response.body.message.should.equal("No targets are Supported");
              response.should.have.status(400);
              done();
            });
        });
      });

      
  
      describe("Other provider is provided '/api/pushNotification'  ", () => {
        it("It should return : Notification is not a provided Notification type", (done) => {
          chai
            .request(server)
            .post("/api/pushNotification")
            .send({
                
              message:"A new Notification is here ",
              target:['+5555','+012552','+4654545'],
              provider:"Gmail Notification",
             
          })
            .end((err, response) => {
              response.body.message.should.equal("Notification is not a provided Notification type");
              response.should.have.status(400);
              done();
            });
        });
      });


      
      describe("No body is supported '/api/pushNotification'  ", () => {
        it("It should return : No body is supported", (done) => {
          chai
            .request(server)
            .post("/api/pushNotification")
            .send()
            .end((err, response) => {
              response.body.message.should.equal("No Notification is Supported");
              response.should.have.status(400);
              done();
            });
        });
      });




  });



