//Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

//   Требования:
//     Страница регистрации:
//       Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//       Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//     Страница логина:
//       Username: обязательное
//       Password: обязательное

import test, { expect } from '@playwright/test';
interface ICredentials {
  username: string;
  password: string;
}


    enum NOTIFICATIONS {
        SUCCESS = "Successfully registered! Please, click Back to return on login page",
        EMPTY_CREDS_REGISTRATION = "Please, provide valid data",
        USER_EXISTS = "Username is in use",
    }

// Positive scenarios:
// 1. Click on the 'Register' CTA on the Login Form - Registration Form appears
// 2. Fill in the Registration Form with VALID credentials - Username, Password 
// 3. Click on the 'Register' CTA on the Registration Form - the user is registered, a success notification appears
// 4. Click on the 'Back' CTA - the Login Form appears
// 5. Fill in the Login Form with the same credentials as used for registration - Username, Password
// 6. Click on the 'Submit' CTA on the Login Form - the user is logged in, the page with success message appears
// 7. Verify that the Success Page contains a 'Back' button
// 8. Click on the 'Back' button on the Success Page - the user is returned to the Login Form

test.describe("[Login form][SMOKE]", () => {

    const validCredentials: ICredentials = {
        username: "MadManul",
        password: "YaNeVdupliayu007"
    }

    const invalidCredentials: readonly ICredentials[] = [
    {
      username: "", // Empty Username
      password: "", // Empty Password
    },
  ];

test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const registerLink = page.locator('#registerOnLogin');
    await page.goto(url);
    await registerLink.click();
 
});

test("REGISTER with VALID credentials", async ({ page }) => {
    
    const usernameRegister = page.locator("#userNameOnRegister");
    const passwordRegister = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const message = page.locator("#errorMessageOnRegister");
    const backButton = page.locator("#backOnRegister");

        await usernameRegister.fill(validCredentials.username);
        await passwordRegister.fill(validCredentials.password);
        await registerButton.click();
        await expect(message).toContainText(NOTIFICATIONS.SUCCESS);
        await backButton.click();
});


test("LOGIN with VALID credentials", async ({ page }) => {
    const usernameRegister = page.locator("#userNameOnRegister");
    const passwordRegister = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const message1 = page.locator("#errorMessageOnRegister");
    const backButton = page.locator("#backOnRegister");
    const usernameLogin = page.locator("#userName");
    const passwordLogin = page.locator("#password");
    const submitButton = page.locator("#submit");
    const message2 = page.locator("#successMessage");
    const backToLoginButton = page.locator("#backButton")

        await usernameRegister.fill(validCredentials.username);
        await passwordRegister.fill(validCredentials.password);
        await registerButton.click();
        await expect(message1).toContainText(NOTIFICATIONS.SUCCESS);
        await backButton.click();
        await usernameLogin.fill(validCredentials.username);
        await passwordLogin.fill(validCredentials.password);
        await submitButton.click();
        await expect(message2).toHaveText(`Hello, ${validCredentials.username}!`);
        await backToLoginButton.click();
});


test("REGISTER already existing User", async ({ page }) => {
    const usernameRegister = page.locator("#userNameOnRegister");
    const passwordRegister = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const errorMessage = page.locator("#errorMessageOnRegister");

        await usernameRegister.fill(validCredentials.username);
        await passwordRegister.fill(validCredentials.password);
        await registerButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.SUCCESS);
        await registerButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.USER_EXISTS);
   
});


test("REGISTER with EMPTY Username & Password", async ({ page }) => {
    const usernameRegister = page.locator("#userNameOnRegister");
    const passwordRegister= page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const errorMessage = page.locator("#errorMessageOnRegister");
    const { username, password } = invalidCredentials[0]!;
  
        await usernameRegister.fill(username);
        await passwordRegister.fill(password);
        await registerButton.click();
        await expect(errorMessage).toContainText(NOTIFICATIONS.EMPTY_CREDS_REGISTRATION);
});

  });