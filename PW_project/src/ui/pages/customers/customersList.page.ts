import { SalesPortalPage } from "../salesPortal.page";
import { ConfirmationModal } from "../confirmation.modal";
import { CustomerDetailsModal } from "./details.modal";
import { CustomerTableHeader, ICustomerInTable } from "data/types/customer.types";
import { COUNTRY } from "data/salesPortal/country";
export class CustomersListPage extends SalesPortalPage {
  readonly detailsModal = new CustomerDetailsModal(this.page);
  readonly deleteModal = new ConfirmationModal(this.page);

  readonly customersPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableRowByEmail = (customerEmail: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: customerEmail }) });
  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  readonly emailCell = (customerEmail: string) => this.tableRowByEmail(customerEmail).locator("td").nth(0);
  readonly nameCell = (customerEmail: string) => this.tableRowByEmail(customerEmail).locator("td").nth(1);
  readonly countryCell = (customerEmail: string) => this.tableRowByEmail(customerEmail).locator("td").nth(2);
  readonly createdOnCell = (emailOrIndex: string | number) =>
    typeof emailOrIndex === "string"
      ? this.tableRowByEmail(emailOrIndex).locator("td").nth(3)
      : this.tableRowByIndex(emailOrIndex).locator("td").nth(3);
  readonly tableHeader = this.page.locator("thead th div[current]");
  readonly tableHeaderNamed = (name: CustomerTableHeader) => this.tableHeader.filter({ hasText: name });

  readonly tableHeaderArrow = (name: CustomerTableHeader, { direction }: { direction: "asc" | "desc" }) =>
    this.page
      .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  readonly editButton = (customerEmail: string) => this.tableRowByEmail(customerEmail).getByTitle("Edit");
  readonly detailsButton = (customerEmail: string) => this.tableRowByEmail(customerEmail).getByTitle("Details");
  readonly deleteButton = (customerEmail: string) => this.tableRowByEmail(customerEmail).getByTitle("Delete");

  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-customers");

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async getCustomerData(customerEmail: string): Promise<ICustomerInTable> {
    const [email, name, country, createdOn] = await this.tableRowByEmail(customerEmail).locator("td").allInnerTexts();
    return {
     email: email!,
      name: name!,
      country: country! as COUNTRY,
      createdOn: createdOn!,
    };
  }

  async getTableData(): Promise<ICustomerInTable[]> {
    const data: ICustomerInTable[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [email, name, country, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
         email: email!,
      name: name!,
      country: country! as COUNTRY,
      createdOn: createdOn!,
      });
    }
    return data;
  }

  async clickAction(customerName: string, button: "edit" | "delete" | "details") {
    if (button === "edit") await this.editButton(customerName).click();
    if (button === "delete") await this.deleteButton(customerName).click();
    if (button === "details") await this.detailsButton(customerName).click();
  }

  async clickTableHeader(name: CustomerTableHeader) {
    await this.tableHeaderNamed(name).click();
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  async clickSearch() {
    await this.searchButton.click();
  }
}