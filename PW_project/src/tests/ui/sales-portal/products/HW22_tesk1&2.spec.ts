
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
import _ from "lodash";

test("COMPARE NEW PRODUCT WITH DATA IN TABLE", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    await homePage.open(); 
    await expect(loginPage.uniqueElement).toBeVisible({timeout: 6000});
    await loginPage.fillCredentials(credentials.username, credentials.password);
    await loginPage.loginButtonClick();
  
  
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    const productFromTable = await productsListPage.getProductData(productData.name);
    const expectedProduct = _.omit(productData, ["notes", "amount"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);

    const newProduct = await productsListPage.getProductData(productData.name);
    console.log(`Created product: ${JSON.stringify(newProduct)}`);
  });