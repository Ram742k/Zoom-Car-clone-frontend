// src/context/VehicleContext.js
import React, { createContext, useReducer, useContext, useState, useEffect  } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VehicleContext = createContext();

const initialState = {
    vehicles: [],
    availableVehicles: [],
    vehicle: null,
    loading: true,
    error: null,
    user: null,
    token: localStorage.getItem('token') || null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_VEHICLES':
            return {
                ...state,
                vehicles: action.payload,
                loading: false,
            };
        case 'GET_VEHICLE':
            return {
                ...state,
                vehicle: action.payload,
                loading: false,
            };
        case 'SET_AVAILABLE_VEHICLES':
            return {
                ...state,
                availableVehicles: action.payload,
                loading: false,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

const VehicleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (state.token) {
          axios.get(`${BASE_URL}/users/profile`, {
            headers: { Authorization: state.token }
          })
          .then(response => {
            dispatch({ type: 'SET_USER', payload: response.data });
          })
          .catch(() => {
            dispatch({ type: 'LOGOUT' });
          });
        }
      }, [state.token]);
      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          axios.get(`${BASE_URL}/users/profile`, {
            headers: { Authorization: token }
          })
          .then(response => setUser(response.data))
          .catch(() => setUser(null));
        }
      }, [state.token]);
    
    const fetchVehicles = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/vehicles`, {
                headers: { Authorization:state.token },
                withCredentials: true
            });
            dispatch({ type: 'GET_VEHICLES', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const filterAvailableVehicles = async ({ location, dateRange }) => {
        try {
            console.log(location, dateRange);
            const [startDate, endDate] = dateRange.split(' - ');
            const response = await axios.get(`${BASE_URL}/vehicles/available`, {
                headers: { Authorization:state.token },
                params: {
                    location,
                    startDate,
                    endDate,
                },
                withCredentials: true
            });
            
            
            dispatch({ type: 'SET_AVAILABLE_VEHICLES', payload: response.data });
            console.log(response.data);
            return {
                location,
                dateRange,
                vehicles: response.data
            };
        } catch (error) {
            console.error('Error fetching available vehicles:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
        // Optionally return an empty result or rethrow the error
        return {
            location,
            dateRange,
            vehicles: [] // Return an empty array in case of an error
        };
        }
    };
    const checkBooking = async (carId, startDate, endDate) => {
        try {
            
          const response = await axios.get(`${BASE_URL}/vehicles/check-booking`, {
            headers: { Authorization:state.token },
            params: { carId, startDate, endDate }
          });
          return response.data.isBooked;
        } catch (error) {
          console.error('Error checking booking:', error);
          throw new Error('Failed to check booking');
        }
      };
      
    

    return (
        <VehicleContext.Provider value={{ ...state, fetchVehicles, filterAvailableVehicles,checkBooking }}>
            {children}
        </VehicleContext.Provider>
    );
};

const useVehicle = () => {
    const context = useContext(VehicleContext);
    if (context === undefined) {
        throw new Error('useVehicle must be used within a VehicleProvider');
    }
    return context;
};

export { VehicleProvider, VehicleContext, useVehicle };
