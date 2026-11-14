export class HomePage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
     //guardando los localizadores
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.adminLink = page.getByRole('link', { name: /(Admin|Administración)/i })
    this.claimLink = page.getByRole('link', { name: /(Claim|Afirmar)/i })
    this.submitClaimLink = page.getByRole('link', { name: /(Submit Claim|Presentar reclamación)/i });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
   }   
  
   //método para ingresar a PIM
   async linkPIM() {
    await this.pimLink.click();
   }

   //método para ingresar a Admin
   async linkAdmin() {
    await this.adminLink.click();
   }

   //método para ingresar a Claim
   async linkClaim() {
    await this.claimLink.click();
   }

   //método para ingresar a Submit Claim
   async linkSubmitClaim() {
    await this.submitClaimLink.click();

    //método para ingresar a dashboard
   }
   async linkDashboard() {
  await this.dashboardLink.click();
   }
} 