const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const port = process.env.PORT || 5000;
const passport = require('passport');
var cookieParser = require('cookie-parser');
var config = require("./config/jwt");

var usersRouter = require('./api/routes/UserRoute');
var partnersRouter = require('./api/routes/PartnerRoute');
var couponsRouter = require('./api/routes/CouponRoute');
var campaignsRouter = require('./api/routes/CampaignRoute');
var CampaignCouponRoute = require('./api/routes/CampaignCouponRoute');

// Passport config
require("./api/passport")(passport);

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(config.jwt.secret));

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
    res.render('index', {testName: 'Loc'})
});

app.get('/roles', async (req, res) => {
    const Role = require('./models/Role');
    return res.json(await Role.findAll());
});

app.use('/users', usersRouter);
app.use('/partners', partnersRouter);
app.use('/auth', require('./api/routes/AuthRoute'));
app.use('/coupons', couponsRouter);
app.use('/campaigns', campaignsRouter);
app.use('/campaign-coupons', CampaignCouponRoute);

app.get('/:page', (req, res) => {
    res.render(req.params.page);
});


// Start server
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});