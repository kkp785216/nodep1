const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;


// EXPRESS SPECIFIC STUFF
app.use('/public', express.static('public')) // For serving static files

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