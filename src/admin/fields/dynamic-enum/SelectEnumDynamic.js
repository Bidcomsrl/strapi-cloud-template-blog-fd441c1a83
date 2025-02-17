import React, { useEffect, useState } from 'react';
import { Select } from '@strapi/design-system/Select';
import { Loader } from '@strapi/design-system/Loader';

const SelectEnumDynamic = ({ value, onChange, name }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnumValues = async () => {
      try {
        const response = await fetch("https://api.ejemplo.com/valores-enum");  // Cambia esta URL por la correcta
        const data = await response.json();
        setOptions(data.values.map(val => ({ label: val, value: val })));
      } catch (error) {
        console.error("Error cargando valores dinámicos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnumValues();
  }, []);

  if (loading) return <Loader> Cargando opciones... </Loader>;

  return (
    <Select
      name={name}
      value={value}
      onChange={onChange}
      label="SKU Dinámico"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectEnumDynamic;
