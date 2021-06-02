Real-Time Notification System micro-service 

-Using: Node.js, Mongo Atlas as database, cloudampq (cloud RabbitMQ) as message queueing, mocha.js and chai as
testing tools , Postman for http requests and Docker
- A Real time service that receive a post request from a sender to send a notification to different types of providers by
using message queuing system.
- Service also provide APIs to access Notifications’ database (MongoDB), database is used for storage not for sending.
- Test cases coverage by using mocha.js and chai
- Application is run on Docker and available on docker hub
