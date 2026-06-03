const pool=require('../config/db.js')
const testDB = async () => {
  try {
    const result = await pool.query("SELECT NOW()")
    console.log(" PostgreSQL Connected")
    console.log(result.rows[0])
  } catch (err) {
    console.log(" Database Connection Failed")
    console.error(err)
  }
}
testDB()