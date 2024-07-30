import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Home from './components/Home';
import CarList from './components/CarList';
import Payment from "./components/Payment";
import MyBooking from "./components/MyBooking";
import HostLogin from "./hoterComponents/HosterLogin";
import HosterRegister from './hoterComponents/HosterRegister';
import VehicleManagement  from './hoterComponents/VehicleManagement'
import HosterBookings from './hoterComponents/HosterBookings'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/hoster_login",
    element: <HostLogin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/car-list",
    element: <CarList />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/my-booking",
    element: <MyBooking />,
  },
  {
    path: "/hoster_register",
    element: <HosterRegister />,
  },
  {
    path: "/vehicle-management",
    element: <VehicleManagement />,
  },
  {
    path: '/hoster_bookings',
    element: <HosterBookings />
  }
  
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
