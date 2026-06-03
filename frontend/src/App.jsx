import { useState,useEffect } from 'react'
import './App.css'
import AlertCard from './components/alertCards.jsx'
import MapView from "./components/MapView"
function App() {
  const [alerts, setalerts] = useState([])
  useEffect(()=>{
    const fetch_alerts=async ()=>{
      const response= await fetch("http://localhost:5000/api/alert")
      if(!response.ok)throw new Error("Server temporarily offline")
      const data= await response.json()
      setalerts(data)
    };
    fetch_alerts();

  },[]);
  return (
  <div className="app">

  <h1 className="heading">
    Disaster Alerts
  </h1>

  <MapView alert={alerts}/>


  <div className="alert-grid">

    {
      alerts.map((alert, index) => (

        <div className="card" key={index}>
          <div className="area_desc">
            {alert.area_description}
          </div>

          <div className="type">
            {alert.disaster_type}
          </div>

          <div className="severity">
            {alert.severity}
          </div>

          <div className="message">
            {alert.warning_message}
          </div>
          
          

        </div>

      ))
    }

  </div>

</div>
  )
}

export default App

