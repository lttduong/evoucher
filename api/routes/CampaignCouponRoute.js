'use strict'

var express = require('express');
var router = express.Router();
var CampaignCoupon = require('../../models/CampaignCoupon');
var Campaign = require('../../models/Campaign');
var Coupon = require('../../models/CouponType');

// display Campaign Coupon page
router.get('/', async function(req, res, next) {      
    // Campaign.hasMany(CampaignCoupon);
    // CampaignCoupon.belongsTo(Campaign);
    // Campaign.hasMany(Coupon);    
    const data = await CampaignCoupon.findAll({
        include: [
          {model: Campaign},
          {model: Coupon}
        ]
      });
    console.log(data);
    res.send({data:data, message: "Get data successfully"});
});
// display add Campaign page
router.get('/add', function(req, res, next) {    
    res.render('campaign-coupons/add', {
        campaignId: 0,
        couponTypeId: 0,
        quantity: 0,
        remainingAmount: 0
    })
})

// add a new Campaign
router.post('/add', async function(req, res, next) {
    let campaignId = req.body.campaignId;
    let couponTypeId = req.body.couponTypeId;
    let quantity = req.body.quantity;
    let remainingAmount = req.body.remainingAmount;

    let errors = false;

    if(campaignId === 0 || couponTypeId === 0 || quantity === 0 || remainingAmount === 0) {
        errors = true;

        res.render('campaign-coupons/add', {
            campaignId: campaignId,
            couponTypeId: couponTypeId,
            quantity: quantity,
            remainingAmount: remainingAmount,
            message: "Please check campaignId, couponTypeId, quantity, remainingAmount"
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            campaignId: campaignId,
            couponTypeId: couponTypeId,
            quantity: quantity,
            remainingAmount: remainingAmount
        }
        // insert query
        await CampaignCoupon.create(form_data);
        res.render('campaign-coupons',{message: "campaign Coupons type successfully added"});
    }
})

// display edit Campaign page
router.get('/edit/(:id)', async function(req, res, next) {

    let id = req.params.id;
    const data = await CampaignCoupon.findAll({
        where: {
          id: id
        }
    });
    console.log(data);
    res.render('campaign-coupons/edit',{data: JSON.parse(data)});
})

// update Campaign data
router.post('/update/:id', async function(req, res, next) {

    let id = req.params.id;
    let campaignId = req.body.campaignId;
    let couponTypeId = req.body.couponTypeId;
    let quantity = req.body.quantity;
    let remainingAmount = req.body.remainingAmount;
    let errors = false;

    if(campaignId === 0 || couponTypeId === 0 || quantity === 0 || remainingAmount === 0) {
        errors = true;
        res.render('campaign-coupons/edit', {
            campaignId: campaignId,
            couponTypeId: couponTypeId,
            quantity: quantity,
            remainingAmount: remainingAmount,
            message: "Please check campaignId, couponTypeId, quantity, remainingAmount"
        })
    }

    // if no error
    if( !errors ) {   
        var form_data = {
            campaignId: campaignId,
            couponTypeId: couponTypeId,
            quantity: quantity,
            remainingAmount: remainingAmount
        }
        // update query
        console.log(form_data);
        await CampaignCoupon.update(form_data, {
            where: {
                id: id
            }
        })
        res.render('campaign-coupons',{message: 'campaign Coupons successfully updated ID = ' + id})
    }
})
   
// delete Campaign
router.get('/delete/(:id)', async function(req, res, next) {

    let id = req.params.id;
     
    await CampaignCoupon.destroy({
        where: {
          id: id
        }
    });
    res.render('campaign-coupons',{message: 'campaign Coupons successfully deleted! ID = ' + id})
})
module.exports = router;