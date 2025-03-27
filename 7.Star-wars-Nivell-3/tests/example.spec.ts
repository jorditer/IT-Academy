import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  });
  // Test title
  test("should have the correct elements", async ({ page }) => {
    await expect(page).toHaveTitle("Star Wars");

    // Test elements
    await expect(page.locator('img[src="/src/imgs/logo.svg"]')).toBeVisible();
    await expect(page.getByRole("link", { name: "HOME" })).toBeVisible();
  });

  // Test navigation
  test("should navigate to the Email page", async ({ page }) => {
    await page.getByRole("link", { name: "LOGIN" }).click();

    // Test URL
    await expect(page).toHaveURL("http://localhost:5173/email");

    // Test placeholder
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
  });

  // Test Login
  test("should login with valid email", async ({ page }) => {
    await page.getByRole("link", { name: "LOGIN" }).click();
    await page.getByPlaceholder("Enter your email").fill("asdf@gmail.com");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByPlaceholder("Password")).toBeVisible();

    await expect(page.locator("p")).toHaveText("Log in using asdf@gmail.com and your password");
  });
});
