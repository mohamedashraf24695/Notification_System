
const express = require("express"); 

const dotenv = require("dotenv");

const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

/**Connect to the database */
connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**Listening to the server  */


 app.listen(3000, () =>  console.log("Server is running"));

 
/**Home Route */
app.get("/", (req, res) => {
  res.status(200).json({message : "Welcome to Notification Service"});
});



app.use("/api", require("./routes/notificationsAPIs"));
app.use("/notificationDatabase", require("./routes/notificationsData"));


module.exports = app ;

app.use((req,res)=>{
  res.status(404).json({message : "Not found"});

})

/**The APIs of the service 
 * 
 * 
 * ************************************************************
 *  * Method : POST 
 * /api/pushNotification
 * for more info : routes/notificationsAPIs.js
 * Brief description :Make a post request to send a Notification with prober request body
 * 
 ********************************************************************
 * Method : GET 
 * /notificationDatabase/readAllNotification/allUsers
 * description : returns all the notifications in the database 
 * 
 * ************************************************************
 *  * Method : GET 
 * Route : /notificationDatabase/byPhoneNumber/:phoneNumber
 * description : returns all the notifications sent to a phonenumber 
 * *************************************************************
 *  * Method : GET 
 * Route : /notificationDatabase/byLanguage/:language
 * description : returns all the notifications by a certain language
 * *****************************************************
 *  Method : GET 
 * Route : /notificationDatabase/byProvider/:provider
 * description : returns all the notifications by a certain provider
 * **********************************************************************
 * 
 *  * Method : GET 
 * Route : /notificationDatabase/notificationContains/:notification
 * description : returns all the notifications that contains a certain string 
 * example : (essa)------> returns notifications contain : (  message )
 * *******************************************************************
 * 
 * 
 * 
 */