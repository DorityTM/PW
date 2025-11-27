import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import _ from "lodash"; 


test.describe("[Sales Portal] [Customers]", async () => {
  let id = "";
  let token = "";

    test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });

  test("Add new customer - E2E", async ({
    loginUIService,
    addNewCustomerUIService,
    customersListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    await addNewCustomerUIService.open();
    const createdCustomer = await addNewCustomerUIService.create();
    id = createdCustomer._id;
    await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
    await expect(customersListPage.tableRowByEmail(createdCustomer.email)).toBeVisible();
  });
});