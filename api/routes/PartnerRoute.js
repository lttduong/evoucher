'use strict'

var express = require('express');
var router = express.Router();
var Partner = require('../../models/Partner');
var User = require('../../models/User');

// display partner page
router.get('/', async function(req, res, next) {      
    User.hasMany(Partner);
    Partner.belongsTo(User);
    const data = await Partner.findAll({
        include: User
    });
    res.render('layouts/partners/list.hbs',{data: JSON.stringify({partner: data})});
});
// display add partner page
router.get('/add', async function(req, res, next) {    
    const dataUser = await User.findAll();
    res.render('layouts/partners/add.hbs',{data: JSON.stringify({users:dataUser}) });
})

// add a new Partner
router.post('/add', async function(req, res, next) {
    let companyName = req.body.companyName;
    let website = req.body.website;
    let userId = req.body.userId;
    let errors = false;

    if(companyName === '' || website === '' || userId === 0) {
        errors = true;
        res.send({status: 400, message: "Please check companyName and website and user ID"});
    }

    // if no error
    if(!errors) {
        var form_data = {
            companyName: companyName,
            website: website,
            userId: userId
        }
        // insert query
        await Partner.create(form_data);
        res.send({status: 200, message: "Partner successfully added"});
    }
})

// display edit Partner page
router.get('/edit/(:id)', async function(req, res, next) {

    let id = req.params.id;
    User.hasMany(Partner);
    Partner.belongsTo(User);
    const data = await Partner.findOne({
        include: User,
        where: {
          id: id
        }
    });
    const dataUser = await User.findAll();
    res.render('layouts/partners/add.hbs',{data:JSON.stringify({partner:data, users: dataUser})});
})

// update Partner data
router.post('/update/:id', async function(req, res, next) {

    let id = req.params.id;
    let companyName = req.body.companyName;
    let website = req.body.website;
    let userId = req.body.userId;
    let errors = false;

    if(companyName === '' || website === '' || userId === 0) {
        errors = true;        
        res.send({status: 400, message: "Please check companyName and website and user ID"});
    }

    // if no error
    if( !errors ) {   
        var form_data = {
            companyName: companyName,
            website: website,
            userId: userId
        }
        // update query
        await Partner.update(form_data, {
            where: {
                id: id
            }
        })
        res.send({status: 200, message: 'Partner successfully updated ID = ' + id});
    }
})
   
// delete Partner
router.get('/delete/(:id)', async function(req, res, next) {

    let id = req.params.id;
     
    await Partner.destroy({
        where: {
          id: id
        }
    });
    res.send({status: 200, message: 'Paerner successfully deleted! ID = ' + id});
})
module.exports = router;