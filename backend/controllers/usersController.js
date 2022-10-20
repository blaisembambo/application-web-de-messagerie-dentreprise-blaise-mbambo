const {User} = require('../models/userSchema')

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
    if(req.body.password == req.body.confirmpassword){
        User.create({
            firstName : req.body.firstname,
            lastName : req.body.lastname,
            image :req.body.image,
            email :req.body.email,
            password : req.body.password
        }).then(user => {
            console.log(user)
            res.json(user)
        })
        .catch(err  => res.json(err))    
    }

    if(req.body.password != req.body.confirmpassword){
        res.status(400)
        res.json({message:'Les mots de passe ne correspondent pas.'})
    }
}

module.exports = {getUser,getUser2,getUsers,createUser}