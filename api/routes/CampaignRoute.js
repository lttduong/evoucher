'use strict'

var express = require('express');
var router = express.Router();
var Campaign = require('../../models/Campaign');
var Partner = require('../../models/Partner');
// display Campaign page
router.get('/', async function(req, res, next) {      
    Partner.hasMany(Campaign);
    Campaign.belongsTo(Partner);
    const data = await Campaign.findAll({
        include: Partner
    });
    res.render('layouts/campaigns/list',{data:JSON.stringify({campaigns: data})});
});
// display add Campaign page
router.get('/add', async function(req, res, next) {   
    const dataPartner = await Partner.findAll(); 
    res.render('layouts/campaigns/add',{data: JSON.stringify({partners: dataPartner})});
})

// add a new Campaign
router.post('/add', async function(req, res, next) {
    let name = req.body.name;
    let type = req.body.type;
    let status = req.body.status;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let partnerId = req.body.partnerId;
    let errors = false;

    if(name === '' || type === '' || status === '' || startDate === '' || endDate === '' || partnerId === 0) {
        errors = true;
        res.send({status: 400, message: "Please check name, type, status, start date, end date, partner ID"});
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            type: type,
            status: status,
            startDate: startDate,
            endDate: endDate,
            partnerId: partnerId
        }
        // insert query
        await Campaign.create(form_data);
        res.send({status: 200, message: "Campaign type successfully added"});
    }
})

// display edit Campaign page
router.get('/edit/(:id)', async function(req, res, next) {
    let id = req.params.id;
    Partner.hasMany(Campaign);
    Campaign.belongsTo(Partner);
    const data = await Campaign.findOne({
        include: Partner,
        where: {
          id: id
        }
    });
    const dataPartner = await Partner.findAll(); 
    res.render('layouts/campaigns/add',{data: JSON.stringify({campaign: data,partners: dataPartner})});
})

// update Campaign data
router.post('/update/:id', async function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let type = req.body.type;
    let status = req.body.status;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let partnerId = req.body.partnerId;
    let errors = false;

    if(name === '' || type === '' || status === '' || startDate === '' || endDate === '' || partnerId === 0) {       
        errors = true;
        res.send({status: 400, message: "Please check name, type, status, start date, end date, partner ID"});
    }

    // if no error
    if( !errors ) {   
        var form_data = {
            name: name,
            type: type,
            status: status,
            startDate: startDate,
            endDate: endDate,
            partnerId: partnerId,
        }
        // update query
        await Campaign.update(form_data, {
            where: {
                id: id
            }
        })
        res.send({status: 200, message: 'Campaigns successfully updated ID = ' + id});
    }
})
   
// delete Campaign
router.get('/delete/(:id)', async function(req, res, next) {
    let id = req.params.id;
    await Campaign.destroy({
        where: {
          id: id
        }
    });
    res.send({status: 200, message: 'Campaigns successfully deleted! ID = ' + id});
})
module.exports = router;