export class HomePage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
     //guardando los localizadores
    this.pimLink = page.getByRole('link', { name: 'PIM' });
   }   
  
   //método para ingresar a PIM
   async linkPIM() {
    await this.pimLink.click();
   }
} 