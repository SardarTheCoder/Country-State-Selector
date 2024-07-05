import React, { useEffect, useState } from 'react';
import Selector from './Selector';
import { Country, State as CountryState, City } from 'country-state-city'; // Importing Country, State, and City modules

const State = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await Country.getAllCountries();
      setCountryData(countries);
      setSelectedCountry(countries[0]); // Selecting the first country by default
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        const states = await CountryState.getStatesOfCountry(selectedCountry.isoCode);
        setStateData(states);
        setSelectedState(states[0]); 
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        const cities = await City.getCitiesOfState(selectedState.stateCode);
        setCityData(cities);
        setSelectedCity(cities[0]); 
      }
    };

    fetchCities();
  }, [selectedState]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStateData([]); 
    setCityData([]); 
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCityData([]); 
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <>
      <h1 className="text-blue-800 font-extrabold text-center text-4xl font-serif">
        Country, State, City Selector
      </h1>
      <div className="flex flex-wrap bg-teal-400 rounded-lg gap-3 p-8">
        <div>
          <h1 className='text-4xl font-extrabold ml-52 text-white'>COUNTRY:</h1>
          <Selector
            people={countryData}
            selected={selectedCountry}
            setSelected={handleCountryChange}
          />
        </div>
        <div>
          <h1 className='text-4xl font-extrabold text-white ml-52'>STATE:</h1>
          <Selector
            people={stateData}
            selected={selectedState}
            setSelected={handleStateChange}
          />
        </div>
        <div>
          <h1 className='text-4xl font-extrabold text-white ml-52'>CITY:</h1>
          <Selector
            people={cityData}
            selected={selectedCity}
            setSelected={handleCityChange}
          />
        </div>
      </div>
    </>
  );
};

export default State;

