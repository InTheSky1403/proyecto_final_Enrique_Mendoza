import { test, expect } from "../fixtures.js";

  test.describe('Autenticación', () => { 

  test('EMP001 - Inicio de sesión exitoso', async ({ loginPage, credentials }) => {
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.expectDashboard();
    await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
  }); 

  test("EMP002 - usuario inválido",async ({ loginPage, credentials }) => {
    await loginPage.login('incorrectUser', credentials.password);
    await expect(loginPage.errorMessage).toHaveText(/Invalid credentials|Credenciales no válidas/i);
    await loginPage.expectLoginPage();
  });

  test("EMP003 - contraseña inválida",async ({ loginPage, credentials }) => {
    await loginPage.login(credentials.username, 'incorrectPassword');
    await expect(loginPage.errorMessage).toHaveText(/Invalid credentials|Credenciales no válidas/i);
await loginPage.expectLoginPage();  });
});
