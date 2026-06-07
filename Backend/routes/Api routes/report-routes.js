const express=require('express')
const router= express.Router()
const {submitReport}=require('../../controllers/User controllers/alert-controller.js')

router.post('/',submitReport)
module.exports=router