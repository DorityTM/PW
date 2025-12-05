import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
//import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", () => {
  let id = "";
  let token = "";
  //test with UI servises version
  test(
    "Table parsing",
    { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.PRODUCTS] },
    async ({ addNewProductUIService, productsListPage }) => {
      token = await productsListPage.getAuthToken();
      await addNewProductUIService.open();
      const createdProduct = await addNewProductUIService.create();
      id = createdProduct._id;
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();

      await expect.soft(productsListPage.nameCell(createdProduct.name)).toHaveText(createdProduct.name);
      await expect
        .soft(productsListPage.priceCell(createdProduct.name))
        .toHaveText(`$${createdProduct.price.toString()}`);
      await expect.soft(productsListPage.manufacturerCell(createdProduct.name)).toHaveText(createdProduct.manufacturer);
      // await expect.soft(productsListPage.createdOnCell(createdProduct.name)).toHaveText("");

      const productFromTable = await productsListPage.getProductData(createdProduct.name);
      const expectedProduct = _.omit(createdProduct, ["notes", "amount", "_id", "createdOn"]);
      const actualProduct = _.omit(productFromTable, ["createdOn"]);
      expect(actualProduct).toEqual(expectedProduct);

      const tableData = await productsListPage.getTableData();
      console.log(tableData);
      // const expectedProduct = _.omit(createdProduct, ["notes", "amount"]);
      // const actualProduct = _.omit(productFromTable, ["createdOn"]);
      // expect(actualProduct).toEqual(expectedProduct);
      // const fieldsToCompare = ["name", "manufacturer", "price"];
      // const expectedProduct = _.pick(createdProduct, fieldsToCompare);
      // const actualProduct = _.pick(productFromTable, fieldsToCompare);
      // expect(actualProduct).toEqual(expectedProduct);
    },
  );

  //test with API servises version
  // test.skip("Table parsing OLD",{ tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.PRODUCTS] }, async ({ loginAsAdmin, page }) => {
  //   const homePage = new HomePage(page);
  //   const productsListPage = new ProductsListPage(page);
  //   const addNewProductPage = new AddNewProductPage(page);
  //login page
  // const emailInput = page.locator("#emailinput");
  // const passwordInput = page.locator("#passwordinput");
  // const loginButton = page.locator("button[type='submit']");
  // await homePage.open("");
  // await expect(emailInput).toBeVisible();
  // await emailInput.fill(credentials.username);
  // await passwordInput.fill(credentials.password);
  // await loginButton.click();
  //     await loginAsAdmin();

  //     await homePage.waitForOpened();
  //     await homePage.clickOnViewModule("Products");
  //     await productsListPage.waitForOpened();
  //     await productsListPage.clickAddNewProduct();
  //     await addNewProductPage.waitForOpened();
  //     const productData = generateProductData();
  //     await addNewProductPage.fillForm(productData);
  //     await addNewProductPage.clickSave();
  //     await productsListPage.waitForOpened();
  //     await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
  //     await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

  //     await expect.soft(productsListPage.nameCell(productData.name)).toHaveText(productData.name);
  //     await expect.soft(productsListPage.priceCell(productData.name)).toHaveText(`$${productData.price.toString()}`);
  //     await expect.soft(productsListPage.manufacturerCell(productData.name)).toHaveText(productData.manufacturer);
  //     // await expect.soft(productsListPage.createdOnCell(productData.name)).toHaveText("");

  //     const productFromTable = await productsListPage.getProductData(productData.name);
  //     const expectedProduct = _.omit(productData, ["notes", "amount"]);
  //     const actualProduct = _.omit(productFromTable, ["createdOn"]);
  //     expect(actualProduct).toEqual(expectedProduct);

  //     const tableData = await productsListPage.getTableData();
  //     console.log(tableData);
  //   });
});
