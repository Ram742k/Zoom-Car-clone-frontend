
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';


import { HosterContext } from '../context/HosterContext';

const HosterBookings = () => {
    const { bookings, fetchBookings,logout } = useContext(HosterContext);
    // useEffect(() => {
    //     fetchBookings();
    // }, [fetchBookings]);

    const handleLogout = () => {
        logout();
        navigate('/hoster_login');
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-dark">
                    <Link className="navbar-brand" to="/vehicle-management">
                    
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        <Link to="/vehicle-management">
                            <li className="nav-item">
                                <button className="nav-link text-white active" aria-current="page" >Home</button>
                            </li>
                          </Link>
                            <li className="nav-item">
                                <button className="nav-link text-white active" aria-current="page" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
            </nav>
        <h2>My Bookings</h2>
        {bookings.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>User</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.car}</td>
                            <td>{booking.user}</td>
                            <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                            <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                            <td>{booking.amount}</td>
                            <td>
                                    {booking.paymentStatus === 'pending' ? 'not paid' : 'paid'}
                                </td>

                            

                            

                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No bookings found</p>
        )}
    </div>
    );
};

export default HosterBookings;
