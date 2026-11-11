import { test, expect } from "../fixtures";
import employeesData from "../../test-data/data-employees.json";

test.describe("Registro de Empleado", () => {
for (const emp of employeesData) {
    test(`EMP004 - Registrar empleado exitosamente: ${emp.id} - ${emp.firstName}`, async ({
      loginPage,
      credentials,
      homePage,
      pimPage,
      employeePage,
    }) => {
      // 1. Iniciar sesión
      await loginPage.login(credentials.username, credentials.password);
      await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
      await homePage.linkPIM();
      await pimPage.linkEmployeeList();
      await expect(employeePage.buttonCancel).toBeVisible();
      await employeePage.completeFormJson(emp.firstName, emp.lastName, emp.employeeId);
    });
  }

  test("EMP005 - Nombre con más de 30 caracteres", async ({
    loginPage,
    credentials,
    homePage,
    pimPage,
    employeePage,
  }) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
    await homePage.linkPIM();
    await pimPage.linkEmployeeList();
    await expect(employeePage.buttonCancel).toBeVisible();
    await employeePage.completeFormMaxCharactersName();
  });

  test("EMP006 - Nombre con valor nulo", async ({
    loginPage,
    credentials,
    homePage,
    pimPage,
    employeePage,
  }) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
    await homePage.linkPIM();
    await pimPage.linkEmployeeList();
    await expect(employeePage.buttonCancel).toBeVisible();
    await employeePage.completeFormNullName();
  });
});
