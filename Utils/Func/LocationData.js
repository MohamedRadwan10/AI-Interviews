const COUNTRIES = [
  "Egypt",
  "Saudi Arabia",
  "UAE",
  "Kuwait",
  "Qatar",
];

const GOVERNORATES = {
  "Egypt": [
    "Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef",
    "Cairo", "Dakahlia", "Damietta", "Fayoum", "Gharbia",
    "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matrouh",
    "Minya", "Monofiya", "New Valley", "North Sinai", "Port Said",
    "Qalioubiya", "Qena", "Red Sea", "Sharqia", "Sohag",
    "South Sinai", "Suez",
  ],
  "Saudi Arabia": [
    "Makkah", "Riyadh", "Eastern", "Madinah", "Asir",
    "Tabuk", "Jazan", "Al-Qassim", "Ha'il", "Northern Borders",
    "Najran", "Al-Bahah",
  ],
  "UAE": [
    "Abu Dhabi", "Dubai", "Sharjah", "Ajman",
    "Umm Al Quwain", "Ras Al Khaimah", "Fujairah",
  ],
  "Kuwait": [
    "Al Asimah", "Hawalli", "Farwaniya",
    "Mubarak Al-Kabeer", "Ahmadi", "Jahra",
  ],
  "Qatar": [
    "Doha", "Al Rayyan", "Al Wakrah", "Al Khor",
    "Al Shamal", "Umm Salal", "Al Daayen", "Al Shahaniya",
  ],
};

export const getAllCountries = () =>
  COUNTRIES.map((name) => ({ label: name, value: name }));

export const getStatesOfCountry = (country) => {
  if (!country) return [];
  const govs = GOVERNORATES[country];
  if (!govs) return [];
  return govs.map((name) => ({ label: name, value: name }));
};

export const getCitiesOfState = () => [];

export const getCountryName = (value) => value || "";

export const getStateName = (country, governorate) => governorate || "";
