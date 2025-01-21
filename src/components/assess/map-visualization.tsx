'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

interface MapVisualizationProps {
  selectedFactor: string
  zipCode: string
}

const colors = {
  opportunity: '#87A6A8',
  education: '#4A90E2',
  safety: '#50C878',
  resources: '#FFA500',
  income: '#87A6A8'
} as const

export default function MapVisualization({ selectedFactor, zipCode }: MapVisualizationProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-74.006)
  const [lat, setLat] = useState(40.7128)
  const [zoom, setZoom] = useState(12)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Geocode ZIP code to coordinates
  useEffect(() => {
    if (!zipCode) return;

    const geocodeZipCode = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?country=US&types=postcode&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [newLng, newLat] = data.features[0].center;
          setLng(newLng);
          setLat(newLat);

          // If map is already loaded, fly to the new location
          if (map.current && mapLoaded) {
            map.current.flyTo({
              center: [newLng, newLat],
              zoom: 12,
              essential: true
            });
          }
        }
      } catch (error) {
        console.error('Error geocoding ZIP code:', error);
      }
    };

    geocodeZipCode();
  }, [zipCode, mapLoaded]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    map.current.on('move', () => {
      if (!map.current) return;
      setLng(Number(map.current.getCenter().lng.toFixed(4)));
      setLat(Number(map.current.getCenter().lat.toFixed(4)));
      setZoom(Number(map.current.getZoom().toFixed(2)));
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update data visualization when factor changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const layerId = 'data-points';

    try {
      // Remove existing layer and source if they exist
      if (map.current.getLayer(layerId)) {
        map.current.removeLayer(layerId);
      }
      if (map.current.getSource(layerId)) {
        map.current.removeSource(layerId);
      }

      // Add single data point for ZIP code location
      const point = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            },
            properties: {
              description: `${selectedFactor.charAt(0).toUpperCase() + selectedFactor.slice(1)} data for ZIP code ${zipCode}`
            }
          }
        ]
      };

      map.current.addSource(layerId, {
        type: 'geojson',
        data: point as any
      });

      map.current.addLayer({
        id: layerId,
        type: 'circle',
        source: layerId,
        paint: {
          'circle-radius': 10,
          'circle-color': colors[selectedFactor as keyof typeof colors] || '#87A6A8',
          'circle-opacity': 0.8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Add popup on hover
      map.current.on('mouseenter', layerId, () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', layerId, () => {
        map.current!.getCanvas().style.cursor = '';
      });

      map.current.on('click', layerId, (e) => {
        if (!e.features || !e.features[0]) return;
        
        const coordinates = (e.features[0].geometry as any).coordinates.slice();
        const description = e.features[0].properties?.description;
        
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.current!);
      });

    } catch (error) {
      console.error('Error updating map layer:', error);
    }
  }, [selectedFactor, mapLoaded, lng, lat, zipCode]);

  return (
    <div className="relative">
      <div ref={mapContainer} className="h-[500px] w-full rounded-lg" />
      
      {/* Coordinates Display */}
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
        <p className="text-sm text-[#536b6f]">
          ZIP Code: {zipCode}
          <br />
          Showing: {selectedFactor}
          <br />
          Coordinates: {lng.toFixed(4)}, {lat.toFixed(4)}
        </p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
        <h4 className="text-sm font-medium text-[#2c4547] mb-2">Legend</h4>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full" 
               style={{ backgroundColor: colors[selectedFactor as keyof typeof colors] || '#87A6A8' }} 
          />
          <span className="text-sm text-[#536b6f]">{selectedFactor}</span>
        </div>
      </div>
    </div>
  );
}