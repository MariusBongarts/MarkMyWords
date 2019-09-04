import { WebElement, Builder, Browser, WebDriver, By, until, logging } from 'selenium-webdriver';

describe('app', async () => {
  let driver: WebDriver;
  let broncoLeftBar: WebElement;
  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('http://localhost:8080');
    broncoLeftBar = await driver.findElement(By.tagName('bronco-left-navbar'));
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should find title element', async () => {
    expect(broncoLeftBar).toBeTruthy();
  }, 3000);
});
