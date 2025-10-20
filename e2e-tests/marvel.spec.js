import { test, expect } from "@playwright/test";

test("navigation in marvel-app is correct", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Marvel App/);

  // click on Beast element and expect to navigate to Beast page
  await page.click("text=Beast");
  await expect(page).toHaveTitle(/ Beast | Marvel App/);

  // click on Home element and expect to navigate to Home page
  await page.click("text=Home");
  await expect(page).toHaveTitle(/Marvel App/);

  // click on About element and expect to navigate to About page
  await page.click("text=About");
  await expect(page).toHaveTitle(/About | Marvel App/);

  // click on Contact element and expect to navigate to Contact page
  await page.click("text=Contact");
  await expect(page).toHaveTitle(/Contact | Marvel App/);
});
