import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

interface LoanAndBorrowListProps {
  loans: any[];
  borrows: any[];
}

const LoanAndBorrowList: React.FC<LoanAndBorrowListProps> = ({ loans, borrows }) => {
  const [showAllLoans, setShowAllLoans] = useState(false);
  const [showAllBorrows, setShowAllBorrows] = useState(false);

  const displayLoans = showAllLoans ? loans : loans.slice(0, 1);
  const displayBorrows = showAllBorrows ? borrows : borrows.slice(0, 1);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>借りている本</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: showAllLoans ? 'none' : '200px', overflowY: showAllLoans ? 'auto' : 'hidden', padding: '8px 0' }}>
          {displayLoans.length > 0 ? (
            displayLoans.map((loan) => (
              <Card key={loan._id} sx={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontSize: '0.875rem' }}>本: {loan.bookTitle}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>期限: {new Date(loan.endDate).toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ fontSize: '0.875rem' }}>現在借りている本はありません。</Typography>
          )}
        </Box>
        {loans.length > 1 && (
          <Button onClick={() => setShowAllLoans(!showAllLoans)}>
            {showAllLoans ? '閉じる' : 'もっと見る'}
          </Button>
        )}
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>貸出中の本</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: showAllBorrows ? 'none' : '200px', overflowY: showAllBorrows ? 'auto' : 'hidden', padding: '8px 0' }}>
          {displayBorrows.length > 0 ? (
            displayBorrows.map((borrow) => (
              <Card key={borrow._id} sx={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontSize: '0.875rem' }}>本: {borrow.bookTitle}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>期限: {new Date(borrow.endDate).toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ fontSize: '0.875rem' }}>現在貸出中の本はありません。</Typography>
          )}
        </Box>
        {borrows.length > 1 && (
          <Button onClick={() => setShowAllBorrows(!showAllBorrows)}>
            {showAllBorrows ? '閉じる' : 'もっと見る'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default LoanAndBorrowList;
