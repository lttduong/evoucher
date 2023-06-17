'use strict'

const util = require('util')
const db = require('../db')
var express = require('express');
const { time } = require('console');
var router = express.Router();

// display user page
router.get('/', function(req, res, next) {      
    db.query('SELECT * FROM users ORDER BY id desc',function(err,rows)     {
        if(err) {
            res.render('table',{data:''});   
        } else {
            res.render('table',{data:rows});
        }
    });
});
// display add user page
router.get('/user/add', function(req, res, next) {    
    // render to add.ejs
    res.render('table/user/add', {
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
router.post('/user/add', function(req, res, next) {
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
        res.render('table/users/add', {
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
        db.query('INSERT INTO users SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                console.log(err);                 
                // render to add.ejs
                res.render('table/users/add', {
                    firstName: form_data.firstName,
                    lastName: form_data.lastName,
                    email: form_data.email,
                    username: form_data.username,
                    password: form_data.password,
                    birthDay: form_data.birthDay,
                    address: form_data.address,
                    roleId: form_data.roleId,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    message: "Please check first name and last name and email and username"

                })
            } else {                
                res.render('table',{message: "User successfully added"});
            }
        })
    }
})

// display edit user page
router.get('/user/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    db.query('SELECT * FROM users WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            res.render('table',{message: 'User not found with id = ' + id})
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('table/users/edit', {
                title: 'Edit User', 
                id: rows[0].id,
                firstName: rows[0].firstName,
                lastName: rows[0].lastName,
                email: rows[0].email,
                username: rows[0].username,
                passWord: '',
                birthDay: rows[0].birthDay,
                address: rows[0].address,
                roleId: rows[0].roleId
            })
        }
    })
})

// update user data
router.post('/user/update/:id', function(req, res, next) {

    let id = req.params.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.passWord;
    let birthDay = req.body.birthDay;
    let address = req.body.address;
    let roleId = req.body.roleId;
    let errors = false;

    if(firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
        errors = true;
        
        // render to add.ejs with flash message
        res.render('table/users/edit', {
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
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: username,
            password: password,
            birthDay: birthDay,
            address: address,
            roleId: roleId
        }
        // update query
        db.query('UPDATE users SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // render to edit.ejs
                res.render('table/users/edit', {
                    id: req.params.id,
                    firstname: form_data.firstname,
                    lastname: form_data.lastname,
                    email: form_data.email,
                    username: form_data.username,
                    password: form_data.password,
                    birthDay: form_data.birthDay,
                    address: form_data.address,
                    roleId: form_data.roleId,
                    updatedAt: Date.now(),
                    message: err
                })
            } else {
                res.render('table',{message: "User successfully updated"});
            }
        })
    }
})
   
// delete user
router.get('/user/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    db.query('DELETE FROM users WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // redirect to user page
            res.render('table',{message: err})
        } else {
            // redirect to user page
            res.render('table',{message: 'User successfully deleted! ID = ' + id})
        }
    })
})
module.exports = router;