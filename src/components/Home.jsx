import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "../css/home.css";
import logo from "../assets/icons8-menu-24.png";
import article1 from "../assets/article-1.png";
import location from "../assets/location.png";
import deposit from "../assets/deposit.png";
import zoomaway from "../assets/zoomaway.png";
import LocationSearch from './LocationSearh';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container">
                    <button
                        className="btn"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasMenu"
                        aria-controls="offcanvasMenu"
                    >
                        <img src={logo} className="img-fluid" alt="menu" />
                    </button>
                    <a className="navbar-brand" href="#"></a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                       <img src={logo} className="img-fluid" alt="menu" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ms-5 navlink mb-2 mb-lg-0">
                            <li className="nav-item d-flex align-items-center">
                            <Link className="nav-link become_host " target='_blank' to="/hoster_login">Become a Host</Link>
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
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <li className="nav-item list-unstyled">
                                    <Link className="nav-link" to="/login">Login/Signup</Link>
                                </li>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="nav-scroller shadow-sm">
                <nav className="nav" aria-label="Secondary navigation">
                    <a className="nav-link active" aria-current="page" href="#">
                        Zoomcar goes public on Nasdaq, now trading under the ticker symbol "ZCAR". Know more.
                    </a>
                </nav>
            </div>

            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasMenu"
                aria-labelledby="offcanvasMenuLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Become a Host</Link>
                        </li>
                      
                    </ul>
                </div>
            </div>

            <div className="hero d-flex flex-column justify-content-center align-items-center">
                <div className="hero__content ">
                    <h1>Get 20% off on self-drive car rentals in India</h1>
                    <p>Book your drive now!</p>
                </div>
                <LocationSearch />
            </div>
            <div className="host-counter">
                <div className="host-counter-container">
                    <div className="host-counter-ele">
                        <h2 className="host-counter-ele-number">25,000+</h2>
                        <p>Verified Cars</p>
                    </div>
                    <div className="host-counter-ele">
                        <h2 className="host-counter-ele-number">20,000+</h2>
                        <p>Trusted Hosts</p>
                    </div>
                    <div className="host-counter-ele">
                        <h2 className="host-counter-ele-number">2 Billion+</h2>
                        <p>KMs Driven</p>
                    </div>
                    <div className="host-counter-ele">
                        <h2 className="host-counter-ele-number">38+ Cities</h2>
                        <p>And Counting..</p>
                    </div>
                    <div className="host-counter-ele">
                        <h2 className="host-counter-ele-number">20+ Airports</h2>
                        <p>Live On Zoomcar platform</p>
                    </div>
                </div>
            </div>
            <div className="px-4 py-5 text-center bg-light">
                <h2 className="feature1">HOW TO RENT A CAR IN MADURAI WITH ZOOMCAR?</h2>
                <article className="host-share-earn-steps-blocks">
                    <article className="host-share-earn-steps-blocks-block">
                        <div className="host-share-earn-steps-blocks-block-image-container">
                            <img src={article1} alt="Step 1" />
                        </div>
                        <article className="host-share-earn-steps-blocks-block-content">
                            <div className="host-share-earn-steps-blocks-block-content-title">
                                <p className="text-center">Log onto
                                    <a href="https://zoomcar.com/">zoomcar.com</a>
                                    or use the app
                                </p>
                            </div>
                        </article>
                    </article>
                    <article className="host-share-earn-steps-blocks-block">
                        <div className="host-share-earn-steps-blocks-block-image-container">
                            <img src={location} alt="Step 1" />
                        </div>
                        <article className="host-share-earn-steps-blocks-block-content">
                            <div className="host-share-earn-steps-blocks-block-content-title">
                                <p className="text-center">Select city, date and time
                                </p>
                            </div>
                        </article>
                    </article>
                    <article className="host-share-earn-steps-blocks-block">
                        <div className="host-share-earn-steps-blocks-block-image-container">
                            <img src={deposit} alt="Step 1" />
                        </div>
                        <article className="host-share-earn-steps-blocks-block-content">
                            <div className="host-share-earn-steps-blocks-block-content-title">
                                <p className="text-center">Pick a car of your choice at 0 security deposit
                                </p>
                            </div>
                        </article>
                    </article>
                    <article className="host-share-earn-steps-blocks-block">
                        <div className="host-share-earn-steps-blocks-block-image-container">
                            <img src={zoomaway} alt="Step 1" />
                        </div>
                        <article className="host-share-earn-steps-blocks-block-content">
                            <div className="host-share-earn-steps-blocks-block-content-title">
                                <p className="text-center">Zoomaway with the freedom of unlimited KMs
                                </p>
                            </div>
                        </article>
                    </article>
                </article>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
            <h1>Why Choose Zoomcar Self Drive Cars</h1>
            </div>
            <footer className="bg-gray py-5 px-4">
    <div className="container">
      <h4 className="text-left mb-4">CAR RENTAL SERVICES IN INDIA</h4>
      <div className="row">
        
        <div className="col-md-4">
          <ul className="list-unstyled">
            <li>Self Drive Cars In Bangalore</li>
            <li>Self Drive Cars In Pune</li>
            <li>Self Drive Cars In Delhi NCR</li>
            <li>Self Drive Cars In Mumbai</li>
            <li>Self Drive Cars In Chennai</li>
            <li>Self Drive Cars In Hyderabad</li>
            <li>Self Drive Cars In Chandigarh</li>
            <li>Self Drive Cars In Kolkata</li>
            <li>Self Drive Cars In Ahmedabad</li>
            <li>Self Drive Cars In Coimbatore</li>
            <li>Self Drive Cars In Indore</li>
            <li>Self Drive Cars In Jaipur</li>
            <li>Self Drive Cars In Mangalore</li>
            <li>Self Drive Cars In Mysore</li>
            <li>Self Drive Cars In Vizag</li>
          </ul>
        </div>
        
        <div className="col-md-4">
          <ul className="list-unstyled">
            <li>Self Drive Cars In Goa</li>
            <li>Self Drive Cars In Nagpur</li>
            <li>Self Drive Cars In Kochi</li>
            <li>Self Drive Cars In Udaipur</li>
            <li>Self Drive Cars In Vijayawada</li>
            <li>Self Drive Cars In Surat</li>
            <li>Self Drive Cars In Siliguri</li>
            <li>Self Drive Cars In Bhopal</li>
            <li>Self Drive Cars In Lucknow</li>
            <li>Self Drive Cars In Guwahati</li>
            <li>Self Drive Cars In Trivandrum</li>
            <li>Self Drive Cars In Bhubaneswar</li>
            <li>Self Drive Cars In Agra</li>
            <li>Self Drive Cars In Vadodara</li>
            <li>Self Drive Cars In Varanasi</li>
          </ul>
        </div>
        
        <div className="col-md-4">
          <ul className="list-unstyled">
            <li>Self Drive Cars In Ranchi</li>
            <li>Self Drive Cars In Raipur</li>
            <li>Self Drive Cars In Nashik</li>
            <li>Self Drive Cars In Amritsar</li>
            <li>Self Drive Cars In Bhuj</li>
            <li>Self Drive Cars In Calicut</li>
            <li>Self Drive Cars In Udupi</li>
            <li>Self Drive Cars In Trichy</li>
            <li>Self Drive Cars In Madurai</li>
            <li>Self Drive Cars In Kanpur</li>
            <li>Self Drive Cars In Aurangabad</li>
            <li>Self Drive Cars In Kota</li>
            <li>Self Drive Cars In Kolhapur</li>
            <li>Self Drive Cars In Kharar</li>
            <li>Self Drive Cars In Durgapur</li>
          </ul>
        </div>
      </div>
      <h4 className="text-left mb-4">UPCOMING CAR RENTAL AT AIRPORTS IN INDIA</h4>
      <div className='row'>
        <div className='col-md-4'>
            <ul className="list-unstyled">
            <li>Self Drive Cars In Bangalore Airport</li>
            <li>Self Drive Cars In Delhi Airport</li>
            <li>Self Drive Cars In Hyderabad Airport</li>
            <li>Self Drive Cars In Kochi Airport</li>
          </ul>
        </div>
        <div className='col-md-4'>
            <ul className="list-unstyled">
            
            <li>Self Drive Cars In Mumbai Airport</li>
            <li>Self Drive Cars In Guwahati Airport</li>
            <li>Self Drive Cars In Kolkata Airport</li>
           
          </ul>
        </div>
        <div className='col-md-4'>
            <ul className="list-unstyled">
            <li>Self Drive Cars In Goa Airport</li>
            <li>Self Drive Cars In Chennai Airport</li>
            <li>Self Drive Cars In Pune Airport</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  <div className='bg-dark text-white'>
        <div className='text-center'>
            All rights reserved by Zoomcar
        </div>
    </div>

        </div>
    );
};

export default Home;
