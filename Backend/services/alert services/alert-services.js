const dotenv=require('dotenv')
dotenv.config();

let cached_data=null;
let lastfetchtime=0;

const fetch_alerts_from_sachet_ndma=async()=>{
    const ndmaUrl = process.env.NDMA_URL;
    if (!ndmaUrl) {
        throw new Error('Environment variable NDMA_URL is not set');
    }
    let url;
    try {
        url = new URL(ndmaUrl);
    } catch (e) {
        throw new Error(`Invalid NDMA_URL: ${ndmaUrl}`);
    }
    let data
    if(cached_data && (Date.now()-lastfetchtime)<120000){
        data = cached_data
    }
    else{
        let Fetch = (await fetch(url.href))

         if(!Fetch || (Fetch && !Fetch.ok)){
            const status = Fetch && Fetch.status ? Fetch.status : 'no-response'
            throw new Error(`Unable to fetch alerts from sachet (status: ${status})`)
        }
        data=await Fetch.json();
        if(!data){
            throw new Error("Problem with parsing the fetched alerts");
        }
        lastfetchtime=Date.now();
        cached_data=data
    }
    
    return data
}
const filter_data_from_fetch=async(data)=>{
    const filtered_data=[]
    
    for(var i=0;i<data.length;i++){
        let long, lat;
    try {
        const parts = data[i].centroid.split(',');
        if (parts.length !== 2) {
            throw new Error("Invalid centroid format");
        }
        long = parts[0].trim();
        lat = parts[1].trim();
    } catch (e) {
        throw new Error("Unable to split centroid data into latitude and longitude");
    }

        var entry = {
            severity: data[i].severity,
            effective_start_time: data[i].effective_start_time,
            effective_end_time: data[i].effective_end_time,
            disaster_type: data[i].disaster_type,
            area_description: data[i].area_description,
            severity_level: data[i].severity_level,
            warning_message: data[i].warning_message,
            longitude:long,
            latitude:lat,
            alert_source: data[i].alert_source,
            area_covered: data[i].area_covered
        };
        filtered_data.push(entry)
    }
    if(!filtered_data||filtered_data.length===0){throw new Error("The filtered data is Empty or Undefined")}
    return filtered_data
}
const fetch_nearby_alerts=(filtered, latitude, longitude, radiusKm)=>{
    const toRad = (deg) => (deg * Math.PI) / 180
    const distanceKm = (lat1, lon1, lat2, lon2) => {
        const dLat = toRad(lat2 - lat1)
        const dLon = toRad(lon2 - lon1)

        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return 6371 * c
    }

    const nearby = filtered.filter(item => {
        const itemLat = parseFloat(item.latitude)
        const itemLon = parseFloat(item.longitude)
        if (Number.isNaN(itemLat) || Number.isNaN(itemLon)) return false
        return  distanceKm(latitude, longitude, itemLat, itemLon)<= radiusKm
    })
    const alerts=[];
    const distances=[];
    for(let i=0;i<nearby.length;i++){
        let itemLat = parseFloat(nearby[i].latitude)
        let itemLon = parseFloat(nearby[i].longitude)
        const distance=distanceKm(latitude, longitude, itemLat, itemLon)
        alerts.push(nearby[i]);
        distances.push(distance);
    }
    const nearby_and_distance_with_count={
        
        count:nearby.length,
        alerts: alerts,
        distances:distances
    }
    
    return nearby_and_distance_with_count
}
module.exports={
    fetch_alerts_from_sachet_ndma,
    filter_data_from_fetch,
    fetch_nearby_alerts
};