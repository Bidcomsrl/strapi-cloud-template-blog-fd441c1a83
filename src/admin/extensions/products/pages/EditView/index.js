// ./src/admin/extensions/products/pages/EditView/index.js
import React, { useState, useEffect } from 'react';
import { 
  useAPIErrorHandler, 
  useFetchClient,
  useNotification 
} from '@strapi/helper-plugin';
import { EditView } from '@strapi/plugin-content-manager/admin/src/pages/EditView';

const ProductEditView = (props) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { get } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();

  // Interceptar cambios en el campo marca
  const handleChange = async (brandId) => {
    setSelectedBrand(brandId);
    
    try {
      // Actualizar opciones del campo línea
      const response = await get(`/api/products-lines?filters[brand][$eq]=${brandId}`);
      console.log(response)
      // Aquí actualizamos las opciones disponibles para el campo línea
      const lineField = document.querySelector('select[name="brand_line"]');
      if (lineField) {
        lineField.innerHTML = response.data.map(line => 
          `<option value="${line.id}">${line.attributes.name}</option>`
        ).join('');
      }
    } catch (error) {
      toggleNotification({
        type: 'warning',
        message: formatAPIError(error)
      });
    }
  };

  return (
    <EditView
      {...props}
      onChange={(e) => {
        if (e.target.name === 'brand') {
          handleChange(e.target.value);
        }
        props.onChange(e);
      }}
    />
  );
};

export default ProductEditView;