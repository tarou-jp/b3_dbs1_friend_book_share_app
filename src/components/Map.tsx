'use client';

import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

declare global {
  interface Window {
    google: any;
  }
}

const Map = ({ userId, homes, selectedHome, setSelectedHome, tooltipOpen, setTooltipOpen }: { userId: string, homes: any[], selectedHome: any, setSelectedHome: (home: any) => void, tooltipOpen: boolean, setTooltipOpen: (open: boolean) => void }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const loadScript = (url: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      if (mapRef.current && window.google) {
        mapInstance.current = new window.google.maps.Map(mapRef.current as HTMLElement, {
          center: { lat: 36.109111676099, lng: 140.10142902583 },
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });
      }
    };

    const loadHomesAndMap = async () => {
      if (typeof window !== 'undefined' && window.google) {
        initializeMap();
      } else {
        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`);
        initializeMap();
      }
    };

    loadHomesAndMap();
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      homes.forEach(home => {
        const marker = new window.google.maps.Marker({
          position: { lat: home.latitude, lng: home.longitude },
          map: mapInstance.current,
          title: home.name,
          icon: {
            url: '/images/book-marker.png',
            scaledSize: new window.google.maps.Size(50, 50)
          }
        });

        marker.addListener('click', () => {
          setSelectedHome(home);
          setTooltipOpen(true);
        });

        markersRef.current.push(marker);
      });
    }
  }, [homes]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      </Box>
    </Box>
  );
};

export default Map;
