// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import { test, expect, Page } from "@playwright/test";
import { error } from "console";

async function getTableRow(page: Page, email: string) {
  const table = page.locator('#table2');

  const row = table.locator('tbody tr', { has: page.locator('td', { hasText: email }) }).first();

  if ((await row.count()) === 0) {
    throw new Error(`No row found for email: ${email}`);
  }

  const [lastName, firstName, emailCell, due, website] = await row.locator('td').allInnerTexts();

  return {
    "Last Name": lastName,
    "First Name": firstName,
    Email: emailCell,
    Due: due,
    "Web Site": website,
  };
}

// async function getTableRow(page: Page, email: string) {
//   const table = page.locator("#table2");
//   const rows = await table.locator("tbody tr").all();

//   const row = await Promise.all(
//     rows.map(async (r) => ({
//       row: r,
//       text: await r.locator("td:nth-child(3)").innerText(),
//     }))
//   ).then((arr) => arr.find(({ text }) => text === email)?.row);

//   return row
//     ? {
//         "Last Name": await row.locator("td:nth-child(1)").innerText(),
//         "First Name": await row.locator("td:nth-child(2)").innerText(),
//         Email: email,
//         Due: await row.locator("td:nth-child(4)").innerText(),
//         "Web Site": await row.locator("td:nth-child(5)").innerText(),
//       }
//     : error(`No row found for email: ${email}`);
// }

// async function getTableRow(page: Page, email: string) {
//   const table = page.locator("#table2");
//   const rows = await table.locator("tbody tr").all();

//   for (const row of rows) {
//     const emailCell = row.locator("td:nth-child(3)");
//     if (await emailCell.innerText() === email) {
//       const lastName = await row.locator("td:nth-child(1)").innerText();
//       const firstName = await row.locator("td:nth-child(2)").innerText();
//       const due = await row.locator("td:nth-child(4)").innerText();
//       const webSite = await row.locator("td:nth-child(5)").innerText();

//       return {
//         "Last Name": lastName,
//         "First Name": firstName,
//         Email: email,
//         Due: due,
//         "Web Site": webSite,
//       };
//     }
//   }
//   return error(`No row found for email: ${email}`);
// }

 test.describe("[Heroku App] Table_Example_2", async () => {
   const emails = [
     "jsmith@gmail.com",
     "fbach@yahoo.com",     
     "jdoe@hotmail.com",
     "tconway@earthlink.net",
   ];   

   const ExampleTable2 = [
      {
        "Last Name": "Smith",
        "First Name": "John",
        Email: "jsmith@gmail.com",
        Due: "$50.00",
        "Web Site": "http://www.jsmith.com",
      },
      {
        "Last Name": "Bach",
        "First Name": "Frank",
        Email: "fbach@yahoo.com",
        Due: "$51.00",
        "Web Site": "http://www.frank.com",
      },
      {
        "Last Name": "Doe",
        "First Name": "Jason",
        Email: "jdoe@hotmail.com",
        Due: "$100.00",
        "Web Site": "http://www.jdoe.com",
      },
      {
        "Last Name": "Conway",
        "First Name": "Tim",
        Email: "tconway@earthlink.net",
        Due: "$50.00",
        "Web Site": "http://www.timconway.com",
      },
    ];

  test("Get table row by email", async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/tables");

    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      const expectedRow = ExampleTable2[i]; 
      const actualRow = await getTableRow(page, email!);
      expect(actualRow).toEqual(expectedRow);
    }
  });

 });