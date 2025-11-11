// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

import  test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateJsonSchema } from "utils/validation/validateSchema.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [SALES PORTAL] [LOGIN]", () => {
  test("Login API", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    
    const contentType = loginResponse.headers()["content-type"] ?? "";
    expect.soft(contentType).toContain("application/json");

    const loginBody = await loginResponse.json();
    validateJsonSchema(loginBody, loginSchema);

    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(loginBody.IsSuccess).toBe(true);
    expect.soft(loginBody.ErrorMessage).toBe(null);
    expect.soft(loginBody.User.username).toBe(credentials.username);

    const headers = loginResponse.headers();
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

  });
});
