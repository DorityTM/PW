import { ID, ICreatedOn, IResponseFields } from "./core.types";
import { ICustomerFromResponse } from "./customer.types";  
import { IOrderProductFromResponse } from  "./product.types";
import { ORDER_STATUS } from "../salesPortal/order-status";
import { DELIVERY_STATUS } from "../salesPortal/delivery-status";
import { IUser } from "./user.types";

// export type OrderStatus = "Draft" | "In Process" | "Partially Received" | "Received" | "Canceled";
// export type DeliveryStatus = "Pending" | "In Transit" | "Delivered" | "Failed";

export interface IOrderResponse extends IResponseFields {
  Order: IOrderFromResponse;
}

export interface IOrderFromResponse extends ICreatedOn, ID {
  status: ORDER_STATUS;
  customer: ICustomerFromResponse;
  products: IOrderProductFromResponse[];
  delivery: null | DELIVERY_STATUS;
  total_price: number;
  comments: string[];
  history: IOrderHistory[];
  assignedManager: null | IUser["_id"];
}
//TODO
//IOrderHistory contsins delivery status
export interface IOrderHistory extends Omit<IOrderFromResponse, "comments" | "history" | "customer" > {
  customer: ICustomerFromResponse["_id"];
  changedOn: string;
  action: string;
}

// Example API responses:
// {
//     "Orders": [],
//     "total": 0,
//     "page": 1,
//     "limit": 10,
//     "search": "",
//     "status": [],
//     "sorting": {
//         "sortField": "createdOn",
//         "sortOrder": "desc"
//     },
//     "IsSuccess": true,
//     "ErrorMessage": null
// }

// {
//     "Order": {
//         "status": "Draft",
//         "customer": {
//             "_id": "69223a980a127d4d456d1bca",
//             "email": "tdavidziuk@gmail.com",
//             "name": "TD QA",
//             "country": "Belarus",
//             "city": "BIALYSTOK",
//             "street": "PIASTOWSKA",
//             "house": 5,
//             "flat": 55,
//             "phone": "+48789654123",
//             "createdOn": "2025-11-22T22:35:04.000Z",
//             "notes": ""
//         },
//         "products": [
//             {
//                 "_id": "6910c66f177a6533d398d456",
//                 "name": "Mouse99119",
//                 "amount": 202,
//                 "price": 922,
//                 "manufacturer": "Xiaomi",
//                 "notes": "2i4yhXLEeFPguU0vqv02QervSywRj8t4iGd8sUvJCBOydnEKXW2ONpt7KGd78rVcAyCrlb3wkvxno9SnLwMYuKdTwvpRuS4qBj5WZ73rOPi6yPZg2MqyapSo8VF1rzkWnmcBmvQtAtE1ltTYZlsrzdFFTQhtDTFQ1tXrnFsjQ0UHEAGvISZRPoTz4wtaFx28xKQFo50qVo2yzhoYda4vSs6B72dmyqxYzUzkPAQllki5UxbOvv3jZRSx9h",
//                 "received": false
//             }
//         ],
//         "delivery": null,
//         "total_price": 922,
//         "createdOn": "2025-11-22T23:13:57.000Z",
//         "comments": [],
//         "history": [
//             {
//                 "status": "Draft",
//                 "customer": "69223a980a127d4d456d1bca",
//                 "products": [
//                     {
//                         "_id": "6910c66f177a6533d398d456",
//                         "name": "Mouse99119",
//                         "amount": 202,
//                         "price": 922,
//                         "manufacturer": "Xiaomi",
//                         "notes": "2i4yhXLEeFPguU0vqv02QervSywRj8t4iGd8sUvJCBOydnEKXW2ONpt7KGd78rVcAyCrlb3wkvxno9SnLwMYuKdTwvpRuS4qBj5WZ73rOPi6yPZg2MqyapSo8VF1rzkWnmcBmvQtAtE1ltTYZlsrzdFFTQhtDTFQ1tXrnFsjQ0UHEAGvISZRPoTz4wtaFx28xKQFo50qVo2yzhoYda4vSs6B72dmyqxYzUzkPAQllki5UxbOvv3jZRSx9h",
//                         "received": false
//                     }
//                 ],
//                 "total_price": 922,
//                 "delivery": null,
//                 "changedOn": "2025-11-22T23:13:57.000Z",
//                 "action": "Order created",
//                 "performer": {
//                     "_id": "68f614a07a6bd7a5a91f62d5",
//                     "username": "admin@example.com",
//                     "firstName": "Admin",
//                     "lastName": "Admin",
//                     "roles": [
//                         "ADMIN"
//                     ],
//                     "createdOn": "2025/10/20 10:53:20"
//                 },
//                 "assignedManager": null
//             }
//         ],
//         "assignedManager": null,
//         "_id": "692243b50a127d4d456d1bec"
//     },
//     "IsSuccess": true,
//     "ErrorMessage": null
// }