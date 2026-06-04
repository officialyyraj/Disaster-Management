import React from 'react'
import {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import AlertCard from '../components/alertCards.jsx'
import MapView from "../components/mapView.jsx"
import useGeoLocation from '../hooks/useGeoLocation.js'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const Home = () => {
  const location=useGeoLocation();
  const [alerts, setalerts] = useState([])
  const [radius, setRadius] = useState(null)

  useEffect(()=>{
    const fetch_alerts=async ()=>{
      const response= await fetch(`${BACKEND_URL}/api/alert`)
      if(!response.ok)throw new Error("Server temporarily offline")
      const data= await response.json()

      setalerts(data)
    };
    fetch_alerts();
  },[]);

  useEffect(()=>{
    if (radius === null || !location.loaded || location.error) return;
    const showNearby = async () => {
      const response = await fetch(
        `${BACKEND_URL}/api/alert/nearby?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&rad=${radius}`
      );
      if (!response.ok) throw new Error("Server temporarily offline");
      const data = await response.json();
      setalerts(data.alerts);
    };

    showNearby();
  }, [radius, location.loaded, location.error]);

  const handleNearbyClick = () => {
    const input = prompt("Enter radius in kilometers:");
    if (input === null) return;

    const parsed = Number(input);
    if (Number.isNaN(parsed) || parsed <= 0) {
      console.error("Please enter a valid radius");
      return;
    }

    setRadius(parsed);
  }

  return (
  <div className="app">
    <div className="header">
      <h1 className="heading"> Disaster Alerts</h1>
      <p className="subtitle">Stay informed about emergencies in your area</p>
    </div>
   
    <div className="map-container">
      <MapView alert={alerts}/>
    </div>

    <div className='control-panel'>
      <button className='nearby-btn' onClick={handleNearbyClick}> Show Nearby Alerts</button>
      <Link to="/reports" className='report-btn'>Submit Report</Link>
    </div>

    <div className="alerts-section">
      <h2 className="section-title">Active Alerts ({alerts.length})</h2>
      <div className="alert-grid">
        {
          alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div className="card" key={index}>
                <div className="card-header">
                  <span className="disaster-type-badge">{alert.disaster_type}</span>
                  <span className="severity-badge" data-severity={alert.severity}>
                    {alert.severity}
                  </span>
                </div>
                <div className="card-body">
                  <h3 className="area_desc">{alert.area_description}</h3>
                  <p className="message">{alert.warning_message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-alerts">No active alerts in your area</div>
          )
        }
      </div>
    </div>

  </div>
  )
}
