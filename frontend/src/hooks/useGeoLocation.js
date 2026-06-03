import { useEffect, useState } from 'react'

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
    error: null,
  })

  const onSuccess = (position) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      error: null,
    })
  }

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: 0, lng: 0 },
      error,
    })
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocation({
        loaded: true,
        coordinates: { lat: 0, lng: 0 },
        error: {
          code: 0,
          message: 'Geolocation not supported',
        },
      })
      return
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return location
}

export default useGeoLocation;
