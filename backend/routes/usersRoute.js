const {getUser,getUser2,getUsers,createUser} = require('../controllers/usersController')
const router = require('express').Router()
const passport = require("passport")
const authFilter = require("../middleware/authfilter")

router.get('/',getUsers)
router.get('/1/:id',getUser2)
router.post('/1',authFilter)
router.post('/',createUser)

module.exports = router;