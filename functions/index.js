const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { response } = require("express");
const helmet = require("helmet");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const Users = require("./mongoos.js");
const screat_key =
  "sk_test_51LwrwHL0uAH7L9TAoXNB2LfxUZQd5hEZrBcPbhZ4o7mhzeArL2D1x87D0PFJTW7UlGgnFhoTMrBnsEltZiWj8iYt00XbRjyR8L";
const stripe = require("stripe")(screat_key);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// API

// App config
const app = express();

// database connection
mongoose.connect(
  "mongodb+srv://drstone:hamzaalikhan@cluster0.kjxeldw.mongodb.net/dashdev?retryWrites=true&w=majority"
);
var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => {
  console.log("Db connected");
});
// Middlewares

// var allowlist = ["http://localhost:3000"];
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };
app.use(cors({ origin: true }));
app.use(express.json());
// app.use(helmet());

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/contactus", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  // console.log(req.body);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "drstoneeren@gmail.com",
      pass: "egtahsessucqolvf",
    },
  });

  var mailOptions = {
    from: "drstoneeren@gmail.com",
    to: "alikhanhamza434@gmail.com",
    subject: `Name: ${name} Has this message for you`,
    text: `${message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Send");
    }
  });
});
app.post("/customizedservice", (req, res) => {
  const name = req.body.name;
  const website = req.body.website;
  const nooffields = req.body.nooffields;
  const formatofoutputfile = req.body.formatofoutputfile;
  const descriptions = req.body.descriptions;
  console.log(req.body);
  // res.status(200).send("hello");
  // const name = req.body.name;
  // const message = req.body.message;
  // // console.log(req.body);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "drstoneeren@gmail.com",
      pass: "egtahsessucqolvf",
    },
  });

  var mailOptions = {
    from: "drstoneeren@gmail.com",
    to: "faghost6201@gmail.com",
    subject: `Name: ${name} Has this message for you`,
    html: `<!DOCTYPE html>
<html lang="en">
<body>
    <div>
        <div style="display: flex; align-items: center; justify-content: center">
            <h1>Website:</h1>
            <h3 style="margin-left: 10px">
                <a href="#" target="blank"
                    style="font-size: 26px; font-weight: 300; text-decoration: none; color: black;">${website}</a>
            </h3>
        </div>
        <div style="display: flex; align-items: center; justify-content: center">
            <h1>Number of Fields:</h1>
            <h3 style="margin-left: 10px;font-size: 26px; font-weight: 300">
                ${nooffields}
            </h3>
        </div>
        <div style="display: flex; align-items: center; justify-content: center">
            <h1>Format of Output File:</h1>
            <h3 style="margin-left: 10px;font-size: 26px; font-weight: 300;">
                ${formatofoutputfile}
            </h3>
        </div>
        <div style="display: flex; align-items: center; justify-content: center">
            <h1>Description:</h1>
            <p style="margin-left: 10px; font-size: 26px; font-weight: 300; ">
                ${descriptions}
            </p>
        </div>
    </div>
</body>
</html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Send");
    }
  });
});

app.post("/payments/create", async (req, res) => {
  console.log(req.body);
  const total = req.body.total;

  console.log("Payment request received", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/create_api", (req, res) => {
  const apikey = uuidv4();
  const email = req.body.email;
  const paymentid = req.body.id;
  const data = {
    email,
    apikey,
    paymentid,
    macaddress: "",
  };
  Users.create(data, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Invalid password",
      });

      // res.status(500).send("The email is already in database");
    } else {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "drstoneeren@gmail.com",
          pass: "egtahsessucqolvf",
        },
      });

      var mailOptions = {
        from: "drstoneeren@gmail.com",
        to: email,
        subject: `API Key for the script`,
        text: `${apikey}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(201).send({ id: apikey });
        }
      });
    }
  });
});

// Listen command

exports.api = functions.https.onRequest(app);
