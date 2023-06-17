'use strict'

var express = require('express');
const { time } = require('console');
var router = express.Router();
var User = require('../../models/User');
// display user page
router.get('/', async function(req, res, next) {      
    const data = await User.findAll();
    res.render('user',{data:data});
});
// display add user page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('users/add', {
        firstName: '',
        lastName: '',
        email: '',
        username:'',
        password: '',
        birthDay: '',
        address: '',
        roleId: 0
    })
})

// add a new user
router.post('/add', async function(req, res, next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let birthDay = req.body.birthDay;
    let address = req.body.address;
    let roleId = req.body.roleId
    let errors = false;

    if(firstName === '' || lastName === '' || email === '' || username  === '' || password === '') {
        errors = true;

        // render to add.ejs with flash message
        res.render('users/add', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
            birthDay: birthDay,
            address: address,
            roleId: roleId,
            message: "Please check first name and last name and email and username"
        })
    }

    // if no error
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
        await User.create(form_data);
        res.render('users',{message: "User successfully added"});
    }
})

// display edit user page
router.get('/edit/(:id)', async function(req, res, next) {

    let id = req.params.id;
    const data = await User.findAll({
        where: {
          id: id
        }
    });
    res.render('users/edit',{data: data});
})

// update user data
router.post('/update/:id', async function(req, res, next) {

    let id = req.params.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let birthDay = req.body.birthDay;
    let address = req.body.address;
    let roleId = req.body.roleId;
    let errors = false;

    if(firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
        errors = true;
        
        // render to add.ejs with flash message
        res.render('users/edit', {
            id: req.params.id,
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: username,
            password: password,
            birthDay: birthDay,
            address: address,
            roleId: roleId,
            message: "Please check first name and last name and email and username"
        })
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
        res.render('users',{message: 'User successfully updated ID = ' + id})
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
    res.render('users',{message: 'User successfully deleted! ID = ' + id})
})
module.exports = router;