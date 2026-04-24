import { Country, State, City } from 'country-state-city';
import egyptData from '@/Utils/Data/egypt_data.json';

export const getAllCountries = () => {
  return Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));
};

export const getStatesOfCountry = (countryCode) => {
  if (!countryCode) return [];
  
  if (countryCode === 'EG') {
    return egyptData.governorates.map(gov => ({
      label: gov.name,
      value: gov.id
    }));
  }

  return State.getStatesOfCountry(countryCode).map((state) => ({
    label: state.name,
    value: state.isoCode,
  }));
};

export const getCitiesOfState = (countryCode, stateCode) => {
  if (!countryCode || !stateCode) return [];

  if (countryCode === 'EG') {
    const governorate = egyptData.governorates.find(gov => gov.id === stateCode);
    if (governorate) {
      return governorate.cities.map(city => ({
        label: city,
        value: city
      }));
    }
  }

  return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
    label: city.name,
    value: city.name,
  }));
};

export const getCountryName = (code) => {
  return Country.getCountryByCode(code)?.name || code;
};

export const getStateName = (countryCode, stateCode) => {
  if (countryCode === 'EG') {
    return egyptData.governorates.find(gov => gov.id === stateCode)?.name || stateCode;
  }
  return State.getStateByCodeAndCountry(stateCode, countryCode)?.name || stateCode;
};
