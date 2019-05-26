const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log("Error in logging the file");
    }
  });
  next();
});

// app.use((req, res , next) => {
//   res.render('maintenance.hbs')
// });
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage : 'This is the home page Welcome to this site',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Error Loading Page'
  });
});

app.listen(port, () => {
  console.log(`Server is up on the port ${port}`);
});
