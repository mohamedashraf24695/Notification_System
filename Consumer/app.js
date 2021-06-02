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
 //Recieve_Fun(SmsNotifications,SmsNotifications,process.env.SMSNoti_AMPQ_SERVER_URL ,queue) ; 

 /** ************************************************** */

 const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('What is the provider type \n for Push Notification press "P" \n and for SMS Notification press "S" ', notificationType => {

    if(notificationType==="P" ||notificationType==="p"){
        console.log("A");
        //readline.close();


        readline.question('Input your target phone number', target_phone => {
            Recieve_Fun(PushNotifications,process.env.PushNoti_AMPQ_SERVER_URL ,target_phone) ;
          });


    }else if (notificationType==="S" ||notificationType==="s" ){
        console.log("B");
        readline.question('Input your target phone number: ', target_phone => {
            Recieve_Fun(SmsNotifications,SmsNotifications,process.env.SMSNoti_AMPQ_SERVER_URL ,target_phone) ; 
          });
    }else {
        console.log("C");
        console.log("Wrong Answer");
        readline.close();

    }



  });
