const express=require('express')
const router= express.Router()
const {getAlerts,getAlertsNearby,submitReport}=require('../../controllers/User controllers/alert-controller.js')

router.get('/',getAlerts)
router.get('/nearby',getAlertsNearby)
router.post('/report',submitReport)
module.exports=router