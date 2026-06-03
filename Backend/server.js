const express= require('express');
const path = require('path');
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config()
const PORT=process.env.PORT||5000;
const app = express()
const errorHandler=require("./Middleware/errorMiddleware.js");
const alert_route=require('./routes/Api routes/alert-routes.js')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)
app.use(cors())
app.use('/api/alert',alert_route)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})