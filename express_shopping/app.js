const express = require("express")
const app = express();
const routes = require("./routes")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/items", routes);

app.use(function(req, res) {
    return new ExpressError("Not Found", 404);
  });
  
  // generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {
        message: err.message,
        status: status
      }
    });
  });
  // end generic handler
  app.listen(5000, function() {
    console.log("Server is listening on port 3000");
  });
  
module.exports = app;