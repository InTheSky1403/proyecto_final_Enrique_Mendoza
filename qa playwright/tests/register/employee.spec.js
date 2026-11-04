import { test, expect } from "../fixtures";

test.describe("Registro de Empleado", () => {
  test("Agregar un empleado correctamente", async ({
    loginPage,
    credentials,
    homePage,
    pimPage,
    employeePage,
  }) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(loginPage.page).toHaveURL('/web/index.php/dashboard/index');
    await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
    await homePage.linkPIM();
    await expect(pimPage.buttonUpgrade).toBeVisible();
    await pimPage.linkEmployeeList();
    await expect(employeePage.buttonCancel).toBeVisible();
    await employeePage.completeForm();
  });

  test("Nombre con más de 30 caracteres", async ({
    loginPage,
    credentials,
    homePage,
    pimPage,
    employeePage,
  }) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(loginPage.page).toHaveURL('/web/index.php/dashboard/index');
    await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
    await homePage.linkPIM();
    await expect(pimPage.buttonUpgrade).toBeVisible();
    await pimPage.linkEmployeeList();
    await expect(employeePage.buttonCancel).toBeVisible();
    await employeePage.completeFormMaxCharactersName();
  });

  test("Nombre con valor nulo", async ({
    loginPage,
    credentials,
    homePage,
    pimPage,
    employeePage,
  }) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(loginPage.page).toHaveURL('/web/index.php/dashboard/index');
    await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
    await homePage.linkPIM();
    await expect(pimPage.buttonUpgrade).toBeVisible();
    await pimPage.linkEmployeeList();
    await expect(employeePage.buttonCancel).toBeVisible();
    await employeePage.completeFormNullName();
  });
});
