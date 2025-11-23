import { IResponseMetrics } from "data/types/metrics.types";
import { initialMetricsResponse } from "./initialMetricsResponse";
export function generateMetrics({
  orderThisYear,
  newCustomers,
  canceledOrders,
  totalRevenue,
  avgOrderValue,
}: {
  orderThisYear?: number;
  newCustomers?: number;
  canceledOrders?: number;
  totalRevenue?: number;
  avgOrderValue?: number;
}): IResponseMetrics {
  const response = structuredClone<IResponseMetrics>(initialMetricsResponse);
  if (orderThisYear) {
    response.Metrics.orders.totalOrders = orderThisYear;
  }
  if (newCustomers) {
    response.Metrics.customers.totalNewCustomers = newCustomers;
  }
  if (canceledOrders) {
    response.Metrics.orders.totalCanceledOrders = canceledOrders;
  }
  if (totalRevenue) {
    response.Metrics.orders.totalRevenue = totalRevenue;
  }
  if (avgOrderValue) {
    response.Metrics.orders.averageOrderValue = avgOrderValue;
  }
  return response;
}

// export function generateOrdersMetricsData(params?: Partial<IOrdersMetrics>): IOrdersMetrics {
//   return {
//     totalRevenue: faker.number.int({ min: 500, max: 1000000 }),
//     totalOrders: faker.number.int({ min: 1, max: 5000 }),
//     averageOrderValue: faker.number.int({ min: 50, max: 5000 }),
//     totalCanceledOrders: faker.number.int({ min: 0, max: 500 }),
//     recentOrders: [],
//     ordersCountPerDay: [],
//     ...params,
//   };
// }
// export function generateCustomersMetricsData(params?: Partial<ICustomersMetrics>): ICustomersMetrics {
//   return {
//     totalNewCustomers: faker.number.int({ min: 1, max: 5000 }),
//     topCustomers: [],
//     customerGrowth: [],
//     ...params,
//   };
// }
// export function generateProductsMetricsData(params?: Partial<IProductsMetrics>): IProductsMetrics {
//   return {
//     topProducts: [],
//     ...params,
//   };
// }
// export function generateMetricsResponseData(params?: Partial<{
//   orders: Partial<IOrdersMetrics>;
//   customers: Partial<ICustomersMetrics>;
//   products: Partial<IProductsMetrics>;
// }>): { orders: IOrdersMetrics; customers: ICustomersMetrics; products: IProductsMetrics } {
//   return {
//     orders: generateOrdersMetricsData(params?.orders),
//     customers: generateCustomersMetricsData(params?.customers),
//     products: generateProductsMetricsData(params?.products),
//   };
// }