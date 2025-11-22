
// Разработать е2е тест со следующими шагами:
//  - Открыть Sales Portal локально поднятый в докере
//  - Войти в приложения используя учетные данные указанные в readme к проекту
//  - Создать продукт (модуль Products)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)

import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { TIMEOUT_5_S, TIMEOUT_10_S } from "data/salesPortal/constants";
import _ from "lodash";

let productData: ReturnType<typeof generateProductData>;

test.beforeEach(async () => {
  // ARRANGE: generate product data
  productData = generateProductData();
});

test("COMPARE NEW PRODUCT WITH DATA IN TABLE", async ({ page }) => {
  // ARRANGE: initialize pages
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    // ACT: login
    await homePage.open(""); 
    await expect(loginPage.uniqueElement).toBeVisible({ timeout: TIMEOUT_5_S });
    await loginPage.fillCredentials({ username: credentials.username, password: credentials.password });
    await loginPage.loginButtonClick();
  
    // ACT: create a new product
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");

    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    
    await addNewProductPage.waitForOpened();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    
    // ASSERT: verify notification and appearing the product in the table
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED, { timeout: TIMEOUT_10_S });
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    // ASSERT: verify product data in the table
    const productFromTable = await productsListPage.getProductData(productData.name);
    const expectedProduct = _.omit(productData, ["notes", "amount"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);

    // LOGGING the created product data
    const newProduct = await productsListPage.getProductData(productData.name);
    console.log(`Created product: ${JSON.stringify(newProduct)}`);
  });