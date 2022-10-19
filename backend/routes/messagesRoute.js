const {getMessage,getMessages,createMessage} = require('../controllers/messagesController')
const router = require('express').Router()

router.get('/',getMessages)
router.get('/:id',getMessage)
router.post('/',createMessage)

module.exports = router;


