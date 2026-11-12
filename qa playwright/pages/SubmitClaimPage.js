import { expect } from '@playwright/test';

export class SubmitClaimPage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.selectEvent = page.locator('div.oxd-input-group:has(label:is(:text("Event"), :text("Evento"))) .oxd-select-text');
    this.getOptionByText = (optionText) => page.getByRole('option', { name: optionText });
    this.selectCurrency = page.locator('div.oxd-input-group:has(label:is(:text("Currency"), :text("Divisa"))) .oxd-select-text');
    this.inputRemarks = page.locator('div.oxd-input-group:has(label:is(:text("Remarks"), :text("Observaciones"))) textarea');
    this.buttonCreate = page.getByRole('button', { name: /(Create|Crear)/i });
  }
    //método para ingresar una reclamación
    async selectEventOption(optionText) {
        await this.selectEvent.click();
        const option = this.getOptionByText(optionText);
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
    }
    async selectCurrencyOption(currencyText) {
        await this.selectCurrency.click();
        const option = this.getOptionByText(currencyText);
        await option.waitFor({ state: 'visible', timeout: 20000 });
        await option.click();
    }
    async fillRemarks(remarksText) {
        await this.inputRemarks.fill(remarksText, { delay: 100 });
    }
    async submitClaimForm(event, currency, remarks) {
        await this.selectEventOption(event);
        await this.selectCurrencyOption(currency);
        await this.fillRemarks(remarks);
        await this.buttonCreate.waitFor({ state: 'visible', timeout: 20000 });
        await this.buttonCreate.click({ force: true });
        const successToast = this.page.getByText('Successfully Saved');
        await expect(successToast).toBeVisible({ timeout: 20000 });
    }
} 