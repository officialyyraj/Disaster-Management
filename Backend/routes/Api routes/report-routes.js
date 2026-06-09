const express=require('express')
const router= express.Router()
const {submitReport}=require('../../controllers/User controllers/alert-controller.js')
const {reportLimiter}=require("../../Middleware/rateLimit.js")
router.post('/',reportLimiter,submitReport)
module.exports=router