import { useState, useEffect } from 'react';
import { roomApi } from '../api/roomApi';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await roomApi.getAllRooms();
      setRooms(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const getRoomById = async (roomId) => {
    try {
      setLoading(true);
      setError(null);
      
      const room = await roomApi.getRoomById(roomId);
      return room;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch room');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRoomAvailability = async (roomId, date) => {
    try {
      const availability = await roomApi.getRoomAvailability(roomId, date);
      return availability;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch availability');
      throw err;
    }
  };

  return { 
    rooms, 
    loading, 
    error, 
    fetchRooms, 
    getRoomById, 
    getRoomAvailability 
  };
};
