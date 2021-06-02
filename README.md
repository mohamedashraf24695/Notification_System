# Real-Time Notification System micro-service 

-Using: Node.js, Mongo Atlas as database, cloudampq (cloud RabbitMQ) as message queueing, mocha.js and chai as
testing tools , Postman for http requests and Docker
- A Real time service that receive a post request from a sender to send a notification to different types of providers by
using message queuing system.
- Service also provide APIs to access Notifications’ database (MongoDB), database is used for storage not for sending.
- Test cases coverage by using mocha.js and chai
- Application is run on Docker and available on docker hub

## Architecture diagram 

![image](https://user-images.githubusercontent.com/42626745/120558885-69436280-c400-11eb-85dd-06d862f64aa6.png)


## How to run it (Main idea) 

### The whole system consists of :
 - Main server 
 - Notification service (our main part)
 - MongoDB on Cloud (MongoDB Atlas) 
 - RabbitMQ ( cloudamqp)
 - Simple client side program ( A program which the client runs to get the notification)

### In points :
 - Main Server / Notification Service Relation :
  - Main server makes a post request with Notification body
  -Notification service responds by “Notification is sent” and continue the process or responds by the error with out sending the notification
  -Notification service saves the new notification in the cloud database (Only for recording)
  -Main Server can read the Notifications records through Notification service’s APIs
  
- Notification Service / Cloud queues / Client Relation :
 - There are two separated groups of queues ( Push Notification queues and SMS Notifcation queues ) Why ? To allow front-end layer to consume the notifications from the queue    through the “Client-side Progam” to fetch the Notifications in HTML or XML or other options. And also to let a SMS provider to consume the messages by sending it to the clients.
Each client has two queue ; a queue for his application and another one for his SMS messages
 - Notification service sends the notification to the right queue of the user/s according to the notification target/s and the provider ( Push Notification or SMS Notification)
 - Client Program contains a function that push the notifications into an local array
 - User can use this array directly to update notification at real-time
 -Here a question : Why I didn’t use an API to send the messages ? because it will not be a real time notification , every new notification , I need to make a request , may be Main server sends more than one notification between two recursive requests.
