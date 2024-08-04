'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientHomePage from '@/components/ClientHomePage';
import { fetchUserId } from '@/lib/auth';
import { CircularProgress, Box } from '@mui/material';

const HomePage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const userId = await fetchUserId();
      if (userId) {
        setUserId(userId);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userId) {
    return null;
  }

  return <ClientHomePage userId={userId} />;
};

export default HomePage;
