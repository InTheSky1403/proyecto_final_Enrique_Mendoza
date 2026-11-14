export class ClaimPage {
  constructor(page) {
    this.page = page;
    this.myClaimsLink = page.getByRole('link', {
      name: /(My claims|Mis reclamaciones)/i
    });
    this.submitClaimButton = page.getByRole('button', {
      name: /(Submit Claim|Presentar Reclamación)/i
    });
  }

  async linkMyClaims() {
    await this.myClaimsLink.click();
    await this.submitClaimButton.click();
  }
}