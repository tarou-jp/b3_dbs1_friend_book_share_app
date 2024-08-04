export const fetchUserId = async (): Promise<string | null> => {
  try {
    const res = await fetch('/api/verify-token', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      return data.userId;
    } else {
      console.error('Failed to verify token:', res.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
