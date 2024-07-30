
import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { authReducer, initialState } from './authReducer';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      axios.get(`${BASE_URL}/users/profile`, {
        headers: { Authorization: token }
      })
      .then(response => {
        setUser(response.data);
        dispatch({ type: 'SET_USER', payload: response.data });
      })
      .catch(() => {
        dispatch({ type: 'LOGOUT' });
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('Please enter all fields');
      }
      const response = await axios.post(`${BASE_URL}/users/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: 'LOGIN',
        payload: { user: response.data.user, token: response.data.token },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (name, email, password) => {
    try {
      await axios.post(`${BASE_URL}/register`, { name, email, password });
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async (name) => {
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/users/profile`, { name }, {
        headers: { Authorization: state.token },
      });
      setUser(prevUser => ({ ...prevUser, name }));
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const setProfilePicture = async (formData) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/profile/picture`, formData, {
        headers: {
          Authorization: state.token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(prevUser => ({ ...prevUser, picture: response.data.picture }));
    } catch (error) {
      console.error('Failed to update profile picture:', error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${BASE_URL}/users/profile`, {
        headers: { Authorization: state.token }
      });
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  const getMyBookings = async () => {
    try {
      const userId = state.user._id;
      const response = await axios.get(`${BASE_URL}/bookings/bookings/${userId}`, {
        headers: { Authorization: state.token }
      });
      const bookingsWithCarDetails = await Promise.all(
        response.data.map(async booking => {
          const carResponse = await axios.get(`${BASE_URL}/vehicles/${booking.car}`, {
            headers: { Authorization: state.token }
          });
          return { ...booking, carName: carResponse.data.title };
        })
      );
      return bookingsWithCarDetails;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.post(`${BASE_URL}/cancel-booking/${bookingId}`, {}, {
        headers: { Authorization: state.token }
      });
      dispatch({ type: 'CANCEL_BOOKING', payload: bookingId });
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const createOrder = async ({ amount, carId, userId, filterLocation, dateRange }) => {
    try {
      const response = await axios.post(`${BASE_URL}/bookings/create-order`, {
        amount,
        car: carId,
        userId,
        filterLocation,
        dateRange
      }, { headers: { Authorization: state.token } });
      return response.data;
    } catch (error) {
      console.error('Order creation error:', error);
      throw new Error('Failed to create order');
    }
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      login,
      logout,
      register,
      updateProfile,
      setProfilePicture,
      deleteUser,
      getMyBookings,
      cancelBooking,
      createOrder,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
