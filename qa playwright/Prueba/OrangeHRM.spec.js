// @ts-check
import { test, expect } from '@playwright/test';

test('Validar el ingreso a Orange', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
});