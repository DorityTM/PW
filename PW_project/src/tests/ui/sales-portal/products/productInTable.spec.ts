import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { TAGS } from "data/tags";

let productData: ReturnType<typeof generateProductData>;
  let id = "";
  let token = "";

test.beforeEach(async () => {
  productData = generateProductData();
});

test(
  "COMPARE NEW PRODUCT WITH DATA IN TABLE",
  { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.INTEGRATION, TAGS.PRODUCTS] },
async ({ addNewProductUIService, productsListPage }) => {
      token = await productsListPage.getAuthToken();
      await addNewProductUIService.open();
      const createdProduct = await addNewProductUIService.create();
      id = createdProduct._id;
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();

    const productFromTable = await productsListPage.getProductData(createdProduct.name);
    const expectedProduct = _.omit(createdProduct, ["notes", "amount", "_id", "createdOn"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);

    const newProduct = await productsListPage.getProductData(createdProduct.name);
    console.log(`Created product: ${JSON.stringify(newProduct)}`);
  },
);

// let productData: ReturnType<typeof generateProductData>;

// test.beforeEach(async () => {
//   // ARRANGE: generate product data
//   productData = generateProductData();
// });

// test(
//   "COMPARE NEW PRODUCT WITH DATA IN TABLE",
//   { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.INTEGRATION, TAGS.PRODUCTS] },
//   async ({ loginAsAdmin, page }) => {
//     // ARRANGE: initialize pages
//     const loginPage = new LoginPage(page);
//     const homePage = new HomePage(page);
//     const productsListPage = new ProductsListPage(page);
//     const addNewProductPage = new AddNewProductPage(page);

//     // ACT: login
//     await loginAsAdmin();
//     // await homePage.open("");
//     // await expect(loginPage.uniqueElement).toBeVisible({ timeout: TIMEOUT_5_S });
//     // await loginPage.fillCredentials({ username: credentials.username, password: credentials.password });
//     // await loginPage.loginButtonClick();

//     // ACT: create a new product
//     await homePage.waitForOpened();
//     await homePage.clickOnViewModule("Products");

//     await productsListPage.waitForOpened();
//     await productsListPage.clickAddNewProduct();

//     await addNewProductPage.waitForOpened();
//     await addNewProductPage.fillForm(productData);
//     await addNewProductPage.clickSave();

//     // ASSERT: verify notification and appearing the product in the table
//     await productsListPage.waitForOpened();
//     await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED, { timeout: TIMEOUT_10_S });
//     await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

//     // ASSERT: verify product data in the table
//     const productFromTable = await productsListPage.getProductData(productData.name);
//     const expectedProduct = _.omit(productData, ["notes", "amount"]);
//     const actualProduct = _.omit(productFromTable, ["createdOn"]);
//     expect(actualProduct).toEqual(expectedProduct);

//     // LOGGING the created product data
//     const newProduct = await productsListPage.getProductData(productData.name);
//     console.log(`Created product: ${JSON.stringify(newProduct)}`);
//   },
// );
