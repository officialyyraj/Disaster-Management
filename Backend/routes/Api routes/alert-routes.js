const express=require('express')
const router= express.Router()
const {getAlerts,getAlertsNearby}=require('../../controllers/User controllers/alert-controller.js')

router.get('/',getAlerts)
router.get('/nearby',getAlertsNearby)
module.exports=router