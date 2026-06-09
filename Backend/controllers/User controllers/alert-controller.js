const asyncHandler=require('express-async-handler')
const pool=require('../../config/db.js')
const { fetch_alerts_from_sachet_ndma, filter_data_from_fetch, fetch_nearby_alerts } = require('../../services/alert services/alert-services.js')
const { reportSchema } = require('../../validations/report.validation.ts')
//@desc fetch all alerts from the url, and send it as a json
//@route /api/alerts
//@access public
const getAlerts=asyncHandler(async(req,res)=>{
    const data=await fetch_alerts_from_sachet_ndma()
    if(!data){
        res.status(500)
        throw new Error("Unable to fetch alerts")
    }
    const filtered_data=await filter_data_from_fetch(data)
    res.json(filtered_data)
    return filtered_data
})
//@desc fetch alerts nearby to your location
//@route /api/alert/nearby?lat=&lon=&rad=
//@access public
const getAlertsNearby=asyncHandler(async(req,res)=>{
    const { lat, lon, rad } = req.query
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lon)
    const radiusKm = Number.isFinite(parseFloat(rad)) ? parseFloat(rad) : 50

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        res.status(400)
        throw new Error('Please provide valid lat and lon query parameters')
    }
    const data = await fetch_alerts_from_sachet_ndma()
    const filtered = await filter_data_from_fetch(data)
    const nearby_and_distance_with_count = fetch_nearby_alerts(filtered, latitude, longitude, radiusKm)
    res.json(nearby_and_distance_with_count)
})
//@desc submit reports to db from frontend
//@route /api /report
//@access public
const submitReport=asyncHandler(async(req,res)=>{
    const validationResult = reportSchema.safeParse(req.body);
    if(!validationResult.success){
        return res.status(400).json({
      success: false,
      errors: validationResult.error.flatten()
    })};
    const type = validationResult.data.type
    const description = validationResult.data.description
    const lat = validationResult.data.latitude
    const lon = validationResult.data.longitude
    console.log(validationResult.data,type,description,lat,lon);
    const insertText = 'INSERT INTO "reports" (type,description,latitude,longitude,status,created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *'
    const values = [type, description, lat, lon, 'User reported', new Date()]

    const result = await pool.query(insertText, values)
    const inserted = result.rows && result.rows[0]
    if(!result){
        throw new Error("Error inserting into database");
    }
    res.status(201).json({ report: inserted})
})
module.exports={getAlerts,getAlertsNearby,submitReport}