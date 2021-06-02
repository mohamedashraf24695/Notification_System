var amqp = require('amqplib/callback_api');





let ch = null;

/**
 * Function : publishToQueue
 * Args : onnURL,queueName, data 
 * description : the function is doing the following : 
 * 1- connect to the cloudrabbitmq 
 * 2- create a channel 
 * 3- if the queue doesn't exist --> create a one 
 * 4- send the notification body through the queue 
 * 
 * 
 * 
 */

const publishToQueue = async (ConnURL,queueName, data) => {

   amqp.connect(ConnURL,async function  (err, conn) {
    
      conn.createChannel(async function  (err, channel) {
         ch = channel;
         await  ch.assertQueue(queueName, { durable: false });
         await ch.sendToQueue(queueName, new Buffer.from(data) , {presistent:true});
      });
   });



 }


/** Close the channel after using it 
 * closed channel cannot be used. An attempt to perform an operation on a closed channel 
 * will result in an exception that says that the channel has already been closed. 
 * Resource : https://www.rabbitmq.com/channels.html
 */

/** */
 process.on('exit', (code) => {
    ch.close();
 });


 module.exports = {
    publishToQueue : publishToQueue
 }