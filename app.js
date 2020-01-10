
var nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
const path = require('path');
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

app.use(bodyParser.json());

app.use(cors());

app.use('/', router);

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);


app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});



const oauth2Client = new OAuth2(
  process.env.ID, //client id
  process.env.SECRET, //client secred
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH
});

const accessToken = oauth2Client.getAccessToken();


//   var transport = {
//     service: "gmail",
//     auth: {
//       user: process.env.USER,
//       pass: process.env.PASS
//     }
// };

var transport = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.USER,
    clientId: process.env.ID,
    clientSecret: process.env.SECRET,
    refreshToken: process.env.REFRESH,
    accessToken: accessToken
  }
};




  var transporter = nodemailer.createTransport(transport)
  

  transporter.verify((error, succes) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

  router.post('/send', (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var id = req.body.id;
    var content = `name: ${name} \n email: ${email} \n ID: ${id} \n message: ${message} `
  
    var mail = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: content
    }

  console.log(mail)
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          msg: 'fail',
          err: err
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  app.use((req, res) => {
    res.status(404).json({
      message: 'Route Not Found',
    });
  });
  
  // setup a global error handler
  app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
      console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }
  
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  });
  
  // set our port
  app.set('port', process.env.PORT || 5000);
  
  // start listening on our port
  const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
  });

  module.exports = router ;
