import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Modal, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BorrowRequestsResultsModal = ({ userId, isOpen, onClose, results, filteredResults, setFilteredResults }: { userId: string, isOpen: boolean, onClose: () => void, results: any[], filteredResults: any[], setFilteredResults: (results: any[]) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFilteredResults(results);
    }
  }, [isOpen, results, setFilteredResults]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredResults(results);
    } else {
      const filtered = results.filter((result: any) => result.bookTitle && result.bookTitle.toLowerCase().includes(query.toLowerCase()));
      setFilteredResults(filtered);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'approved':
        return { backgroundColor: '#d4edda', color: '#155724' };
      case 'rejected':
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      default:
        return { backgroundColor: 'white', color: 'black' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '承認';
      case 'rejected':
        return '拒否';
      case 'borrowed':
        return '貸出中';
      case 'returned':
        return '返却済み';
      default:
        return status;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        maxHeight: '80%',
        bgcolor: 'background.paper',
        p: 4,
        boxShadow: 24,
        borderRadius: 2,
        overflowY: 'auto',
      }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>申請結果</Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="漫画タイトルで検索"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Card
              key={result._id}
              sx={{ ...getStatusStyles(result.status), marginBottom: '16px' }}
            >
              <CardContent>
                <Typography variant="subtitle1">本: {result.bookTitle}</Typography>
                <Typography variant="body2">ステータス: {getStatusText(result.status)}</Typography>
                {result.status === 'approved' && (
                  <Typography variant="body2" color="success.main">書籍を受け取りに向かってください。</Typography>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>現在申請結果はありません。</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default BorrowRequestsResultsModal;
