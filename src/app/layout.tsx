'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SnackbarProvider } from './context/SnackbarContext';
import Sidebar from '@/components/Sidebar';
import { fetchUserId } from '@/lib/auth';
import Head from 'next/head';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authenticate = async () => {
      const userId = await fetchUserId();
      if (userId) {
        try {
          const response = await fetch(`/api/users/${userId}`);
          const data = await response.json();
          if (data.user.name) {
            setUserName(data.user.name);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      } else {
        if (!pathname.includes('/login') && !pathname.includes('/register')) {
          router.push('/login');
        }
      }
      setLoading(false);
    };

    authenticate();
  }, [router, pathname]);

  if (loading) {
    return (
      <html lang="jp">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>My App</title>
        </Head>
        <body>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        </body>
      </html>
    );
  }

  const showSidebar = isAuthenticated && !pathname.includes('/login') && !pathname.includes('/register');

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
      </Head>
      <body suppressHydrationWarning>
        <SnackbarProvider>
          <div style={{ display: 'flex' }}>
            {showSidebar && <Sidebar userName={userName || 'Loading...'} />}
            <div style={{ flexGrow: 1 }}>
              {children}
            </div>
          </div>
        </SnackbarProvider>
      </body>
    </html>
  );
}
