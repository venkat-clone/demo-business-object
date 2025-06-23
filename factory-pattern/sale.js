const saleClasses = {
  COUNTER: CounterSale,
  VEHICLE: VehicleSale,
  SERVICE_JOBCARD: ServiceJobcard,
};

class SalesService {
  async createSale(saleType, data) {
    const SaleClass = saleClasses[saleType];
    if (!SaleClass) throw new Error("Invalid sale type");

    const sale = new SaleClass(null, data.products || data.model || data.parts);
    sale.validate();

    return this.salesDao.saveSale(sale);
  }
}


const saleFactories = {
  COUNTER: (data) => new CounterSale(null, data.products),
  VEHICLE: (data) => new VehicleSale(null, data.model),
  SERVICE_JOBCARD: (data) => new ServiceJobcard(null, data.parts),
};

class SalesService {
  async createSale(saleType, data) {
    const factory = saleFactories[saleType];
    if (!factory) throw new Error("Invalid sale type");

    const sale = factory(data);
    sale.validate();

    return this.salesDao.saveSale(sale);
  }
}
