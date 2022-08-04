const db = require("../models");
const User = db.user;
const Event = db.event;

exports.addEvent = (req, res) => {
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    artist: req.body.artist,
    date: req.body.date,
    location: req.body.location,
    variety: req.body.variety,
  });

  event.save((err, event) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Event posted successfully!" });
   
  });
};

exports.addSevent = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id,
        {
            $push: {
                saved: req.body.eventID
            }
        }
        
    )
    res.status(200).send({message:"Updated to saved events"})
};

exports.allEvents = async(req, res) => {
    const events = await Event.find()
    res.status(200).send({events:events})
};

exports.getsavedEvents = async(req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    const eventIDS = user["saved"]
    const events = []
    for (var i=0;i<eventIDS.length;i++){
        events.push(await Event.findById(eventIDS[i]))
    }
    res.send({ savedevents: events });
};

exports.getsavedEventsID = async(req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    const eventIDS = user["saved"]
    const events = []
    for (var i=0;i<eventIDS.length;i++){
        var tp=await Event.findById(eventIDS[i])
        events.push(tp["_id"])
    }
    res.send({ savedevents: events });
};

exports.removeSevent = async(req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    const eventIDS = user["saved"]
    var ind=eventIDS.indexOf(req.body.eventID)
    if (ind > -1) {
        eventIDS.splice(ind, 1);
    }
    await User.findByIdAndUpdate(id,
        {
            $set: {
                saved: eventIDS
            }
        }
        
    )

    res.send({ message: "successfully removed event" });
};

exports.searchEvent = async(req, res) => {
    const keyword = req.params.stri
    
    const events = await Event.find({
        name:new RegExp(keyword,'i')
    })

    res.send({ message: events });
};

exports.searchSavedEvent = async(req, res) => {
    const keyword = req.params.stri
    const id = req.params.id
    const user = await User.findById(id)
    const eventIDS = user["saved"]
    const events = []
    for (var i=0;i<eventIDS.length;i++){
        var tp=await Event.findById(eventIDS[i])
        events.push(tp["_id"])
    }
    
    var x = await Event.find({
        name:new RegExp(keyword,'i')
    })

    const toDelete = new Set(events);
    const newArray = x.filter(obj => !toDelete.has(obj._id));
    // // console.log(events)
    // for(var i=0;i<x.length;i++){
    //     // console.log(x[i]['_id'])
    //     if(events.indexOf(x[i]['_id'])==-1){
    //         x  = x.filter((item) => item._id !== x[i]['_id']);
    //     }
    //     // console.log(newX)
    // }


    res.send({ message: newArray });
};