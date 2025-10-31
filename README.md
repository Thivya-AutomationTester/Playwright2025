###  Overview ###
This is a `Playwright-based TypeScript automation project` for testing web applications with both `authenticated` and `unauthenticated` user flows. The project supports multiple browsers (Chromium, Firefox, WebKit), visual snapshot testing, and reporting with HTML for CI and Allure for local analysis.

### Project Features ###
- Supports `authenticated and unauthenticated` test scenarios.
- Supports `Chromium, Firefox, and WebKit` browsers.
- Generates `HTML reports` for CI and `Allure reports` for local viewing.
- Includes `visual snapshot testing`.
- Configured for `global setup and teardown`, e.g., pre-login for authenticated tests.
- Written in `TypeScript` for type safety and modern features.

### Folder Structure ###
```
├── githubworkflow/          # GitHub Actions workflow files
├── auth/                    # Stores authentication storageState.json
├── PageObjects/             # Page Object Model: pages, locators, methods
├── playwright-report/       # Generated HTML reports
├── tests/                   # Test scripts & snapshots
├── utils/                   # Global setup, teardown, test data, helpers
├── package.json             # NPM scripts and dependencies
├── playwright.config.ts     # Playwright configuration

```
### Test Execution ###
 ### Run Tests Dynamically for Any Project ###
  - You can run tests locally using a single command for any project. Can specify the browser by setting the BROWSER environment variable before running the test. This command will execute tests, generate Allure results, and open the Allure report automatically:
  ```
  # Set browser to Chromium and run authenticated tests
export BROWSER=chromium       # Linux / macOS
set BROWSER=chromium          # Windows PowerShell or CMD
npm run test:dynamic --project=authenticated

# Set browser to Firefox and run unauthenticated tests
export BROWSER=firefox        # Linux / macOS
set BROWSER=firefox           # Windows
npm run test:dynamic --project=unauthenticated

# Set browser to Webkit (Safari) and run authenticated tests
export BROWSER=webkit         # Linux / macOS
set BROWSER=webkit            # Windows
npm run test:dynamic --project=authenticated

```
  -  The test:dynamic script reads the BROWSER variable and the PW_PROJECT (project) variable internally, then executes the tests and generates the Allure report.
### CI Execution ###
  -  In CI, tests are executed using HTML reporter and stored separately for authenticated and unauthenticated flows:
  -  ### Run authenticated tests: ###
   ```
    npm run test:auth:chrome
   ```
   - ### Run unauthenticated tests: ###
   ```
  npm run test:unauth:chrome
   ```
   - ### output ###
      -  HTML reports are generated in the following folders:
         - playwright-report/auth → Authenticated tests
         - playwright-report/unauth → Unauthenticated tests 
### Global Setup / Teardown ### 
- utils/globalSetup.ts handles login for authenticated projects.
- Authenticated state is stored in auth/storageState.json.
- Teardown ensures cleanup after tests complete.
### Reports ### 
- HTML Reports: Saved in playwright-report/ per project.
- Allure Reports: Saved in allure-results/ → can be generated and opened using:
```
npm run allure:generate
npm run allure:open
```
- In CI (GitHub Actions), HTML reports can be uploaded as artifacts for review.
### GitHub CI Integration ### 
- The project is configured to run automatically on push to main branch.
- Workflow executes:
     - Checkout code
     - Install dependencies and browsers
     - Run tests for each project
     - Upload HTML reports as GitHub artifacts
- This allows test automation to run in CI without manual intervention.
### Notes ###
- Node.js version: 18.x–22.x
- NPM version: 10.x
- Playwright version: 1.56.1
- TypeScript-based for modern code safety
- Environment variables:
  -  `PW_PROJECT` → sets which project to run `(authenticated / unauthenticated)`
  -  `BROWSER` → sets browser type `(chromium / firefox / webkit)`
