#  Disaster Management Platform

A full-stack disaster monitoring platform that provides real-time disaster alerts across India using NDMA data, location-based filtering, and interactive map visualization.

##  Live Demo

Frontend: https://disaster-management-k5yx.onrender.com/

## Features

### Government Disaster Alerts

* Integrates with NDMA (National Disaster Management Authority) alert feeds
* Displays disaster type, severity, affected area, and warning messages
* Fetches and transforms raw NDMA data into a user-friendly format

### Interactive Map

* Built using React Leaflet and OpenStreetMap
* Displays alerts as map markers
* Popup information for each alert

### Nearby Alerts

* Uses browser geolocation
* Finds alerts within a user-specified radius
* Haversine distance calculation for accurate geospatial filtering

### Performance Optimization

* Implemented in-memory caching with a 2-minute TTL
* Reduced average response time from approximately **2.2 seconds to 4 milliseconds** on cache hits
* Minimizes unnecessary requests to NDMA servers

### Responsive Interface

* Modern card-based layout
* Alert severity indicators
* Mobile-friendly design

---

# Tech Stack

## Frontend

* React
* Vite
* React Leaflet
* OpenStreetMap
* CSS

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## Deployment

* Render

## Version Control

* Git & GitHub

---

# Architecture

NDMA API

↓

Express Backend

↓

Caching Layer (2-minute TTL)

↓

Data Processing

↓

React Frontend

↓

Interactive Map & Alert Dashboard

---

#  Performance Improvements

| Feature         | Before             | After                |
| --------------- | ------------------ | -------------------- |
| NDMA Fetch Time | ~2.2 seconds       | ~4 ms (cache hit)    |
| API Requests    | Every User Request | Once every 2 minutes |
| User Experience | Noticeable Delay   | Near Instant         |

---

# 📍 API Endpoints

## Get All Alerts

```http
GET /api/alert
```

Returns all active disaster alerts.

---

## Get Nearby Alerts

```http
GET /api/alert/nearby
```

### Query Parameters

| Parameter | Description          |
| --------- | -------------------- |
| lat       | User latitude        |
| lon       | User longitude       |
| rad       | Radius in kilometers |

Example:

```http
GET /api/alert/nearby?lat=23.25&lon=77.41&rad=100
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/officialyyraj/Disaster-Management.git
cd Disaster-Management
```

---

## Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=5000
NDMA_URL=https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

#  PostgreSQL

Current database integration includes:

* PostgreSQL connection
* Report table schema
* Future citizen reporting infrastructure

---


#  Key Concepts Implemented

* REST APIs
* Geolocation API
* Haversine Distance Formula
* React Hooks
* Express Middleware
* Error Handling
* In-Memory Caching
* PostgreSQL Integration
* API Optimization
* Deployment with Render

---

#  Author

Piyush Raj

VIT Vellore | CSE Core

GitHub: https://github.com/officialyyraj
