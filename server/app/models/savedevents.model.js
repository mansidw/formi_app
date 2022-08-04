const mongoose = require("mongoose");
const Savedevents = mongoose.model(
  "Savedevents",
  new mongoose.Schema({
    
    saved: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event"
        }
      ]
    
  })
);
module.exports = Savedevents;