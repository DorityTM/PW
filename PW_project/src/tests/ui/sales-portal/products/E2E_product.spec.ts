import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TIMEOUT_30_S } from "data/salesPortal/constants";
import _ from "lodash";
import { TAGS } from "data/tags";
import { STATUS_CODES } from "data/statusCodes";

let productData: ReturnType<typeof generateProductData>;
let token = "";
let id = "";

test.beforeEach(async () => {
  // ARRANGE: generate product data
  productData = generateProductData();
});

test(
  "E2E test product creation and deletion",
  { tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.UI, TAGS.INTEGRATION, TAGS.PRODUCTS] },
  async ({ addNewProductUIService, productsListUIService, productsApi, productsListPage }) => {
    // ACT: Login
    token = await productsListPage.getAuthToken();

    // ACT: create a new product
    await addNewProductUIService.open();
    const createdProduct = await addNewProductUIService.create(productData);
    id = createdProduct._id;

    // ASSERT: verify notification and appearing the product in the table
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.toastMessage).not.toBeVisible({ timeout: TIMEOUT_30_S });
    await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();

    // ASSERT: verify product data in the table
    await expect.soft(productsListPage.nameCell(createdProduct.name)).toHaveText(createdProduct.name);
      await expect
        .soft(productsListPage.priceCell(createdProduct.name))
        .toHaveText(`$${createdProduct.price.toString()}`);
      await expect.soft(productsListPage.manufacturerCell(createdProduct.name)).toHaveText(createdProduct.manufacturer);
    const productFromTable = await productsListPage.getProductData(createdProduct.name);
    const expectedProduct = _.omit(createdProduct, ["notes", "amount", "_id", "createdOn"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);

    // LOGGING the created product data
    const newProduct = await productsListPage.getProductData(createdProduct.name);
    console.log(`Created product: ${JSON.stringify(newProduct)}`);

    // ACT: delete the created product
    await productsListUIService.deleteProduct(createdProduct.name);

    // ASSERT: verify notification and deleted the product from the table
    const deleted = await productsApi.getById(createdProduct._id, token);
    expect(deleted.status).toBe(STATUS_CODES.NOT_FOUND);
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.tableRowByName(createdProduct.name)).not.toBeVisible();
  },
);
// test(
//   "E2E test product creation and deletion OLD",
//   { tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.UI, TAGS.INTEGRATION, TAGS.PRODUCTS] },
//   async ({ addNewProductUIService, productsListPage }) => {
//     // ACT: login
//     //await loginAsAdmin();
//     // await homePage.open("");
//     // await expect(loginPage.uniqueElement).toBeVisible();
//     // await loginPage.fillCredentials({ username: credentials.username, password: credentials.password });
//     // await loginPage.loginButtonClick();
//     token = await productsListPage.getAuthToken();
//     // ACT: create a new product
//     // await homePage.waitForOpened();
//     // await homePage.clickOnViewModule("Products");
//     await addNewProductUIService.open();
//     const createdProduct = await addNewProductUIService.create();
//     id = createdProduct._id;
//     // await productsListPage.waitForOpened();
//     // await productsListPage.clickAddNewProduct();

//     // await addNewProductPage.waitForOpened();
//     // await addNewProductPage.fillForm(productData);
//     // await addNewProductPage.clickSave();

//     // ASSERT: verify notification and appearing the product in the table
//     await productsListPage.waitForOpened();
//     await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
//     await expect(productsListPage.toastMessage).not.toBeVisible({ timeout: TIMEOUT_30_S });
//     await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

//     // ASSERT: verify product data in the table
//     const productFromTable = await productsListPage.getProductData(productData.name);
//     const expectedProduct = _.omit(productData, ["notes", "amount"]);
//     const actualProduct = _.omit(productFromTable, ["createdOn"]);
//     expect(actualProduct).toEqual(expectedProduct);

//     // LOGGING the created product data
//     const newProduct = await productsListPage.getProductData(productData.name);
//     console.log(`Created product: ${JSON.stringify(newProduct)}`);

//     // ACT: delete the created product
//     await productsListPage.waitForOpened();
//     await productsListPage.clickAction(productData.name, "delete");
//     await productsListPage.deleteModal.waitForOpened();

//     // ACT: delete the created product
//     await productsListPage.deleteModal.clickConfirm();

//     //   async clickAction(productName: string, button: "edit" | "delete" | "details") {
//     // if (button === "edit") await this.editButton(productName).click();
//     // if (button === "delete") await this.deleteButton(productName).click();
//     // if (button === "details") await this.detailsButton(productName).click();
//     //}

//     // ASSERT: verify notification and deleted the product from the table
//     await productsListPage.deleteModal.waitForClosed();
//     await productsListPage.waitForOpened();
//     await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
//     await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();
//   },
// );
