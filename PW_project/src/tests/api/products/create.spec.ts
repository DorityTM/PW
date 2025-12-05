import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProduct } from "data/types/product.types";
import { addNewProductPositiveTC, addNewProductNegativeTC } from "../../../data/salesPortal/products/productsDDT";
import { RESPONSE_ERRORS } from "data/salesPortal/errors";
import _ from "lodash";
import { TAGS } from "data/tags";

//TODO: Refactor tests for API - add new login service/
test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test(
    "Create Product",
    { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
    async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();
      const productData = generateProductData();
      const createdProduct = await productsApi.create(productData, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdProduct.body.Product._id;

      const actualProductData = createdProduct.body.Product;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    },
  );

  test(
    "NOT create product with invalid data",
    { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.API, TAGS.PRODUCTS] },
    async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();
      const productData = generateProductData();
      const createdProduct = await productsApi.create({ ...productData, name: 123 } as unknown as IProduct, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: "Incorrect request body",
      });
    },
  );
});

test.describe("[API] [Sales Portal] [Products_DDT_Suite]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test.describe("[HW25_Task1] [Products with valid data are created]", () => {
    for (const { title, productData, expectedStatus } of addNewProductPositiveTC) {
      test(`${title}`, { tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.API, TAGS.PRODUCTS] }, async ({ productsApi }) => {
        const createdProduct = await productsApi.create(productData as IProduct, token);
        validateResponse(createdProduct, {
          status: expectedStatus || STATUS_CODES.CREATED,
          schema: createProductSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        id = createdProduct.body.Product._id;

        const actualProductData = createdProduct.body.Product;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
      });
    }
  });

  test.describe("[HW25_Task2] [Products with invalid data are NOT created]", () => {
    for (const { title, productData, expectedStatus } of addNewProductNegativeTC) {
      test(`${title}`, { tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.API, TAGS.PRODUCTS] }, async ({ productsApi }) => {
        const createdProduct = await productsApi.create(productData as IProduct, token);
        validateResponse(createdProduct, {
          status: expectedStatus || STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: RESPONSE_ERRORS.BAD_REQUEST,
        });
      });
    }
  });
});

test.describe("[HW25] [Unique] [Product duplicate name conflict]", () => {
  let id = "";
  let token = "";

  test(
    "Product with non-unique name is not created",
    { tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.API, TAGS.PRODUCTS] },
    async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();

      const initialPayload = generateProductData();
      const createdProduct = await productsApi.create(initialPayload as IProduct, token);

      validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdProduct.body.Product._id;
      const createdProductData = createdProduct.body.Product as Partial<IProduct>;
      const duplicatePayload: Partial<IProduct> = {
        ...initialPayload,
        name: createdProductData.name || initialPayload.name,
      };

      const duplicateResp = await productsApi.create(duplicatePayload as IProduct, token);

      validateResponse(duplicateResp, {
        status: STATUS_CODES.CONFLICT,
        IsSuccess: false,
        ErrorMessage: RESPONSE_ERRORS.CONFLICT(createdProductData.name || initialPayload.name),
      });
    },
  );
});
