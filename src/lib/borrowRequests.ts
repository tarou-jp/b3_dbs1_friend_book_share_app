export const fetchBorrowRequests = async (userId: string, type: string) => {
  const res = await fetch(`/api/borrow-requests/user/${userId}?type=${type}`);
  if (!res.ok) {
    throw new Error(`Error fetching borrow requests: ${res.statusText}`);
  }
  return await res.json();
};

export const updateBorrowRequest = async (requestId: string, action: string) => {
  const res = await fetch(`/api/borrow-requests/${requestId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error updating borrow request');
  }

  return await res.json();
};

export const markBookAsReturned = async (bookId: string, requestId: string) => {
  const res = await fetch(`/api/books/${bookId}/return`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requestId }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error marking book as returned');
  }
  return await res.json();
};

export const createBorrowRequest = async (userId: string, bookId: string, startDate: string, endDate: string) => {
  const res = await fetch('/api/borrow-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, bookId, startDate, endDate }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error creating borrow request');
  }
  return await res.json();
};

