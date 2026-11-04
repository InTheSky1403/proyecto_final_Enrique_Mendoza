
import { test as base, expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { PIMPage } from '../pages/PIMPage.js';
import { EmployeePage } from '../pages/EmployeePage.js';

export const test = base.extend({
   loginPage: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage)
  },
  credentials: async ({}, use) => {
    await use({
      username: process.env.LOGIN_USER,
      password: process.env.LOGIN_PASSWORD
      });
  },
  homePage: async ({page}, use) => {
    await use(new HomePage(page));
  },
    
  pimPage: async ({page}, use) => {
    await use(new PIMPage(page));
  },
  employeePage: async ({page}, use) => {
    await use(new EmployeePage(page));
  },
});
        
export { expect };