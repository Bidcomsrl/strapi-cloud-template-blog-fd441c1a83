import { Field, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import React, { useEffect, useState } from "react";
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';


const BrandSelect = ({ name, value, onChange, intlLabel, disabled, error }) => {
  const { form } = useContentManagerContext();
  const { values } = form;

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);


  // Initial Fetch
  useEffect(() => {
   // value ? fetchBrandsAndLines() : fetchBrands();
   fetchBrands();
  }, []);


  const fetchBrandById = async () => {
    try {
      const data = await fetch(`/api/brands?filters[brand_lines][$eq]=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await data.json()
      console.log(response)
      setSelectedBrand(response.data[0].documentId)
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const data = await fetch('/api/brands', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await data.json()
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };


  const handleBrandChange = (documentId) => {
     setSelectedBrand(documentId);
     onChange({ target: { name, value: documentId } });
  };

  return (


    <div>
      <Field.Root>
        <Field.Label>Marca</Field.Label>
        <SingleSelect id="brandSelect" onChange={handleBrandChange} value={value}>
          {brands.map((brand) => (
            <SingleSelectOption key={brand.documentId} value={brand.documentId}>{brand.name}</SingleSelectOption>
            ))}
        </SingleSelect>
      </Field.Root>

    </div>

  );


};

export default BrandSelect;


