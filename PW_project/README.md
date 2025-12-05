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
- **📈 Advanced Reporting**: HTML reports, Allure integration
- **🔧 Test Fixtures**: Business logic and API service fixtures
- **🏷️ Test Tagging**: Smoke, regression, E2E test categorization
- **🎨 Visual Testing**: Screenshot comparisons
- **📝 Detailed Logging**: Step-by-step test execution tracking
- **🔒 Authentication**: Secure login service with token management

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | 1.56.0 | Test automation framework |
| **TypeScript** | 5.9.3 | Programming language |
| **Faker.js** | 10.1.0 | Test data generation |
| **Lodash** | 4.17.21 | Utility functions |
| **Allure** | 3.4.2 | Test reporting |
| **ESLint** | 9.38.0 | Code linting |
| **Prettier** | 3.6.2 | Code formatting |
| **Husky** | 9.1.7 | Git hooks |

## 📁 Project Structure

```
PW_project/
├── 📁 src/
│   ├── 📁 api/                    # API service layer
│   │   └── 📁 services/           # API service implementations
│   ├── 📁 config/                 # Configuration files
│   │   ├── apiConfig.ts          # API endpoints configuration
│   │   └── env.ts                # Environment variables
│   ├── 📁 data/                   # Test data and types
│   │   ├── 📁 salesPortal/        # Sales portal specific data
│   │   ├── 📁 schemas/            # JSON schemas for validation
│   │   ├── 📁 types/              # TypeScript type definitions
│   │   ├── statusCodes.ts         # HTTP status codes
│   │   └── tags.ts                # Test tags
│   ├── 📁 fixtures/               # Test fixtures
│   │   ├── api.fixture.ts         # API test fixtures
│   │   └── business.fixture.ts    # UI test fixtures
│   ├── 📁 tests/                  # Test suites
│   │   ├── 📁 api/                # API tests
│   │   │   └── 📁 products/       # Product API tests
│   │   └── 📁 ui/                 # UI tests
│   │       └── 📁 sales-portal/   # Sales portal UI tests
│   ├── 📁 ui/                     # Page Objects and UI services
│   │   ├── 📁 pages/              # Page Object Model
│   │   └── 📁 service/            # UI business logic services
│   └── 📁 utils/                  # Utility functions
│       ├── 📁 report/             # Reporting utilities
│       └── 📁 validation/         # Validation helpers
├── 📁 allure-results/             # Allure test results
├── 📁 playwright-report/          # Playwright HTML reports
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── .env.dist                     # Environment template
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

- **🖥️ Desktop**: Chrome, Firefox, Safari, Edge
- **📱 Mobile**: Mobile Chrome, Mobile Safari
- **🔧 API**: Dedicated API testing project

## 🧪 Running Tests

### All Tests
```bash
npm test                    # Run all tests
npm run test:ui            # Run UI tests only
```

### Test Categories
```bash
npm run test:ui:smoke      # Smoke tests
npm run test:ui:regression # Regression tests
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
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"
npx playwright test --grep "@e2e"
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
    const response = await this.interceptResponse();
    return response.body.Product;
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

**Tatsiana Davidziuk**

---

**Happy Testing! 🚀**