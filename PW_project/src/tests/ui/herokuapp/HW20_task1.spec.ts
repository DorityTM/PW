// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from "@playwright/test";

test("DYNAMIC CONTROLS", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    const dynamicControlLink = page.locator("//a[@href = '/dynamic_controls' and text()='Dynamic Controls']");
    const heading = page.getByRole("heading", {
      level: 4,
    });

    const checkbox = page.locator("input[type='checkbox']");
    const subTitle = page.locator("#content .example > p"); 
    const сtaRemove = page.locator("button:text('Remove')");
    const сtaAdd = page.locator("button:text('Add')");
    const notifications = page.locator("#message");

     {
        await page.goto(url);
        await dynamicControlLink.click();
        await expect(сtaRemove).toBeVisible({timeout: 30000});
        await expect(heading.nth(0)).toHaveText("Dynamic Controls");
        await expect(subTitle).toHaveText("This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.");
        await checkbox.check();
        await сtaRemove.click();
        await expect(checkbox).toBeHidden({timeout: 30000});
        await expect(сtaAdd).toBeVisible({timeout: 30000});
        await expect(notifications).toHaveText("It's gone!");
        await сtaAdd.click();
        await expect(checkbox).toBeVisible({timeout: 30000});
        await expect(notifications).toHaveText("It's back!");
     }
});