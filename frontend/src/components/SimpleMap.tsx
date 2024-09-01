import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Task {
  id: number;
  titlu: string;
  continut: string;
  coordonate?: {
    lat: number;
    lng: number;
  };
}

interface SimpleMapProps {
  tasks: Task[];
}

const SimpleMap: React.FC<SimpleMapProps> = ({ tasks }) => {
  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      ref={mapRef}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {tasks.map((task) =>
        task.coordonate ? (
          <Marker key={task.id} position={[task.coordonate.lat, task.coordonate.lng]}>
            <Popup>
              <strong>{task.titlu}</strong>
              <br />
              {task.continut}
            </Popup>
          </Marker>
        ) : null,
      )}
    </MapContainer>
  );
};

export default SimpleMap;
