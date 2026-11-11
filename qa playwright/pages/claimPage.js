export class ClaimPage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.myClaimsLink = page.getByRole('link', { name: /(My claims|Mis reclamaciones)/i });
    this.submitClaimButton = page.getByRole('button', { name: /(Submit Claim|Presentar Reclamación)/i}) 
   }   
   //método para ingresar al apartado para agregar empleados
   async linkMyClaims() {
    await this.myClaimsLink.click();
    await this.submitClaimButton.click();
   }
} 