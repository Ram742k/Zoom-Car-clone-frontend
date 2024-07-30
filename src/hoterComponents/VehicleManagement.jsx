import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { HosterContext } from '../context/HosterContext';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,useNavigate} from 'react-router-dom';


const VehicleManagement = () => {
  const { logout,vehicles, fetchVehicles, addVehicle, updateVehicle, deleteVehicle } = useContext(HosterContext);
  const [editing, setEditing] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);

     const navigate = useNavigate();
  useEffect(() => {
    fetchVehicles();
  }, []);

  const initialValues = {
    title: '',
    price: '',
    offprice: '',
    transmission: '',
    fueltype: '',
    seat: '',
    cartype: '',
    rating: '',
    km: '',
    location: '',
    images: []
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    offprice: Yup.number().required('Required'),
    transmission: Yup.string().required('Required'),
    fueltype: Yup.string().required('Required'),
    seat: Yup.number().required('Required'),
    cartype: Yup.string().required('Required'),
    rating: Yup.number().required('Required'),
    km: Yup.number().required('Required'),
    location: Yup.string().required('Required'),
    images: Yup.array().min(1, 'At least one image is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'images') {
          values[key].forEach(image => formData.append('images', image));
        } else {
          formData.append(key, values[key]);
        }
      });

      if (editing) {
        await updateVehicle(currentVehicle._id, formData);
      } else {
        await addVehicle(formData);
      }

      setSubmitting(false);
      resetForm();
      setEditing(false);
      setCurrentVehicle(null);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const handleEdit = (vehicle) => {
    setEditing(true);
    setCurrentVehicle(vehicle);
  };

  const handleDelete = (id) => {
    deleteVehicle(id);
  };

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
                          <Link to="/hoster_bookings">
                            <li className="nav-item">
                                <button className="nav-link text-white active" aria-current="page" >My Booking</button>
                            </li>
                          </Link>
                            <li className="nav-item">
                                <button className="nav-link text-white active" aria-current="page" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
            </nav>
    <div className="container mt-5">
        
      <div className="row">
        <div className="col-md-6">
          <h2>{editing ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
          <Formik
            initialValues={editing && currentVehicle ? currentVehicle : initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <Field type="text" name="title" className="form-control" placeholder="Title" />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="number" name="price" className="form-control" placeholder="Price" />
                  <ErrorMessage name="price" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="number" name="offprice" className="form-control" placeholder="Off Price" />
                  <ErrorMessage name="offprice" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="text" name="transmission" className="form-control" placeholder="Transmission" />
                  <ErrorMessage name="transmission" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="text" name="fueltype" className="form-control" placeholder="Fuel Type" />
                  <ErrorMessage name="fueltype" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="number" name="seat" className="form-control" placeholder="Seat" />
                  <ErrorMessage name="seat" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="text" name="cartype" className="form-control" placeholder="Car Type" />
                  <ErrorMessage name="cartype" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="number" name="rating" className="form-control" placeholder="Rating" />
                  <ErrorMessage name="rating" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="number" name="km" className="form-control" placeholder="KM" />
                  <ErrorMessage name="km" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <Field type="text" name="location" className="form-control" placeholder="Location" />
                  <ErrorMessage name="location" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    name="images"
                    multiple
                    className="form-control"
                    onChange={(event) => {
                      const { files } = event.target;
                      const fileArray = Array.from(files);
                      setFieldValue('images', fileArray);
                    }}
                  />
                  <ErrorMessage name="images" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : editing ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-6">
          <h3>Your Vehicles</h3>
          <ul className="list-group">
  {vehicles.map((vehicle) => (
    <li key={vehicle._id} className="list-group-item">
      <div className="d-flex">
        <div className="w-50">
          <Carousel>
            {vehicle.images.map((image, index) => (
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
        </div>
        <div className="w-50 d-flex flex-column justify-content-between ps-3">
          <div>
            <h5>{vehicle.title}</h5>
            <p>{vehicle.cartype} - {vehicle.fueltype}</p>
            <p>Price per Day: ${vehicle.price}</p>
            <p>Location: {vehicle.location}</p>
          </div>
          <div>
            <button className="btn btn-warning me-2" onClick={() => handleEdit(vehicle)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(vehicle._id)}>Delete</button>
          </div>
        </div>
      </div>
    </li>
  ))}
</ul>

        </div>
      </div>
    </div>
    </div>
  );
};

export default VehicleManagement;
