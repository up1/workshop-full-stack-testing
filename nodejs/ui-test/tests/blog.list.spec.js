// @ts-check
const { test, expect } = require("@playwright/test");

test("Working with mock network", async ({ page }) => {
  // Mocking API
  await page.route(
    "**/api/blogs",
    async (route) => {
      const json = {
        blogCount: 2,
        body: [
          {
            id: 1,
            title: "Mock Blog from playwright test 01",
            description: "Description of blog 01",
            tags: ["tag 1", "tag 2"],
            username: "Somkiat Pui",
            createdDate: "2024/05/02",
            favoritesCount: 100,
          },
        ],
      };
      await route.fulfill({ json });
    }
  );

  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle("Home — Demo");

  await page.click("text=Sign in");
  await expect(page).toHaveTitle("Login");

  await page.click("text=Home");
  await expect(page).toHaveTitle("Home — Demo");

  await expect(page.getByTestId("blog-list-item").locator("//a/h1")).toHaveText(
    "Mock Blog from playwright test 01"
  );
  await expect(page.getByTestId("blog-list-item").locator("//a/p")).toHaveText(
    "Description of blog 01"
  );
});
