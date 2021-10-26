const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  startDate :{
      type  : String,
      required : true
  } ,
  startTime :{
    type  : String,
    required : true
} ,
  endDate :{
    type  : String,
    required : true
} ,
  endTime :{
    type  : String,
    required : true
} ,
title :{
    type  : String,
    required : true
} ,
description :{
    type  : String,
    required : true
} 
});
const Event = mongoose.model('Event',UserSchema);

module.exports = Event;