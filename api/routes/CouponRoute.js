'use strict'

var express = require('express');
const { time, log } = require('console');
var router = express.Router();
var Coupon = require('../../models/CouponType');
// display Coupon page
router.get('/', async function(req, res, next) {      
    const data = await Coupon.findAll();
    res.send({data:data, message: "Get data successfully"});
    res.render('coupons',{data: data});
});
// display add Coupon page
router.get('/add', function(req, res, next) {    
    res.render('coupons/add', {
        description: '',
        percent: '',
        discount: ''
    })
})

// add a new Coupon
router.post('/add', async function(req, res, next) {
    let description = req.body.description;
    let percent = req.body.percent;
    let discount = req.body.discount;
    let errors = false;

    if(description === '' || percent === null || discount === null) {
        errors = true;
        res.send({status: 400, message: "Please check description and percent and discount"});
    }

    // if no error
    if(!errors) {

        var form_data = {
            description: description,
            percent: percent,
            discount: discount
        }
        // insert query
        await Coupon.create(form_data);
        res.send({status: 200, message: "Coupon type successfully added"});
    }
})

// display edit Coupon page
router.get('/edit/(:id)', async function(req, res, next) {

    let id = req.params.id;
    const data = await Coupon.findAll({
        where: {
          id: id
        }
    });
    res.send({data:data, message: "Get data successfully"});
})

// update Coupon data
router.post('/update/:id', async function(req, res, next) {

    let id = req.params.id;
    let description = req.body.description;
    let percent = req.body.percent;
    let discount = req.body.discount;
    let errors = false;

    if(description === '' || percent === null || discount === null) {
        errors = true;        
        res.send({status: 400, message: "Please check description and percent and discount"});
    }

    // if no error
    if( !errors ) {   
        var form_data = {
            description: description,
            percent: percent,
            discount: discount
        }
        // update query
        console.log(form_data);
        await Coupon.update(form_data, {
            where: {
                id: id
            }
        })
        res.send({status: 200, message: 'Coupons successfully updated ID = ' + id});
    }
})
   
// delete Coupon
router.get('/delete/(:id)', async function(req, res, next) {

    let id = req.params.id;
     
    await Coupon.destroy({
        where: {
          id: id
        }
    });
    res.send({status: 200, message: 'Coupons successfully deleted! ID = ' + id});
})
module.exports = router;