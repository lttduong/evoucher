const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const port = process.env.PORT || 5000;



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
app.get('/createTables', (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('tables created !');
    })
});

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/:page', (req, res) => {
    res.render(req.params.page);
});

// Start server
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});