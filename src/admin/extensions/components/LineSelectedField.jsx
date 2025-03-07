// src/admin/extensions/components/LineSelectField.jsx
import React, { useEffect, useState } from "react";
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { useFetchClient } from '@strapi/strapi/admin';

const LineSelectField = ({ name, value, onChange, intlLabel, disabled, error }) => {
  const { modifiedData } = useContentManagerContext();
  const { get } = useFetchClient();
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("Componente montado");

  // Obtener el ID de la marca seleccionada
  const selectedBrandId = modifiedData?.brand?.id || modifiedData?.brand;

  // Consultar las líneas cuando cambia la marca
  useEffect(() => {
    if (!selectedBrandId) {
      setLines([]);
      return;
    }

    setLoading(true);

    get(`/api/products-lines?filters[brand][$eq]=${selectedBrandId}`)
      .then((response) => {
        setLines(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error al obtener las líneas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedBrandId]);

  // Si la línea seleccionada no pertenece a la marca actual, limpiarla
  useEffect(() => {
    if (value && !lines.find((line) => line.id === value)) {
      onChange({ target: { name, value: null } });
    }
  }, [lines]);

  return (
    <div>
      <label htmlFor={name}>
        {intlLabel?.defaultMessage || "Línea"}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange({ target: { name, value: e.target.value } })}
        disabled={disabled || !selectedBrandId || loading}
        id={name}
      >
        <option value="" disabled>
          {!selectedBrandId ? "Primero seleccione una marca" : "Seleccione una línea"}
        </option>
        {lines.map(({ id, attributes }) => (
          <option key={id} value={id}>
            {attributes.name}
          </option>
        ))}
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LineSelectField;

