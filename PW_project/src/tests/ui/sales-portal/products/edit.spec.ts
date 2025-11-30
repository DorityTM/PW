import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TIMEOUT_30_S } from "data/salesPortal/constants";
import _ from "lodash";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products] [E2E - CRUD]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

    test(
    "Edit Product",
    { tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.UI, TAGS.INTEGRATION, TAGS.PRODUCTS] },
    async ({ addNewProductUIService, productsListUIService,productsListPage , editProductPage }) => {
      token = await productsListPage.getAuthToken();
      await addNewProductUIService.open();
      const createdProduct = await addNewProductUIService.create();
      id = createdProduct._id;
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();
      await expect(productsListPage.toastMessage).not.toBeVisible({ timeout: TIMEOUT_30_S });

      await productsListUIService.open();
      await productsListPage.clickAction(createdProduct.name, "edit");
      await editProductPage.waitForOpened();
      const newProductData = generateProductData();
      await editProductPage.fillForm(newProductData);
      await editProductPage.clickSave();
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_UPDATED);
      await expect(productsListPage.toastMessage).not.toBeVisible({ timeout: TIMEOUT_30_S });

      const editedProductTableData = await productsListPage.getProductData(newProductData.name);
      const tableDataForComparison = _.omit(editedProductTableData, ["createdOn"]);
      const newProductDataForComparison = _.omit(newProductData, ["notes", "amount"]);
      expect(tableDataForComparison).toEqual(newProductDataForComparison);
      
      await productsListPage.clickAction(newProductData.name, "details");
      await productsListPage.detailsModal.waitForOpened();
      
      const detailsModalData = await productsListPage.detailsModal.getData();
      const detailsDataForComparison = _.omit(detailsModalData, ["_id", "createdOn"]);
      expect(detailsDataForComparison).toEqual(newProductData);
    },
  );

  // test(
  //   "Edit Product OLD",
  //   { tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.UI, TAGS.INTEGRATION, TAGS.PRODUCTS] },
  //   async ({ loginUIService, productsApiService, productsListUIService, productsListPage, editProductPage }) => {
  //     token = await loginUIService.loginAsAdmin();
  //     const createdProduct = await productsApiService.create(token);
  //     id = createdProduct._id;
  //     await productsListUIService.open();
  //     await productsListPage.clickAction(createdProduct.name, "edit");
  //     await editProductPage.waitForOpened();
  //     const newProductData = generateProductData();
  //     await editProductPage.fillForm(newProductData);
  //     await editProductPage.clickSave();

  //     await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_UPDATED);
  //     await expect(productsListPage.tableRowByName(newProductData.name)).toBeVisible();
  //     const editedProductTableData = _.omit(await productsListPage.getProductData(newProductData.name), ["createdOn"]);
  //     expect(editedProductTableData).toEqual(_.omit(newProductData, ["amount", "notes"]));
  //     await productsListPage.clickAction(newProductData.name, "details");

  //     const { detailsModal } = productsListPage;
  //     await detailsModal.waitForOpened();
  //     const actual = _.omit(await detailsModal.getData(), ["createdOn"]);
  //     expect(actual).toEqual(newProductData);
  //   },
  // );
});
