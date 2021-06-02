const dotenv = require("dotenv");
const Recieve_Fun = require("./client").Recieve_Fun ;
dotenv.config({ path: "./config/config.env" });

var PushNotifications = [];  // Array to hold the result of pushNotifications
var SmsNotifications = [];  // Array to hold the result of SmsNotifications

/** Configure your config.env before using it  */

/** ************************************************** */
/*
- If you want to consume the PUSH NOTIFICATION queues, 
use the following configuration  

*/

/***********************************************************************
 * Function Name : Recieve_Fun 
 * Args : 
 * 1- PushNotifications : an array to recieve the real time updated notifications
 * 2- CONN_URL : URL of the cloud rabbitmq (containing the notification queue)
 * 3- queue : The queue name to recieve from it 
 * 
 ***************************************************************************/
//Recieve_Fun(PushNotifications,process.env.PushNoti_AMPQ_SERVER_URL ,"+222") ; 

/** ************************************************** */




/*
- If you want to consume the PUSH NOTIFICATION queues, 
use the following configuration  

*/
/***********************************************************************
 * Function Name : Recieve_Fun 
 * Args : 
 * 1- PushNotifications : an array to recieve the real time updated notifications
 * 2- CONN_URL : URL of the cloud rabbitmq (containing the notification queue)
 * 3- queue : The queue name to recieve from it 
 * 
 ***************************************************************************/
 //Recieve_Fun(SmsNotifications,process.env.SMSNoti_AMPQ_SERVER_URL ,queue) ; 

 /** ************************************************** */

console.log("This Image is Acting as a consumer on Push Notification Type and his number is +01012345678");

console.log("Use Postman to make a post request for 'localhost:3000/api/pushNotification' By the Notification Service");

 Recieve_Fun(PushNotifications,process.env.PushNoti_AMPQ_SERVER_URL ,"+01012345678");
// Recieve_Fun(SmsNotifications,process.env.SMSNoti_AMPQ_SERVER_URL ,"22");