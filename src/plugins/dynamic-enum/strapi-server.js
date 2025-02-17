module.exports = (plugin) => {
    plugin.customFields.register({
      name: 'dynamic-enum', // Nombre del campo
      plugin: 'custom-field', // Nombre del plugin
      type: 'string', // Tipo de dato (puede ser 'string', 'number', 'boolean', etc.)
    });
  };