export class PIMPage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.buttonUpgrade = page.getByRole('button', { name: /(Upgrade|Mejora)/i });
   }   
   //método para ingresar al apartado para agregar empleados
   async linkEmployeeList() {
    await this.page.getByRole('link', { name: /(Add Employee|Agregar Empleado)/i }).click();

   }
} 