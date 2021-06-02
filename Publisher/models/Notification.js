
/** The Notification Model 
 * 1) message : the body of the Notification 
 * 2)provider : Push or SMS Notification 
 * 3)target : Notifications is sent to these numbers
 * 4)isRead : to Know if the user read the Notification or not 
 * 5) Language : Three languages only is supported
 * 6) CreatedAt : Timestamp 
 */

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    default: "Push Notification",
    enum: ["Push Notification", "SMS Notification"],
  },
  target: {
    type: [Number],
  },
  
  isRead: {
    type: Boolean,
    default: false,
  },
  language : {
    type: String ,
    default: "En" ,
    enum: ["En","Fr","Ar"]
  } 
  ,createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notification", notificationSchema);
