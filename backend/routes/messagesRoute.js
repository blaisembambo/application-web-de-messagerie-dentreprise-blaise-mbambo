const {getMessage,getMessages,createMessage,getConversion} = require('../controllers/messagesController')
const router = require('express').Router()

router.get('/',getMessages)
router.get('/:id',getMessage)
router.post('/',createMessage)
router.post('/conversation',getConversion)

module.exports = router;


