export class PIMPage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.addEmployeeLink = page.getByRole('link', { name: /(Add Employee|Agregar Empleado)/i });
   }   
   //método para ingresar al apartado para agregar empleados
   async linkEmployeeList() {
    await this.addEmployeeLink.click();
   }
} 