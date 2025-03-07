import React, { useEffect, useState } from "react";
import { useFetchClient } from '@strapi/strapi/admin';

const ModelSelect = ({ name, value, onChange, marcaId }) => {
  
const { get } = useFetchClient();
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModelos = async () => {
      if (!marcaId) return; // No cargar modelos si no hay marca seleccionada

      setLoading(true);
      try {
        const response = await get(`/api/products-lines?filters[brand][$eq]=${marcaId}`);
        setModelos(response.data);
      } catch (error) {
        console.error("Error cargando modelos:", error);
      }
      setLoading(false);
    };

    fetchModelos();
  }, [marcaId]); // Se ejecuta cuando cambia la marca seleccionada

 /* return (
    
    <Select
      name={name}
      value={value}
      onChange={onChange}
      label="Modelo"
      placeholder="Selecciona un modelo"
      disabled={!marcaId}
    >
      {loading ? <Loader /> : modelos.map((modelo) => (
        <option key={modelo.id} value={modelo.id}>{modelo.attributes.nombre}</option>
      ))}
    </Select>
  );*/
  return (
    <div>
      <label htmlFor={name}>Modelo</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={!marcaId}
      >
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          modelos.map((modelo) => (
            <option key={modelo.id} value={modelo.id}>
              {modelo.attributes.nombre}
            </option>
          ))
        )}
      </select>

      {/* Spinner mientras cargamos los modelos */}
      {loading && <div className="spinner">Cargando...</div>}
    </div>
  );
};

export default ModelSelect;
