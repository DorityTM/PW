// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

// Negative scenarios:
// 1. Click on the 'Register' CTA on the Login Form - Registration Form appears
// 2. Fill in the Registration Form with INVALID credentials - Username with spaces only / Username < 3 / Username > 40 / Username with spaces at the beginning and the end / Password without uppercase / Password with only uppercase / Password with spaces only / Empty Password / Password < 8 / Password > 20 / Empty Username
// 3. Click on the 'Register' CTA on the Registration Form - an error notification appears
// 4. Click on the 'Back' CTA - the Login Form appears


import { test, expect } from "@playwright/test";
import { invalidRegCreds } from "./users_reg_data";

test.describe("[REGISTRATION FORM][NEGATIVE]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  for (const {
    summary,
    credentials: { username, password },
    errorMessage,
  } of invalidRegCreds) {
    test(`REGISTER with INVALID credentials: ${summary}`, async ({ page }) => {
      const registerLink = page.locator("#registerOnLogin");
      const usernameRegister = page.locator("#userNameOnRegister");
      const passwordRegister = page.locator("#passwordOnRegister");
      const registerButton = page.locator("#register");
      const errMessage = page.locator("#errorMessageOnRegister");

      await page.goto(url);
      await registerLink.click();
      await usernameRegister.fill(username);
      await passwordRegister.fill(password);
      await registerButton.click();
      await expect(errMessage).toContainText(errorMessage!);
    });
  }
});             