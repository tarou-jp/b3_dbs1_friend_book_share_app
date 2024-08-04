import { getDB } from './db';
import { ObjectId } from 'mongodb';

export const fetchHomes = async () => {
  const res = await fetch('/api/homes');
  if (!res.ok) {
    throw new Error(`Error fetching homes: ${res.statusText}`);
  }
  return await res.json();
};

export const fetchBooksByHomeId = async (homeId: string) => {
  const res = await fetch(`/api/homes/${homeId}/books`);
  if (!res.ok) {
    throw new Error(`Error fetching books by home ID: ${res.statusText}`);
  }
  return await res.json();
};

export const registerHome = async (userId: string, name: string, building: string, roomNumber: string, latitude: string, longitude: string) => {
  const res = await fetch('/api/homes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, name, building, roomNumber, latitude, longitude }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to register home');
  }

  return await res.json();
};

export const fetchUserHomes = async (userId: string) => {
  const res = await fetch(`/api/homes/user/${userId}`);
  if (!res.ok) {
    throw new Error(`Error fetching homes: ${res.statusText}`);
  }
  return await res.json();
};
