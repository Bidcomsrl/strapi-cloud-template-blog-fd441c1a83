'use strict';

/**
 * products-line controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::products-line.products-line", ({ strapi }) => ({
  async find(ctx) {
    
    const modelos = await strapi.entityService.findMany("api::products-line.products-line", {
      filters: ctx.request.query.filters,
    }); 

    return modelos;
  },
}));
