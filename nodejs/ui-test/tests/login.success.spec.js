// @ts-check
const { test, expect } = require("@playwright/test");

test("Make it work", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Home — Demo");

  // Go to sign in page.
  await page.click("text=Sign in");
  await expect(page).toHaveTitle("Login");

  // Check login form with email and password.
  await page.fill("input[name=email]", "demo@gmail.com");
  await page.fill("input[name=password]", "123456");

  // Submit the form from button Sign In
  await page.click("button:has-text('Sign In')");

  // Check menu have New blog and Settings
  await expect(page.locator("ul > li:nth-child(2) > a")).toHaveText("New Blog");
  await expect(page.locator("ul > li:nth-child(3) > a")).toHaveText("Settings");
  await expect(page.locator("ul > li:nth-child(4) > a")).toHaveText("Mockuser");
});

test("Improve with test steps", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Home — Demo");

  // Go to sign in page.
  await test.step("Go to sign in page", async () => {
    await page.click("text=Sign in");
    await expect(page).toHaveTitle("Login");
  });

  // Check login form with email and password.
  await test.step("Check login form with email and password", async () => {
    await page.fill("input[name=email]", "demo@gmail.com");
    await page.fill("input[name=password]", "123456");
    // Submit the form from button Sign In
    await page.click("button:has-text('Sign In')");
  });

  // Check menu have New blog and Settings
  await test.step("Check login form with email and password", async () => {
    await expect(page.locator("ul > li:nth-child(2) > a")).toHaveText(
      "New Blog"
    );
    await expect(page.locator("ul > li:nth-child(3) > a")).toHaveText(
      "Settings"
    );
    await expect(page.locator("ul > li:nth-child(4) > a")).toHaveText(
      "Mockuser"
    );
  });
});
