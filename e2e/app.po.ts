import { browser, by, element } from 'protractor';
import { getTestBed } from '@angular/core/testing';
import { protractor } from 'protractor/built/ptor';


export class AppPage {

  navigateTo() {

    return browser.get('/user/login');
  }

  navigateToAddProduct() {
    return browser.get('/user/products');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  fillFormAndSendLoginError(form) {
    const user_data_login_password = 'cccc';
    form.element(by.css('input[name=userName]')).sendKeys(user_data_login_password);
    form.element(by.css('input[name=password]')).sendKeys('user_data_login_password');

    form.element(by.buttonText('Login')).click();

    browser.sleep(2000);
    const value = element(by.css('div[role=alertdialog]'));

    expect(value.getText()).toEqual('Nie poprawne dane logowania');
  }

  fillFormAndSendLogin(form) {
    const user_data_login_password = 'cccc';
    form.element(by.css('input[name=userName]')).sendKeys(user_data_login_password);
    form.element(by.css('input[name=password]')).sendKeys(user_data_login_password);

    form.element(by.buttonText('Login')).click();

    browser.sleep(2000);
    const value = element(by.css('div[role=alertdialog]'));
    expect(value.getText()).toEqual('Jestes zalogowany');
  }


  fillFormAndSendAddProduct(form) {
    const addProduct = 'test';
    form.element(by.css('input[name=productName]')).sendKeys(addProduct);
    form.element(by.css('select'))
      .element(by.cssContainingText('option', 'Premium')).click();
    form.element(by.css('input[name=productDesc]')).sendKeys('test');

    form.element(by.buttonText('Dodaj produkt...')).click();

    return addProduct;
  }

  getLoginBtn() {
    return element(by.buttonText('Login'));
  }

  getFormLogin() {

    return element(by.id('login-form'));
  }
  getFormAddProduct() {
    console.log('test');
    return element(by.id('add-product'));
  }
  click_login() {

    const btnLoginItem = this.getLoginBtn();

    btnLoginItem.click();
  }

  showFormLogin() {
    return this.getFormLogin();
  }
  showFormAddProduct() {
    return this.getFormAddProduct();
  }
}
