const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/krishnaDance');
}
const app = express();
const port = process.env.PORT || 80;

// Define Mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    subject: String,
    message: String
});

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Thankyou, Your response is saved successfully to the database")
    }).catch(()=>{
        res.status(400).send("error in saving the data to the database")
    })
})

// app.post('/contact', (req, res) => {
//     let heee = new Contact(req.body)
//     console.log(heee);
// })


app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});