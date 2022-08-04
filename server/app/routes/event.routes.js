const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/allevents", controller.allEvents);

  app.post("/api/addevent", [authJwt.verifyToken, authJwt.isAdmin],controller.addEvent);

  app.put("/api/addSevent/:id", [authJwt.verifyToken],controller.addSevent);

  app.put("/api/removeSevent/:id", [authJwt.verifyToken],controller.removeSevent);

  app.get("/api/savedevents/:id", [authJwt.verifyToken], controller.getsavedEvents);

  app.get("/api/savedeventsID/:id", [authJwt.verifyToken], controller.getsavedEventsID);

  app.get("/api/search/:stri", controller.searchEvent);

  app.get("/api/searchS/:id/:stri", [authJwt.verifyToken],controller.searchSavedEvent);

};