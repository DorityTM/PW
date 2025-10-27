// Создайте e2e тест со следующими шагами:
// 1. Зайти на сайт Sales Portal
// 2. Залогиниться с вашими кредами
// 3. Перейти на страницу Products List
// 4. Перейти на станицу Add New Product
// 5. Создать продукт
// 6. Проверить наличие продукта в таблице
// 7. Кликнуть на кнопку "Delete" в таблице для созданного продукта
// 8. В модалке удаления кликнуть кнопку Yes, Delete
// 9. Дождаться исчезновения модалки и загрузки страницы
// 10. Проверить, что продукт отсутствует в таблице

// Вам понадобится:

// - PageObject модалки удаления продукта
// - Подключить модалку в PageObject страницы Products
// - Использовать фикстуры

import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TIMEOUT_10_S } from "data/salesPortal/constants";
import _ from "lodash";

let productData: ReturnType<typeof generateProductData>;

test.beforeEach(async () => {
  // ARRANGE: generate product data
  productData = generateProductData();
});

test("E2E test product creation and deletion", async ({ loginPage, homePage, productsListPage, addNewProductPage }) => {

    // ACT: login
    await homePage.open(); 
    await expect(loginPage.uniqueElement).toBeVisible();
    await loginPage.fillCredentials(credentials.username, credentials.password);
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
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.toastMessage).not.toBeVisible({ timeout: TIMEOUT_10_S });
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    // ASSERT: verify product data in the table
    const productFromTable = await productsListPage.getProductData(productData.name);
    const expectedProduct = _.omit(productData, ["notes", "amount"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);

    // LOGGING the created product data
    const newProduct = await productsListPage.getProductData(productData.name);
    console.log(`Created product: ${JSON.stringify(newProduct)}`);

    // ACT: delete the created product
    await productsListPage.waitForOpened();
    await productsListPage.clickDeleteProduct(productData.name);
    await productsListPage.deleteModal.waitForOpened();

    // ACT: delete the created product
    await productsListPage.deleteModal.clickDelete();

    // ASSERT: verify notification and deleted the product from the table
    await productsListPage.deleteModal.waitForClosed();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.toastMessage).not.toBeVisible({ timeout: TIMEOUT_10_S });
    await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();      
  });