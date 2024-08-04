import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Modal, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BorrowRequestsListModal = ({ userId, isOpen, onClose, handleAction, requests }: { userId: string, isOpen: boolean, onClose: () => void, handleAction: (requestId: string, action: string) => void, requests: any[] }) => {
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
        <Typography variant="h6" gutterBottom>貸出申請一覧</Typography>
        {requests.length > 0 ? (
          requests.map((request) => (
            <Card key={request._id} sx={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="subtitle1">本: {request.bookTitle}</Typography>
                <Typography variant="body2">申請日: {new Date(request.requestDate).toLocaleDateString()}</Typography>
                <Typography variant="body2">貸し出し開始日: {new Date(request.startDate).toLocaleDateString()}</Typography>
                <Typography variant="body2">返却期限: {new Date(request.endDate).toLocaleDateString()}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-start' }}>
                <Button onClick={() => handleAction(request._id, 'approve')} variant="contained" color="primary" >
                  承認
                </Button>
                <Button onClick={() => handleAction(request._id, 'reject')} variant="contained" color="secondary">
                  拒否
                </Button>
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

export default BorrowRequestsListModal;
