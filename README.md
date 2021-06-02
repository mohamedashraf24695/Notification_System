# Notification_System

Architecture diagram : 

![image](https://user-images.githubusercontent.com/42626745/120490614-d9c69100-c3b8-11eb-8100-dbe269a0b3b8.png)

How to run it (Main idea)

The whole system consists of :
1 – Main server 2- Notification service (our main part) 3 – MongoDB on Cloud (MongoDB Atlas) 4- RabbitMQ ( cloudamqp) 5 – Simple client side program ( A program which the client runs to get the notification)
In points :
1- Main Server / Notification Service Relation :
 Main server makes a post request with Notification body
 Notification service responds by “Notification is sent” and continue the process or responds by the error with out sending the notification
 Notification service saves the new notification in the cloud database (Only for recording)
 Main Server can read the Notifications records through Notification service’s APIs
2- Notification Service / Cloud queues / Client Relation :
 There are two separated groups of queues ( Push Notification queues and SMS Notifcation queues ) Why ? To allow front-end layer to consume the notifications from the queue through the “Client-side Progam” to fetch the Notifications in HTML or XML or other options.
And also to let a SMS provider to consume the messages by sending it to the clients.
Each client has two queue ; a queue for his application and another one for his SMS messages
 Notification service sends the notification to the right queue of the user/s according to the notification target/s and the provider ( Push Notification or SMS Notification)
 Client Program contains a function that push the notifications into an local array
 User can use this array directly to update notification at real-time
Here a question : Why I didn’t use an API to send the messages ? because it will not be a real time notification , every new notification , I need to make a request , may be Main server sends more than one notification between two recursive requests.


How another microservices would contact this service to send a notification (Service APIs)


1- Make a post request to send a notification with prober request body
/api/pushNotification Method : POST Required body : {
message : required
provider : required , enum of ["Push Notification", "SMS Notification"] Push is the default
target (The phonenumber/s that you want to send the Notification) : at least one
isRead : not required (for future improvments for the service)
language : enum of [En , Ar ,Fr] not required : En is the default
} -----------------------------------------------------------------------------------------------------
Returns :
1- if notification is successfuly sent : it will return Msg is successfuly
statusCode :( 200)
2- Errors :
1- No targets : "No targets are Supported "
statusCode :(400 Bad request)
2- No message supported in the Notification : "No message is Supported"
(400 Bad request)
3- Other provider : "Notification is not a provided Notification type"
statusCode : (400 Bad request)
-----------------------------------------------------------------------------------

Returns all the notifications in the database Method : GET
/notificationDatabase/readAllNotification/allUsers
3- Returns all the notifications sent to a phonenumber Method : GET
/notificationDatabase/byPhoneNumber/:phoneNumber
4- returns all the notifications by a certain language Method : GET
/notificationDatabase/byLanguage/:language
5- returns all the notifications by a certain provider Method : GET
/notificationDatabase/byProvider/:provider
6- returns all the notifications that contains a certain string ( example : (essa)------> returns notifications contain : ( message )) Method : GET /notificationDatabase/notificationContains/:notification

Important Note:
- The server doesn't need to modify or delete a Notification from the database.
Why?
Database here is only a recording storage, Server will need only to create or read the database. Creation is only needed when sending a Notification (Push Notification Routes). So here, we make APIs for only reading from the database




