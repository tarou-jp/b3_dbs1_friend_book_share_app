'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, TextField, Button, Link, Grid } from '@mui/material';
import { useSnackbar } from '@/app/context/SnackbarContext';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      const token = localStorage.getItem('token');
      showSnackbar('ログイン成功', 'success');
      router.push('/');
    } else {
      const data = await res.json();
      showSnackbar(data.message, 'error');
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
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="ユーザーネーム"
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
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"アカウントを作成する"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
