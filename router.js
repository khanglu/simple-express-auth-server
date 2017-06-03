const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// Authenticate route with passport
// By default, passport create session, with JWT we don't want that
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signup", Authentication.signup);
};
