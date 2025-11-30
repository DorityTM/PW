import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { TAGS } from "data/tags";

test.describe("[API] [SALES PORTAL] [LOGIN]", () => {
  test("Login API", { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.API, TAGS.AUTH] }, async ({ loginApi }) => {
    const loginResponse = await loginApi.login(credentials);

    validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const loginBody = loginResponse.body;
    expect.soft(loginBody.User.username).toBe(credentials.username);

    const headers = loginResponse.headers;
    expect(headers["authorization"]).toBeTruthy();
  });
});
