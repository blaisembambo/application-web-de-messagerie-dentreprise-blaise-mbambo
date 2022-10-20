const {getUser,getUser2,getUsers,createUser} = require('../controllers/usersController')
const router = require('express').Router()

router.get('/',getUsers)
router.get('/1/:id',getUser2)
router.post('/1',getUser)
router.post('/',createUser)

module.exports = router;