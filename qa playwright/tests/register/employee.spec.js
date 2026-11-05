import { test, expect } from "../fixtures";
import employeesData from "../../test-data/data-employees.json";

test.describe("Registro de Empleado", () => {
for (const emp of employeesData) {
    test(`Registrar empleado exitosamente: ${emp.id} - ${emp.firstName}`, async ({
      loginPage,
      credentials,
      homePage,
      pimPage,
      employeePage,
    }) => {
      // 1. Iniciar sesión
      await loginPage.login(credentials.username, credentials.password);
      await expect(loginPage.page).toHaveURL('/web/index.php/dashboard/index');
      await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
      await homePage.linkPIM();
      await expect(pimPage.buttonUpgrade).toBeVisible();
      await pimPage.linkEmployeeList();
      await expect(employeePage.buttonCancel).toBeVisible();
      await employeePage.completeForm(emp.firstName, emp.lastName);
    });
  }

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
