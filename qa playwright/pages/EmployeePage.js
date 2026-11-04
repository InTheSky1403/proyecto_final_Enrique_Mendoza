export class EmployeePage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.byPlaceholderFirstName = page.getByPlaceholder(/(First Name|Nombre)/i);
    this.byPlaceholderLastName = page.getByPlaceholder(/(Last Name|Apellido)/i);
    this.labelIdEmpleado = page.locator('div.oxd-input-group:has(label:is(:text("Employee Id"), :text("ID de empleado"))) input');
    this.buttonSave = page.getByRole('button', { name: /(Save|Guardar)/i });
    this.buttonCancel = page.getByRole('button', { name: /(Cancel|Cancelar)/i });
    this.requiredMessage = page.getByText(/Required|Requerido/i);
    this.maxCharactersMessage = page.getByText(/Should not exceed 30 characters|No debe exceder los 30 caracteres/i);
   }   
   //método para completar el formulario de registro de empleados
   async completeForm() {
    await this.byPlaceholderFirstName.fill('Prueba');
    await this.byPlaceholderLastName.fill('QA');
    await this.labelIdEmpleado.fill('00002');
    await this.buttonSave.click();
   }
   //método para completar el formulario excediendo el límite de caracteres en el nombre
   async completeFormMaxCharactersName() {
    await this.byPlaceholderFirstName.fill('PruebaPruebaPruebaPruebaPruebaPrueba');
    await this.byPlaceholderLastName.fill('QA');
    await this.labelIdEmpleado.fill('00003');
    await this.buttonSave.click();
   }
   //método para completar el formulario con un registro nulo en el nombre
    async completeFormNullName() {
    await this.byPlaceholderFirstName.fill('');
    await this.byPlaceholderLastName.fill('QA');
    await this.labelIdEmpleado.fill('00004');
    await this.buttonSave.click();
   }
} 