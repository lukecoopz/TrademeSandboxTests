# Automated tests related to TradeMe Sandbox page
 Testing cases for trademe sandbox home page in text files, this is high level overview.
 Automated ui test cases as well written in Typescript using Playwright. API tests in specs/categories.spec.ts, ui tests in tests/searchBox.spec.ts.



How to run tests:
- Clone the repo
- run 'npm i' in terminal
- run 'npx playwright install' in terminal
- run 'npm run test-api' (for api test) in terminal
- run 'npm run test-ui' (for playwright ui tests) in terminal
- run 'npm run report-test-ui' to get report for ui tests after running


Need to make sure node versions are the same.

If you want to test more browsers you can change that in the playwright.config.ts.