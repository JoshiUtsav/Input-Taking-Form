const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // Serving Static files
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS

app.get('/', (req, res) => {
    const contents = "My name is utsav, I am a Frontend-developer";
    const params = { 'title': 'Utsav Joshi | Contact us', 'contents': contents };
    res.status(200).render('index.pug', params);
});

app.post('/', (req, res) => {
    let basic = req.body; 
    let Name = basic.name;
    let email = basic.email;
    let More = basic.more;

    let outputToWrite = `Name: ${Name} \nEmail: ${email} \nFeedback: ${More} \n\n`;

    fs.appendFile(path.join(__dirname, 'Input', 'output.txt'), outputToWrite, (err) => { if (err) { throw err; } });

    const params = { 'contents': 'Your form has been submitted successfully. We will notify you soon.' };
    res.status(200).render('index.pug', params);
});

// START THE SERVER
app.listen(port, () => {
    console.log(`App execution started successfully on port http://localhost:${port}`);
});
