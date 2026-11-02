
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';

  test.describe('Autenticación', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });  

  test('inicio de sesión exitoso', async () => {
    await loginPage.login(process.env.LOGIN_USER, process.env.LOGIN_PASSWORD);
    await expect(loginPage.page).toHaveURL('/web/index.php/dashboard/index');
    await expect(loginPage.textDashboard).toHaveText(/(Dashboard|Panel)/i);
  }); 

  test("usuario inválido",async () => {
    await loginPage.login('incorrectUser', process.env.LOGIN_PASSWORD);
    await expect(loginPage.errorMessage).toHaveText(/Invalid credentials|Credenciales no válidas/i);
    await expect(loginPage.page).toHaveURL('/web/index.php/auth/login');
  });

  test("contraseña inválida",async () => {
    await loginPage.login(process.env.LOGIN_USER, 'incorrectPassword');
    await expect(loginPage.errorMessage).toHaveText(/Invalid credentials|Credenciales no válidas/i);
    await expect(loginPage.page).toHaveURL('/web/index.php/auth/login');
  });
});
