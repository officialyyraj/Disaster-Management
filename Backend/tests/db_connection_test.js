const pool=require('../config/db.js')
const testDB = async () => {
  try {
    const result = await pool.query("SELECT * FROM reports")
    console.log(" PostgreSQL Connected")
    console.log(result.rows)
  } catch (err) {
    console.log(" Database Connection Failed")
    console.error(err)
  }
}
testDB()