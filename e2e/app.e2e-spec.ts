import { AppPage , } from './app.po';
import { browser, by, element } from 'protractor';
import { UserLoginComponent } from '../src/app/user/user-login/user-login.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { UserService } from '../src/app/user.service';

describe('administration-panel App', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();

    browser.waitForAngularEnabled(false);
  });


  beforeEach(() => {
  });

  it('test login error', () => {
    browser.sleep(5000);
    page.navigateTo();
    const formLogin = page.showFormLogin();

    const login = page.fillFormAndSendLoginError(formLogin);
  });

  it('test login', () => {
    browser.sleep(5000);
    page.navigateTo();
    const formLogin = page.showFormLogin();

    const login = page.fillFormAndSendLogin(formLogin);
  });

  it(`test of adding a product when the user is logged in`, () => {

      page.navigateToAddProduct();
      browser.sleep(5000);
      const formAddProduct = page.getFormAddProduct();
      const addProduct = page.fillFormAndSendAddProduct(formAddProduct);
      browser.sleep(5000);
  });
});
