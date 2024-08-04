'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useSnackbar } from '@/app/context/SnackbarContext';
import { createBorrowRequest } from '@/lib/borrowRequests';

const BorrowRequestForm = ({ bookId, userId, onClose }: { bookId: string, userId: string, onClose: () => void }) => {
  const { showSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBorrowRequest(userId, bookId, startDate, endDate);
      showSnackbar('貸し出し申請に成功しました', 'success');
      onClose();
    } catch (error: any) {
      showSnackbar(error.message, 'error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6">貸し出し申請</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="貸し出し開始日"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="返却期限"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          申請
        </Button>
      </Box>
    </Box>
  );
};

export default BorrowRequestForm;
