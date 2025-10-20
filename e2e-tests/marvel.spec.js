import { test, expect } from "@playwright/test";

test("navigation in marvel-app is correct", async ({ page }) => {
  // Mock the api call before navigating to the app
  await page.route("**/characters.json", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: "1", name: "Spider-Man", description: "A superhero with spider-like abilities", modified: "2022-01-03" },
        { id: "2", name: "Iron Man", description: "A billionaire industrialist and genius inventor", modified: "2022-01-03" },
        { id: "3", name: "Thor", description: "The Norse God of Thunder", modified: "2022-01-03",
            capacities: {
                force: 4,
                intelligence: 3,
                durability: 3,
                energy: 1,
                speed: 2
            }
         },
        { id: "4", name: "Hulk", description: "A scientist with anger management issues", modified: "2022-01-03" },
        { id: "5", name: "Black Widow", description: "A skilled spy and assassin", modified: "2022-01-03" },
      ]),
    });
  });

  await page.goto("http://localhost:5173");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Marvel App/);

  // click on Thor element and expect to navigate to Thor page
  await page.click("text=Thor");
  await expect(page).toHaveTitle(/Thor | Marvel App/);

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
