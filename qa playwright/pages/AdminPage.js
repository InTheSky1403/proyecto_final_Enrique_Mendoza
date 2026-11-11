export class AdminPage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.userManagementLink = page.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: /(User Management|Gestión de Usuarios)/i }).first();
    this.usersLink = page.getByRole('menuitem', { name: 'Users' })
    this.buttonAdd = page.getByRole('button', { name: /(Add|Agregar)/i})  
   } 
   //método para ingresar al apartado de creación de usuarios
   async linkUserManagement() {
    await this.userManagementLink.click();
    await this.usersLink.click();
    await this.buttonAdd.click();
   }
} 