import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    });

    const draw = new MapboxDraw();
    map.current.addControl(draw);

    map.current.on('draw.create', (e) => {
      console.log('Shape created:', e.features[0]);
    });

    map.current.on('draw.update', (e) => {
      console.log('Shape updated:', e.features[0]);
    });
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
