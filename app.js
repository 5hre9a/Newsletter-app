const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser({ extended: true }));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/86de48ea8f",
    method: "POST",
    headers: {
      Authorization: "5hre9a 7bbc9a0284595fd60b3355d416ca81bb-us17"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/faliure.html");
    } else {
      if (response.statusCode === 200)
        res.sendFile(__dirname + "/success.html");
      else {
        res.sendFile(__dirname + "/faliure.html");
      }
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});




//7bbc9a0284595fd60b3355d416ca81bb-us17

//86de48ea8f
