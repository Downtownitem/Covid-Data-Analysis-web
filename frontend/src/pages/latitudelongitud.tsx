import React, { useState } from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

interface CountryData {
  region: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '100vh', // Ocupa el 100% de la altura de la ventana
};

const exampleData: CountryData[] = [
  { region: 'USA', confirmed: 100000, deaths: 5000, recovered: 80000, lat: 37.0902, lng: -95.7129 },
  { region: 'Brazil', confirmed: 90000, deaths: 4000, recovered: 75000, lat: -14.235, lng: -51.9253 },
  { region: 'India', confirmed: 80000, deaths: 3000, recovered: 70000, lat: 20.5937, lng: 78.9629 },
  // Agrega más países aquí con sus datos y coordenadas
];

const LatitudeLongitude: React.FC = () => {
  const [data] = useState(exampleData);

  const circleOptions = (deaths: number) => ({
    fillColor: `rgb(255, 0, 0)`,
    strokeColor: 'red',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillOpacity: 0.4,
  });

  return (
    <LoadScript googleMapsApiKey="AIzaSyAzB-eQ-K1UTRT-ZDrqbSLkOXnYraz0efY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
      >
        {data.map((country, index) => (
          <Circle
            key={index}
            center={{ lat: country.lat, lng: country.lng }}
            radius={Math.sqrt(country.confirmed) * 100} // Ajusta el tamaño del círculo según los casos confirmados
            options={circleOptions(country.deaths)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default LatitudeLongitude;