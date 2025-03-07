import React, { useState, useEffect } from "react";
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

import ModelSelect from "../../../../components/ModelSelect.jsx";

const CustomEditView = () => {
  const { modifiedData, onChange } = useContentManagerContext();
  const [selectedMarca, setSelectedMarca] = useState(null);

  useEffect(() => {
    console.log("componenete productos")
    if (modifiedData.brand) {
      setSelectedMarca(modifiedData.brand.id);
    }
  }, [modifiedData.marca]);

  return (
    <div>
      {/* Renderiza el campo "Marca" original */}
      <div>{/* Aquí Strapi ya muestra el selector de Marca */}</div>

      {/* Campo personalizado para seleccionar "Modelo" según la marca */}
      <ModelSelect
        name="brand_line"
        value={modifiedData.line}
        onChange={(value) => onChange({ target: { name: "brand_line", value } })}
        marcaId={selectedMarca}
      />
    </div>
  );
};

export default CustomEditView;
