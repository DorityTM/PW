import { test, expect } from "fixtures/business.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import _ from "lodash"; 

test.describe("[Sales Portal] [Products] [E2E - CRUD]", async () => {
  let id = "";
  let token = "";

    test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

   test("Edit Product", async ({
    loginUIService,
    productsApiService,
    productsListUIService,
    productsListPage,
    editProductPage
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await productsListUIService.open();
    await productsListPage.clickAction(createdProduct.name, "edit");
    await editProductPage.waitForOpened()
    const newProductData = generateProductData();
    await editProductPage.fillForm(newProductData);
    await editProductPage.clickSave();
      
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_UPDATED);
    await expect(productsListPage.tableRowByName(newProductData.name)).toBeVisible();
    const editedProductTableData = _.omit(await productsListPage.getProductData(newProductData.name), ["createdOn"]);
    expect(editedProductTableData).toEqual(_.omit(newProductData, ["amount", "notes"]));
    await productsListPage.clickAction(newProductData.name, "details");

    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = _.omit(await detailsModal.getData(), ["createdOn"]);
    expect(actual).toEqual(newProductData);
  });
});