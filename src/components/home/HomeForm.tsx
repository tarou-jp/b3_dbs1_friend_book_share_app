'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { registerHome } from '../../lib/homes';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/app/context/SnackbarContext';

const HomeForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [building, setBuilding] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const loadMap = (position: { coords: { latitude: number; longitude: number } }) => {
        const { latitude, longitude } = position.coords;
        const map = new window.google.maps.Map(mapRef.current as HTMLElement, {
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

        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setLatitude(lat.toFixed(6));
            setLongitude(lng.toFixed(6));

            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            markerRef.current = new window.google.maps.Marker({
              position: { lat, lng },
              map,
            });
          }
        });
      };

      const handleLocationError = (error: any) => {
        console.error("Error retrieving location:", error);
        const map = new window.google.maps.Map(mapRef.current as HTMLElement, {
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

        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setLatitude(lat.toFixed(6));
            setLongitude(lng.toFixed(6));

            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            markerRef.current = new window.google.maps.Marker({
              position: { lat, lng },
              map,
            });
          }
        });
      };

      navigator.geolocation.getCurrentPosition(loadMap, handleLocationError);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerHome(userId, name, building, roomNumber, latitude, longitude);

    if (result.success) {
      showSnackbar('家の登録に成功しました', 'success');
      router.push('/');
    } else {
      showSnackbar(result.message, 'error');
    }
  };

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              家の登録
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="家の名前"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="building"
                label="建物名"
                name="building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="roomNumber"
                label="部屋番号"
                name="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="latitude"
                label="緯度"
                name="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                disabled
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="longitude"
                label="経度"
                name="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                disabled
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                登録
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <div ref={mapRef} style={{ width: '100%', height: '600px' }}></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeForm;
