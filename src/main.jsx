import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { VehicleProvider } from './context/VechicleContext.jsx';
import { HosterProvider  } from './context/HosterContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
    <React.StrictMode>
        {/* <AuthProvider> */}
            <VehicleProvider>
                <HosterProvider >
                {/* <CarProvider> */}
                    <App />
                {/* </CarProvider> */}
                </HosterProvider >
            </VehicleProvider>
        {/* </AuthProvider> */}
    </React.StrictMode>
);
