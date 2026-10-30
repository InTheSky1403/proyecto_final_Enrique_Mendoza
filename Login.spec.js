//LOGIN
//Parte 1: Login exitoso con tres assertions 
import { test, expect } from '@playwright/test';

test('Login Primer Assertion', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i}).click();
  const buttonUpgrade = page.getByRole('button', { name: /^(Upgrade|Mejora)$/i});
  await expect(buttonUpgrade).toBeVisible();
  });

test('Login Segundo Assertion', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i}).click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  });

test('Login Tercer Assertion', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i}).click();
  const headerTitle = page.locator('.oxd-topbar-header-breadcrumb-module');
  await expect(headerTitle).toHaveText(/^(Dashboard|Panel)$/i);
  });

//Parte 2: Los dos errores 
  test('Primer Error', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder(/(Username|Nombre de usuario)/i).fill('incorrectUser');
  await page.getByPlaceholder(/(Password|Contraseña)/i).fill('admin123');
  await page.getByRole('button', { name: /(Login|Acceso|Ingresar)/i}).click();
  await expect(page.locator('.oxd-alert-content-text')).toContainText(/Invalid credentials|Credenciales no válidas/i);
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

test('Segundo Error', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder(/(Username|Nombre de usuario)/i).fill('Administrador');
  await page.getByPlaceholder(/(Password|Contraseña)/i).fill('incorrectPassword');
  await page.getByRole('button', { name: /(Login|Acceso|Ingresar)/i}).click();
  await expect(page.locator('.oxd-alert-content-text')).toContainText(/Invalid credentials|Credenciales no válidas/i);
  await expect(page.getByPlaceholder(/(Username|Nombre de usuario)/i)).toBeVisible();
});