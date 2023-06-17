const express = require('express');
const exphbs = require('express-handlebars')
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

var usersRouter = require('./api/routes/UserRoute');


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config static file
app.use(express.static(__dirname + '/public'));

// Config use express handlebars
app.engine('hbs', exphbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout'
}));
app.set('view engine', 'hbs');

// routes
app.get('/createTables', async (req, res) => {
    require('./models/createTable');

    res.send('tables created !');
});

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/roles', async (req, res) => {
    const Role = require('./models/Role');
    return res.json(await Role.findAll());
});

app.use('/users', usersRouter);

app.get('/:page', (req, res) => {
    res.render(req.params.page);
});


// Start server
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});