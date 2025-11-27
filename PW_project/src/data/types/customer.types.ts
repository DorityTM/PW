import { COUNTRY } from "data/salesPortal/country";
import { ID, ICreatedOn, SortOrder, IResponseFields } from "./core.types";


type Country = keyof typeof COUNTRY;


export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRY;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

export interface ICustomerInTable extends Pick<ICustomer, "email" | "name" | "country">, ICreatedOn {}

export interface ICustomerDetails extends Required<ICustomer>, ICreatedOn {};

export interface ICustomerFromResponse extends Required<ICustomer>, ICreatedOn, ID {}
export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomerSortedResponse extends ICustomerResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  country: Country[];
  sorting: {
    sortField: CustomerSortField;
    sortOrder: SortOrder;
  };
}

export type CustomerSortField = "email" | "name" | "country" | "createdOn";

export interface IGetCustomersParams {
  country: Country[];
  search: string;
  sortField: CustomerSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

export type CustomerTableHeader = "email" | "name" | "country" | "createdOn";

// Example API responses:
// {
//     "Customers": [
//         {
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
//         }
//     ],
//     "total": 1,
//     "page": 1,
//     "limit": 10,
//     "search": "",
//     "country": [],
//     "sorting": {
//         "sortField": "createdOn",
//         "sortOrder": "desc"
//     },
//     "IsSuccess": true,
//     "ErrorMessage": null
// }

// {
//     "Customer": {
//         "email": "tdavidziuk@gmail.com",
//         "name": "TD QA",
//         "country": "Belarus",
//         "city": "BIALYSTOK",
//         "street": "PIASTOWSKA",
//         "house": 5,
//         "flat": 55,
//         "phone": "+48789654123",
//         "createdOn": "2025-11-22T22:35:04.000Z",
//         "notes": "",
//         "_id": "69223a980a127d4d456d1bca"
//     },
//     "IsSuccess": true,
//     "ErrorMessage": null
// }
