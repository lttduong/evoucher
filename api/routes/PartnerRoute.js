'use strict'

var express = require('express');
const { time } = require('console');
var router = express.Router();
var Partner = require('../../models/Partner');
// display partner page
router.get('/', async function(req, res, next) {      
    const data = await Partner.findAll();
    res.render('partner',{data:data});
});
// display add partner page
router.get('/add', function(req, res, next) {    
    res.render('partners/add', {
        companyName: '',
        website: '',
        userId: 0
    })
})

// add a new user
router.post('/add', async function(req, res, next) {
    let companyName = req.body.companyName;
    let website = req.body.website;
    let userId = req.body.userId;
    let errors = false;

    if(companyName === '' || website === '' || userId === 0) {
        errors = true;

        res.render('partners/add', {
            companyName: companyName,
            website: website,
            userId: userId,
            message: "Please check companyName and website and user ID"
        })
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
        res.render('partners',{message: "Partner successfully added"});
    }
})

// display edit user page
router.get('/edit/(:id)', async function(req, res, next) {

    let id = req.params.id;
    const data = await Partner.findAll({
        where: {
          id: id
        }
    });
    console.log(data);
    res.render('partners/edit',{data: data});
})

// update user data
router.post('/update/:id', async function(req, res, next) {

    let id = req.params.id;
    let companyName = req.body.companyName;
    let website = req.body.website;
    let userId = req.body.userId;
    let errors = false;

    if(companyName === '' || website === '' || userId === 0) {
        errors = true;
        
        // render to add.ejs with flash message
        res.render('partners/edit', {
            id: req.params.id,
            companyName: companyName,
            website: website,
            userId: userId,
            message: "Please check company name and website and user ID"
        })
    }

    // if no error
    if( !errors ) {   
        var form_data = {
            companyName: companyName,
            website: website,
            userId: userId
        }
        // update query
        console.log(form_data);
        await Partner.update(form_data, {
            where: {
                id: id
            }
        })
        res.render('partners',{message: 'Partner successfully updated ID = ' + id})
    }
})
   
// delete user
router.get('/delete/(:id)', async function(req, res, next) {

    let id = req.params.id;
     
    await Partner.destroy({
        where: {
          id: id
        }
    });
    res.render('partners',{message: 'Paerner successfully deleted! ID = ' + id})
})
module.exports = router;