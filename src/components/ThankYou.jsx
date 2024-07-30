import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/ThankYou.css';

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { car, response, bookingId } = location.state || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000); // Redirect after 5 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [navigate]);

    return (
        <div className="container thank-you-container">
            <h2>Thank You for Your Payment!</h2>
            <div className="payment-details">
                <p>Your payment was successful.</p>
                <p><strong>Booking ID:</strong> {bookingId}</p>
                <p><strong>Car:</strong> {car?.title}</p>
                <p><strong>Payment ID:</strong> {response?.razorpay_payment_id}</p>
                <p><strong>Order ID:</strong> {response?.razorpay_order_id}</p>
                <p><strong>Transaction ID:</strong> {response?.razorpay_signature}</p>
            </div>
            <div className="redirect-message">
                <p>You will be redirected to the homepage in 5 seconds...</p>
            </div>
        </div>
    );
};

export default ThankYou;
