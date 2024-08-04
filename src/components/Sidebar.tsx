'use client';

import React from 'react';
import { List, ListItem, ListItemText, Drawer, Typography, Box, ListItemIcon, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = ({ userName }: { userName: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    router.push('/login');
  };

  const menuItems = [
    { text: 'Top', path: '/', icon: <HomeIcon /> },
    { text: 'Book', path: '/book', icon: <BookIcon /> },
    { text: 'Home', path: '/home', icon: <AddHomeIcon /> }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#424242', // 灰色ベースの背景色
          color: '#FFFFFF' // 白色のテキスト
        },
      }}
    >
      <Box sx={{ textAlign: 'center', mt: 2, color: '#FFFFFF' }}>
        <Typography variant="h6" noWrap>
          {userName}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: '#616161' }} /> {/* 薄灰色のディバイダー */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              backgroundColor: pathname === item.path ? 'rgba(255, 255, 255, 0.08)' : 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#FFFFFF' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#f44336', 
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
          }}
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
