// Importa test para crear pruebas y expect para validar resultados.
import { test, expect } from '@playwright/test';

  // Define la prueba y recibe page para controlar el navegador.
test('mapeo de elementos', async ({ page }) => {

  // Abre la página web que se va a probar.
  await page.goto('https://practice.expandtesting.com/locators');


  // 1. getByRole(): busca por el rol y el nombre accesible.
  const button = page.getByRole('link', { name: 'Contact' });
  // Verifica que el enlace Contact esté visible.
  await expect(button).toBeVisible();

  // 2. locator con XPath: busca un elemento mediante la ruta de su estructura HTML.
  const byXpath = page.locator('xpath=//*[@id="core"]/div[1]/div/div');
  // Verifica que el elemento localizado mediante XPath esté visible.
  await expect(byXpath).toBeVisible();
 
  // 3. getByText(): busca por el texto visible.
  const byText = page.getByText('Choose a country');
// Comprueba que el texto Choose a country esté visible.
  await expect(byText).toBeVisible();

  // 4. getByLabel(): busca un campo por su etiqueta asociada.
  const byLabel = page.getByLabel('Choose a country');
  // Verifica que el campo identificado por esa etiqueta esté visible.
  await expect(byLabel).toBeVisible();
  
  // 5. getByPlaceholder(): busca por el texto de ayuda del campo.
  const byPlaceholder = page.getByPlaceholder('Filter By Tag');
  // Comprueba que el campo con ese placeholder esté visible.
  await expect(byPlaceholder).toBeVisible();
  await byLabel.selectOption('Japan');

  // 6. getByAltText(): busca imágenes por su texto alternativo (alt).
  const byAltText = page.getByAltText('User Avatar');
  // Verifica que la imagen con ese texto alternativo esté visible.
  await expect(byAltText).toBeVisible();
  
  // 7. getByTestId(): busca un elemento mediante su identificador de prueba (data-testid).
  const byGetByTestId = page.getByTestId('status-message');
  // Verifica que el elemento con el identificador "status-message" esté visible.
  await expect(byGetByTestId).toBeVisible();
  

// Finaliza la prueba.
});



// Define una prueba para practicar el manejo de localizadores.
test('error de modo estricto', async ({ page }) => {
  // Abre la página web donde se realizará la prueba.
  await page.goto('https://practice.expandtesting.com/locators');
  
  // Busca los elementos que tengan el rol de enlace (link).
  const button = page.getByRole('link');
  
  // Selecciona el primer enlace encontrado y hace clic en él.
  await button.first().click();
  
});



  // Define una prueba para trabajar con elementos cuyo ID puede cambiar.
test('ID dinámico', async ({ page }) => {

  // Abre la página que contiene un botón con ID dinámico.
  // Forma alternativa: localizar el botón directamente por su ID.
  // const button = page.locator("//button[@id='...']");
  await page.goto('http://uitestingplayground.com/dynamicid');

  // Busca el botón por su rol y su nombre accesible,
  // sin depender de su ID dinámico.
  const button = page.getByRole('button', {name: 'Button with Dynamic ID'});

  // Hace clic en el botón encontrado.
  await button.click();

});


// Define una prueba para practicar las esperas en Playwright.
test('Tipos de espera', async ({ page }) => {
  // Abre la página donde se encuentra el campo de texto deshabilitado.
  await page.goto('http://uitestingplayground.com/disabledinput');

  // Busca el botón por su rol.
  const button = page.getByRole('button');

  // Hace clic en el botón para habilitar la interacción con el campo.
  await button.click();

  // Espera implícita: Playwright espera automáticamente a que el campo
  // esté disponible para ejecutar la acción.
  // await page.getByRole('textbox').fill('texto de prueba');

  // Espera explícita: espera hasta 5000 milisegundos a que el campo
  // de texto esté habilitado antes de continuar.
  //await expect(page.getByRole('textbox')).toBeEnabled({ timeout: 5000 });
  // Escribe el texto de prueba en el campo.
  //await page.getByRole('textbox').fill('texto de prueba');

  //espera por un tiempo fijo de 5000 milisegundos antes de continuar.
  await page.waitForTimeout(5000);
  await page.getByRole('textbox').fill('texto de prueba');
});