import { Field, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import React, { useEffect, useState } from "react";

const LineSelectField = ({ name, value, onChange, intlLabel, disabled, error }) => {
  const { form } = useContentManagerContext();
  const { values } = form;
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);

  const brandDocumentId = values.marca;

  useEffect(() => {
    if(value){
      fetchLines()
    }
  }, []);
  
  useEffect(() => {

    if(brandDocumentId){
      fetchLinesFiltered(brandDocumentId)
    } 
  }, [brandDocumentId]);
  
  const fetchLines = async () => {
    await fetchAllLines()
  };


  const fetchLinesFiltered = async (brandId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products-lines?filters[brand][documentId][$eq]=${brandId}&status=published`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      setLines(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching lines:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchAllLines = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products-lines`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      setLines(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching lines:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleLineChange = (lineId) => {
    setSelectedLine(lineId)
    onChange({ target: { name, value: lineId } });
  };

  return (


    <div>
      <Field.Root>
        <Field.Label>Linea</Field.Label>
        <SingleSelect id="lineSelect" onChange={handleLineChange} value={value}>
          {lines.map((line) => (
            <SingleSelectOption key={line.id} value={line.id}>  {line.line}</SingleSelectOption>
          ))}
        </SingleSelect>
      </Field.Root>


    </div>

  );


};

export default LineSelectField;


