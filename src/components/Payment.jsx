// Payment.jsx
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Payment.css';
import { AuthContext } from '../context/AuthContext';
const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state: userState } = useContext(AuthContext); // Access the user state from AuthContext
    const { user,createOrder } = useContext(AuthContext); // Ensure this value is not null
    
    const car = location.state?.car;
    const filterLocation = location.state?.location;
    const dateRange = location.state?.dateRange;
    
    const [startDate, endDate] = dateRange.split(' - ');
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInMilliseconds = end - start;
    
    
    const betweenNoOfHours = differenceInMilliseconds / (1000 * 60 * 60);
   
    const handlePayment = async () => {
        
        // console.log('User:', user);
        // console.log('Car:', car._id);
        // console.log('Filter Location:', filterLocation);
        try {
            const orderResponse = await createOrder({
                amount: car.price * betweenNoOfHours,
                carId: car._id,
                userId: user._id,
                filterLocation,
                dateRange
              });
            
            const { order, bookingId } = orderResponse;


            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: car.title,
                description: 'Booking a car for your travel needs',
                order_id: order.id,
                handler: function (response) {
                    alert('Payment Successful!');
                    console.log(response);
                    navigate('/thank-you', { state: { car, response, bookingId } });
                },
                prefill: {
                    name:  'Guest',
                    email: 'guest@example.com',
                    contact: '9999999999'
                },
                notes: {
                    address: 'Razorpay Corporate Office'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment Error:', error);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div className="container payment-container">
            <h2 className="payment-header">Payment for {car.title}</h2>
            <div className="car-details">
                <p><strong>Car Type:</strong> {car.cartype}</p>
                <p><strong>Fuel Type:</strong> {car.fueltype}</p>
                <p><strong>Location:</strong> {car.location}</p>
                <p><strong>Seats:</strong> {car.seat}</p>
                <p><strong>Transmission:</strong> {car.transmission}</p>
                <p><strong>Total Amount:</strong> ₹{car.price * betweenNoOfHours}</p>
            </div>
            <div className="payment-info">
                <p>Please review the car details and proceed with the payment. You will receive a confirmation email upon successful payment.</p>
                <p>Note: The amount will be deducted from your account once you complete the payment process. Ensure that you have sufficient funds available.</p>
                <button className="btn btn-primary pay-now-button" onClick={handlePayment}>Pay Now</button>
            </div>
            <div className="terms-conditions">
                <h3>Terms and Conditions</h3>
                <ul>
                    <li>All bookings are subject to availability.</li>
                    <li>Payments are non-refundable if the booking is canceled less than 24 hours before the start time.</li>
                    <li>The customer is responsible for any damage to the vehicle during the rental period.</li>
                    <li>Late return charges may apply if the vehicle is not returned on time.</li>
                    <li>Please ensure to carry a valid driver's license and ID proof at the time of vehicle pickup.</li>
                    <li>All payments are processed securely through Razorpay.</li>
                    <li>For any issues or inquiries, please contact our customer support.</li>
                </ul>
            </div>
        </div>
    );
};

export default Payment;
