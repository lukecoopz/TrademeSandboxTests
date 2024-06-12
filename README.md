# Automated tests related to TradeMe Sandbox page
 Manual testing cases for trademe sandbox home page in folder 'manual-test-docs', this is high level overview of homepage functionality.
 Automated ui test cases are written in Typescript using Playwright. API tests also written in Typescript. API tests in specs/categories.spec.ts, ui tests in tests/searchBox.spec.ts.



How to run tests:
- Clone the repo
- run 'npm i' in terminal
- run 'npx playwright install' in terminal
- run 'npm run test-api' (for api test) in terminal
- run 'npm run test-ui' (for playwright ui tests) in terminal
- run 'npm run report-test-ui' to get report for ui tests after running


Ensure node version is the same (v20.4.0)
Ensure npm version is the same (9.7.2)

If you want to test more browsers you can change that in the playwright.config.ts (currently it is defaulted to only test in Chromium).


TODO:
- add video record of tests
- improve selecting of elements on page