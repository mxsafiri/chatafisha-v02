import { useState, useEffect } from "react"

interface Location {
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`
          )
          const data = await response.json()
          const result = data.results[0]

          setLocation({
            name: result.formatted,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          })
        } catch (error) {
          setLocation({
            name: "Unknown Location",
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          })
        }
      },
      () => {
        setError("Unable to retrieve your location")
      }
    )
  }, [])

  return { location, error }
}
