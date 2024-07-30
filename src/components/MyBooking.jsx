
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../css/MyBookings.css'; 

const MyBookings = () => {
  const {user, getMyBookings, cancelBooking } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getMyBookings();
      setBookings(data);
    };
    
    fetchBookings();
  }, [getMyBookings]);

  const handleCancel = async (bookingId) => {
    await cancelBooking(bookingId);
    
    const updatedBookings = await getMyBookings();
    setBookings(updatedBookings);
  };

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <>
          <p>Total Bookings: {bookings.length}</p>
          <p>Total Amount: ${bookings.reduce((acc, booking) => acc + booking.amount, 0).toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>Amount</th>
                <th>Location</th>
                
                <th>startDate</th>
                <th>endDate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.carName}</td>
                  <td>${booking.amount.toLocaleString()}</td>
                  <td>{booking.filterLocation}</td>
                  <td>{new Date(booking.startDate).toLocaleString()}</td>
                  <td>{new Date(booking.endDate).toLocaleString()}</td>
                  
                  <td>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MyBookings;
    