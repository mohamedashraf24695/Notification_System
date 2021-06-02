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
 
 ## How it runs
 ### -The code Architecture
   #### The Main Service (The Notification Publisher)
   - Config.env : configuration file that contains the configurations of the Mongoose , CloudAmpq
   - Database configuration : Separated file contain the configuration of the database and only export connect function to use it in our application
   - pushControllers: All the function I needed when writing the Publish Notifications API.
   - Notification model: contains the schema of the notification to use it in saving to database and publishing it to the queue.
   - Routes : Notification API route and Accessing the database APIs
   - test : test scripts to test our code, tests are separated into 4 types and all of them run together at testing stage.
   - app.js : contains requiring the files and libraries , database connecting function firing , listening to the port and using the routes to be able accessing it

![image](https://user-images.githubusercontent.com/42626745/120559615-9d6b5300-c401-11eb-90c8-d1005f3af17f.png)

   #### The client code (The consumer)
   - Config.env : configuration file that contains the configurations of the Mongoose , CloudAmpq
   - Client.js : a file containing the code the client needing to receive the notification and exports one function to allow the user receives it
   - app.js: user can here use the function with his other pieces of code.
   
   ![image](https://user-images.githubusercontent.com/42626745/120559697-c5f34d00-c401-11eb-9832-844ef437536d.png)
   
  ### - The code running:
  
   #### To run the main service :
 - On the command line: node app
 - Using post request by :(/api/pushNotification) to send a notification
 - Using get requests to access database:
   - 1- /notificationDatabase/readAllNotification/allUsers
   - 2- /notificationDatabase/byPhoneNumber/:phoneNumber
   - 3- /notificationDatabase/byLanguage/:language
   - 4- /notificationDatabase/byProvider/:provider
   - 5- /notificationDatabase/notificationContains/:notification
 - API’s will be discussed in the next chapter.
   #### To run tests:
 - npm run test ( using mocha.js in package.json as test runner)



