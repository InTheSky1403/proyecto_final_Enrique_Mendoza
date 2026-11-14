import { test, expect } from "../fixtures";
import employeesData from "../../test-data/data-employeesClaim.json";

test.describe("Registro de Usuario y reclamo", () => {
for (const emp of employeesData) {
    test(`EMP007 - Registrar usuario y crear reclamo: ${emp.id} - ${emp.firstName}`, async ({
      loginPage,
      credentials,
      homePage,
      pimPage,
      employeePage,
      adminPage,
      addUserPage,
      passwords,
      submitClaimPage
    }) => {
      test.setTimeout(90_000)
      // 1. Iniciar sesión
      await loginPage.login(credentials.username, credentials.password);
      await expect(loginPage.page).toHaveURL(/.*dashboard.*/, { timeout: 20000 });
      await expect(loginPage.textDashboard).toBeVisible({ timeout: 20000 });
      // 2. Registro de empleado
      await homePage.linkPIM();
      await expect(pimPage.addEmployeeLink).toBeVisible({ timeout: 20000 });
      await pimPage.linkEmployeeList();
      await expect(employeePage.buttonCancel).toBeVisible({ timeout: 20000 });
      await employeePage.completeFormJson(emp.firstName, emp.lastName, emp.employeeId);
      // 3. Registro de usuario
      await homePage.linkAdmin();
      await expect(adminPage.buttonAdd).toBeVisible({ timeout: 20000 });
      await adminPage. linkUserManagement();
      await expect(addUserPage.saveButton).toBeVisible({ timeout: 60000 });
      await addUserPage.addUser(`${emp.firstName} ${emp.lastName}`,  emp.username, passwords.userPass, passwords.confirmUserPass);
      await loginPage.logout();
      // 4. Iniciar Sesión con el nuevo usuario
      await loginPage.login(emp.username, passwords.userPass);
      await expect(loginPage.textDashboard).toBeVisible({ timeout: 20000 });
      // 5. Crear un reclamo
      await homePage.linkClaim();
      await homePage.linkSubmitClaim();
      await submitClaimPage.submitClaimForm(emp.claimEvent, emp.claimCurrency, emp.claimDescription);
    });
  }
});