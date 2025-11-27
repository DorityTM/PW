import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";
import { TIMEOUT_30_S } from "data/salesPortal/constants";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  abstract readonly uniqueElement: Locator;

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: TIMEOUT_30_S });
    await this.waitForSpinners();
  }

  async waitForSpinners() {
    await expect(this.spinner).toHaveCount(0, { timeout: TIMEOUT_30_S });
  }

  async open(route?: string) {
    await this.page.goto(SALES_PORTAL_URL + route);
  }
}