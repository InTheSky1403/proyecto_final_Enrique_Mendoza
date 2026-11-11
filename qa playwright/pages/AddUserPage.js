import { expect } from '@playwright/test';

export class AddUserPage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.userLocator = page.locator('div.oxd-input-group').filter({ hasText: /(User Role|Rol de usuario)/i }).locator('.oxd-select-text')
    this.essRole = page.getByRole('option', { name: 'ESS' });
    this.statusLocator = page.locator('div.oxd-input-group').filter({ hasText: /(Status|Estado)/i }).locator('.oxd-select-text')
    this.enabledRole = page.getByRole('option', { name: /(Enabled|Activado)/i })
    this.employeeNameLocator = page.locator('div.oxd-input-group').filter({ hasText: /(Employee Name|Nombre del empleado)/i }).locator('input')
    this.optionEmployeeName = page.getByRole('option', { name: 'manda user' })
    this.usernameLocator = page.locator('div.oxd-input-group').filter({ hasText: /(Username|Nombre de usuario)/i }).locator('input')
    this.passwordLocator = page.locator('div.oxd-input-group').filter({ hasText: /(Password|Contraseña)/i }).first().locator('input')
    this.confirmPasswordLocator = page.locator('div.oxd-input-group').filter({ hasText: /(Confirm Password|confirmar Contraseña)/i }).locator('input')
    this.saveButton = page.getByRole('button', { name: /(Save|Guardar)/i })
    this.successMessage = page.getByText('Successfully Saved');
   }

   //método para ingresar los datos del usuario y guardarlos
   async addUser(employeeName, username, password, confirmPassword) {
    await this.userLocator.click();
    await this.essRole.click();
    await this.statusLocator.click();
    await this.enabledRole.click();
    await this.employeeNameLocator.fill(employeeName);
    await this.employeeNameLocator.fill(employeeName);
    const option = this.page.getByRole('option', { name: employeeName }).first();
    await option.waitFor({ state: 'visible', timeout: 20000 });
    await option.click();
    await this.usernameLocator.fill(username);
    await this.passwordLocator.fill(password);
    await this.confirmPasswordLocator.fill(confirmPassword);
    await this.saveButton.click();
    await expect(this.successMessage).toBeVisible({ timeout: 20000 });
   }
} 