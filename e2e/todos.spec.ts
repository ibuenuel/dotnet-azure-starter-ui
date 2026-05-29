import { test, expect } from "@playwright/test";

test.describe("Todos", () => {
  test("can view the todo list page", async ({ page }) => {
    await page.goto("/todos");
    await expect(page.getByRole("button", { name: /new todo/i })).toBeVisible();
    await expect(page.getByText(/todos/i).first()).toBeVisible();
  });

  test("can create a todo and see it in the list", async ({ page }) => {
    await page.goto("/todos");
    await page.getByRole("button", { name: /new todo/i }).click();
    await page.getByLabel("Title").fill("E2E Test Todo");
    await page.getByRole("button", { name: /create todo/i }).click();
    await expect(page.getByText("E2E Test Todo")).toBeVisible();
  });

  test("can edit a todo title", async ({ page }) => {
    await page.goto("/todos");
    await page.getByRole("button", { name: /new todo/i }).click();
    await page.getByLabel("Title").fill("Todo To Edit");
    await page.getByRole("button", { name: /create todo/i }).click();
    await expect(page.getByText("Todo To Edit")).toBeVisible();
    await page
      .getByRole("link", { name: /details/i })
      .first()
      .click();
    await page.getByRole("button", { name: /edit/i }).click();
    await page.getByLabel("Title").clear();
    await page.getByLabel("Title").fill("Edited Todo");
    await page.getByRole("button", { name: /save changes/i }).click();
    await expect(page.getByText("Edited Todo")).toBeVisible();
  });

  test("can delete a todo and be redirected to the list", async ({ page }) => {
    await page.goto("/todos");
    await page.getByRole("button", { name: /new todo/i }).click();
    await page.getByLabel("Title").fill("Todo To Delete");
    await page.getByRole("button", { name: /create todo/i }).click();
    await expect(page.getByText("Todo To Delete")).toBeVisible();
    await page
      .getByRole("link", { name: /details/i })
      .first()
      .click();
    await page.getByRole("button", { name: /^delete$/i }).click();
    await expect(page).toHaveURL(/\/todos$/);
  });
});
