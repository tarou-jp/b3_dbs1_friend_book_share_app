import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Modal, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ApprovedBorrowRequestsModal = ({ userId, isOpen, onClose, handleAction, approvedRequests }: { userId: string, isOpen: boolean, onClose: () => void, handleAction: (requestId: string, action: string) => void, approvedRequests: any[] }) => {
  const [filter, setFilter] = useState<'approved' | 'borrowed'>('approved');
  const [filteredRequests, setFilteredRequests] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchFilteredRequests = () => {
        const filtered = approvedRequests.filter((request: any) => request.status === filter);
        setFilteredRequests(filtered);
      };
      fetchFilteredRequests();
    }
  }, [isOpen, filter, approvedRequests]);

  const handleFilterChange = (newFilter: 'approved' | 'borrowed') => {
    setFilter(newFilter);
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
        <Typography variant="h6" gutterBottom>承認済み貸出申請一覧</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            variant={filter === 'approved' ? 'contained' : 'outlined'}
            onClick={() => handleFilterChange('approved')}
          >
            貸出待ち
          </Button>
          <Button
            variant={filter === 'borrowed' ? 'contained' : 'outlined'}
            onClick={() => handleFilterChange('borrowed')}
          >
            返却待ち
          </Button>
        </Box>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <Card key={request._id} sx={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="subtitle1">本: {request.bookTitle}</Typography>
                <Typography variant="body2">申請日: {new Date(request.requestDate).toLocaleDateString()}</Typography>
                <Typography variant="body2">貸し出し開始日: {new Date(request.startDate).toLocaleDateString()}</Typography>
                <Typography variant="body2">返却期限: {new Date(request.endDate).toLocaleDateString()}</Typography>
              </CardContent>
              <CardActions>
                {request.status === 'approved' && (
                  <Button onClick={() => handleAction(request._id, 'borrowed')} variant="contained" color="primary" sx={{ marginRight: '8px' }}>
                    貸出済み
                  </Button>
                )}
                {request.status === 'borrowed' && (
                  <Button onClick={() => handleAction(request._id, 'returned')} variant="contained" color="secondary">
                    返却済み
                  </Button>
                )}
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>現在申請はありません。</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ApprovedBorrowRequestsModal;
