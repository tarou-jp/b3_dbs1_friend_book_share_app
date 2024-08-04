'use client';

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import { fetchUserHomes } from '../../lib/homes';
import { addBook } from '../../lib/books';
import { useSnackbar } from '@/app/context/SnackbarContext';

interface Home {
  _id: string;
  name: string;
  building: string;
  roomNumber: string;
}

const BookForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [title, setTitle] = useState<string>('');
  const [homeId, setHomeId] = useState('');
  const [details, setDetails] = useState('');
  const [homes, setHomes] = useState<Home[]>([]);

  useEffect(() => {
    fetchUserHomes(userId).then((data: any) => setHomes(data.homes || []));
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBook(userId, title, homeId, details);
      showSnackbar('本の登録に成功しました', 'success');
      router.push('/');
    } catch (error: any) {
      showSnackbar(error.message, 'error');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          本の登録
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="タイトル"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="home-label">所有場所</InputLabel>
            <Select
              labelId="home-label"
              id="homeId"
              value={homeId}
              label="所有場所"
              onChange={(e: SelectChangeEvent<string>) => setHomeId(e.target.value as string)}
            >
              {homes.map((home) => (
                <MenuItem key={home._id} value={home._id}>
                  {home.name} - {home.building} {home.roomNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="details"
            label="詳細情報"
            name="details"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
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
    </Container>
  );
};

export default BookForm;
