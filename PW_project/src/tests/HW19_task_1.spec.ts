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
        // USERNAME_LENGTH = "Username should contain at least 3 characters", // > 40 are trimmed automatically
        // USERNAME_SPACES = "Prefix and postfix spaces are not allowed is username",
        // PASS_LENGTH = "Password should contain at least 8 characters", // > 20 are trimmed automatically
        // PASS_UPPERCASE = "Password must contain at least one uppercase letter", // case failed
        // PASS_SPACES = "Password must not contain spaces",
        // EMPTY_CREDS_LOGIN = "Credentials are required",
        // EMPTY_USERNAME = "Username is required",
        // EMPTY_PASS = "Password is required",
        // INVALID_CREDS_LOGIN = "Invalid credentials",
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

// Negative scenarios:
// 1. Click on the 'Register' CTA on the Login Form - Registration Form appears
// 2. Fill in the Registration Form with INVALID credentials - Username with spaces only / Username < 3 / Username > 40 / Username with spaces at the beginning and the end / Password without uppercase / Password with only uppercase / Password with spaces only / Empty Password / Password < 8 / Password > 20 / Empty Username
// 9. Fill in the Login Form with INVALID credentials - Empty Username & Password / Valid Username & Empty Password / Empty Username & Valid Password  
// 10. Click on the 'Submit' CTA on the Login Form - an error notification appears

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
    // {
    //   username: "        ", // Username with spaces only
    //   password: validCredentials.password,
    // },
    // {
    //   username: "TD", // Username < 3
    //   password: validCredentials.password,
    // },
    // {
    //   username: "Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso", // Username > 40
    //   password: validCredentials.password,
    // },
    // {
    //   username: " MadManul ", // Username with spaces at the beginning and the end
    //   password: validCredentials.password,
    // },
    // {
    //   username: validCredentials.username,
    //   password: "yanevdupliayu007", // Password without uppercase
    // },
    // {
    //   username: validCredentials.username,
    //   password: "YANEVDUPLIAYU007", // Password with only uppercase
    // },
    // {
    //   username: validCredentials.username,
    //   password: "        ", // Password with spaces only
    // },
    // {
    //   username: validCredentials.username,
    //   password: "", // Empty Password
    // },
    // {
    //   username: validCredentials.username,
    //   password: "Ya007", // Password < 8    
    // },
    // {
    //   username: validCredentials.username,
    //   password: "OdnaGrebanayaRozaBudetTorchatIzTvoejZadnicyEsliNeDashMneDostupPryamoSejchas", // Password > 20
    // },
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

