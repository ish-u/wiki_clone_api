const express = require('express');
const exphbs = require('express-handlebars')
const fs = require('fs');
const wiki = require('./routes/API/wiki')

// Initaitlizing Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ "extended" : false}));

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

// defining PORT number
const PORT = 5000 || process.env.PORT;

// routes for the Index
app.get('/', (req,res) => {
    res.render('index')
})

// route for the API
app.use('/wiki', wiki)

// Listening for Requests
app.listen(PORT,() => {
    console.log(`Server Running on ${PORT}`)
})