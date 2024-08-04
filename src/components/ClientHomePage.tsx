'use client';

import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { fetchBorrowRequests, updateBorrowRequest } from '@/lib/borrowRequests';
import { fetchHomes } from '@/lib/homes';

const ClientHomePage = ({ userId }: { userId: string }) => {
  const [loans, setLoans] = useState<any[]>([]);
  const [borrows, setBorrows] = useState<any[]>([]);
  const [homes, setHomes] = useState<any[]>([]);
  const [selectedHome, setSelectedHome] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [approvedRequests, setApprovedRequests] = useState<any[]>([]);

  const [isRequestsListOpen, setIsRequestsListOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isApprovedRequestsOpen, setIsApprovedRequestsOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const fetchLoansAndBorrows = async () => {
    try {
      const loansData = await fetchBorrowRequests(userId, 'results');
      const borrowsData = await fetchBorrowRequests(userId, 'requests');
      setLoans(loansData.borrowRequests.filter((req: any) => req.status === 'borrowed'));
      setBorrows(borrowsData.borrowRequests.filter((req: any) => req.status === 'borrowed'));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchHomesData = async () => {
    try {
      const data = await fetchHomes();
      setHomes(data.homes || []);
    } catch (error) {
      console.error('Error fetching homes:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const requestsData = await fetchBorrowRequests(userId, 'requests');
      const pendingRequests = requestsData.borrowRequests.filter((request: any) => request.status === 'pending');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const resultsData = await fetchBorrowRequests(userId, 'results');
      setResults(resultsData.borrowRequests || []);
      setFilteredResults(resultsData.borrowRequests || []);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const fetchApprovedRequests = async () => {
    try {
      const approvedData = await fetchBorrowRequests(userId, 'approved');
      const borrowedData = await fetchBorrowRequests(userId, 'borrowed');
      const allRequests = [...approvedData.borrowRequests, ...borrowedData.borrowRequests];
      const uniqueRequests = Array.from(new Set(allRequests.map(request => request._id))).map(id => {
        return allRequests.find(request => request._id === id);
      });
      setApprovedRequests(uniqueRequests || []);
    } catch (error) {
      console.error('Error fetching approved requests:', error);
    }
  };

  const handleAction = async (requestId: string, action: string) => {
    try {
      await updateBorrowRequest(requestId, action);
      await fetchLoansAndBorrows();
      await fetchRequests();
      await fetchResults();
      await fetchApprovedRequests();
    } catch (error) {
      console.error('Error updating borrow request:', error);
    }
  };

  useEffect(() => {
    fetchLoansAndBorrows();
    fetchHomesData();
  }, [userId]);

  return (
    <div style={{ display: 'flex' }}>
      <Dashboard
        userId={userId}
        loans={loans}
        borrows={borrows}
        homes={homes}
        selectedHome={selectedHome}
        setSelectedHome={setSelectedHome}
        isRequestsListOpen={isRequestsListOpen}
        setIsRequestsListOpen={setIsRequestsListOpen}
        isResultsOpen={isResultsOpen}
        setIsResultsOpen={setIsResultsOpen}
        isApprovedRequestsOpen={isApprovedRequestsOpen}
        setIsApprovedRequestsOpen={setIsApprovedRequestsOpen}
        tooltipOpen={tooltipOpen}
        setTooltipOpen={setTooltipOpen}
        handleAction={handleAction}
        fetchLoansAndBorrows={fetchLoansAndBorrows}
        fetchRequests={fetchRequests}
        fetchResults={fetchResults}
        fetchApprovedRequests={fetchApprovedRequests}
        requests={requests}
        results={results}
        filteredResults={filteredResults}
        setFilteredResults={setFilteredResults}
        approvedRequests={approvedRequests}
      />
    </div>
  );
};

export default ClientHomePage;
