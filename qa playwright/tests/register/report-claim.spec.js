import { test, expect } from "../fixtures";
import employeesData from "../../test-data/data-employeesClaim.json";

test.describe("Registro de Usuario y reclamo", () => {
  for (const emp of employeesData) {
    test(`EMP007 - Registrar usuario y crear reclamo: ${emp.id} - ${emp.firstName}`, async ({ 
    loginPage, credentials, homePage, pimPage, employeePage, adminPage, addUserPage, passwords, submitClaimPage, page 
    }) => {

    // Paso 1: Iniciar sesión
    await test.step("1. Iniciar sesión", async () => {
        await loginPage.login(credentials.username, credentials.password);
        await expect(loginPage.page).toHaveURL(/.*dashboard.*/);
        await expect(loginPage.textDashboard).toBeVisible({ timeout: 20000 });
    });

    // Paso 2: Registro de empleado
    await test.step("2. Registro de empleado", async () => {
        await homePage.linkPIM();
        await expect(pimPage.addEmployeeLink).toBeVisible({ timeout: 15000 });
        await pimPage.linkEmployeeList();
        await expect(employeePage.buttonCancel).toBeVisible({ timeout: 15000 });
        await employeePage.completeFormJson(emp.firstName, emp.lastName, emp.employeeId);
        await test.info().attach("Registro de empleado", { body: await page.screenshot(), contentType: "image/png" });
    });

    // Paso 3: Registro de usuario
    await test.step("3. Registro de usuario", async () => {
        await homePage.linkAdmin();
        await expect(adminPage.buttonAdd).toBeVisible({ timeout: 15000 });
        await adminPage.linkUserManagement();
        await expect(addUserPage.saveButton).toBeVisible({ timeout: 15000 });
        await addUserPage.addUser(`${emp.firstName} ${emp.lastName}`, emp.username, passwords.userPass, passwords.confirmUserPass);
        await test.info().attach("Registro de usuario", { body: await page.screenshot(), contentType: "image/png" });
        await loginPage.logout();
    });

    // Paso 4: Iniciar Sesión con el nuevo usuario
    await test.step("4. Iniciar Sesión con el nuevo usuario", async () => {
        await loginPage.login(emp.username, passwords.userPass);
        await loginPage.page.waitForLoadState('networkidle');
        await expect(loginPage.page).toHaveURL(/.*dashboard.*/);
        await expect(loginPage.textDashboard).toBeVisible({ timeout: 20000 });
    });

    // Paso 5: Crear un reclamo
    await test.step("5. Crear un reclamo", async () => {
        await homePage.linkClaim();
        await homePage.linkSubmitClaim();
        await submitClaimPage.submitClaimForm(emp.claimEvent, emp.claimCurrency, emp.claimDescription);
        await test.info().attach("Crear reclamo", { body: await page.screenshot(), contentType: "image/png" });
    });
   });
  } 
});