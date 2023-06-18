'use strict'

var express = require('express');
const { time, log, Console } = require('console');
var router = express.Router();
var User = require('../../models/User');
var Role = require('../../models/Role');

// display user page
router.get('/', async function(req, res, next) {      
    const users = await User.findAll();
    const roles = await Role.findAll();
    res.render('layouts/users/list.hbs',{data:JSON.stringify({users: users, roles: roles})});
});
// display add user page
router.get('/add', async function(req, res, next) {   
    const roles = await Role.findAll();
    res.render('layouts/users/add.hbs', {data: JSON.stringify({roles: roles})});
})

// add a new user
router.post('/add', function(req, res, next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let username = req.body.userName;
    let password = req.body.password;
    let birthDay = req.body.birthday;
    let address = req.body.address;
    let roleId = req.body.role
    let errors = false;
    
        
    if(firstName === '' || lastName === '' || email === '' || username  === '' || password === '') {
        errors = true;
        res.send({status: 400,message: "Please check first name and last name and email and username"});
    }

    if(!errors) {
        var form_data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
            birthDay: birthDay,
            address: address,
            roleId: roleId
        }
        // insert query
        User.create(form_data);
        res.send({status: 200,message: "User successfully added"});
    }
})

// display edit user page
router.get('/edit/(:id)', async function(req, res, next) {

    let id = req.params.id;
    const roles = await Role.findAll();
    const data = await User.findOne({
        where: {
          id: id
        }
    });
    res.render('layouts/users/add.hbs',{data: JSON.stringify({user:data, roles:roles})});
})

// update user data
router.post('/update/:id', async function(req, res, next) {

    let id = req.params.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let username = req.body.userName;
    let password = req.body.password;
    let birthDay = req.body.birthday;
    let address = req.body.address;
    let roleId = req.body.role
    let errors = false;

    if(firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
        errors = true;
        res.send({status: 400,message: "Please check first name and last name and email and username"});
    }

    // if no error
    if( !errors ) {   
        var form_data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
            birthDay: birthDay,
            address: address,
            roleId: roleId,
            updatedAt: Date.now()
        }
        // update query
        await User.update(form_data, {
            where: {
                id: id
            }
        })
        res.send({status: 200,message: "User update successfully"});
    }
})
   
// delete user
router.get('/delete/(:id)', async function(req, res, next) {

    let id = req.params.id;
     
    await User.destroy({
        where: {
          id: id
        }
    });
    res.send({message: "User update successfully"});
})
module.exports = router;