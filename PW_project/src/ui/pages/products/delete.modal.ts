import { SalesPortalPage } from "../salesPortal.page";

export class ProductDeleteModal extends SalesPortalPage {
  readonly deleteModalContainer = this.page.locator(".modal-dialog");
  readonly title = this.deleteModalContainer.locator("h5");
  readonly closeBtn = this.deleteModalContainer.locator("button.btn-close hover-danger");
  readonly cancelBtn = this.deleteModalContainer.locator("button.btn btn-secondary");
  readonly deleteBtn = this.deleteModalContainer.locator("button[type = submit]");

  uniqueElement = this.deleteBtn;

  async clickClose() {
    await this.closeBtn.click();
  }

  async clickDelete() {
    await this.deleteBtn.click();
  }

  async clickCancel() {
    await this.cancelBtn.click();
  }

  async waitForOpened() {
    await this.uniqueElement.waitFor({ state: "visible" });
  }

  async waitForClosed() {
    await this.uniqueElement.waitFor({ state: "hidden" });
  }
}