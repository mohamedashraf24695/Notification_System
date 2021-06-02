
/** 
 * Require express , The Notification database model and the controller functions of the notification API
 * 
*/

const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const publishToQueue = require("../controllers/pushControllers").publishToQueue; 


/**
 * Route: /api/pushNotification
 * 
 * 
 * Method : POST 
 * 
 * 
 * Required body : {
 *  message : required 
 * provider : required , enum of ["Push Notification", "SMS Notification"] Push is the default
 * target (The phonenumber/s that you want to send the Notification) : at least one 
 * isRead : not required (for future improvments for the service)
 * language : enum of [En , Ar ,Fr] not required : En is the default
 * }
 * 
 * 
 * 
 * Returns : 
 * 1- if notification is successfuly sent : it will return Msg is successfuly 
 * statusCode :( 200)
 * 2- Errors : 
 *   1- No targets : "No targets are Supported " 
  * statusCode :(400 Bad request)
 *   2- No message supported in the Notification : "No message is Supported"
 *    (400 Bad request)
 *  3- Other provider : "Notification is not a provided Notification type" 
  * statusCode :  (400 Bad request)



*** brief description : Make a post request to send a Notification 
 */




router.post("/pushNotification", async (req, res, next) => {
  let message = req.body.message;
  let target_Array = req.body.target;
  let provider = req.body.provider; 


if(Object.keys(req.body).length === 0 && req.body.constructor === Object){

/** No Notification is supported in the body */

res.data = { "message-sent": false };
res.status(400).json({message: "No Notification is Supported"});

return;

}


  if (provider === undefined ){
    provider = "Push Notification" ;
  }


  try {
    /** Check is the Notification supported by provider */
    if (req.body.target == undefined) {
      res.data = { "message-sent": false };
      res.status(400).json({message: "No targets are Supported"});

      return;
    }
    /** Check is the Notification supported by message(body) */

    if (req.body.message == undefined) {
      res.data = { "message-sent": false };
      res.status(400).json({message: "No message is Supported"});
      return;
    }
    /** Cheack if the Notification is Push Notification ? */

    if (provider === "Push Notification") {

      /**Creates the Notification 
       * and save it to the MongoDB database
       */
      await Notification.create({
        message: req.body.message,
        target: req.body.target,
        provider: req.body.provider,
        language: req.body.language,
      });

      let payload = message;
    /** if the Notification body contains one number only , it is sent as a number 
     * considering the two situations as one situation will produce errors 
     * 
     * We cant forEach function on a number ! So error 
     * We cant send same notification to multiple users in one request unless using Array
     */

      if (typeof target_Array == "number") { 

        /** publishToQueue functions takes 
         * ConnURL , The target/s and the message 
         * it send them on the cloud rabbitmq by the URL supported
         * So, the consumer on the other side can consume it
         * 
         * 
         */
        await publishToQueue(
          process.env.PushNoti_AMPQ_SERVER_URL,
          target_Array,
          payload
        );
      }
      /** if the Notification body contains more than one number  , it is sent as a Array of numbers 
       *  
     */
      if (typeof target_Array == "object") {

         /** publishToQueue functions takes 
         * ConnURL , The targets and the message 
         * it send them on the cloud rabbitmq by the URL supported
         * So, the consumer on the other side can consume it
         * We send them using forEach function to loop through the array
         * 
         */
        target_Array.forEach(async (q) => {
          await publishToQueue(
            process.env.PushNoti_AMPQ_SERVER_URL,
            q,
            payload
          );
        });
      }

      res.data = { "message-sent": true };
      res.status(200).json({message:"Notification is sent"});
    }
    /** Cheack if the Notification is SMS Notification ? */

    if (provider === "SMS Notification") {

      /**Creates the Notification 
       * and save it to the MongoDB database
       */


      await Notification.create({
        message: req.body.message,
        target: req.body.target,
        provider: req.body.provider,
        language: req.body.language,
      });

      let payload = message;


 /** publishToQueue functions takes 
         * ConnURL , The target/s and the message 
         * it send them on the cloud rabbitmq by the URL supported
         * So, the consumer on the other side can consume it
         * 
         * 
         */
      if (typeof target_Array == "number") {
        await publishToQueue(
          process.env.SMSNoti_AMPQ_SERVER_URL,
          target_Array,
          payload
        );
      }
      if (typeof target_Array == "object") {
        
         /** publishToQueue functions takes 
         * ConnURL , The targets and the message 
         * it send them on the cloud rabbitmq by the URL supported
         * So, the consumer on the other side can consume it
         * We send them using forEach function to loop through the array
         * 
         */
        target_Array.forEach(async (q) => {
          await publishToQueue(process.env.SMSNoti_AMPQ_SERVER_URL, q, payload);
        });
      }

      res.data = { "message-sent": true };
      res.status(200).json({message:"Notification is sent"});
    }
    /** Cheack if the Notification is not supported ? */

    if (provider !== "Push Notification" && provider !== "SMS Notification"  ) {
     
      res.data = { "message-sent": false };
      res.status(400).json({message : "Notification is not a provided Notification type"});

    }
  } catch (error) {
    res.status(400).json({message : "There is an error" + error});
  }
});
module.exports = router;
