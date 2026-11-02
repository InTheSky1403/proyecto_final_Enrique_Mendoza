export class LoginPage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
    this.byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
    this.buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i})
    this.textDashboard = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.errorMessage = page.locator('.oxd-alert-content-text');
   }
   //método para abrir pagina de login
   async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
   }
   //método para iniciar sesión
    async login(byPlaceholderUser, byPlaceholderPass) {   
        await this.byPlaceholderUser.fill(byPlaceholderUser);
        await this.byPlaceholderPass.fill(byPlaceholderPass);
        await this.buttonLogin.click();
      }  
  }