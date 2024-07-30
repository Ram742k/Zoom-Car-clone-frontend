
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import 'daterangepicker/daterangepicker.css';
import moment from 'moment';
import 'daterangepicker';
import "../css/home.css";
import { VehicleContext } from '../context/VechicleContext';
import { useNavigate } from 'react-router-dom'; 

const LocationSearch = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const { filterAvailableVehicles } = useContext(VehicleContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        $('#daterange').daterangepicker({
            timePicker: true,
            startDate: moment().startOf('hour'),
            endDate: moment().startOf('hour').add(12, 'hour'),
            locale: {
                format: 'MM/DD/YY hh:mm A'
            }
        }, (start, end) => {
            setSelectedDateRange(`${start.format('MM/DD/YY hh:mm A')} - ${end.format('MM/DD/YY hh:mm A')}`);
        });
    }, []);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            try {
                const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                    params: {
                        q: value,
                        key: '6a00597a220c42e983b9b50fb5e3c364',
                    },
                });

                setSuggestions(response.data.results.map(result => result.formatted));
            } catch (error) {
                console.error('Error fetching location data:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (index) => {
        setQuery(suggestions[index]);
        setSuggestions([]);
        setSelectedIndex(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const availableVehicles = await filterAvailableVehicles({ location: query, dateRange: selectedDateRange });
            navigate('/car-list', { state: { availableVehicles } }); // Navigate and pass data
        } catch (error) {
            console.error('Error filtering available vehicles:', error);
        }
    };

    return (
        <div className="location-container">
            <form onSubmit={handleSubmit}>
                <div className='row mt-3 locat'>
                    <div className='col-md-5 col-sm-12 mb-1 mt-1'>
                        <input
                            type="text"
                            value={query}
                            className='form-control'
                            onChange={handleInputChange}
                            placeholder="Search for a location"
                        />
                        <ul className='suggestions-list'>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className={selectedIndex === index ? 'selected' : ''}
                                    onClick={() => handleSuggestionClick(index)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='col-md-5 col-sm-12 mb-1 mt-1'>
                        <input type="text" id="daterange" name='datetimes' className="form-control" readOnly />
                    </div>
                    <div className='col-md-2 col-sm-12 mb-1 search_btn '>
                        <button type="submit" className='btn btn-primary'>Search</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LocationSearch;
