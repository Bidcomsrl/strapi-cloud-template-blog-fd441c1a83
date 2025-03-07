import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: "dynamicBrandLines",
    plugin: "parent-child",
    type: "string",
  });
  strapi.customFields.register({
    name: "brandSelect",
    plugin: "parent-child",
    type: "string",
  });
};

export default register;
