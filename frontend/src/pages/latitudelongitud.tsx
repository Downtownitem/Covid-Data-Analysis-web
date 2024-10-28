import React, { useEffect, useRef, useState } from "react";
import { LoadScript } from "@react-google-maps/api";

interface CountryData {
  region: string;
  deaths: number;
  lat: number;
  lng: number;
}

const exampleData: CountryData[] = [
  { region: "Estados Unidos", deaths: 5000, lat: 38.9072, lng: -77.0369 }, // Washington D.C.
  { region: "Brasil", deaths: 4000, lat: -15.7939, lng: -47.8828 }, // Brasilia
  { region: "India", deaths: 3000, lat: 28.6139, lng: 77.209 }, // Nueva Delhi
  { region: "Reino Unido", deaths: 2500, lat: 51.5074, lng: -0.1278 }, // Londres
  { region: "Alemania", deaths: 2000, lat: 52.52, lng: 13.405 }, // Berlín
  { region: "Francia", deaths: 1500, lat: 48.8566, lng: 2.3522 }, // París
  { region: "Italia", deaths: 1000, lat: 41.9028, lng: 12.4964 }, // Roma
  { region: "Canadá", deaths: 800, lat: 45.4215, lng: -75.6972 }, // Ottawa
  { region: "Australia", deaths: 600, lat: -35.2809, lng: 149.13 }, // Canberra
  { region: "Japón", deaths: 400, lat: 35.6895, lng: 139.6917 }, // Tokio
];

const LatitudeLongitude: React.FC = () => {
  const [data, setData] = useState(exampleData);
  const mapElement = useRef(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const map = new google.maps.Map(mapElement.current, {
      zoom: 3,
      center: { lat: 20, lng: 0 },
      mapTypeId: "terrain",
    });

    for (const d in data) {
      // Add the circle for this city to the map.
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: data[d].lat, lng: data[d].lng },
        radius: Math.sqrt(data[d].deaths) * 1000,
      });
    }
    setData([])
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAzB-eQ-K1UTRT-ZDrqbSLkOXnYraz0efY">
      <div ref={mapElement} className="w-full h-full"></div>
    </LoadScript>
  );
};

export default LatitudeLongitude;
