
const express = require('express')
const app = express()
var router = express.Router();
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
const cors = require('cors');
const port = process.env.PORT || 8000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log('We are live on port', port);
});


app.get('/', (req, res) => {
  res.send('Welcome to my api');
})


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "piravinth08@gmail.com",
      pass: 'giantman1'
    }
  });



transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

app.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `

  var mail = {
    from: name,
    to: 'piravinth08@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = app;