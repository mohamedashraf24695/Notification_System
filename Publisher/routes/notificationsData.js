const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");



/*IMPORTANT NOTE : 
* The server doesn't need to modify or delete a Notification from the database 
Why ? 
Database here is only a recording storage 
Server Will need only to create or read the database 
Creation is only needed when sending a Notification (Push Notifcation Routes)
So here , we make APIs for only reading from the database 

*/



/**
 * Method : GET 
 * Route : /notificationDatabase/readAllNotification/allUsers
 * description : returns all the notifications in the database 
 */

router.get("/readAllNotification/allUsers", async (req, res) => {
  try {
    const allNotifications = await Notification.find();

    res.send(allNotifications);
  } catch (error) {
    console.log(error);

    res.statusCode = 404;
    res.send("Error");
  }
});


/**
 * Method : GET 
 * Route : /notificationDatabase/byPhoneNumber/:phoneNumber
 * description : returns all the notifications sent to a phonenumber 
 */



router.get(
  "/byPhoneNumber/:phoneNumber",
  async (req, res) => {
    try {
      const allNotifications = await Notification.find({
        target: req.params.phoneNumber,
      });
      
      res.send(allNotifications);
    } catch (error) {
      console.log(error);

      res.statusCode = 404;
      res.send("Error");
    }
  }
);

/**
 * Method : GET 
 * Route : /notificationDatabase/byLanguage/:language
 * description : returns all the notifications by a certain language
 */


router.get("/byLanguage/:language", async (req, res) => {
  try {
    const allNotifications = await Notification.find({
      language: req.params.language,
    });

    res.send(allNotifications);
  } catch (error) {
    console.log(error);

    res.statusCode = 404;
    res.send("Error");
  }
});


/**
 * Method : GET 
 * Route : /notificationDatabase/byProvider/:provider
 * description : returns all the notifications by a certain provider
 */

router.get("/byProvider/:provider", async (req, res) => {
  try {
    let provider_income = req.params.provider.replace("%20", " ");
    const allNotifications = await Notification.find({
      provider: provider_income,
    });

    res.send(allNotifications);
  } catch (error) {
    console.log(error);

    res.statusCode = 404;
    res.send("Error");
  }
});


/**
 * Method : GET 
 * Route : /notificationDatabase/notificationContains/:notification
 * description : returns all the notifications that contains a certain string 
 * example : (essa)------> returns notifications contain : (  message )
 */

router.get(
  "/notificationContains/:notification",
  async (req, res) => {
    try {
      const allNotifications = await Notification.find({
        message: { $regex: req.params.notification, $options: "i" },
      });

      res.send(allNotifications);
    } catch (error) {
      console.log(error);

      res.statusCode = 404;
      res.send("Error");
    }
  }
);

module.exports = router;

