import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import _ from "lodash";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Customers]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });

  test(
    "Add new customer - E2E",
    { tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.UI, TAGS.INTEGRATION, TAGS.CUSTOMERS] },
    async ({ addNewCustomerUIService, customersListPage }) => {
      token = await customersListPage.getAuthToken();
      await addNewCustomerUIService.open();
      const createdCustomer = await addNewCustomerUIService.create();
      id = createdCustomer._id;
      await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
      await expect(customersListPage.tableRowByEmail(createdCustomer.email)).toBeVisible();
    },
  );
});