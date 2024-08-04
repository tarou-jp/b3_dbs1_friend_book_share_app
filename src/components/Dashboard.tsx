'use client';

import React from 'react';
import { Box, IconButton, Badge } from '@mui/material';
import Map from './Map';
import LoanAndBorrowList from './LoanAndBorrowList';
import ListIcon from '@mui/icons-material/List';
import CheckIcon from '@mui/icons-material/Check';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import BorrowRequestsListModal from './BorrowRequestsListModal';
import BorrowRequestsResultsModal from './BorrowRequestsResultsModal';
import ApprovedBorrowRequestsModal from './ApprovedBorrowRequestsModal';
import HomeTooltip from './HomeTooltip';

const Dashboard = ({
  userId,
  loans,
  borrows,
  homes,
  selectedHome,
  setSelectedHome,
  isRequestsListOpen,
  setIsRequestsListOpen,
  isResultsOpen,
  setIsResultsOpen,
  isApprovedRequestsOpen,
  setIsApprovedRequestsOpen,
  tooltipOpen,
  setTooltipOpen,
  handleAction,
  fetchLoansAndBorrows,
  fetchRequests,
  fetchResults,
  fetchApprovedRequests,
  requests,
  results,
  filteredResults,
  setFilteredResults,
  approvedRequests,
}: {
  userId: string;
  loans: any[];
  borrows: any[];
  homes: any[];
  selectedHome: any;
  setSelectedHome: (home: any) => void;
  isRequestsListOpen: boolean;
  setIsRequestsListOpen: (open: boolean) => void;
  isResultsOpen: boolean;
  setIsResultsOpen: (open: boolean) => void;
  isApprovedRequestsOpen: boolean;
  setIsApprovedRequestsOpen: (open: boolean) => void;
  tooltipOpen: boolean;
  setTooltipOpen: (open: boolean) => void;
  handleAction: (requestId: string, action: string) => void;
  fetchLoansAndBorrows: () => void;
  fetchRequests: () => void;
  fetchResults: () => void;
  fetchApprovedRequests: () => void;
  requests: any[];
  results: any[];
  filteredResults: any[];
  setFilteredResults: (results: any[]) => void;
  approvedRequests: any[];
}) => {
  const iconButtonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.15)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  };

  const loanAndBorrowListContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.15)',
    padding: '16px',
  };

  const pendingRequestsExist = requests.some((request) => request.status === 'pending');
  const approvedRequestsExist = results.some((result) => result.status === 'approved');

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', position: 'relative' }}>
      <Map userId={userId} homes={homes} selectedHome={selectedHome} setSelectedHome={setSelectedHome} tooltipOpen={tooltipOpen} setTooltipOpen={setTooltipOpen} />
      <Box sx={{ position: 'absolute', top: 16, left: 580, transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
        <Badge
          color="error"
          variant="dot"
          invisible={!pendingRequestsExist}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ '.MuiBadge-dot': { top: '-5px', left: '5px' } }}
        >
          <IconButton onClick={() => { setIsRequestsListOpen(true); fetchRequests(); }} sx={iconButtonStyle}>
            <ListIcon />
          </IconButton>
        </Badge>
        <Badge
          color="error"
          variant="dot"
          invisible={!approvedRequestsExist}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ '.MuiBadge-dot': { top: '-5px', left: '5px' } }}
        >
          <IconButton onClick={() => { setIsResultsOpen(true); fetchResults(); }} sx={iconButtonStyle}>
            <AssignmentReturnIcon />
          </IconButton>
        </Badge>
        <IconButton onClick={() => { setIsApprovedRequestsOpen(true); fetchApprovedRequests(); }} sx={iconButtonStyle}>
          <CheckIcon />
        </IconButton>
      </Box>
      <Box sx={{ position: 'absolute', top: 16, left: 16, ...loanAndBorrowListContainerStyle }}>
        <LoanAndBorrowList loans={loans} borrows={borrows} />
      </Box>
      <BorrowRequestsListModal
        userId={userId}
        isOpen={isRequestsListOpen}
        onClose={() => setIsRequestsListOpen(false)}
        handleAction={handleAction}
        requests={requests}
      />
      <BorrowRequestsResultsModal
        userId={userId}
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        results={results}
        filteredResults={filteredResults}
        setFilteredResults={setFilteredResults}
      />
      <ApprovedBorrowRequestsModal
        userId={userId}
        isOpen={isApprovedRequestsOpen}
        onClose={() => setIsApprovedRequestsOpen(false)}
        handleAction={handleAction}
        approvedRequests={approvedRequests}
      />
      {selectedHome && tooltipOpen && (
        <HomeTooltip home={selectedHome} userId={userId} onClose={() => setTooltipOpen(false)} />
      )}
    </Box>
  );
};

export default Dashboard;
