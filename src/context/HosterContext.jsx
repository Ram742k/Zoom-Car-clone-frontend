import React, { createContext, useReducer, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const HosterContext = createContext();

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  hoster: null,
  vehicles: [],
  loading: false,
  error: null,
};

const hosterReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, hoster: action.payload, loading: false };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return { ...state, error: action.payload, loading: false };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_VEHICLES_SUCCESS':
      return { ...state, vehicles: action.payload, loading: false };
    case 'ADD_VEHICLE_SUCCESS':
      return { ...state, vehicles: [...state.vehicles, action.payload], loading: false };
    case 'UPDATE_VEHICLE_SUCCESS':
      return {
        ...state,
        vehicles: state.vehicles.map((vehicle) =>
          vehicle._id === action.payload._id ? action.payload : vehicle
        ),
        loading: false,
      };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          token: null,
        };
    case 'DELETE_VEHICLE_SUCCESS':
      return {
        ...state,
        vehicles: state.vehicles.filter((vehicle) => vehicle._id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

const HosterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hosterReducer, initialState);
  const token = localStorage.getItem('token');
  const [bookings, setBookings] = useState([]);
    

  const register = async (email, password) => {
    try {
      await axios.post(`${BASE_URL}/hoster/register`, { email, password });
      dispatch({ type: 'REGISTER_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.message });
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/hoster/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
    }
  };
  const fetchBookings =useCallback( async () => {
    try {
        const response = await axios.get(`${BASE_URL}/hoster/bookings`, {
          headers: { Authorization: token }
        });
        setBookings(response.data);
        return response.data;
        
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
},[token]);
useEffect(() => {
  if (token) {
      fetchBookings();
  }
}, [token, fetchBookings]);

  const fetchVehicles = async () => {
    console.log(token)
    try {
      const res = await axios.get(`${BASE_URL}/vehicles`, {
         headers: { Authorization: token }
      });
      dispatch({ type: 'FETCH_VEHICLES_SUCCESS', payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  const addVehicle = async (vehicle) => {
    try {
      const res = await axios.post(`${BASE_URL}/vehicles`, vehicle, {
        headers: { Authorization: token }
      });
      dispatch({ type: 'ADD_VEHICLE_SUCCESS', payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateVehicle = async (id, vehicle) => {
    try {
      const res = await axios.put(`${BASE_URL}/vehicles/${id}`, vehicle, {
        headers: { Authorization: token }
      });
      dispatch({ type: 'UPDATE_VEHICLE_SUCCESS', payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/vehicles/${id}`, {
        headers: { Authorization: token }
      });
      dispatch({ type: 'DELETE_VEHICLE_SUCCESS', payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HosterContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        fetchVehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        bookings, fetchBookings 
      }}
    >
      {children}
    </HosterContext.Provider>
  );
};

export { HosterContext, HosterProvider };
