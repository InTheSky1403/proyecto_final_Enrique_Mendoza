export class LoginPage {
  constructor(page) {
    this.page = page; //guarda las propiedades de mi página
    //guardando los localizadores
    this.byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
    this.byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
    this.buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i})
    this.textDashboard = page.getByRole('heading', { name: /Dashboard/i });
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.logoutRole = page.getByRole('menuitem', { name: /Logout|Cerrar sesión/i });
   }
   //método para abrir pagina de login
   async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
   }
   //método para iniciar sesión
    async login(username, password) {   
        await this.byPlaceholderUser.waitFor({ state: 'visible' });
        await this.byPlaceholderUser.fill(username);
        await this.byPlaceholderPass.fill(password);
        await this.buttonLogin.click();
      }  
    async logout() {
    await this.page.locator('.oxd-userdropdown-tab').click();
    await this.logoutRole.waitFor({ state: 'visible', timeout: 10000 });
    await this.logoutRole.click();
    }
  }