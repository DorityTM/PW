import { ICustomerDetails } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { COUNTRY } from "data/salesPortal/country";

export class CustomerDetailsModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("#CustomerDetailsModal");

  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly editButton = this.uniqueElement.locator("button.btn-primary");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

  readonly productValue = this.uniqueElement.locator("p");

  async clickClose() {
    await this.closeButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async getData(): Promise<ICustomerDetails> {
    const [email, name, country, city, street, house, flat, phone, createdOn, notes] =
      await this.productValue.allInnerTexts();

    return {
      email: email!,
      name: name!,
      country: country! as COUNTRY,
      city: city!,
      street: street!,
      house: +house!,
      flat: +flat!,
      phone: phone!,
      createdOn: createdOn!,
      notes: notes === "-" ? "" : notes!,
    };
  }
}

