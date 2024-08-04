'use client';

import React, { useState } from 'react';
import { Box, IconButton, Typography, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorrowRequestForm from './BorrowRequestForm';

const HomeTooltip = ({ home, userId, onClose }: { home: any, userId: string, onClose: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleOpenModal = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  const iconButtonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.15)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 16,
        top: 16,
        maxHeight: '80vh',
        overflowY: 'auto',
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.8)',
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.15)',
        p: 2,
        zIndex: 1200,
      }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, ...iconButtonStyle }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h6">{home.name}</Typography>
      {home.books && home.books.length > 0 ? (
        <Box mt={2}>
          <Typography variant="subtitle1">所有本の一覧:</Typography>
          <ul>
            {home.books.map((book: any) => (
              <li key={book._id}>
                {book.title}
                {book.status === 'available' && home.userId !== userId && (
                  <Button onClick={() => handleOpenModal(book._id)} sx={{ ml: 2 }}>
                    申請する
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Box>
      ) : (
        <Typography mt={2}>本が登録されていません。</Typography>
      )}
      {selectedBookId && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{
            position: 'relative',
            width: '80%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            border: '1px solid #ddd',
            borderRadius: 2,
            p: 4,
            boxShadow: 3,
          }}>
            <IconButton onClick={handleCloseModal} sx={iconButtonStyle}>
              <CloseIcon />
            </IconButton>
            <BorrowRequestForm bookId={selectedBookId} userId={userId} onClose={handleCloseModal} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default HomeTooltip;
