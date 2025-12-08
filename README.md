# Sales Portal Test Automation Framework

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.56.0-green.svg)](https://playwright.dev/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A comprehensive test automation framework built with **Playwright** and **TypeScript** for testing the Sales Portal application. This framework supports both **UI** and **API** testing with data-driven testing (DDT) capabilities, visual regression testing, and comprehensive reporting.

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Data Management](#-test-data-management)
- [Page Object Model](#-page-object-model)
- [API Testing](#-api-testing)
- [Reporting](#-reporting)
- [Code Quality](#-code-quality)
- [Contributing](#-contributing)

## ✨ Features

- **🎭 Cross-browser Testing**: Chrome, Firefox, Safari, and Edge support
- **📱 Mobile Testing**: Mobile browser emulation
- **🔄 API & UI Testing**: Comprehensive test coverage
- **📊 Data-Driven Testing**: DDT approach with test case arrays
- **🎯 Page Object Model**: Maintainable and scalable test structure
- **📈 Advanced Reporting**: HTML reports, Allure integration with environment info
- **🔧 Test Fixtures**: Business logic and API service fixtures
- **🏷️ Test Tagging**: Comprehensive tagging system (@smoke, @regression, @e2e, @api, @ui, @integration, @products, @customers, @orders)
- **🎨 Visual Testing**: Screenshot comparisons and video recording
- **📝 Detailed Logging**: Step-by-step test execution tracking with @logStep decorator
- **🔒 Authentication**: Secure login service with token management and storage state
- **⚡ Test Setup**: Automated authentication setup with session persistence
- **🏗️ Modular Architecture**: Separate services for different business domains
- **🔍 Schema Validation**: JSON schema validation for API responses
- **📦 Mock Data**: Test data generators for products, customers, and metrics

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | 1.56.0 | Test automation framework |
| **TypeScript** | 5.9.3 | Programming language |
| **Faker.js** | 10.1.0 | Test data generation |
| **Lodash** | 4.17.21 | Utility functions |
| **Allure** | 3.4.2 | Test reporting |
| **AJV** | 8.17.1 | JSON schema validation |
| **BSON** | 7.0.0 | MongoDB object serialization |
| **Moment.js** | 2.30.1 | Date manipulation |
| **ESLint** | 9.38.0 | Code linting |
| **Prettier** | 3.6.2 | Code formatting |
| **Husky** | 9.1.7 | Git hooks |

## 📁 Project Structure

```
PW_project/
├── 📁 src/
│   ├── 📁 .auth/                  # Authentication storage
│   │   └── user.json             # User session state
│   ├── 📁 api/                    # API service layer
│   │   └── 📁 services/           # API service implementations
│   ├── 📁 config/                 # Configuration files
│   │   ├── apiConfig.ts          # API endpoints configuration
│   │   └── env.ts                # Environment variables
│   ├── 📁 data/                   # Test data and types
│   │   ├── 📁 salesPortal/        # Sales portal specific data
│   │   │   ├── 📁 products/       # Product-related data
│   │   │   ├── 📁 customers/      # Customer-related data
│   │   │   ├── 📁 metrics/        # Metrics-related data
│   │   │   ├── constants.ts       # Application constants
│   │   │   ├── notifications.ts   # Notification messages
│   │   │   └── errors.ts          # Error messages
│   │   ├── 📁 schemas/            # JSON schemas for validation
│   │   ├── 📁 types/              # TypeScript type definitions
│   │   ├── statusCodes.ts         # HTTP status codes
│   │   └── tags.ts                # Test tags enum
│   ├── 📁 fixtures/               # Test fixtures
│   │   ├── api.fixture.ts         # API test fixtures
│   │   ├── business.fixture.ts    # UI test fixtures
│   │   ├── pages.fixture.ts       # Page fixtures
│   │   ├── mock.fixture.ts        # Mock data fixtures
│   │   └── index.ts              # Fixture exports
│   ├── 📁 mock/                   # Mock data and responses
│   ├── 📁 tests/                  # Test suites
│   │   ├── 📁 api/                # API tests
│   │   │   ├── 📁 products/       # Product API tests
│   │   │   └── 📁 login/          # Login API tests
│   │   └── 📁 ui/                 # UI tests
│   │       ├── 📁 sales-portal/   # Sales portal UI tests
│   │       │   ├── 📁 products/   # Product UI tests
│   │       │   ├── 📁 customers/  # Customer UI tests
│   │       │   ├── 📁 metrics/    # Metrics UI tests
│   │       │   ├── 📁 integration/# Integration tests
│   │       │   └── ui.setup.ts    # UI test setup
│   │       ├── 📁 login_form_ak/  # Login form tests
│   │       └── 📁 herokuapp/      # External site tests
│   ├── 📁 ui/                     # Page Objects and UI services
│   │   ├── 📁 pages/              # Page Object Model
│   │   │   ├── 📁 products/       # Product pages
│   │   │   ├── 📁 customers/      # Customer pages
│   │   │   ├── base.page.ts       # Base page class
│   │   │   ├── base.modal.ts      # Base modal class
│   │   │   └── *.page.ts          # Specific pages
│   │   └── 📁 service/            # UI business logic services
│   │       ├── *.ui-service.ts    # Business logic services
│   └── 📁 utils/                  # Utility functions
│       ├── 📁 report/             # Reporting utilities
│       │   └── logStep.utils.ts   # Step logging decorator
│       ├── 📁 validation/         # Validation helpers
│       └── 📁 enum/               # Enum utilities
├── 📁 allure-results/             # Allure test results
├── 📁 playwright-report/          # Playwright HTML reports
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
├── .env.dist                     # Environment template
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DorityTM/PW.git
   cd PW_project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Setup environment variables:**
   ```bash
   cp .env.dist .env
   # Edit .env file with your credentials
   ```

5. **Run authentication setup (optional):**
   ```bash
   npx playwright test --project=setup
   ```
   This will create authenticated session state for UI tests.

## ⚙️ Configuration

### Environment Variables (.env)

```bash
# Authentication credentials
USER_NAME=your_username
USER_PASSWORD=your_password

# Application URLs
SALES_PORTAL_URL=https://your-sales-portal.com
SALES_PORTAL_API_URL=https://your-api.com
```

### Playwright Configuration

The framework supports multiple test projects:

- **🔧 Setup Project**: Automated authentication setup with session state
- **🖥️ Sales Portal UI**: Chrome browser with authenticated state (1920x1080)
- **🔌 API Tests**: Dedicated API testing project
- **🌐 Chromium**: Headless browser testing

**Key Configuration Features:**
- **Session Management**: Automatic login and session persistence
- **Parallel Execution**: 5 workers for optimal performance
- **Retry Strategy**: 1 retry locally, 2 on CI
- **Environment Integration**: Dynamic environment info in Allure reports
- **Trace Collection**: Full traces captured on test failures
- **Visual Evidence**: Screenshots and videos for debugging

## 🧪 Running Tests

### All Tests
```bash
npm test                    # Run all tests
npm run test:ui            # Run UI tests only
```

### Test Categories
```bash
npm run test:ui:smoke      # Smoke tests only
npm run test:ui:regression # Regression and smoke tests
```

### Specific Projects
```bash
# Run specific test projects
npx playwright test --project=setup              # Setup only
npx playwright test --project=sales-portal-ui    # UI tests
npx playwright test --project=api-tests          # API tests
npx playwright test --project=chromium           # Headless tests
```

### Interactive Mode
```bash
npm run ui-mode            # Playwright UI mode
```

### Specific Test Files
```bash
npx playwright test src/tests/api/products/
npx playwright test src/tests/ui/sales-portal/products/
```

### Test Tags
```bash
# Test types
npx playwright test --grep "@smoke"        # Smoke tests
npx playwright test --grep "@regression"   # Regression tests
npx playwright test --grep "@e2e"          # End-to-end tests
npx playwright test --grep "@integration"  # Integration tests

# Test layers
npx playwright test --grep "@api"          # API tests only
npx playwright test --grep "@ui"           # UI tests only

# Business domains
npx playwright test --grep "@products"     # Product-related tests
npx playwright test --grep "@customers"    # Customer-related tests
npx playwright test --grep "@orders"       # Order-related tests
npx playwright test --grep "@auth"         # Authentication tests

# Combined tags
npx playwright test --grep "@smoke.*@products"  # Smoke tests for products
npx playwright test --grep "@api.*@regression"  # API regression tests
```

## 📊 Test Data Management

### Data-Driven Testing (DDT)

The framework uses DDT approach with predefined test case arrays:

```typescript
// Example: Product test cases
export const addNewProductPositiveTC: ICreateNewProductTC[] = [
  {
    title: "Add a new product with valid name (3 characters)",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 3 }) }),
    expectedStatus: STATUS_CODES.CREATED
  },
  // ... more test cases
];
```

### Test Data Generation

Using Faker.js for dynamic test data:

```typescript
export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}
```

## 🏗️ Page Object Model

### Page Structure

```typescript
export class ProductsListPage extends BasePage {
  // Locators
  private addNewProductButton = this.page.locator('[data-testid="add-product"]');
  private productTable = this.page.locator('[data-testid="products-table"]');
  
  // Actions
  async clickAddNewProduct(): Promise<void> {
    await this.addNewProductButton.click();
  }
  
  // Assertions
  async getProductData(productName: string): Promise<IProduct> {
    // Implementation
  }
}
```

### UI Services

Business logic separated into service classes:

```typescript
export class AddNewProductUIService {
  @logStep("CREATE NEW PRODUCT")
  async create(productData?: Partial<IProduct>) {
    const data = generateProductData(productData);
    await this.addNewProductPage.fillForm(data);
    const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
      apiConfig.endpoints.products,
      this.addNewProductPage.clickSave.bind(this.addNewProductPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }

  @logStep("OPEN ADD NEW PRODUCT PAGE")
  async open() {
    await this.addNewProductPage.open("products/add");
    await this.addNewProductPage.waitForOpened();
  }
}
```

## 🔌 API Testing

### API Service Layer

```typescript
export class ProductsApiService {
  async create(productData: IProduct, token: string): Promise<IProductResponse> {
    const response = await this.apiClient.post('/api/products', {
      data: productData,
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  }
}
```

### Schema Validation

Using AJV for response validation:

```typescript
import { validateResponse } from "utils/validation/validateResponse.utils";

const response = await productsApi.create(productData, token);
validateResponse(response, {
  status: STATUS_CODES.CREATED,
  schema: createProductSchema,
  IsSuccess: true,
});
```

## 📈 Reporting

### HTML Reports
```bash
npm run html-report-open   # Open Playwright HTML report
```

### Allure Reports
```bash
npm run allure-report      # Generate Allure report
npm run allure-report-open # Generate and open Allure report
```

### Screenshots and Videos

- **Screenshots**: Captured on test failures
- **Videos**: Recorded for failed tests
- **Traces**: Full interaction traces for debugging

## 🔍 Code Quality

### Linting & Formatting
```bash
npm run lint               # Check code style
npm run lint:fix           # Fix linting issues
npm run prettier           # Check formatting
npm run prettier:fix       # Fix formatting
npm run format:fix         # Fix both linting and formatting
```

### Pre-commit Hooks

Husky automatically runs code quality checks before commits:
- ESLint validation
- Prettier formatting
- TypeScript compilation

### Git Workflow

The framework follows Git Flow with feature branches and pull requests.

## 🧪 Test Examples

### API Test Example
```typescript
test("Create Product", async ({ loginApiService, productsApi }) => {
  const token = await loginApiService.loginAsAdmin();
  const productData = generateProductData();
  const response = await productsApi.create(productData, token);
  
  validateResponse(response, {
    status: STATUS_CODES.CREATED,
    schema: createProductSchema
  });
});
```

### UI Test Example
```typescript
test("E2E Product Creation", async ({ addNewProductUIService, productsListPage }) => {
  await addNewProductUIService.open();
  const createdProduct = await addNewProductUIService.create();
  
  await expect(productsListPage.toastMessage)
    .toContainText(NOTIFICATIONS.PRODUCT_CREATED);
  await expect(productsListPage.tableRowByName(createdProduct.name))
    .toBeVisible();
});
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Coding Standards

- Follow TypeScript best practices
- Use Page Object Model pattern
- Write descriptive test names
- Add appropriate test tags
- Include proper error handling
- Write comprehensive test documentation

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Tatsiana Davidziuk** - [GitHub Profile](https://github.com/DorityTM)

---

**Happy Testing! 🚀**
