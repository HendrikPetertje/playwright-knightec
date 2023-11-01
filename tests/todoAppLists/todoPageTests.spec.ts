import { Page, expect, test } from "@playwright/test";
import { provisionData } from "./shared.steps";

/**
  * XID001 Todo list page.
  *
  * Adding todos
  * as an employee
  * given that data is provisioned
  * when i visit the todo page
  * I should be able to create new todos
  * // and they should be saved in the backend
  */

const whenIVisitTheTodoPage = (page: Page) => test.step('when i visit the todo page', async () => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  // expect page title
  await expect(page).toHaveTitle('React • TodoMVC');
})

test.describe('Todo list page', () => {
  test('XID001.001 Adding todos', async ({ page }) => {
    await provisionData(page);

    await whenIVisitTheTodoPage(page);

    await test.step('I should be able to create new todos', async () => {
      await page.getByPlaceholder('What needs to be done?').click();
      await page.getByPlaceholder('What needs to be done?').fill('hello world!');
      await page.getByPlaceholder('What needs to be done?').press('Enter');
      await page.getByPlaceholder('What needs to be done?').fill('item two.');
      await page.getByPlaceholder('What needs to be done?').press('Enter');

      const itemOne = page.getByText('hello world!')
      const itemTwo = page.getByText('item two.')
      expect(await itemOne.isVisible()).toBeTruthy();
      expect(await itemTwo.isVisible()).toBeTruthy();
    });
  });

  test('XID001.002 Visual look and feel', async ({ page }) => {
    await provisionData(page);
    await whenIVisitTheTodoPage(page);

    test.step('It should match the design that we set in the team', async () => {
      // You should run your test suite in docker, especially when making screenshots.
      // check out how here: https://playwright.dev/docs/test-snapshots
      expect(await page.screenshot()).toMatchSnapshot();
    });
  })
});
