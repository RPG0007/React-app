// import React, { useState } from 'react';

// const Select = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);

//     const filtered = countries.filter((country) =>
//       country.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredCountries(filtered);
//   };

//   const handleSelectCountry = (country: string) => {
//     setInputValue(country);
//     setFilteredCountries([]);
//   };

//   return (
//     <div>
//       <label htmlFor="country">Country</label>
//       <input
//         type="text"
//         id="country"
//         value={inputValue}
//         onChange={(e) => handleInputChange(e)}
//       />
//       <ul>
//         {filteredCountries.map((country) => (
//           <li key={country} onClick={() => handleSelectCountry(country)}>
//             {country}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Select;
