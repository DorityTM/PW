// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - Залогиниться
//   - Создать продукт и проверить 201й статус
//   - Получить все продукты
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage

import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { getAllProductsSchema } from "data/schemas/products/getAllProducts.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [SALES PORTAL] [GET ALL PRODUCTS] [SMOKE]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });   

  test("Get All Products", async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const createdProduct = await productsApi.create(productData, token);
    id = createdProduct.body.Product._id; 
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
    }); 

    const getAllProductsResponse =  await productsApi.getAll(token);
    validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,    
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const allProducts = getAllProductsResponse.body.Products; 
    expect(allProducts).toContainEqual(createdProduct.body.Product);  
  });
}); 