const {User} = require('../models/userSchema')
const bcrypt = require("bcrypt")
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");

let strategy = new LocalStrategy(function verify(userlogin, password, done) {
  
})



const getUser2 = (req,res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

const getUser = (req,res) => {
    User.findOne({email :req.body.email, password : req.body.password})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

const getUsers = (req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
}

const createUser = (req,res) => {
    if (req.body.password == req.body.confirmpassword) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
            
            User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            image :req.body.image,
            email :req.body.email,
            password : hash
        }).then(user => {
            console.log(user)
            res.status(201).json(user)
        })
        .catch(err  => res.status(400).json(err))

        })
        .catch(err  => res.status(500).json(err))
            
    }

    if(req.body.password != req.body.confirmpassword){
        res.status(400)
        res.json({message:'Les mots de passe ne correspondent pas.'})
    }
}

module.exports = {getUser,getUser2,getUsers,createUser}