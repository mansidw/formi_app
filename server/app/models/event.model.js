const mongoose = require("mongoose");
const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    name: String,
    description: String,
    artist: String,
    date: Date,
    location: String,
    variety:{
        type:String,
        enum:['Hip-Hop','EDM','Techno']
    }
    
  })
);
module.exports = Event;