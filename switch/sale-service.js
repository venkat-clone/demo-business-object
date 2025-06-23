const { CounterSale, VehicleSale, ServiceJobcard } = require('./businessObjects/Sale');

class SalesService {
  constructor(salesDao) {
    this.salesDao = salesDao;
  }

  async createSale(saleType, data) {
    let sale;
    switch(saleType) {
      case "COUNTER":
        sale = new CounterSale(null, data.products);
        break;
      case "VEHICLE":
        sale = new VehicleSale(null, data.model);
        break;
      case "SERVICE_JOBCARD":
        sale = new ServiceJobcard(null, data.parts);
        break;
      default:
        throw new Error("Invalid sale type");
    }

    sale.validate();

    // Persist sale using DAO
    return await this.salesDao.saveSale(sale);
  }
}
