export const addBook = async (userId: string, title: string, homeId: string, details: string) => {
  const res = await fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, title, homeId, details }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error adding book');
  }

  return await res.json();
};
