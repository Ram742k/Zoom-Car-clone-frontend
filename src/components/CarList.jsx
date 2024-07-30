import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import RangeSlider from 'react-bootstrap-range-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { VehicleContext } from '../context/VechicleContext';
import { AuthContext } from '../context/AuthContext';
import logo from "../assets/icons8-menu-24.png";
import "../css/carlist.css"

const CarList = () => {
  const { user } = useContext(AuthContext);
  const { checkBooking } = useContext(VehicleContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicles: allVehicles = [], dateRange, location: filterLocation } = location.state?.availableVehicles || [];
  const [availableVehicles, setAvailableVehicles] = useState(allVehicles);
  const [filters, setFilters] = useState({
    cartype: '',
    fueltype: '',
    location: '',
    priceRange: 10000, 
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
};

  useEffect(() => {
    const filtered = allVehicles.filter(car => {
      const matchesCarType = filters.cartype ? car.cartype.toLowerCase().includes(filters.cartype.toLowerCase()) : true;
      const matchesFuelType = filters.fueltype ? car.fueltype.toLowerCase().includes(filters.fueltype.toLowerCase()) : true;
      const matchesLocation = filters.location ? car.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
      const matchesPrice = car.price <= filters.priceRange;

      return matchesCarType && matchesFuelType && matchesLocation && matchesPrice;
    });
    setAvailableVehicles(filtered);
  }, [filters, allVehicles]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriceRangeChange = (value) => {
    setFilters({
      ...filters,
      priceRange: value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
  };

  const handleBookClick = async (car) => {
    const [startDate, endDate] = dateRange.split(' - ');

    try {
      const isBooked = await checkBooking(car._id, startDate, endDate);

      if (isBooked) {
        alert('This vehicle is already booked for the selected date range. Please choose another vehicle.');
      } else {
        if (user) {
          navigate('/payment', { state: { car, location: filterLocation, dateRange } });
        } else {
          navigate('/login', { state: { from: location.pathname, car, location: filterLocation, dateRange } });
        }
      }
    } catch (error) {
      console.error('Error checking booking:', error);
      alert('An error occurred while checking vehicle availability. Please try again.');
    }
  };

  return (
    <div className='bg-set'>
       <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container">
                    <button
                        className="btn me-2"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasMenu"
                        aria-controls="offcanvasMenu"
                    >
                        <img src={logo} className="img-fluid" alt="menu" />
                    </button>
                    {/* <a className="navbar-brand" href="#"></a> */}
                    <Link className="navbar-brand" to={"/"}></Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto ms-5 navlink mb-2 mb-lg-0">
                            <li className="nav-item d-flex align-items-center">
                            <Link className="nav-link become_host " to="#">Become a Host</Link>
                            </li>
                            
                        </ul>
                        <div className="d-flex">
                            {user ? (
                                <div className="dropdown">
                                    <span
                                        className="nav-link dropdown-toggle"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Welcome, {user.name}
                                    </span>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">Profile</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/my-booking">My Booking</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/cancel-list">Cancel List</Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login/Signup</Link>
                                </li>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-3 sidebar">
            <h4 className='filter_header'>Find Your Perfect Ride!</h4>
            <form onSubmit={handleFilterSubmit}>
              <div className="mb-3">
                <label htmlFor="cartype" className="form-label">Car Type</label>
                <input
                  type="text"
                  id="cartype"
                  name="cartype"
                  className="form-control"
                  value={filters.cartype}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fueltype" className="form-label">Fuel Type</label>
                <input
                  type="text"
                  id="fueltype"
                  name="fueltype"
                  className="form-control"
                  value={filters.fueltype}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="priceRange" className="form-label">Max Price</label>
                <RangeSlider
                  value={filters.priceRange}
                  onChange={(e) => handlePriceRangeChange(e.target.value)}
                  min={0}
                  max={10000}
                  tooltip='auto'
                />
                <div className="d-flex justify-content-between">
                  <span>0</span>
                  <span>{filters.priceRange}</span>
                  <span>10000</span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Apply Filters</button>
            </form>
          </div>

          <div className="col-md-9">
            <h2 className="my-4">Available Cars</h2>
            <div className="row">
              {availableVehicles.length > 0 ? (
                availableVehicles.map(car => (
                  <div key={car._id} className="col-md-4 mb-4 car_card">
                    <Card>
                      <Carousel>
                        {car.images.map((image, index) => (
                          <Carousel.Item key={index}>
                            <img
                              className="d-block w-100"
                              src={image}
                              height={250}
                              alt={`Slide ${index}`}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                      <Card.Body>
                        <Card.Title>{car.title}</Card.Title>
                        <Card.Text>
                          <strong>Car Type:</strong> {car.cartype}<br />
                          <strong>Fuel Type:</strong> {car.fueltype}<br />
                          <strong>KM:</strong> {car.km}<br />
                          <strong>Location:</strong> {car.location}<br />
                          <strong>Price:</strong> ${car.price}<br />
                          <strong>Rating:</strong> {car.rating}<br />
                          <strong>Seats:</strong> {car.seat}<br />
                          <strong>Transmission:</strong> {car.transmission}<br />
                        </Card.Text>
                        <button
                          className="btn btn-success"
                          onClick={() => handleBookClick(car)}
                        >
                          Book
                        </button>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                <p>No cars available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarList;
