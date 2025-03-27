import { useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import { useCoordinates } from '../hooks/useCoordinates'
import { FeatureCollection } from 'geojson'

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { data, isLoading } = useCoordinates();
  const [filters, setFilters] = useState({
    Park: true,
    Venue: true,
    Bar: true
  });

  const coordinates = data?.data;

  useEffect(() => {
    if (!mapContainerRef.current || !data) return;

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGl0IiwiYSI6ImNtNDh4NTZ0ejAzdGwya3I0bTdyOTN2M20ifQ.hBYyrFeul8dqmd8v8IYIyQ';
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.154007, 41.390205],
      zoom: 12
    });

    mapRef.current = map;

    map.on('load', () => {
      if (!Array.isArray(coordinates)) {
        console.error('Coordinates is not an array:', coordinates);
        return;
      }

      const eventsGeoJSON: FeatureCollection = {
        type: "FeatureCollection",
        features: coordinates.map(coord => ({
          type: "Feature",
          geometry: coord.geometry,
          properties: {
            ...coord.properties,
            locationType: coord.type // Add type for filtering
          }
        }))
      };

      map.addSource('venues', {
        type: 'geojson',
        data: eventsGeoJSON
      });

      map.addLayer({
        id: 'venues-layer',
        type: 'symbol',
        source: 'venues',
        layout: {
          'icon-image': 'marker-15',
          'icon-size': 1.5,
          'icon-allow-overlap': true,
          'text-field': ['get', 'title'],
          'text-offset': [0, 1.5],
          'text-anchor': 'top',
          'visibility': 'visible'
        }
      });

      // To make sure no points appear if no filters are enabled
      const enabledTypes = Object.entries(filters)
      .filter(([, enabled]) => enabled)
      .map(([type]) => type)

      if (enabledTypes.length === 0) {
        map.setFilter('venues-layer', ['==', 'locationType', 'none']);
        return;
      }

      // Update filter when filters change
      const filterLocations = () => {
        const enabledTypes = Object.entries(filters)
          .filter(([, enabled]) => enabled)
          .map(([type]) => type);

        // Correct filter syntax: ['in', property_name, value1, value2, ...]
        map.setFilter('venues-layer', [
          'match',
          ['get', 'locationType'],
          enabledTypes,
          true,
          false
        ]);
      };

      // Initial filter
      filterLocations();

      // Update filter when filters change
      Object.keys(filters).forEach(type => {
        if (filters[type as keyof typeof filters] !== undefined) {
          filterLocations();
        }
      });
    });

    return () => {
        mapRef.current?.remove();
    };
  }, [coordinates, data, filters]);

  const toggleFilter = (type: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (isLoading) return <div>Loading map...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className='absolute  w-full' style={{height: "calc(100vh - 64px)"}}> {/* 64px navbar */}
      <div className='absolute top-2 right-2 z-10 bg-gray-50 border border-black py-3 px-4 rounded-lg shadow-lg'>
        {Object.entries(filters).map(([type, enabled]) => (
          <div key={type} className='flex items-center'>
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => toggleFilter(type as keyof typeof filters)}
              className='mr-2'
            />
            <span>{`${type}s`}</span>
          </div>
        ))}
      </div>
      <div className='h-full w-full bg-gray-200' ref={mapContainerRef}></div>
    </div>
  );
};

export default Map;