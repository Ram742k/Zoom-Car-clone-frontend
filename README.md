# AutoShare - Zoom Car Clone

## Project Description

AutoShare is a full-stack application designed to replicate the functionality of Zoom Car, focusing on vehicle rental, user management, and administrative control. This project covers a complete system from frontend to backend, including database interactions and payment processing.

## Design Phase

### Layout and User Experience
- **Sketch the Layout**: Design the interface focusing on usability and user experience.
- **Responsive Design**: Use CSS frameworks like Bootstrap to ensure the application adapts to various screen sizes.

## Development Phase

### Frontend Development

1. **React Setup**:
   - Build a dynamic and interactive UI using React.
   - Implement components for different views: login, registration, vehicle listing, booking management, etc.

2. **Form Management**:
   - Create separate components for login and registration forms.
   - Use React state and Formik to manage form inputs and validations.

3. **Routing**:
   - Utilize React Router for handling client-side routing between different views (e.g., home, login, register, vehicle details).

4. **State Management**:
   - Implement Redux or Context API to manage application state across components (e.g., user authentication, vehicle data).

### Backend Development

1. **Node.js and Express.js**:
   - Set up a RESTful API server to handle requests and responses.
   - Implement routes for user authentication, vehicle management, and bookings.

2. **Database**:
   - Use MongoDB for storing and managing user data, vehicle details, and bookings.
   - Design schemas for users, vehicles, and bookings.

3. **Authentication and Security**:
   - Implement JWT for user authentication.
   - Use Bcrypt for password hashing and secure access control.

4. **Middleware**:
   - Integrate middleware for user permissions and role-based access control (e.g., admin, hoster).

### Functionality Development

1. **Vehicle Management**:
   - Users can view all vehicle categories, availability, and price details.
   - Implement search and filter functionalities based on categories and budget.

2. **Booking Management**:
   - Users can select vehicles, manage bookings, view details, and cancel reservations.
   - Implement CRUD operations for managing bookings and list all booking logs.

3. **Review and Rating**:
   - Users can rate and review vehicle cleaning services.

4. **Payment Processing**:
   - Integrate secure payment processing for rental transactions using Razorpay or Stripe.

## Tech Stacks

- **Front-end**: React.js
- **Back-end**: Node.js
- **Database**: MongoDB

## Modules

### 1. User Module

- **Features**:
  - User registration and login.
  - Profile management and password updates.
  - View available vehicles and make bookings.
  - Manage existing bookings, including cancellations.
  - View and rate vehicle cleaning services.

- **API Endpoints**:
  - Login: `POST /users/login`
  - Register: `POST /users/register`
  - Get User Profile: `GET /users/profile`
  - Update User Profile: `PUT /users/profile`
  - Update Profile Picture: `PUT /users/profile/picture`
  - Delete User Profile: `DELETE /users/profile`
  - Get My Bookings: `GET /bookings/bookings/<userId>`
  - Cancel Booking: `POST /cancel-booking/<bookingId>`
  - Create Order: `POST /bookings/create-order`

### 2. Hoster Module

- **Features**:
  - Host registration and login.
  - Add, update, and delete vehicles.
  - Fetch and view all vehicles listed by the host.
  
- **API Endpoints**:
  - Register Host: `POST /hoster/register`
  - Login Host: `POST /hoster/login`
  - Fetch Vehicles: `GET /vehicles`
  - Add Vehicle: `POST /vehicles`
  - Update Vehicle: `PUT /vehicles/<id>`
  - Delete Vehicle: `DELETE /vehicles/<id>`

### 3. Admin Module

- **Features**:
  - Admin authentication.
  - Manage all users and hosts.
  - View and manage all vehicle listings and bookings.
  
- **API Endpoints**:
  - Admin Login: `POST /admin/login`
  - Fetch All Users: `GET /admin/users`
  - Fetch All Hosts: `GET /admin/hosts`
  - Manage Vehicles: `GET /admin/vehicles`
  - Manage Bookings: `GET /admin/bookings`

## Notes

- Implement additional features as needed based on your requirements.
- Ensure all modules interact seamlessly to provide a cohesive user experience.
- Test each component thoroughly to ensure functionality and security.


