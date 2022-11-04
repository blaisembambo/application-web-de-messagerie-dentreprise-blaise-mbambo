const {getMessage,getMessages,createMessage,getConversion,getUserAllMessages} = require('../controllers/messagesController')
const router = require('express').Router()

router.get('/', getMessages)
router.post('/',getUserAllMessages)
router.get('/:id',getMessage)
router.post('/',createMessage)
router.post('/conversation',getConversion)

module.exports = router;


