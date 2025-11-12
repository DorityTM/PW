// Task_1
// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с позитивными проверками

//   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols


import { generateProductData } from "data/salesPortal/products/generateProductData";
import { IProduct } from "data/types/product.types";
import { STATUS_CODES } from "data/statusCodes";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { faker } from "@faker-js/faker";
import _ from "lodash";

interface ICreateNewProductTC {
  title: string;
  productData: Partial<IProduct>;
  expectedStatus?: number;
  expectedErrorMessage?: string;
}

export const addNewProductPositiveTC: ICreateNewProductTC[] = [
  {
    title: "Add a new product consist of 3 characters",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 3 }) }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product consist of 40 characters",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 40 }) }),
    expectedStatus: STATUS_CODES.CREATED
  },
   {
    title: "Add a new product consist of 20 characters",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 20 }) }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product with 1 space in the name",
    productData: generateProductData({ name: "Gift Card" }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product costs 1$ price",
    productData: generateProductData({ price: 1 }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product costs 99999$ price",
    productData: generateProductData({ price: 99999 }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product with amount 0 QTY",
    productData: generateProductData({ amount: 0 }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product with amount 999 QTY",
    productData: generateProductData({ amount: 999 }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product contains 250 symbols in notes",
    productData: generateProductData({ notes: faker.string.alphanumeric({ length: 250 }) }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product without notes",
    productData: _.omit(generateProductData(), "notes"),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Add a new product contains empty notes",
    productData: generateProductData({ notes: "" }),
    expectedStatus: STATUS_CODES.CREATED
  }
];


// Task_2
// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с негативыми проверками

export const addNewProductNegativeTC: ICreateNewProductTC[] = [
  {
    title: "Product with 2 character in name is not created",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 2 }) }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with 41 character in name is not created",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 41 }) }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product contains > 1 spaces in product name is not created",
    productData: generateProductData({ name: "Madagascar  Centella  Toning  Toner" }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product contains special characters in name is not created",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 7 }) + "*&^%$#@!{}" }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product without required name is not created",
    productData: _.omit(generateProductData(), "name"),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with empty name is not created",
    productData: generateProductData({ name: "" }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product without manufacturer is not created",
    productData: _.omit(generateProductData(), "manufacturer"),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
   {
    title: "Product with 0$ price is not created",
    productData: generateProductData({ price: 0 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with 99999,99$ price is not created",
    productData: generateProductData({ price: 99999.99 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product without price is not created",
    productData: _.omit(generateProductData(), "price"),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with negative price is not created",
    productData: generateProductData({ price: -1 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with non-integer price is not created",
    productData: generateProductData({ price: faker.string.alphanumeric({ length: 4 }) as any}),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with negative amount is not created",
    productData: generateProductData({ amount: -1 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with 1000 amount is not created",
    productData: generateProductData({ amount: 1000 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product without amount is not created",
    productData: _.omit(generateProductData(), "amount"),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with non-integer amount is not created",
    productData: generateProductData({ amount: faker.string.alphanumeric({ length: 4 }) as any}),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with notes > 250 characters is not created",
    productData: generateProductData({ notes: faker.string.alphanumeric({ length: 251 }) }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  },
  {
    title: "Product with < or > symbols in notes is not created",
    productData: generateProductData({ notes: "Invalid notes contain <symbols>" }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: NOTIFICATIONS.BAD_REQUEST
  }
];