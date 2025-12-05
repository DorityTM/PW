import { expect, test } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { STATUS_CODES } from "data/statusCodes";
import { TIMEOUT_30_S } from "data/salesPortal/constants";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", () => {
  let id = "";
  let token = "";
  // test with UI servises version
  test(
    "Delete",
    { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.INTEGRATION, TAGS.API, TAGS.PRODUCTS] },
    async ({ productsListUIService, addNewProductUIService, productsListPage, productsApi }) => {
      token = await productsListPage.getAuthToken();
      await addNewProductUIService.open();
      const createdProduct = await addNewProductUIService.create();
      await expect(productsListPage.toastMessage).not.toBeVisible({ timeout: TIMEOUT_30_S });
      id = createdProduct._id;
      await productsListUIService.deleteProduct(createdProduct.name);
      const deleted = await productsApi.getById(createdProduct._id, token);
      expect(deleted.status).toBe(STATUS_CODES.NOT_FOUND);
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).not.toBeVisible();

      /*
    login => get token
    create product via api
    go to products list page
    open delete modal
    delete product
    verify deleted
    */
    },
  );

  // test with API version
  test.skip(
    "Delete OLD",
    { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.INTEGRATION, TAGS.API, TAGS.PRODUCTS] },
    async ({
      loginUIService,
      productsListUIService,
      homeUIService,
      productsApiService,
      productsListPage,
      productsApi,
    }) => {
      const token = await loginUIService.loginAsAdmin();
      const createdProduct = await productsApiService.create(token);
      await homeUIService.openModule("Products");
      await productsListUIService.deleteProduct(createdProduct.name);
      const deleted = await productsApi.getById(createdProduct._id, token);
      expect(deleted.status).toBe(STATUS_CODES.NOT_FOUND);
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).not.toBeVisible();

      /*
    login => get token
    create product via api
    go to products list page
    open delete modal
    delete product
    verify deleted
    */
    },
  );
});
