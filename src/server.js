const express = require('express'); //importing express

const app = express(); //assigning app as an express app

const mongoose = require('mongoose');//importing mongoose

const Note = require('./models/note');


const bodyparser = require('body-parser'); //importing json parser 
app.use(bodyparser.urlencoded({ extended: false })); //nested json not correct
app.use(bodyparser.json());




//connecting database through authentication
const mongoDBPath = "mongodb+srv://faiyazullah:faiyaz123@cluster0.xjtxird.mongodb.net/notesdb";
mongoose.connect(mongoDBPath).then(function () {
    //defining app routes
    app.get("/", function (req, res) {
        const response = { message: "API works" };
        res.json(response);
    });
    //importin routes from route folder
    const noteRouter = require('./routes/note');

    app.use("/notes", noteRouter);


});

//starting server on a PORT
const PORT = process.env.PORT || 5555;
app.listen(PORT, function () {
    console.log("server started at PORT: "+PORT);
});