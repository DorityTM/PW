import { expect, Page } from "@playwright/test";
import { ICustomerDetails } from "data/types/customer.types";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { convertToFullDateAndTime } from "utils/date.utils";
import _ from "lodash";

export class CustomersListUIService {
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customersListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  async openAddNewCustomerPage() {
    await this.customersListPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

  async openDetailsModal(CustomerName: string) {
    await this.customersListPage.detailsButton(CustomerName).click();
    await this.customersListPage.detailsModal.waitForOpened();
  }

  async openDeleteModal(CustomerName: string) {
    await this.customersListPage.clickAction(CustomerName, "delete");
    await this.customersListPage.deleteModal.waitForOpened();
  }

  async deleteCustomer(CustomerName: string) {
    await this.customersListPage.clickAction(CustomerName, "delete");
    await this.customersListPage.deleteModal.waitForOpened();
    await this.customersListPage.deleteModal.clickConfirm();
    await this.customersListPage.deleteModal.waitForClosed();
  }

  async editCustomer(CustomerName: string) {
    await this.customersListPage.clickAction(CustomerName, "edit");
    await this.customersListPage.deleteModal.waitForOpened();
    await this.customersListPage.deleteModal.clickConfirm();
    await this.customersListPage.deleteModal.waitForClosed();
  }

  async search(text: string) {
    await this.customersListPage.fillSearchInput(text);
    await this.customersListPage.clickSearch();
    await this.customersListPage.waitForOpened();
  }

  async open() {
    await this.customersListPage.open("customers");
    await this.customersListPage.waitForOpened();
  }

  assertDetailsData(actual: ICustomerDetails, expected: ICustomerDetails) {
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn),
    });
  }

  async assertCustomerInTable(CustomerName: string, { visible }: { visible: boolean }) {
    await expect(this.customersListPage.tableRowByName(CustomerName)).toBeVisible({ visible });
  }
}