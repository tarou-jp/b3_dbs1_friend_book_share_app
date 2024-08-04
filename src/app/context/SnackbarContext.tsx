import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface SnackbarContextType {
  showSnackbar: (message: string, status: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{ message: string; status: AlertColor; open: boolean }>({
    message: '',
    status: 'success',
    open: false,
  });

  const showSnackbar = (message: string, status: AlertColor) => {
    setSnackbar({ message, status, open: true });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.status} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
