'use strict'

var express = require('express');
var router = express.Router();
var CampaignCoupon = require('../../models/CampaignCoupon');
var Campaign = require('../../models/Campaign');
var Coupon = require('../../models/CouponType');
var Partner = require('../../models/Partner');

// display Campaign Coupon page
router.get('/', async function(req, res, next) {
    Coupon.hasMany(CampaignCoupon);
    CampaignCoupon.belongsTo(Coupon);
    Campaign.hasMany(CampaignCoupon);
    CampaignCoupon.belongsTo(Campaign);
    const data = CampaignCoupon.findAll(
        {
            include: [
                {
                    model: Coupon,
                    required: true, 
                }, 
                {
                    model: Campaign,
                    required: true
                }
            ]
        }
    );
    res.send({data: data, message: "Get data successfully"});
});
// display add Campaign page
router.get('/add', async function(req, res, next) {   
    Partner.hasMany(Campaign);
    Campaign.belongsTo(Partner);
    const dataCampaign = await Campaign.findAll({
        include: Partner
    }); 
    const dataCoupon = await Coupon.findAll();
    res.send({dataCampaign: dataCampaign, dataCoupon: dataCoupon});
    res.render('campaign-coupons/add',{dataCampaign: dataCampaign, dataCoupon: dataCoupon});
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
        res.send({status: 400, message: "Please check campaignId, couponTypeId, quantity, remainingAmount"});
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
        res.send({status: 200, message: "Campaign Coupons type successfully added"});
    }
})

// display edit Campaign page
router.get('/edit/(:id)', async function(req, res, next) {

    let id = req.params.id;
    Coupon.hasMany(CampaignCoupon);
    CampaignCoupon.belongsTo(Coupon);
    Campaign.hasMany(CampaignCoupon);
    CampaignCoupon.belongsTo(Campaign);
    const data = await CampaignCoupon.findAll({
        include: [
            {
                model: Coupon,
                required: true, 
            }, 
            {
                model: Campaign,
                required: true
            }
        ],
        where: {
          id: id
        }
    });
    Partner.hasMany(Campaign);
    Campaign.belongsTo(Partner);
    const dataCampaign = await Campaign.findAll({
        include: Partner
    }); 
    const dataCoupon = await Coupon.findAll();
    res.send({data: data, dataCampaign: dataCampaign, dataCoupon: dataCoupon});
    res.render('campaign-coupons/edit',{data: data, dataCampaign: dataCampaign, dataCoupon: dataCoupon});
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
        res.send({status: 400, message: "Please check campaignId, couponTypeId, quantity, remainingAmount"});
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
        await CampaignCoupon.update(form_data, {
            where: {
                id: id
            }
        })
        res.send({status: 200, message: 'campaign Coupons successfully updated ID = ' + id});
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
    res.send({status: 200, message: 'Campaign Coupons successfully deleted! ID = ' + id});
})
module.exports = router;