'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, TextField, Button, Link, Grid } from '@mui/material';
import { useSnackbar } from '@/app/context/SnackbarContext';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    if (res.ok) {
      showSnackbar('アカウント作成に成功しました', 'success');
      router.push('/login');
    } else {
      const errorData = await res.json();
      showSnackbar(errorData.message, 'error');
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
          アカウント作成
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            アカウント作成
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"すでにアカウントをお持ちですか？ ログイン"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
