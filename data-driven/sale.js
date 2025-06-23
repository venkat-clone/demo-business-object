const saleConfig = {
  COUNTER: {
    validate: (sale) => { if (!sale.products.length) throw new Error("No products"); },
    save: (sale, dao) => dao.saveCounterSale(sale),
  },
  VEHICLE: {
    validate: (sale) => { if (!sale.model) throw new Error("No model"); },
    save: (sale, dao) => dao.saveVehicleSale(sale),
  },
  SERVICE_JOBCARD: {
    validate: (sale) => { if (!sale.parts.length) throw new Error("No parts"); },
    save: (sale, dao) => dao.saveServiceJobcard(sale),
  },
};

class SalesService {
  async createSale(saleType, data) {
    const config = saleConfig[saleType];
    if (!config) throw new Error("Invalid sale type");

    const sale = new Sale(data); // or specific subclass if needed

    config.validate(sale);
    return config.save(sale, this.salesDao);
  }
}
