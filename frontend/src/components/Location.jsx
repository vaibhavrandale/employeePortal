import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Location = () => {
  const [coordinates1, setCoordinates1] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [coordinates2, setCoordinates2] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [coordinates3, setCoordinates3] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set values for punch 1
          setCoordinates1({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          // Set values for punch 2
          setCoordinates2({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          // Set values for punch 3 (with slight adjustments)
          setCoordinates3({
            latitude: position.coords.latitude + 0.001,
            longitude: position.coords.longitude + 0.001,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container">
      <button onClick={handleButtonClick}>Capture Coordinates</button>

      <div>
        <p>
          Punch 1:{' '}
          {`Latitude: ${coordinates1.latitude}, Longitude: ${coordinates1.longitude}`}
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${coordinates1.latitude},${coordinates1.longitude}`}
          >
            Check
          </Link>
        </p>
        <p>
          Punch 2:{' '}
          {`Latitude: ${coordinates2.latitude}, Longitude: ${coordinates2.longitude}`}
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${coordinates2.latitude},${coordinates2.longitude}`}
          >
            Check
          </Link>
        </p>
        <p>
          Punch 3:{' '}
          {`Latitude: ${coordinates3.latitude}, Longitude: ${coordinates3.longitude}`}
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${coordinates3.latitude},${coordinates3.longitude}`}
          >
            Check
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Location;
