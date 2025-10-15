// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

import test, { expect } from "@playwright/test";
interface ICredentials {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string | number;
  country: COUNTRY[];
  gender: gender;
  hobbies: HOBBIES[];
  language: string[];
  skills: SKILLS[];
  birthDate: {
    year: string | number;
    month: string;
    day: string | number;
  };
  password: string;
  confirmPassword: string;
}


enum COUNTRY {
  USA = "USA",
  CANADA = "Canada",
  UK = "UK",
}

type gender = "male" | "female";

enum HOBBIES {
  TRAVELLING = "Travelling",
  MOVIES = "Movies",
  SPORTS = "Sports",
  GAMING = "Gaming",
  DANCING = "Dancing",
}

enum SKILLS {
  JAVASCRIPT = "JavaScript",
  PYTHON = "Python",
  JAVA = "Java",
  C_PLUS_PLUS = "C++",
  RUBY = "Ruby",
}


test.describe("[EXTENDED REGISTERATION FORM] [VALID CREDENTIALS]", () => {

const validCredentials: ICredentials = {
  firstName: "Qa",
  lastName: "Manul",
  address: "234 E 24TH ST NEW YORK NY 10010-3948A",
  email: "qa.manul@example.com",
  phone: "48569458299",
  country: [COUNTRY.USA],
  gender: "female",
  hobbies: [HOBBIES.TRAVELLING, HOBBIES.GAMING],
  language: ["English", "Spanish"],
  skills: [SKILLS.JAVASCRIPT],
  birthDate: {
    year: "2000",
    month: "May",
    day: "3",
  },
  password: "YaNeVdupliayu007",
  confirmPassword: "YaNeVdupliayu007"
  };

    test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    await page.goto(url);
  });


  test("[EXTENDED REGISTERATION FORM] [VALID CREDENTIALS]", async ({ page }) => {

    const registrationForm = page.locator("#registrationForm")
    const firstNameField = page.locator("#firstName");
    const lastNameField = page.locator("#lastName");
    const addressField = page.locator("#address");
    const emailField = page.locator("#email");
    const phoneField = page.locator("#phone");
    const countryField = page.locator("#country");
    const genderRadioBtn = page.locator(`//input[@value="${validCredentials.gender}"]`);
    const languageField = page.locator("#language");
    const skillsSelect= page.locator("#skills");
    const birthYearSelect = page.locator("#year");
    const birthMonthSelect = page.locator("#month");
    const birthDaySelect = page.locator("#day");
    const passwordField = page.locator("#password");
    const confirmPasswordField = page.locator("#password-confirm");
    const submitButton = page.locator("//*[contains(@class, 'btn btn-primary')]");
    const succesPage = page.locator("h2");

    const fullNameRegistered = page.locator("#fullName");
    const addressRegistered = page.locator("#address");
    const emailRegistered = page.locator("#email");
    const phoneRegistered = page.locator("#phone");
    const countryRegistered = page.locator("#country");
    const genderRegistered = page.locator("#gender");
    const languageRegistered = page.locator("#language");
    const skillsRegistered = page.locator("#skills");
    const hobbiesRegistered = page.locator("#hobbies");
    const dateOfBirthRegistered = page.locator("#dateOfBirth");
    const passwordRegistered = page.locator("#password");

    await firstNameField.fill(validCredentials.firstName);
    await lastNameField.fill(validCredentials.lastName);
    await addressField.fill(validCredentials.address);
    await emailField.fill(validCredentials.email);
    await phoneField.fill(validCredentials.phone.toString());
    await countryField.selectOption(validCredentials.country);
    await genderRadioBtn.check();
    
    for (const hobbySelect of validCredentials.hobbies) {
        await page.locator(`//input[@class="hobby"and @value="${hobbySelect}"]`).check();
    }
    await languageField.fill(validCredentials.language.join(", "));
    await skillsSelect.selectOption(validCredentials.skills);
    await birthYearSelect.selectOption(validCredentials.birthDate.year.toString());
    await birthMonthSelect.selectOption(validCredentials.birthDate.month);
    await birthDaySelect.selectOption(validCredentials.birthDate.day.toString());
    await passwordField.fill(validCredentials.password);
    await confirmPasswordField.fill(validCredentials.confirmPassword);
    await submitButton.click();
    await expect(succesPage).toHaveText("Registration Details");

    await expect(fullNameRegistered).toHaveText(validCredentials.firstName + " " + validCredentials.lastName);
    await expect(addressRegistered).toHaveText(validCredentials.address);
    await expect(emailRegistered).toHaveText(validCredentials.email);
    await expect(phoneRegistered).toHaveText(validCredentials.phone.toString());
    await expect(countryRegistered).toHaveText(validCredentials.country);
    await expect(genderRegistered).toHaveText(validCredentials.gender);
    await expect(languageRegistered).toHaveText(validCredentials.language.join(", "));
    await expect(skillsRegistered).toHaveText(validCredentials.skills);
    await expect(hobbiesRegistered).toHaveText(validCredentials.hobbies.join(", "));
    await expect(dateOfBirthRegistered).toHaveText(validCredentials.birthDate.day + " " + validCredentials.birthDate.month + " " + validCredentials.birthDate.year);
    await expect(passwordRegistered).toHaveText("*".repeat(validCredentials.password.length));

  });
});
