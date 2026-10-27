//LABORATORIO 1
//Parte 1: configuración y mapa de localizadores
import { test, expect } from '@playwright/test';

test('Primer Elemento Parte 1', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i });
  await expect(buttonLogin).toBeVisible();
  });

test('Segundo Elemento Parte 1', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i}).click();
  const byPlaceholderSearch = page.getByPlaceholder(/^(Search|Buscar)$/i);
  await expect(byPlaceholderSearch).toBeVisible();
  });

test('Tercer Elemento Parte 1', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i });
  await buttonLogin.click();
  const linkAdmin = page.getByRole('link', { name: /^(Admin|Administración)$/i });
  await expect(linkAdmin).toBeVisible({ timeout: 10000 });
  await linkAdmin.click();
  const linkEmployeeList = page.getByRole('link', { name: /^(Employee List|Lista de Empleados)$/i });
  await expect(linkEmployeeList).toBeVisible();
  await linkEmployeeList.click();
  const labelIdEmpleado = page.locator('div.oxd-input-group:has(label:is(:text("Employee Id"), :text("ID de empleado"))) input');
  await expect(labelIdEmpleado).toBeVisible();
  await labelIdEmpleado.fill('0001');
  const buttonSearch = page.getByRole('button', { name: /^(Search|Buscar)$/i })
  await buttonSearch.click();
  });


test('Cuarto Elemento Parte 1', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i });
  await buttonLogin.click();
  const linkAdmin = page.getByRole('link', { name: /^(Admin|Administración)$/i });
  await expect(linkAdmin).toBeVisible();
  await linkAdmin.click({ timeout: 10000 });
  const linkEmployeeList = page.getByRole('link', { name: /^(Employee List|Lista de Empleados)$/i });
  await expect(linkEmployeeList).toBeVisible();
  await linkEmployeeList.click();
  const labelIdEmpleado = page.locator('div.oxd-input-group:has(label:is(:text("Employee Id"), :text("ID de empleado"))) input');
  await expect(labelIdEmpleado).toBeVisible();
  await labelIdEmpleado.fill('XYZ');
  const buttonSearch = page.getByRole('button', { name: /^(Search|Buscar)$/i })
  await buttonSearch.click();
  const textoNoRecordsFound = page.getByText(/^(No Records Found|No se encontraron registros)$/i).first();
  await expect(textoNoRecordsFound).toBeVisible();
  });


test('Quinto Elemento Parte 1', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i });
  await buttonLogin.click();
  const linkAdmin = page.getByRole('link', { name: /^(Admin|Administración)$/i });
  await expect(linkAdmin).toBeVisible();
  await linkAdmin.click({ timeout: 10000 });
  const linkEmployeeList = page.getByRole('link', { name: /^(Employee List|Lista de Empleados)$/i });
  await expect(linkEmployeeList).toBeVisible();
  await linkEmployeeList.click();
  let todosLosRegistros = [];
  let hayPaginaSiguiente = true;
  let paginaActual = 1;
  while (hayPaginaSiguiente) {
    console.log(`Procesando página ${paginaActual}...`);
    const filas = page.locator('.oxd-table-body .oxd-table-row');
    await filas.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    const totalFilas = await filas.count();
    console.log(`Filas encontradas en esta página: ${totalFilas}`);
    for (let i = 0; i < totalFilas; i++) {
      const fila = filas.nth(i);
      const firstName = await fila.locator('.oxd-table-cell').nth(2).textContent();
      const lastName = await fila.locator('.oxd-table-cell').nth(3).textContent();
      todosLosRegistros.push({
        nombre: firstName?.trim(),
        apellido: lastName?.trim()
      });
    }
    const botonSiguiente = page.locator('button:has(.bi-chevron-right)');
    const totalBotones = await botonSiguiente.count();
    if (totalBotones === 0) {
      console.log('El botón de la flecha siguiente ya no existe en esta página. Finalizando bucle.');
      hayPaginaSiguiente = false;
    } else {
      // Si existe, verificamos si está visible y habilitado
      const esVisible = await botonSiguiente.isVisible().catch(() => false);
      const estaDeshabilitado = await botonSiguiente.evaluate(el => {
        return el.classList.contains('--disabled') || el.hasAttribute('disabled');
      }).catch(() => true);

      if (!esVisible || estaDeshabilitado) {
        console.log('Se llegó a la última página. Finalizando bucle.');
        hayPaginaSiguiente = false;
      } else {
        await botonSiguiente.click();
        paginaActual++;
        await page.waitForTimeout(2000); 
      }
    }
  }
  console.log(`Total acumulado de registros extraídos: ${todosLosRegistros.length}`);
  console.log(JSON.stringify(todosLosRegistros, null, 2));
});

//Parte 2: modo estricto en Toolshop
// Importa test para crear pruebas y expect para validar resultados.

//Punto 1: Provócalo.
test('Provoca error de modo estricto', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.locator('[data-test="product-price"]').click();
  });

//Punto 2: Explica con tus palabras.
// En este caso, Playwright lanzará un error porque hay múltiples elementos que coinciden con el selector y no se puede determinar 
// cuál es el correcto.   

//Punto 3: Resuélvelo por posición.
test('Solución por posición', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="product-price"]').first().click();
  });

//Punto 4: Resuélvelo por texto.
test('Solución por texto', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.locator('[data-test="product-price"]').filter({ hasText: '$14.15' }).first().click();
});

//Punto 5: ¿Cuál sobrevive si Toolshop cambia el orden de los productos?
// El método de filtrado por texto (Punto 4) es más resistente ante cambios en la disposición de los productos, ya que identifica al 
// elemento por su contenido y no por el lugar físico que ocupa.

//Parte 3: Búsqueda sin resultados, pasos a mano y expect con IA
// Importa test para crear pruebas y expect para validar resultados.

test('Búsqueda sin resultados', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i });
  await buttonLogin.click();
  const linkAdmin = page.getByRole('link', { name: /^(Admin|Administración)$/i });
  await expect(linkAdmin).toBeVisible({ timeout: 10000 });
  await linkAdmin.click();
  const linkEmployeeList = page.getByRole('link', { name: /^(Employee List|Lista de Empleados)$/i });
  await expect(linkEmployeeList).toBeVisible();
  await linkEmployeeList.click({ timeout: 10000 });
  const labelIdEmpleado = page.locator('div.oxd-input-group:has(label:is(:text("Employee Id"), :text("ID de empleado"))) input');
  await expect(labelIdEmpleado).toBeVisible({ timeout: 10000 });
  await labelIdEmpleado.fill('XYZ');
  const buttonSearch = page.getByRole('button', { name: /^(Search|Buscar)$/i })
  await buttonSearch.click();
  const filasResultado = page.locator('.oxd-table-body .oxd-table-row');
  await expect(filasResultado).toHaveCount(0);
  //await expect(filasResultado).toHaveCount(1); // Esto provocará un error, ya que no hay resultados.
  });

 //Parte 4: Esperas en Toolshop
  // Espera Implícita:
  test('Espera Implícita', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i });
  await buttonLogin.click();
  const linkAdmin = page.getByRole('link', { name: /^(Admin|Administración)$/i });
  await expect(linkAdmin).toBeVisible();
  await linkAdmin.click();
  const linkEmployeeList = page.getByRole('link', { name: /^(Employee List|Lista de Empleados)$/i });
  await expect(linkEmployeeList).toBeVisible();
  await linkEmployeeList.click();
  const labelIdEmpleado = page.locator('div.oxd-input-group:has(label:is(:text("Employee Id"), :text("ID de empleado"))) input');
  await expect(labelIdEmpleado).toBeVisible();
  await labelIdEmpleado.fill('XYZ');
  const buttonSearch = page.getByRole('button', { name: /^(Search|Buscar)$/i })
  await buttonSearch.click();
  const textoNoRecordsFound = page.getByText(/^(No Records Found|No se encontraron registros)$/i).first();
  await expect(textoNoRecordsFound).toBeVisible();
  });

  // Espera Explícita: 
  test('Espera Explícita', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i });
  await buttonLogin.click();
  const linkAdmin = page.getByRole('link', { name: /^(Admin|Administración)$/i });
  await expect(linkAdmin).toBeVisible({ timeout: 10000 });
  await linkAdmin.click();
  const labelIdEmpleado = page.locator('div.oxd-input-group:has(label:is(:text("Employee Id"), :text("ID de empleado"))) input');
  await expect(labelIdEmpleado).toBeVisible({ timeout: 10000 });
  await labelIdEmpleado.fill('XYZ');
  const buttonSearch = page.getByRole('button', { name: /^(Search|Buscar)$/i })
  await buttonSearch.click();
  const textoNoRecordsFound = page.getByText(/^(No Records Found|No se encontraron registros)$/i).first();
  await expect(textoNoRecordsFound).toBeVisible({ timeout: 5000 });
  });

  // Espera Fija: 
  test('Espera Fija', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const byPlaceholderUser = page.getByPlaceholder(/^(Username|Nombre de usuario)$/i);
  await expect(byPlaceholderUser).toBeVisible();
  await byPlaceholderUser.fill('Admin');
  const byPlaceholderPass = page.getByPlaceholder(/^(Password|Contraseña)$/i);
  await expect(byPlaceholderPass).toBeVisible();
  await byPlaceholderPass.fill('admin123');
  const buttonLogin = page.getByRole('button', { name: /^(Login|Acceso|Ingresar)$/i });
  await buttonLogin.click();
  const linkAdmin = page.getByRole('link', { name: /^(Admin|Administración)$/i });
  await expect(linkAdmin).toBeVisible();
  await linkAdmin.click();
  const linkEmployeeList = page.getByRole('link', { name: /^(Employee List|Lista de Empleados)$/i });
  await expect(linkEmployeeList).toBeVisible();
  await linkEmployeeList.click();
  const labelIdEmpleado = page.locator('div.oxd-input-group:has(label:is(:text("Employee Id"), :text("ID de empleado"))) input');
  await expect(labelIdEmpleado).toBeVisible();
  await labelIdEmpleado.fill('XYZ');
  const buttonSearch = page.getByRole('button', { name: /^(Search|Buscar)$/i })
  await buttonSearch.click();
  await page.waitForTimeout(3000);
  const textoNoRecordsFound = page.getByText(/^(No Records Found|No se encontraron registros)$/i).first();
  await expect(textoNoRecordsFound).toBeVisible();
  });