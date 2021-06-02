var amqp = require("amqplib/callback_api");



/**
 * Function Name : Recieve_Fun 
 * Args : 
 * 1- PushNotifications : an array to recieve the real time updated notifications
 * 2- CONN_URL : URL of the cloud rabbitmq (containing the notification queue)
 * 3- queue : The queue name to recieve from it 
 * 
 */


function Recieve_Fun(ContainerArray,CONN_URL ,queue) {
  amqp.connect(CONN_URL, async function (err, conn) {
    conn.createChannel( async function (err, ch) {
     await ch.assertQueue(queue, { durable: false });

      await ch.consume(
        queue,
        function (msg) {
          ContainerArray.push(msg.content.toString());
          console.log(msg.content.toString());
        },
        { noAck: true }
      );
    });
  });

}

module.exports={
  Recieve_Fun : Recieve_Fun
}