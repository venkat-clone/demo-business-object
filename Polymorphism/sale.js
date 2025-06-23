class Sale {
  async save(salesDao) {
    throw new Error("Must implement save");
  }
}

class CounterSale extends Sale {
  // ... constructor and validate()

  async save(salesDao) {
    return salesDao.saveCounterSale(this);
  }
}

class VehicleSale extends Sale {
  // ... constructor and validate()

  async save(salesDao) {
    return salesDao.saveVehicleSale(this);
  }
}

// And similar for ServiceJobcard

class SalesService {
  async createSale(saleType, data) {
    const sale = saleFactories[saleType](data);
    sale.validate();
    return sale.save(this.salesDao);
  }
}
