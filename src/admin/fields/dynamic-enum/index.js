import SelectEnumDynamic from './SelectEnumDynamic.js';

export const component = {
  id: 'dynamic-enum',
  label: 'Enum Dinámico',
  description: 'Campo select con valores de un enum cargados dinámicamente desde una API.',
  Component: SelectEnumDynamic,
  inputSize: {
    // optional
    default: 4,
    isResizable: true,
  },
  type:'string',
   size: 'medium'
};
