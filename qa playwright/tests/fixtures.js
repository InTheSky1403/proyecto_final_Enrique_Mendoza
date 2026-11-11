
import { test as base, expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { PIMPage } from '../pages/PIMPage.js';
import { EmployeePage } from '../pages/EmployeePage.js';
import { AdminPage } from '../pages/AdminPage.js';
import { AddUserPage } from '../pages/AddUserPage.js';
import { ClaimPage } from '../pages/claimPage.js';
import { SubmitClaimPage } from '../pages/SubmitClaimPage.js';
  
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
  adminPage: async ({page}, use) => {
    await use(new AdminPage(page));
  },
  addUserPage: async ({page}, use) => {
    await use(new AddUserPage(page));
  },
  passwords: async ({}, use) => {
    await use({
      userPass: process.env.USER_PASSWORD,
      confirmUserPass: process.env.CONFIRM_USER_PASSWORD
    });
  },
  claimPage: async ({page}, use) => {
    await use(new ClaimPage(page));
  },
  submitClaimPage: async ({page}, use) => {
    await use(new SubmitClaimPage(page));
  },
});
        
export { expect };