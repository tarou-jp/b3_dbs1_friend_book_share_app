export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    registered_books: string[];
    borrowed_books: string[];
  }
  
  export interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    owner_id: string;
    available: boolean;
    borrower_id: string | null;
    borrow_requests: string[];
  }
  
  export interface Request {
    _id: string;
    book_id: string;
    requester_id: string;
    owner_id: string;
    status: string; // 'pending', 'accepted', 'declined', 'returned'
    request_date: string;
    return_date: string | null;
  }
  
  export interface Notification {
    _id: string;
    user_id: string;
    type: string; // 'request', 'reminder', 'message'
    message: string;
    read: boolean;
    date: string;
  }
  